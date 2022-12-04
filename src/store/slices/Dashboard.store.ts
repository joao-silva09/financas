import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { AppDispatch, AppThunk } from "..";
import {
  AddOperacaoDto,
  GetOperacaoDtoListServiceResponse,
  GetOperacaoDtoServiceResponse,
  TipoOperacao,
  UpdateOperacaoDto,
} from "../../services/api";
import { api } from "../../services/ApiManager";
import { GetOperacoesByMonth } from "./Operacao.store";

const dashboardStore = createSlice({
  name: "dashboardStore",
  initialState: {
    recebimentos: 0 as number | undefined,
    gastos: 0 as number | undefined,
    filters: {
      dateFilter: new Date(),
      typeFilter: {
        gastos: true,
        recebimentos: true,
      },
    },
  },
  reducers: {
    setRecebimentos(state, action: PayloadAction<number>) {
      state.recebimentos = action.payload;
    },
    setGastos(state, action: PayloadAction<number>) {
      state.gastos = action.payload;
    },
    setDashboardDateFilter(state, action: PayloadAction<Date>) {
      state.filters.dateFilter = action.payload;
    },
    clear(state) {
      state.recebimentos = dashboardStore.getInitialState().recebimentos;
      state.gastos = dashboardStore.getInitialState().gastos;
    },
  },
});

export const { setRecebimentos, setGastos, setDashboardDateFilter, clear } =
  dashboardStore.actions;
export default dashboardStore.reducer;

export function clearDashboard(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(clear());
  };
}

export function setStateDashboardDateFilter(date: Date): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(setDashboardDateFilter(date));
  };
}

export function GetRecebimentos(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(
      GetOperacoesByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    const result = store
      .getState()
      .operacoesStore.operacoes.data!.map((prod) =>
        prod.tipoOperacao === TipoOperacao.Recebimento ? prod.valor : 0
      )
      .reduce((total, valor) => total! + valor!);

    dispatch(setRecebimentos(result!));
    return result;
  };
}

export function GetGastos(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(
      GetOperacoesByMonth(
        store.getState().dashboardStore.filters.dateFilter.getMonth() + 1,
        store.getState().dashboardStore.filters.dateFilter.getFullYear()
      )
    );
    let result = store.getState().dashboardStore.gastos;
    result = store
      .getState()
      .operacoesStore.operacoes.data!.map((prod) =>
        prod.tipoOperacao === TipoOperacao.Gasto ? prod.valor : 0
      )
      .reduce((total, valor) => total! + valor!);

    dispatch(setGastos(result!));
    return result;
  };
}
