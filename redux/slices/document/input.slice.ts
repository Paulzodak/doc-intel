import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface IDocumentInputState {
  text: string;
  isLoading: boolean;
  error: string | null;
  language: string; // OCR language code (e.g., 'eng', 'fra', 'spa', etc.)
}

const initialState: IDocumentInputState = {
  text: "",
  isLoading: false,
  error: null,
  language: "eng", // Default to English
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
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLoading, setTextInput, clearTextInput, setError, clearError, setLanguage } =
  documentInputSlice.actions;
export const selectText = (state: RootState) => state.documentInput.text;
export const selectIsLoading = (state: RootState) => state.documentInput.isLoading;
export const selectError = (state: RootState) => state.documentInput.error;
export const selectLanguage = (state: RootState) => state.documentInput.language;
export default documentInputSlice.reducer;
