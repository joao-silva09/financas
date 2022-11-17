import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { GetToken } from "../utils/GetToken";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

export default function AuthLayout() {

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
