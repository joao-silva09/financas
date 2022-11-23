import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

// export const theme2 = createTheme({
//   palette: {
//     primary: {
//       main: "#00B37E",
//       light: "#00875F",
//       dark: "#015F43",
//     },
//     secondary: {
//       main: "#81D8F7",
//     },
//     // info: {
//     //     main: '#81D8F7'
//     // },
//     warning: {
//       main: "#FBA94C",
//     },
//     error: {
//       main: "#F75A68",
//     },
//     text: {
//       primary: "#C4C4CC",
//       secondary: "#8D8D99",
//     },
//     background: {
//       default: "#09090A",
//       paper: "#121214",
//     },
//   },
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: "h2",
//           h2: "h2",
//           h3: "h2",
//           h4: "h2",
//           h5: "h2",
//           h6: "h2",
//           subtitle1: "h2",
//           subtitle2: "h2",
//           body1: "span",
//           body2: "span",
//         },
//       },
//     },
//     MuiDivider: {
//       defaultProps: {
//         color: "#323238",
//       },
//     },
//   },
// });

export const themeTokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#002419",
          200: "#004832",
          300: "#006b4c",
          400: "#008f65",
          500: "#00b37e",
          600: "#33c298",
          700: "#66d1b2",
          800: "#99e1cb",
          900: "#ccf0e5",
        },
        black: {
          100: "#040404",
          200: "#070708",
          300: "#0b0b0c",
          400: "#0e0e10",
          500: "#121214",
          600: "#414143",
          700: "#717172",
          800: "#a0a0a1",
          900: "#d0d0d0",
        },
        red: {
          100: "#311215",
          200: "#63242a",
          300: "#94363e",
          400: "#c64853",
          500: "#FF3C38",
          600: "#f97b86",
          700: "#fa9ca4",
          800: "#fcbdc3",
          900: "#fddee1",
        },
        blue: {
          100: "#1a2b31",
          200: "#345663",
          300: "#4d8294",
          400: "#67adc6",
          500: "#81d8f7",
          600: "#9ae0f9",
          700: "#b3e8fa",
          800: "#cdeffc",
          900: "#e6f7fd",
        },
        background: {
          default: "#09090A",
          paper: {
            100: "#d2d2d2",
            200: "#a5a5a5",
            300: "#787878",
            400: "#4b4b4b",
            500: "#1e1e1e",
            600: "#181818",
            700: "#121212",
            800: "#0c0c0c",
            900: "#060606",
          },
        },
      }
    : {
        primary: {
          100: "#ccf0e5",
          200: "#99e1cb",
          300: "#66d1b2",
          400: "#33c298",
          500: "#00b37e",
          600: "#008f65",
          700: "#006b4c",
          800: "#004832",
          900: "#002419",
        },
        black: {
          100: "#d0d0d0",
          200: "#a0a0a1",
          300: "#717172",
          400: "#414143",
          500: "#121214",
          600: "#0e0e10",
          700: "#0b0b0c",
          800: "#070708",
          900: "#040404",
        },
        red: {
          100: "#fddee1",
          200: "#fcbdc3",
          300: "#fa9ca4",
          400: "#f97b86",
          500: "#FF3C38",
          600: "#c64853",
          700: "#94363e",
          800: "#63242a",
          900: "#311215",
        },
        blue: {
          100: "#e6f7fd",
          200: "#cdeffc",
          300: "#b3e8fa",
          400: "#9ae0f9",
          500: "#81d8f7",
          600: "#67adc6",
          700: "#4d8294",
          800: "#345663",
          900: "#1a2b31",
        },
        background: {
          default: "#09090A",
          paper: "#1E1E1E",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = themeTokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary![500],
            },
            secondary: { main: colors.blue![500] },
            neutral: {
              dark: colors.black![700],
              main: colors.black![500],
              light: colors.black![100],
            },
            background: { default: colors.background.default },
            success: {
              main: '#008148'
            }
          }
        : {
            primary: {
              main: colors.primary![500],
            },
            secondary: { main: colors.blue![500] },
            neutral: {
              dark: colors.black![700],
              main: colors.black![500],
              light: colors.black![100],
            },
            background: { default: "#FAFAFB" },
          }),
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev: string) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
