import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ILayoutState {
  /** Mobile sidebar (drawer): closed by default, only visible on mobile screens */
  mobileSidebarOpen: boolean;
  /** Desktop sidebar: open by default, only visible on desktop screens */
  desktopSidebarOpen: boolean;
}

const initialState: ILayoutState = {
  mobileSidebarOpen: false,
  desktopSidebarOpen: true,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
    setDesktopSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.desktopSidebarOpen = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    toggleDesktopSidebar: (state) => {
      state.desktopSidebarOpen = !state.desktopSidebarOpen;
    },
  },
});

export const {
  setMobileSidebarOpen,
  setDesktopSidebarOpen,
  toggleMobileSidebar,
  toggleDesktopSidebar,
} = layoutSlice.actions;

export const selectMobileSidebarOpen = (state: RootState) =>
  state.layout.mobileSidebarOpen;
export const selectDesktopSidebarOpen = (state: RootState) =>
  state.layout.desktopSidebarOpen;

export default layoutSlice.reducer;
