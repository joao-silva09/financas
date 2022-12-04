import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "..";
import {
  AddObjetivoDto,
  GetObjetivoDtoListServiceResponse,
  GetObjetivoDtoServiceResponse,
  UpdateObjetivoDto,
} from "../../services/api";
import { api } from "../../services/ApiManager";
import { displayMessage } from "../Application.store";

const ObjetivoStore = createSlice({
  name: "objetivoStore",
  initialState: {
    objetivo: {} as GetObjetivoDtoServiceResponse,
    objetivos: {} as GetObjetivoDtoListServiceResponse,
    objetivosACumprir: {} as GetObjetivoDtoListServiceResponse,
    objetivosCumpridos: {} as GetObjetivoDtoListServiceResponse,
  },
  reducers: {
    setObjetivo(state, action: PayloadAction<GetObjetivoDtoServiceResponse>) {
      state.objetivo = action.payload;
    },
    setObjetivos(
      state,
      action: PayloadAction<GetObjetivoDtoListServiceResponse>
    ) {
      state.objetivos.data = action.payload.data;
    },
    setObjetivosACumprir(
      state,
      action: PayloadAction<GetObjetivoDtoListServiceResponse>
    ) {
      state.objetivosACumprir.data = action.payload.data;
    },
    setObjetivosCumpridos(
      state,
      action: PayloadAction<GetObjetivoDtoListServiceResponse>
    ) {
      state.objetivosCumpridos.data = action.payload.data;
    },
  },
});

export const {
  setObjetivos,
  setObjetivo,
  setObjetivosACumprir,
  setObjetivosCumpridos,
} = ObjetivoStore.actions;
export default ObjetivoStore.reducer;

export function GetObjetivosACumprir(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Objetivo/Get/aCumprir");
      console.log(result);
      dispatch(setObjetivosACumprir(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter os objetivos a cumprir!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetObjetivosCumpridos(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Objetivo/GetAll/cumpridos");
      console.log(result);
      dispatch(setObjetivosCumpridos(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter os objetivos cumpridos!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetObjetivos(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Objetivo/GetAll");
      console.log(result);
      dispatch(GetObjetivosACumprir());
      dispatch(GetObjetivosCumpridos());
      dispatch(setObjetivos(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter os objetivos!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetObjetivoById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get(`/api/Objetivo/${id}`);
      console.log(result.data.data);
      dispatch(setObjetivo(result.data.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter o objetivo!`,
          severity: "error",
        })
      );
    }
  };
}

export function PostObjetivo(body: AddObjetivoDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post(`/api/Objetivo`, body);
      dispatch(GetObjetivosACumprir());
      console.log(result);
      dispatch(
        displayMessage({
          message: `Objetivo adicionado com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao adiconar o objetivo!`,
          severity: "error",
        })
      );
    }
  };
}

export function PutObjetivo(body: UpdateObjetivoDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.put(`/api/Objetivo`, body);
      dispatch(GetObjetivosACumprir());
      console.log(result);
      dispatch(
        displayMessage({
          message: `Objetivo editado com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao editar o objetivo!`,
          severity: "error",
        })
      );
    }
  };
}

export function DeleteObjetivo(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.delete(`/api/Objetivo/${id}`);
      dispatch(GetObjetivos());
      dispatch(setObjetivos(result.data));
      console.log(result);
      dispatch(
        displayMessage({
          message: `Objetivo excluído com sucesso!`,
          severity: "error",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao excluir o objetivo!`,
          severity: "error",
        })
      );
    }
  };
}

export function CumprirObjetivo(id: number, contaId: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post(`/api/Objetivo/${id}/${contaId}`);
      dispatch(GetObjetivos());
      console.log(result);

      dispatch(
        displayMessage({
          message: `Objetivo cumprido! Parabéns!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao registrar o cumprimento do objetivo!`,
          severity: "error",
        })
      );
    }
  };
}
