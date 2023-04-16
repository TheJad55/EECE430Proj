import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#f79f2a",
          200: "#f79f2a",
          300: "#f79f2a",
          400: "#f79f2a",
          500: "#f79f2a",
          600: "#f79f2a",
          700: "#f79f2a",
          800: "#f79f2a",
          900: "#f79f2a",
        },
        primary: {
            100: "#f79f2a",
            200: "#f79f2a",
            300: "#f79f2a",
            400: "#f79f2a",
            500: "#f79f2a",
            600: "#f79f2a",
            700: "#f79f2a",
            800: "#f79f2a",
            900: "#f79f2a",
        },
        greenAccent: {
            100: "#f79f2a",
            200: "#f79f2a",
            300: "#f79f2a",
            400: "#f79f2a",
            500: "#f79f2a",
            600: "#f79f2a",
            700: "#f79f2a",
            800: "#f79f2a",
            900: "#f79f2a",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
            100: "#f79f2a",
            200: "#f79f2a",
            300: "#f79f2a",
            400: "#f79f2a",
            500: "#f79f2a",
            600: "#f79f2a",
            700: "#f79f2a",
            800: "#f79f2a",
            900: "#f79f2a",
        },
      }
    : {
        grey: {
          100: "#f79f2a",
          200: "#f79f2a",
          300: "#f79f2a",
          400: "#f79f2a",
          500: "#f79f2a",
          600: "#f79f2a",
          700: "#f79f2a",
          800: "#f79f2a",
          900: "#f79f2a",
        },
        primary: {
          100: "grey-800",
          200: "grey-800",
          300: "grey-800",
          400: "#1F2937", // manually changed
          500: "#f79f2a",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#f79f2a",
          200: "#f79f2a",
          300: "#f79f2a",
          400: "#f79f2a",
          500: "#f79f2a",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#f79f2a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#f79f2a",
          200: "#f79f2a",
          300: "#f79f2a",
          400: "#f79f2a",
          500: "#f79f2a",
          600: "#f79f2a",
          700: "#f79f2a",
          800: "#f79f2a",
          900: "#f79f2a",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#f79f2a",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};