import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "..";
import {
  StringServiceResponse,
  UsuarioLoginDto,
  UsuarioRegisterDto,
} from "../../services/api";
import { api } from "../../services/ApiManager";
import { displayMessage } from "../Application.store";

export const authStore = createSlice({
  name: "auth",
  initialState: {
    register: {} as UsuarioRegisterDto,
    user: {} as UsuarioLoginDto,
    login: {} as StringServiceResponse,
    token: null,
  },
  reducers: {
    signIn: (state, action: PayloadAction<UsuarioRegisterDto>) => {
      state.register = action.payload;
    },
    setUser: (state, action: PayloadAction<UsuarioLoginDto>) => {
      state.user = action.payload;
    },
    setLogin: (state, action: PayloadAction<StringServiceResponse>) => {
      state.login = action.payload;
    },
    logOut: (state, action) => {
      state.user = authStore.getInitialState().user;
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    // logOut: (state, action) => {
    //   state.user = null;
    //   state.token = null;
    // },
  },
});

export const { setUser, signIn, setLogin } = authStore.actions;
export default authStore.reducer;

export function Login(body: UsuarioLoginDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post("Auth/login", body);
      console.log(result.data);
      // TODO: USAR setUser PARA MODIFICAR O USUÁRIO LOGADO E TER UM NOME NA TELA, MAS PARA ISSO PRECISA ADICIONAR O NOME DO USUARIO NA RESPOSTA DO BACKEND
      localStorage.setItem("accessToken", result.data.data);
      dispatch(
        displayMessage({
          message: `Seja bem vindo!`,
          severity: "success",
        })
      );
      return result.data;
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao efetuar o Login!`,
          severity: "error",
        })
      );
    }
  };
}

export function Register(body: UsuarioRegisterDto): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    try {
      const result = await api.post("Auth/register", body);
      console.log(result.data);
      // localStorage.setItem("accessToken", result.data.data);
      dispatch(
        displayMessage({
          message: `Usuário cadastrado! Seja bem vindo!`,
          severity: "success",
        })
      );
      return result.data;
    } catch (error) {
      dispatch(
        displayMessage({
          message: `Erro ao efetuar o cadastro!`,
          severity: "error",
        })
      );
    }
  };
}

export function Logout(): AppThunk | any {
  return async function (dispatch: AppDispatch | any) {
    localStorage.removeItem("accessToken");
  };
}
