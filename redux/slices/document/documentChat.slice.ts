import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import type { DocumentChatMessage } from "@/types/document";

export interface IDocumentChatState {
  /** Chat messages per document jobId */
  messagesByJobId: Record<string, DocumentChatMessage[]>;
}

const initialState: IDocumentChatState = {
  messagesByJobId: {},
};

const documentChatSlice = createSlice({
  name: "documentChat",
  initialState,
  reducers: {
    setMessages(
      state,
      action: PayloadAction<{ jobId: string; messages: DocumentChatMessage[] }>,
    ) {
      const { jobId, messages } = action.payload;
      state.messagesByJobId[jobId] = messages;
    },
    appendMessage(
      state,
      action: PayloadAction<{ jobId: string; message: DocumentChatMessage }>,
    ) {
      const { jobId, message } = action.payload;
      if (!state.messagesByJobId[jobId]) {
        state.messagesByJobId[jobId] = [];
      }
      state.messagesByJobId[jobId].push(message);
    },
    clearMessages(state, action: PayloadAction<string>) {
      const jobId = action.payload;
      delete state.messagesByJobId[jobId];
    },
  },
});

export const { setMessages, appendMessage, clearMessages } = documentChatSlice.actions;

export const selectMessagesForJob = (state: RootState, jobId: string): DocumentChatMessage[] =>
  state.documentChat.messagesByJobId[jobId] ?? [];

export default documentChatSlice.reducer;
