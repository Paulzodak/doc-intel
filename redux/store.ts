import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform, type PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

// slice imports
import documentInputSlice from "./slices/document/input.slice";
import type { IDocumentInputState } from "./slices/document/input.slice";
import analysisPanelSlice from "./slices/dashboard/analysispanel.slice";
import documentContentSlice from "./slices/document/documentContent.slice";

const rootReducer = combineReducers({
  documentInput: documentInputSlice,
  analysisPanel: analysisPanelSlice,
  documentContent: documentContentSlice,

  // add more reducers here
});

// Transform to exclude loading state from persistence
// Only persist text and error, not isLoading
const documentInputTransform = createTransform(
  // Transform state being persisted (outbound)
  (inboundState: IDocumentInputState) => {
    return {
      text: inboundState.text,
      error: inboundState.error,
      // Explicitly exclude isLoading
    };
  },
  // Transform state being rehydrated (inbound)
  (outboundState: Partial<IDocumentInputState>) => {
    return {
      text: outboundState.text || "",
      error: outboundState.error || null,
      isLoading: false, // Always start with loading false
    };
  },
  { whitelist: ["documentInput"] }
);

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  whitelist: [
    "documentInput", // ✅ Document input
    "analysisPanel", // ✅ Analysis panel
  ],
  transforms: [documentInputTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

// Inferred types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
