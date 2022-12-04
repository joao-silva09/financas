import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { hideMessage } from "../store/Application.store";
import { GetToken } from "../utils/GetToken";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const state = useSelector((root: RootState) => root.application);

  if (state.message !== "") {
    dispatch(hideMessage());
    enqueueSnackbar(state.message, { variant: state.messageSeverity });
  }
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppSidebar />
      <main className="content">
        <Header />
        <Outlet />
      </main>
    </Box>
  );
}
