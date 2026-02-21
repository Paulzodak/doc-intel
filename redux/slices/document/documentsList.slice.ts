import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Document } from "@/types/document";
import type { RootState } from "@/redux/store";

export interface IDocumentsListState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IDocumentsListState = {
  documents: [],
  isLoading: false,
  error: null,
};

const documentsListSlice = createSlice({
  name: "documentsList",
  initialState,
  reducers: {
    setDocuments(state, action: PayloadAction<Document[]>) {
      state.documents = action.payload;
      state.error = null;
    },
    setDocumentsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setDocumentsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    removeDocument(state, action: PayloadAction<string>) {
      state.documents = state.documents.filter((d) => d.id !== action.payload);
    },
    clearDocuments(state) {
      state.documents = [];
      state.error = null;
    },
  },
});

export const {
  setDocuments,
  setDocumentsLoading,
  setDocumentsError,
  removeDocument,
  clearDocuments,
} = documentsListSlice.actions;

export const selectDocuments = (state: RootState) => state.documentsList.documents;
export const selectDocumentsLoading = (state: RootState) => state.documentsList.isLoading;
export const selectDocumentsError = (state: RootState) => state.documentsList.error;

export default documentsListSlice.reducer;
