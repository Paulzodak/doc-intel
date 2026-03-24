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
import { Toaster } from "../ui/sonner";

function GuestIdInitializer({ children }: { children: React.ReactNode }) {
  const guestId = useSelector(selectGuestId);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("settings guest Id ");
    if (!guestId && typeof crypto !== "undefined" && crypto.randomUUID) {
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
