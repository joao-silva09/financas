import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "..";
import {
  AddDividaDto,
  GetDividaDtoListServiceResponse,
  GetDividaDtoServiceResponse,
  UpdateDividaDto,
} from "../../services/api";
import { api } from "../../services/ApiManager";
import { displayMessage } from "../Application.store";

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
    try {
      const result = await api.get("/api/Divida/GetAll");
      console.log(result);
      dispatch(setDividas(result.data));
      return result.data;
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as dívidas!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetDividasAPagar(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Divida/Get/APagar");
      console.log(result);
      dispatch(setDividasAPagar(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as dívidas a pagar!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetDividasAReceber(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Divida/Get/AReceber");
      console.log(result);
      dispatch(setDividasAReceber(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as dívidas a receber!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetDividasPagas(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get("/api/Divida/Get/pagas");
      console.log(result);
      dispatch(setDividasPagas(result.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as dívidas pagas!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetDividasAtivas(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      dispatch(GetDividasAPagar());
      dispatch(GetDividasAReceber());
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter as dívidas ativas!`,
          severity: "error",
        })
      );
    }
  };
}

export function GetDividaById(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.get(`/api/Divida/${id}`);
      console.log(result.data.data);
      dispatch(setDivida(result.data.data));
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao obter a dívida!`,
          severity: "error",
        })
      );
    }
  };
}

export function PostDivida(body: AddDividaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post(`/api/Divida`, body);
      dispatch(GetDividasAtivas());
      console.log(result);
      dispatch(
        displayMessage({
          message: `Dívida adicionada com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao adiconar a dívida!`,
          severity: "error",
        })
      );
    }
  };
}

export function PagarDivida(id: number, contaId: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post(`/api/Divida/${id}/${contaId}`);
      dispatch(GetDividasAtivas());
      console.log(result);
      dispatch(
        displayMessage({
          message: `Dívida paga com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao registrar o pagamento da dívida!`,
          severity: "error",
        })
      );
    }
  };
}

export function PutDivida(body: UpdateDividaDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.put(`/api/Divida`, body);
      dispatch(GetDividasAtivas());
      console.log(result);
      dispatch(
        displayMessage({
          message: `Dívida atualizada com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao atualizar a dívida!`,
          severity: "error",
        })
      );
    }
  };
}

export function DeleteDivida(id: number): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {

    try {
      const result = await api.delete(`/api/Divida/${id}`);
      dispatch(GetDividasAtivas());
      dispatch(GetDividasPagas());
      dispatch(setDividas(result.data));
      console.log(result);
      dispatch(
        displayMessage({
          message: `Dívida excluída com sucesso!`,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao excluir a dívida!`,
          severity: "error",
        })
      );
    }
  };
}
