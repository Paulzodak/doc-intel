"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUser } from "@/data/user";
import { setUser, setLoading, setError, clearUser } from "@/redux/slices/user/user.slice";
import { AxiosError } from "axios";
import type { GetUserResponse } from "@/types/user";
import { RootState } from "@/redux/store";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user, "user");
  const { mutateAsync } = useGetUser();

  useEffect(() => {
    dispatch(setLoading(true));
    mutateAsync()
      .then((data: GetUserResponse) => {
        console.log(data, "data");
        if (data.user) {
          dispatch(setUser(data.user));
        } else {
          // dispatch(clearUser());
          if (data.message) {
            dispatch(setError(data.message));
          }
        }
      })
      .catch((err: AxiosError<GetUserResponse>) => {
        // dispatch(clearUser());
        const message = err.response?.data?.message ?? err.message ?? "Failed to load user data";
        dispatch(setError(message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [mutateAsync, dispatch]);

  return <>{children}</>;
}
