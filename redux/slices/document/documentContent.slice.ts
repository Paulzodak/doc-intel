import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Highlight } from "@/types/analysis";

export interface IDocumentContentState {
  selectedHighlight: Highlight | null;
}

const initialState: IDocumentContentState = {
  selectedHighlight: null,
};

const documentContentSlice = createSlice({
  name: "documentContent",
  initialState,
  reducers: {
    setSelectedHighlight: (state, action: PayloadAction<Highlight | null>) => {
      state.selectedHighlight = action.payload;
    },
    clearSelectedHighlight: (state) => {
      state.selectedHighlight = null;
    },
  },
});

export const { setSelectedHighlight, clearSelectedHighlight } = documentContentSlice.actions;
export const selectSelectedHighlight = (state: RootState) =>
  state.documentContent.selectedHighlight;
export default documentContentSlice.reducer;
