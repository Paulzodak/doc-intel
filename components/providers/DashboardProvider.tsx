"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUser } from "@/data/user";
import {
  setUser,
  setLoading,
  setError,
  clearUser,
  selectUser,
} from "@/redux/slices/user/user.slice";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, error, isFetching } = useGetUser();

  // useEffect(() => {
  //   if (isFetching) {
  //     dispatch(setLoading(true));
  //     return;
  //   }
  //   if (isSuccess && data) {
  //     if (data.user) {
  //       dispatch(setUser(data.user));
  //     } else {
  //       dispatch(clearUser());
  //       if (data.message) {
  //         dispatch(setError(data.message));
  //       }
  //     }
  //   } else if (isError && error) {
  //     dispatch(clearUser());
  //     const message = error.response?.data?.message ?? error.message ?? "Failed to load user data";
  //     dispatch(setError(message));
  //   }
  //   dispatch(setLoading(false));
  // }, [isSuccess, isError, isFetching, data, error, dispatch]);

  return <>{children}</>;
}
