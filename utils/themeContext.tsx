"use client";
import { createContext, useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Theme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { TokenColors, childrenProps } from "@/types";

import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { tokens } from "@/utils/tokens";
const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: childrenProps) => {
  const colors = tokens();
  const themeConfig = () => {
    return {
      palette: {
        primary: {
          main: colors.surface,
          card: colors.card,
        },
        input: {
          main: colors.text,
        },
        secondary: {
          main: colors.indigo[500],
        },
        neutral: {
          main: colors.active,
        },
        info: {
          main: colors.active,
        },

        background: {
          default: colors.background,
          paper: colors.surface,
          border: colors.active,
        },
        text: {
          primary: colors.text,
          secondary: colors.textSecondary,
        },
      },

      typography: {
        fontSize: 14,
        color: colors.white,
      },
    };
  };
  const theme = createTheme({
    ...themeConfig(),
    typography: {
      h6: {
        fontWeight: 600,
        fontSize: 14,
      },
      h5: {
        fontWeight: 700,
        fontSize: 16,
      },
      h4: {
        fontWeight: 700,
        fontSize: 18,
      },
      h3: {
        fontWeight: 600,
        fontSize: 21,
      },
      body2: {
        fontWeight: 400,
        fontSize: 14,
      },
      body1: {},
    },

    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
            "&.MuiMenuItem-root": {
              backgroundColor: colors.card + " !important",
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            color: colors.white,
            textTransform: "none",

            // backgroundColor: colors.surface,
            // "&:hover":{
            //   backgroundColor: colors.surface,
            // }
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: colors.text,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            // border: "2px solid " + colors.active,
            fontSize: "1rem",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: "100%",
            gap: ".7rem",
            display: "flex",
            flexDirection: "column",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: colors.active,
              },
              "&:hover fieldset": {
                borderColor: colors.active,
                borderWidth: 2,
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: colors.active,
                //hover border color{}
              },
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            color: colors.text,
            borderColor: colors.active,
            "& fieldset": {
              borderColor: colors.active,
              color: colors.text,
            },
            "& .MuiSvgIcon-root": {
              color: colors.text,
            },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            "& .MuiSelect-select": {},
            "& fieldset": {
              borderColor: colors.active,
              "& legend": {
                color: colors.text,
              },
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: colors.textSecondary,
            "&.Mui-focused": {
              color: colors.textSecondary,
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: colors.text,

            textTransform: "none",
            "&:hover": {
              color: colors.text,
            },
            "&.Mui-selected": {
              color: colors.green[500],
            },
            "&.MuiSvgIcon-root": {
              bgcolor: colors.red[500] + " !important",
            },
          },
        },
      },
      MuiRating: {
        styleOverrides: {
          root: {
            "& .MuiRating-iconFilled": {
              color: colors.indigo[500] + " !important",
              "& .MuiSvgIcon-root": {
                color: "#FAAF00 !important",
              },
            },
          },
        },
      },
    },
  });
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeContext.Provider
        value={{
          colors: tokens(),
        }}
      >
        <Theme theme={theme}>
          <CssBaseline />
          {children}
        </Theme>
      </ThemeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
};
interface ThemeProps {
  colors: TokenColors;
}
export const useGlobalTheme = (): ThemeProps =>
  useContext(ThemeContext) as ThemeProps;
