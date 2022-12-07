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
import { displayMessage } from "../Application.store";

const operacaoStore = createSlice({
  name: "operacaoStore",
  initialState: {
    operacao: {} as GetOperacaoDtoServiceResponse,
    operacoes: {} as GetOperacaoDtoListServiceResponse,
    filters: {
      dateFilter: new Date(),
      typeFilter: {
        gastos: true,
        recebimentos: true,
      },
    },
  },
  reducers: {
    setOperacao(state, action: PayloadAction<GetOperacaoDtoServiceResponse>) {
      state.operacao = action.payload;
    },
    setOperacoes(
      state,
      action: PayloadAction<GetOperacaoDtoListServiceResponse>
    ) {
      state.operacoes.data = action.payload.data;
    },
    setDateFilter(state, action: PayloadAction<Date>) {
      state.filters.dateFilter = action.payload;
    },
    setTypeFilterGastos(state, action: PayloadAction<boolean>) {
      state.filters.typeFilter.gastos = action.payload;
    },
    setTypeFilterRecebimentos(state, action: PayloadAction<boolean>) {
      state.filters.typeFilter.recebimentos = action.payload;
    },
  },
});

export const {
  setOperacoes,
  setTypeFilterGastos,
  setTypeFilterRecebimentos,
  setOperacao,
  setDateFilter,
} = operacaoStore.actions;
export default operacaoStore.reducer;

export function setStateDateFilter(date: Date): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(setDateFilter(date));
  };
}

export function setStateTypeFilterGastos(type: boolean): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(setTypeFilterGastos(type));
  };
}

export function setStateTypeFilterRecebimentos(type: boolean): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(setTypeFilterRecebimentos(type));
  };
}

export function GetOperacoes(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Operacao/GetAll");
      console.log(result);
      dispatch(setOperacoes(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as operações!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetOperacoesByMonth(
  month: number | any,
  year: number | any
): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get(`/api/Operacao/Get/${month}/${year}`);
      console.log(result);
      dispatch(setOperacoes(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as operações!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetOperacoesByMonthAndType(
  month: number | any,
  year: number | any
): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      let type;
      const tipo = store.getState().operacoesStore.filters.typeFilter;
      if (tipo.gastos && tipo.recebimentos) {
        const result = await api.get(`/api/Operacao/Get/${month}/${year}`);
        console.log(result);
        dispatch(setOperacoes(result.data));
        return result;
      } else if (!tipo.gastos && tipo.recebimentos) {
        type = TipoOperacao.Recebimento;
        const result = await api.get(
          `/api/Operacao/Get/${month}/${year}/${type}`
        );
        console.log(result);
        dispatch(setOperacoes(result.data));
        return result;
      } else if (tipo.gastos && !tipo.recebimentos) {
        type = TipoOperacao.Gasto;
        const result = await api.get(
          `/api/Operacao/Get/${month}/${year}/${type}`
        );
        console.log(result);
        dispatch(setOperacoes(result.data));
        return result;
      }
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as operações!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetOperacaoById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {

    try {
      const result = await api.get(`/api/Operacao/${id}`);
      console.log(result.data.data);
      dispatch(setOperacao(result.data.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter a operação!`,
          severity: "error",
        })
      );
    }
  };
}

export function PostOperacao(
  body: AddOperacaoDto,
  contaId: number
): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post(`/api/Operacao/${contaId}`, body);
      dispatch(
        GetOperacoesByMonthAndType(
          store.getState().operacoesStore.filters.dateFilter.getMonth() + 1,
          store.getState().operacoesStore.filters.dateFilter.getFullYear()
        )
      );
      dispatch(
        displayMessage({
          message: `Operação adicionada com sucesso!`,
          severity: "success",
        })
      );
      return result
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao adicionar a operação!`,
          severity: "error",
        })
      );
    }
  };
}

export function PutOperacao(body: UpdateOperacaoDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {

    try {
      const result = await api.put(`/api/Operacao`, body);
      dispatch(
        GetOperacoesByMonthAndType(
          store.getState().operacoesStore.filters.dateFilter.getMonth() + 1,
          store.getState().operacoesStore.filters.dateFilter.getFullYear()
        )
      );
      dispatch(
        displayMessage({
          message: `Operação editada com sucesso!`,
          severity: "success",
        })
      );
      return result
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao editar a operação!`,
          severity: "error",
        })
      );
    }
  };
}

export function DeleteOperacao(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {

    try {
      const result = await api.delete(`/api/Operacao/${id}`);
      dispatch(
        GetOperacoesByMonthAndType(
          store.getState().operacoesStore.filters.dateFilter.getMonth() + 1,
          store.getState().operacoesStore.filters.dateFilter.getFullYear()
        )
      );
      dispatch(
        displayMessage({
          message: `Operação excluída com sucesso!`,
          severity: "success",
        })
      );
      return result
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao excluir a operação!`,
          severity: "error",
        })
      );
    }
  };
}
