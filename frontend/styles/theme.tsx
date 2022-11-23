import { extendTheme } from "@chakra-ui/react";
import { backgroundColor, buttonColor, fontColor, panelColor } from "../config";

export const Button = {
  baseStyle: {
    color: "font",
    fontWeight: "normal",
    borderRadius: "50px",
  },
  defaultProps: {
    colorScheme: "teal",
  },
};

export const Heading = {
  baseStyle: {
    color: "font",
  },
};

export const Text = {
  baseStyle: {
    color: "font",
  },
};

export const Input = {
  baseStyle: {
    field: {
      borderColor: "font",
      bg: backgroundColor,
    },
  },
  variants: {
    outline: {
      field: {
        _hover: {
          borderColor: "button",
        },
      },
    },
  },

  defaultProps: {
    focusBorderColor: "button",
  },
};

export const Select = {
  baseStyle: {
    field: {
      color: fontColor,
      bg: backgroundColor,
      borderColor: "font",
      textAlign: "center",
    },
    bg: backgroundColor,
  },
  defaultProps: {
    focusBorderColor: "button",
  },
};
export const Textarea = {
  defaultProps: {
    borderColor: "font",
    focusBorderColor: "button",
  },
};

export const Link = {
  baseStyle: {
    _hover: {
      textDecoration: "none",
    },
  },
  variants: {
    navbar: {
      p: 2,
      _hover: {
        borderBottom: "3px solid",
        borderColor: "button",
      },
    },
  },
};

export const defaultTheme = extendTheme({
  colors: {
    bg: backgroundColor,
    panel: panelColor,
    button: buttonColor,
    font: fontColor,
    darkRed: "#E53E3E",
  },
  components: {
    Input,
    Select,
    Button,
    Textarea,
    Heading,
    Link,
    Text,
  },
  styles: {
    global: {
      body: {
        bg: backgroundColor,
      },
    },
  },
});
