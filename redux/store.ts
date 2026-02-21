import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform, type PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

// slice imports
import documentInputSlice from "./slices/document/input.slice";
import type { IDocumentInputState } from "./slices/document/input.slice";
import analysisPanelSlice from "./slices/dashboard/analysispanel.slice";
import documentContentSlice from "./slices/document/documentContent.slice";
import userSlice from "./slices/user/user.slice";
import type { IUserState } from "./slices/user/user.slice";
import authSlice from "./slices/auth/auth.slice";
import documentsListSlice from "./slices/document/documentsList.slice";
import type { IDocumentsListState } from "./slices/document/documentsList.slice";

const rootReducer = combineReducers({
  documentInput: documentInputSlice,
  analysisPanel: analysisPanelSlice,
  documentContent: documentContentSlice,
  user: userSlice,
  auth: authSlice,
  documentsList: documentsListSlice,

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
      language: outboundState.language || "eng",
    };
  },
  { whitelist: ["documentInput"] },
);

// Transform to exclude loading state from user persistence
// Only persist user data, not isLoading or error
const userTransform = createTransform(
  // Transform state being persisted (outbound)
  (inboundState: IUserState) => {
    return {
      user: inboundState.user,
      // Explicitly exclude isLoading and error
    };
  },
  // Transform state being rehydrated (inbound)
  (outboundState: Partial<IUserState>) => {
    return {
      user: outboundState.user || null,
      isLoading: false, // Always start with loading false
      error: null, // Always start with no error
    };
  },
  { whitelist: ["user"] },
);

const documentsListTransform = createTransform(
  (inboundState: IDocumentsListState) => ({
    documents: inboundState.documents,
  }),
  (outboundState: Partial<IDocumentsListState>) => ({
    documents: outboundState.documents || [],
    isLoading: false,
    error: null,
  }),
  { whitelist: ["documentsList"] },
);

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  whitelist: [
    "documentInput", // ✅ Document input
    "analysisPanel", // ✅ Analysis panel
    "user", // ✅ User data
    "auth", // ✅ Guest ID for unauthenticated users
    "documentsList", // ✅ Cached document list
  ],
  transforms: [documentInputTransform, userTransform, documentsListTransform],
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
