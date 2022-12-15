import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import store, { AppDispatch, AppThunk } from "..";
import {
  GetOperacaoDtoListServiceResponse,
  TipoOperacao,
} from "../../services/api";
import { api } from "../../services/ApiManager";

const dashboardStore = createSlice({
  name: "dashboardStore",
  initialState: {
    recebimentos: 0 as number | undefined,
    recebimentosList: {} as GetOperacaoDtoListServiceResponse,
    gastos: 0 as number | undefined,
    gastosList: {} as GetOperacaoDtoListServiceResponse,
    filters: {
      dateFilter: new Date(),
      typeFilter: {
        gastos: true,
        recebimentos: true,
      },
    },
  },
  reducers: {
    setRecebimentosList(
      state,
      action: PayloadAction<GetOperacaoDtoListServiceResponse>
    ) {
      state.recebimentosList = action.payload;
    },
    setGastosList(
      state,
      action: PayloadAction<GetOperacaoDtoListServiceResponse>
    ) {
      state.gastosList = action.payload;
    },
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
      state.recebimentosList =
        dashboardStore.getInitialState().recebimentosList;
      state.gastos = dashboardStore.getInitialState().gastos;
      state.gastosList = dashboardStore.getInitialState().gastosList;
    },
  },
});

export const {
  setRecebimentos,
  setRecebimentosList,
  setGastosList,
  setGastos,
  setDashboardDateFilter,
  clear,
} = dashboardStore.actions;
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

export function GetGastosByMonth(month: number, year: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    // dispatch(clearDashboard());
    const result = await api
      .get(`/api/Operacao/Get/gastos/${month}/${year}`)
      .then((result: AxiosResponse<GetOperacaoDtoListServiceResponse>) => {
        dispatch(setGastosList(result.data));
        const gastosValue = store
          .getState()
          .dashboardStore.gastosList.data!.map((prod) =>
            prod.tipoOperacao === TipoOperacao.Gasto ? prod.valor : 0
          )
          .reduce((total, valor) => total! + valor!);

        dispatch(setGastos(gastosValue!));
      });

    return result;
  };
}

export function GetRecebimentosByMonth(
  month: number,
  year: number
): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    // dispatch(clearDashboard());
    const result = await api
      .get(`/api/Operacao/Get/recebimentos/${month}/${year}`)
      .then((result: AxiosResponse<GetOperacaoDtoListServiceResponse>) => {
        dispatch(setRecebimentosList(result.data));
        const recebimentosValue = store
          .getState()
          .dashboardStore.recebimentosList.data!.map((prod) =>
            prod.tipoOperacao === TipoOperacao.Recebimento ? prod.valor : 0
          )
          .reduce((total, valor) => total! + valor!);

        dispatch(setRecebimentos(recebimentosValue!));
      });

    return result;
  };
}
