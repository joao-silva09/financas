import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import Login from "../pages/Login";
import Header from "./Header";
import "../index.css";
import ThemeIconMode from "../components/ThemeIconMode";

export default function GuestLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
