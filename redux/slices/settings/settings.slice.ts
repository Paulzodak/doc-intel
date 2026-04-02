import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ISettingsState {
  showSetting: boolean;
}

const initialState: ISettingsState = {
  showSetting: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowSetting: (state, action: PayloadAction<boolean>) => {
      state.showSetting = action.payload;
    },
  },
});

export const { setShowSetting } = settingsSlice.actions;

export const selectShowSetting = (state: RootState) => state.settings.showSetting;

export default settingsSlice.reducer;
