import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ILayoutState {
  visible: boolean;
}

const initialState: ILayoutState = {
  visible: true,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    toggleSidebar: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { setSidebarVisible, toggleSidebar } = layoutSlice.actions;
export const selectSidebarVisible = (state: RootState) => state.layout.visible;
export default layoutSlice.reducer;
