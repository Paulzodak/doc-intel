import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface IAuthState {
  guestId: string | null;
}

const initialState: IAuthState = {
  guestId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGuestId: (state, action: PayloadAction<string>) => {
      state.guestId = action.payload;
    },
  },
});

export const { setGuestId } = authSlice.actions;
export const selectGuestId = (state: RootState) => state.auth.guestId;
export default authSlice.reducer;
