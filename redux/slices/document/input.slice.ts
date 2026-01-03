import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface IDocumentInputState {
  text: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: IDocumentInputState = {
  text: "",
  isLoading: false,
  error: null,
};

const documentInputSlice = createSlice({
  name: "documentInput",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTextInput: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearTextInput: (state) => {
      state.text = "";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setTextInput, clearTextInput, setError, clearError } =
  documentInputSlice.actions;
export const selectText = (state: RootState) => state.documentInput.text;
export const selectIsLoading = (state: RootState) => state.documentInput.isLoading;
export const selectError = (state: RootState) => state.documentInput.error;
export default documentInputSlice.reducer;
