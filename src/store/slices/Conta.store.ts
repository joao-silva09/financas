import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { AppDispatch, AppThunk } from "..";
import {
  AddContaDto,
  GetContaDtoListServiceResponse,
  GetContaDtoServiceResponse,
  UpdateContaDto,
} from "../../services/api";
import { api } from "../../services/ApiManager";

const contaStore = createSlice({
  name: "contaStore",
  initialState: {
    conta: {} as GetContaDtoServiceResponse,
    contas: {} as GetContaDtoListServiceResponse,
    saldoTotal: 0 as number | undefined,
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
  },
});

export const { setContas, setSaldoTotal, setConta } = contaStore.actions;
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

export function GetContas(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get("/api/Conta/GetAll");
    console.log(result);
    dispatch(setContas(result.data));
  };
}

export function GetContaById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get(`/api/Conta/${id}`);
    console.log(result.data.data);
    dispatch(setConta(result.data.data));
  };
}

export function PostConta(body: AddContaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.post(`/api/Conta`, body);
    dispatch(GetContas());
    console.log(result);
  };
}

export function PutConta(body: UpdateContaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.put(`/api/Conta`, body);
    dispatch(GetContas());
    console.log(result);
  };
}

export function DeleteConta(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.delete(`/api/Conta/${id}`);
    dispatch(setContas(result.data));
    console.log(result);
  };
}
