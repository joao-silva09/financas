import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Severity = "success" | "warning" | "error" | "info";

const application = createSlice({
  name: "application",
  initialState: {
    redirectTo: "",
    message: "",
    messageSeverity: <
      "default" | "success" | "warning" | "error" | "info" | undefined
    >{},
    isUiBlocked: false,
  },
  reducers: {
    setRedirectTo: (state, action: PayloadAction<string>) => {
      state.redirectTo = action.payload;
    },
    cleanRedirectTo: (state) => {
      state.redirectTo = "";
    },
    blockUI: (state) => {
      state.isUiBlocked = true;
    },
    unblockUI: (state) => {
      state.isUiBlocked = false;
    },
    displayMessage: (state, action: PayloadAction<Message>) => {
      state.message = action.payload.message;
      state.messageSeverity = action.payload.severity;
    },
    hideMessage: (state) => {
      state.message = "";
      state.messageSeverity = "default";
    },
  },
});

export interface Message {
  message: string;
  severity: "success" | "warning" | "error" | "info" | undefined;
}

export const {
  setRedirectTo,
  cleanRedirectTo,
  blockUI,
  unblockUI,
  displayMessage,
  hideMessage,
} = application.actions;
export default application.reducer;