import { IconifyIcon, Icon } from "@iconify/react";
import { Check, Close, Info, Warning } from "@mui/icons-material";
import { alpha, Box, GlobalStyles, useTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import checkmarkCircle2Fill from "@iconify/icons-eva/checkmark-circle-2-fill";
import infoFill from "@iconify/icons-eva/info-fill";
import alertCircleFill from "@iconify/icons-eva/alert-circle-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import React from "react";
import { ColorSchema } from "../themes";
// import {IconifyIcon} from "@ic"

function SnackbarStyles() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <GlobalStyles
      styles={{
        "#root": {
          "& .SnackbarContent-root": {
            width: "100%",
            padding: theme.spacing(1.5),
            margin: theme.spacing(0.25, 0),
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 900 : 0],
            "&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo":
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            "& .SnackbarItem-message": {
              padding: "0 !important",
              fontWeight: theme.typography.fontWeightMedium,
            },
            "& .SnackbarItem-action": {
              marginRight: 0,
              color: theme.palette.action.active,
              "& svg": { width: 20, height: 20 },
            },
          },
        },
      }}
    />
  );
}

type SnackbarIconProps = {
  icon: IconifyIcon;
  color: ColorSchema;
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        w: 40,
        h: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: `${color}.main`,
        background: (theme) => alpha("#008148", 0.16),
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Box>
  );
}

export default function NotistackProvider({ children }) {
  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        dense
        maxSnack={5}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
          error: <SnackbarIcon icon={infoFill} color="error" />,
          warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
          info: <SnackbarIcon icon={alertCircleFill} color="info" />,
        }}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}
