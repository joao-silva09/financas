import {
  DarkModeOutlined,
  LightModeOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, styled, useTheme } from "@mui/material";
import React, { useContext } from "react";
import ThemeIconMode from "../components/ThemeIconMode";
import { ColorModeContext, themeTokens } from "../themes";

export default function Header() {
  const HeaderStyle = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
  }));

  const theme = useTheme();
  const colors = themeTokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <HeaderStyle>
      <Box display="flex">
        <ThemeIconMode />
        <IconButton>
          <PersonOutlined />
        </IconButton>
      </Box>
    </HeaderStyle>
  );
}
