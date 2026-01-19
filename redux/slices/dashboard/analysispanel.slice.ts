import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type AnalysisPanelTab = "grading" | "chat" | "details";

export interface IAnalysisPanelState {
  activeTab: AnalysisPanelTab;
}

const initialState: IAnalysisPanelState = {
  activeTab: "grading",
};

const analysisPanelSlice = createSlice({
  name: "analysisPanel",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<AnalysisPanelTab>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = analysisPanelSlice.actions;
export const selectActiveTab = (state: RootState) => state.analysisPanel.activeTab;
export default analysisPanelSlice.reducer;
