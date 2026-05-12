"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "sonner";
// import "sonner/dist/styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { selectGuestId, setGuestId } from "@/redux/slices/auth/auth.slice";
import { GUEST_ID_LOCAL_STORAGE_KEY, getGuestIdFromStorage } from "@/lib/axios";
import { Toaster } from "../ui/sonner";
import { selectUser } from "@/redux/slices/user/user.slice";

function GuestIdInitializer({ children }: { children: React.ReactNode }) {
  const user = useSelector(selectUser);
  const guestId = useSelector(selectGuestId);
  const dispatch = useDispatch();

  console.log(user, "user");
  useEffect(() => {
    if (user) {
      localStorage.removeItem(GUEST_ID_LOCAL_STORAGE_KEY);
      dispatch(setGuestId(""));
      return;
    }
    if (guestId) {
      localStorage.setItem(GUEST_ID_LOCAL_STORAGE_KEY, guestId);
      return;
    }
    const existing = getGuestIdFromStorage();
    if (existing) {
      dispatch(setGuestId(existing));
      return;
    }
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      dispatch(setGuestId(crypto.randomUUID()));
    }
  }, [guestId, dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GuestIdInitializer>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: "var(--font-jakarta)",
                },
              }}
              className="font-jakarta"
            />
            {/* <Toaster richColors position="top-center" closeButton /> */}
          </QueryClientProvider>
        </GuestIdInitializer>
      </PersistGate>
    </Provider>
  );
}
