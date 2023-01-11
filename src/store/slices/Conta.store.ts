import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { AppDispatch, AppThunk } from "..";
import {
  AddContaDto,
  GetContaDto,
  GetContaDtoListServiceResponse,
  GetContaDtoServiceResponse,
  UpdateContaDto,
} from "../../services/api";
import { api } from "../../services/ApiManager";
import { displayMessage } from "../Application.store";

const contaStore = createSlice({
  name: "contaStore",
  initialState: {
    conta: {} as GetContaDtoServiceResponse,
    contas: {} as GetContaDtoListServiceResponse,
    saldoTotal: 0 as number | undefined,
    saldoDaContaSelecionada: 0 as number | undefined,
  },
  reducers: {
    setConta(state, action: PayloadAction<GetContaDtoServiceResponse>) {
      state.conta = action.payload;
    },
    setContas(state, action: PayloadAction<GetContaDtoListServiceResponse>) {
      state.contas.data = action.payload.data;
    },
    setSaldoTotal(state, action: PayloadAction<number>) {
      state.saldoTotal = action.payload;
    },
    setSaldoDaContaSelecionada(state, action: PayloadAction<number>) {
      state.saldoDaContaSelecionada = action.payload;
    },
  },
});

export const {
  setContas,
  setSaldoTotal,
  setConta,
  setSaldoDaContaSelecionada,
} = contaStore.actions;
export default contaStore.reducer;

export function GetSaldoTotal(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    let result = store.getState().contaStore.saldoTotal;
    result = store
      .getState()
      .contaStore.contas.data!.map((prod) => prod.saldo)
      .reduce((total, saldo) => total! + saldo!);

    dispatch(setSaldoTotal(result!));
    return result;
  };
}

export function SetSaldoDaContaSelecionada(saldo: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(setSaldoDaContaSelecionada(saldo));
  };
}

export function GetContas(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Conta/GetAll");
      console.log(result);
      dispatch(setContas(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter Contas! ${error}`,
          severity: "error",
        })
      );
    }
  };
}

export function GetContaById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get(`/api/Conta/${id}`);
      console.log(result.data.data);
      dispatch(setConta(result.data.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter Conta! ${error}`,
          severity: "error",
        })
      );
    }
  };
}

export function PostConta(body: AddContaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post(`/api/Conta`, body);
      dispatch(GetContas());
      console.log(result);
      dispatch(setContas(result.data));
      dispatch(
        displayMessage({
          message: `Conta criada com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao criar conta!`,
          severity: "error",
        })
      );
    }
  };
}

export function PutConta(body: UpdateContaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.put(`/api/Conta`, body);
      dispatch(GetContas());
      console.log(result);
      dispatch(
        displayMessage({
          message: `Conta ${body.titulo} atualizada com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao atualizar conta!`,
          severity: "error",
        })
      );
    }
  };
}

export function DeleteConta(id: number, titulo?: string): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.delete(`/api/Conta/${id}`);
      dispatch(setContas(result.data));
      dispatch(
        displayMessage({
          message: `Conta ${titulo ?? ""} excluída com sucesso!`,
          severity: "success",
        })
      );
      console.log(result);
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao excluir a conta!`,
          severity: "error",
        })
      );
    }
  };
}
