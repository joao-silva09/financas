import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch, AppThunk } from "..";
import {
  AddOperacaoDto,
  GetOperacaoDto,
  GetOperacaoDtoListServiceResponse,
  GetOperacaoDtoServiceResponse,
  UpdateOperacaoDto,
} from "../../services/api";
import ApiFactory from "../../services/ApiFactory";
import { api } from "../../services/ApiManager";
import { GetToken } from "../../utils/GetToken";
import { blockUI, displayMessage, unblockUI } from "../Application.store";

const operacaoStore = createSlice({
  name: "operacaoStore",
  initialState: {
    operacao: {} as GetOperacaoDtoServiceResponse,
    operacoes: {} as GetOperacaoDtoListServiceResponse,
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
  },
});

export const { setOperacoes, setOperacao } = operacaoStore.actions;
export default operacaoStore.reducer;

export function GetOperacoes(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get("/api/Operacao/GetAll");
    console.log(result);
    dispatch(setOperacoes(result.data));
  };
}

export function GetOperacaoById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get(`/api/Operacao/${id}`);
    console.log(result.data.data);
    dispatch(setOperacao(result.data.data));
  };
}

export function PostOperacao(
  body: AddOperacaoDto,
  contaId: number
): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.post(`/api/Operacao/${contaId}`, body);
    dispatch(GetOperacoes());
    console.log(result);
  };
}

export function PutOperacao(body: UpdateOperacaoDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.put(`/api/Operacao`, body);
    dispatch(GetOperacoes());
    console.log(result);
  };
}

export function DeleteOperacao(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.delete(`/api/Operacao/${id}`);
    dispatch(GetOperacoes());
    dispatch(setOperacoes(result.data));
    console.log(result);
  };
}
