import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "..";
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
  },
  reducers: {
    setConta(state, action: PayloadAction<GetContaDtoServiceResponse>) {
      state.conta = action.payload;
    },
    setContas(state, action: PayloadAction<GetContaDtoListServiceResponse>) {
      state.contas.data = action.payload.data;
    },
  },
});

export const { setContas, setConta } = contaStore.actions;
export default contaStore.reducer;

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
