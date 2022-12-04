import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import applicationReducer from "./Application.store";
import contaReducer from "./slices/Conta.store";
import dashboardReducer from "./slices/Dashboard.store";
import authReducer from "./slices/Auth.store";
import objetivoReducer from "./slices/Objetivo.store";
import operacoesReducer from "./slices/Operacao.store";
import dividasReducer from "./slices/Divida.store";

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    authStore: authReducer,
    dashboardStore: dashboardReducer,
    contaStore: contaReducer,
    objetivoStore: objetivoReducer,
    operacoesStore: operacoesReducer,
    dividasStore: dividasReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
