import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import store, { AppDispatch, AppThunk } from "..";
import {
  GetDadosDto,
  GetOperacaoDtoListServiceResponse,
  TipoOperacao,
} from "../../services/api";
import { api } from "../../services/ApiManager";

const dashboardStore = createSlice({
  name: "dashboardStore",
  initialState: {
    numeroRecebimentos: 0 as number | undefined,
    totalRecebimentos: 0 as number | undefined,
    recebimentosList: {} as GetOperacaoDtoListServiceResponse,
    numeroGastos: 0 as number | undefined,
    totalGastos: 0 as number | undefined,
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
    setTotalRecebimentos(state, action: PayloadAction<number>) {
      state.totalRecebimentos = action.payload;
    },
    setTotalGastos(state, action: PayloadAction<number>) {
      state.totalGastos = action.payload;
    },
    setNumeroRecebimentos(state, action: PayloadAction<number>) {
      state.numeroRecebimentos = action.payload;
    },
    setNumeroGastos(state, action: PayloadAction<number>) {
      state.numeroGastos = action.payload;
    },
    setDashboardDateFilter(state, action: PayloadAction<Date>) {
      state.filters.dateFilter = action.payload;
    },
    clear(state) {
      state.totalRecebimentos =
        dashboardStore.getInitialState().totalRecebimentos;
      state.recebimentosList =
        dashboardStore.getInitialState().recebimentosList;
      state.totalGastos = dashboardStore.getInitialState().totalGastos;
      state.gastosList = dashboardStore.getInitialState().gastosList;
    },
  },
});

export const {
  setTotalGastos,
  setTotalRecebimentos,
  setNumeroRecebimentos,
  setNumeroGastos,
  setRecebimentosList,
  setGastosList,
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

        dispatch(setTotalGastos(gastosValue!));
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

        dispatch(setTotalRecebimentos(recebimentosValue!));
      });

    return result;
  };
}

export function GetDadosByMonth(month: number, year: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api
      .get(`/api/Operacao/Get/dados/${month}/${year}`)
      .then((result) => {
        dispatch(setNumeroRecebimentos(result.data.data.entradas!));
        dispatch(setNumeroGastos(result.data.data.saidas!));
      });

    return result;
  };
}
