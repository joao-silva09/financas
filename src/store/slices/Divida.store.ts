import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch, AppThunk } from "..";
import {
  AddContaDto,
  AddDividaDto,
  GetContaDtoServiceResponse,
  GetDividaDtoListServiceResponse,
  GetDividaDtoServiceResponse,
  UpdateContaDto,
  UpdateDividaDto,
} from "../../services/api";
import ApiFactory from "../../services/ApiFactory";
import { api } from "../../services/ApiManager";
import { GetToken } from "../../utils/GetToken";
import { blockUI, displayMessage, unblockUI } from "../Application.store";

const dividaStore = createSlice({
  name: "dividaStore",
  initialState: {
    divida: {} as GetDividaDtoServiceResponse,
    dividas: {} as GetDividaDtoListServiceResponse,
    dividasAPagar: {} as GetDividaDtoListServiceResponse,
    dividasAReceber: {} as GetDividaDtoListServiceResponse,
    dividasPagas: {} as GetDividaDtoListServiceResponse,
  },
  reducers: {
    setDivida(state, action: PayloadAction<GetDividaDtoServiceResponse>) {
      state.divida = action.payload;
    },
    setDividas(state, action: PayloadAction<GetDividaDtoListServiceResponse>) {
      state.dividas.data = action.payload.data;
    },
    setDividasAPagar(
      state,
      action: PayloadAction<GetDividaDtoListServiceResponse>
    ) {
      state.dividasAPagar.data = action.payload.data;
    },
    setDividasAReceber(
      state,
      action: PayloadAction<GetDividaDtoListServiceResponse>
    ) {
      state.dividasAReceber.data = action.payload.data;
    },
    setDividasPagas(
      state,
      action: PayloadAction<GetDividaDtoListServiceResponse>
    ) {
      state.dividasPagas.data = action.payload.data;
    },
  },
});

export const {
  setDividasAPagar,
  setDivida,
  setDividas,
  setDividasPagas,
  setDividasAReceber,
} = dividaStore.actions;
export default dividaStore.reducer;

export function GetDividasAll(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get("/api/Divida/GetAll");
    console.log(result);
    dispatch(setDividas(result.data));
  };
}

export function GetDividasAPagar(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get("/api/Divida/Get/APagar");
    console.log(result);
    dispatch(setDividasAPagar(result.data));
  };
}

export function GetDividasAReceber(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get("/api/Divida/Get/AReceber");
    console.log(result);
    dispatch(setDividasAReceber(result.data));
  };
}

export function GetDividasPagas(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get("/api/Divida/Get/pagas");
    console.log(result);
    dispatch(setDividasPagas(result.data));
  };
}

export function GetDividasAtivas(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    dispatch(GetDividasAPagar());
    dispatch(GetDividasAReceber());
  };
}

export function GetDividaById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.get(`/api/Divida/${id}`);
    console.log(result.data.data);
    dispatch(setDivida(result.data.data));
  };
}

export function PostDivida(body: AddDividaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.post(`/api/Divida`, body);
    dispatch(GetDividasAtivas());
    console.log(result);
  };
}

export function PagarDivida(id: number, contaId: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.post(`/api/Divida/${id}/${contaId}`);
    dispatch(GetDividasAtivas());
    console.log(result);
  };
}

export function PutDivida(body: UpdateDividaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.put(`/api/Divida`, body);
    dispatch(GetDividasAtivas());
    console.log(result);
  };
}

export function DeleteDivida(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    const result = await api.delete(`/api/Divida/${id}`);
    dispatch(GetDividasAtivas());
    dispatch(GetDividasPagas());
    dispatch(setDividas(result.data));
    console.log(result);
  };
}
