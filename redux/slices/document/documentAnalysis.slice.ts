import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export interface IDocumentAnalysisState {
  isGradingExpanded: boolean;
  isKeyPointsExpanded: boolean;
  isSummaryExpanded: boolean;
  analysisPanelLocked: boolean;
}

const initialState: IDocumentAnalysisState = {
  isGradingExpanded: false,
  isKeyPointsExpanded: false,
  isSummaryExpanded: true,
  analysisPanelLocked: true,
};

const documentAnalysisSlice = createSlice({
  name: "documentAnalysis",
  initialState,
  reducers: {
    setGradingExpanded(state, action: PayloadAction<boolean>) {
      state.isGradingExpanded = action.payload;
    },
    setKeyPointsExpanded(state, action: PayloadAction<boolean>) {
      state.isKeyPointsExpanded = action.payload;
    },
    setSummaryExpanded(state, action: PayloadAction<boolean>) {
      state.isSummaryExpanded = action.payload;
    },
    setAnalysisPanelLocked(state, action: PayloadAction<boolean>) {
      state.analysisPanelLocked = action.payload;
    },
  },
});

export const {
  setGradingExpanded,
  setKeyPointsExpanded,
  setSummaryExpanded,
  setAnalysisPanelLocked,
} = documentAnalysisSlice.actions;

export const selectIsGradingExpanded = (state: RootState) =>
  state.documentAnalysis.isGradingExpanded;
export const selectIsKeyPointsExpanded = (state: RootState) =>
  state.documentAnalysis.isKeyPointsExpanded;
export const selectIsSummaryExpanded = (state: RootState) =>
  state.documentAnalysis.isSummaryExpanded;
export const selectAnalysisPanelLocked = (state: RootState) =>
  state.documentAnalysis.analysisPanelLocked;

export default documentAnalysisSlice.reducer;
