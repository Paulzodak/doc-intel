import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ILayoutState {
  /** Mobile sidebar (drawer): closed by default, only visible on mobile screens */
  mobileSidebarOpen: boolean;
  /** Mobile right-side sidebar (drawer): closed by default, only visible on mobile screens */
  mobileRightSidebarOpen: boolean;
  /** Desktop sidebar: open by default, only visible on desktop screens */
  desktopSidebarOpen: boolean;
}

const initialState: ILayoutState = {
  mobileSidebarOpen: false,
  mobileRightSidebarOpen: false,
  desktopSidebarOpen: true,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
    setMobileRightSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileRightSidebarOpen = action.payload;
    },
    setDesktopSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.desktopSidebarOpen = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    toggleMobileRightSidebar: (state) => {
      state.mobileRightSidebarOpen = !state.mobileRightSidebarOpen;
    },
    toggleDesktopSidebar: (state) => {
      state.desktopSidebarOpen = !state.desktopSidebarOpen;
    },
  },
});

export const {
  setMobileSidebarOpen,
  setMobileRightSidebarOpen,
  setDesktopSidebarOpen,
  toggleMobileSidebar,
  toggleMobileRightSidebar,
  toggleDesktopSidebar,
} = layoutSlice.actions;

export const selectMobileSidebarOpen = (state: RootState) =>
  state.layout.mobileSidebarOpen;
export const selectMobileRightSidebarOpen = (state: RootState) =>
  state.layout.mobileRightSidebarOpen;
export const selectDesktopSidebarOpen = (state: RootState) =>
  state.layout.desktopSidebarOpen;

export default layoutSlice.reducer;
