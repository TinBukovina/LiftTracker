import { SemanticTokens } from "@pandacss/dev";

export const colors: SemanticTokens["colors"] = {
  surface: {
    s0: { value: { base: "#FDFDFD", _dark: "#0D1625" } },
    s1: { value: { base: "#F6F8FA", _dark: "#1B2433" } },
    s2: { value: { base: "#EBEBEB", _dark: "#1B2433" } }, // nav
  },
  effects: {
    border: { value: { base: "#D1D1D1", _dark: "#27303F" } },
    hoverDark: { value: { base: "#2E2D30", _dark: "#27303F" } },
    hoverLight: { value: { base: "#3B3A3E", _dark: "#27303F" } },
  },
  typography: {
    text: { value: { base: "#232225", _dark: "#F4F4F4" } },
    link: { value: { base: "#8C8B8E", _dark: "#8C8B8E" } },
    linkActive: { value: { base: "#535257", _dark: "#F4F4F4" } },
  },
  actions: {
    green: { value: { base: "#0AA480", _dark: "#0AA480" } },
    greenLight: { value: { base: "#E7F6F2", _dark: "#E7F6F2" } },
    red: { value: { base: "#D82222", _dark: "#D82222" } },
    redLight: { value: { base: "#FBE9E9", _dark: "#FBE9E9" } },
  },
  neutrals: {
    white200: { value: { base: "#F4F4F4", _dark: "#F4F4F4" } },
    white600: { value: { base: "#D1D1D1", _dark: "#D1D1D1" } },
    black700: { value: { base: "#3B3A3E", _dark: "#3B3A3E" } },
    black800: { value: { base: "#2E2D30", _dark: "#2E2D30" } },
    gray300: { value: { base: "#8C8B8E", _dark: "#8C8B8E" } },
    gray500: { value: { base: "#535257", _dark: "#535257" } },
  },
  search: {
    text: { value: { base: "#fff", _dark: "#F4F4F4" } },
    HoverText: { value: { base: "#fff", _dark: "#232225" } },
    bg: { value: { base: "#fff", _dark: "#1B2433" } },
    hoverBg: { value: { base: "#fff", _dark: "#FDFDFD" } },
  },
  navigationBtns: {
    bg: { value: { base: "#fff", _dark: "#0D1625" } },
    bgHover: { value: { base: "#fff", _dark: "#F4F4F4" } },
    border: { value: { base: "#fff", _dark: "#27303F" } },
  },
  buttons: {
    bg: {
      normal: {
        value: { base: "", _dark: "" },
      },
      form: {
        value: { base: "", _dark: "#F4F4F4" },
      },
    },
    bgHover: {
      normal: {
        value: { base: "", _dark: "" },
      },
      form: {
        value: { base: "", _dark: "#0D1625" },
      },
    },
    bgDisabled: {
      normal: {
        value: { base: "", _dark: "" },
      },
      form: {
        value: { base: "", _dark: "rgba(140, 139, 142, 0.55)" },
      },
    },
    text: {
      normal: {
        value: { base: "", _dark: "" },
      },
      form: {
        value: { base: "", _dark: "#0D1625" },
      },
    },
    textHover: {
      normal: {
        value: { base: "", _dark: "" },
      },
      form: {
        value: { base: "", _dark: "#F4F4F4" },
      },
    },
  },
};

// Light

// surface
// #FDFDFD - s0 (whtie50) / #F1F1F1 s0
// #F6F8FA - s1
// #EBEBEB - s3 (nav)

// Efect/border
// #D1D1D1 - white600 (border)
// #2E2D30 - black800 (hover)
// #3B3A3E - black700 (hover)

// typografy
// #232225 - text
// #8C8B8E - link (gray300)
// #535257 - linkActive (gray500)

// actions
// #0AA480 - green500
// #E7F6F2 - green50
// #D82222 - red500
// #FBE9E9 - red50

// colors
// #F4F4F4 - white200

// Dark

// surface
// #0D1625 s0
// #1B2433 s1

// efect/border
// #27303F border

// typografy
//  #F4F4F4 - text (white200)
// #8C8B8E - link (gray300)
// #535257 - linkActive (gray500)

// actions
// #0AA480 - green500
// #E7F6F2 - green50
// #D82222 - red500
// #FBE9E9 - red50

// colors
// #F4F4F4 - white200
