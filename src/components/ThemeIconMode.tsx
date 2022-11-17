import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton, IconButtonProps, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext, themeTokens } from "../themes";

export default function ThemeIconMode({}: IconButtonProps) {
  const theme = useTheme();
  const colors = themeTokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <DarkModeOutlined />
      ) : (
        <LightModeOutlined />
      )}
    </IconButton>
  );
}
