import { SemanticTokens } from "@pandacss/dev";

export const colors: SemanticTokens["colors"] = {
  surface: {
    s0: { value: { base: "#F1F1F1", _dark: "#0D1625" } },
    s1: { value: { base: "#F6F8FA", _dark: "#1B2433" } },
    s2: { value: { base: "#EBEBEB", _dark: "#1B2433" } }, // nav
  },
  navigation: {
    primary: { value: { base: "#EBEBEB ", _dark: "#0D1625" } },
    secondary: { value: { base: "#F6F8FA", _dark: "#0D1625" } },
    border: { value: { base: "transparent", _dark: "#27303F" } },
  },
  effects: {
    border: { value: { base: "#D1D1D1", _dark: "#27303F" } },
  },
  typography: {
    text: { value: { base: "#232225", _dark: "#F4F4F4" } },
    textInvert: { value: { base: "#F4F4F4", _dark: "#232225" } },
    textHover: { value: { base: "#F4F4F4", _dark: "#232225" } },
    secondaryText: { value: { base: "#8C8B8E", _dark: "#8C8B8E" } },
    link: { value: { base: "#8C8B8E", _dark: "#8C8B8E" } },
    linkActive: { value: { base: "#535257", _dark: "#F4F4F4" } },
  },
  actions: {
    green: { value: { base: "#E7F6F2", _dark: "#0AA480" } },
    greenLight: { value: { base: "#0AA480", _dark: "#E7F6F2" } },
    red: { value: { base: "#FBE9E9", _dark: "#D82222" } },
    redLight: { value: { base: "#D82222", _dark: "#FBE9E9" } },
    borderPositive: { value: { base: "#0AA480", _dark: "#0AA480" } },
    borderNegative: { value: { base: "#D82222", _dark: "#D82222" } },
  },
  search: {
    text: { value: { base: "#535257", _dark: "#F4F4F4" } },
    hoverText: { value: { base: "#F4F4F4", _dark: "#232225" } },
    bg: { value: { base: "#FDFDFD", _dark: "#1B2433" } },
    hoverBg: { value: { base: "#1B2433", _dark: "#FDFDFD" } },
    border: { value: { base: "#D1D1D1", _dark: "#1B2433" } },
  },
  navigationBtns: {
    bg: { value: { base: "#FDFDFD", _dark: "#0D1625" } },
    bgHover: { value: { base: "#232225", _dark: "#F4F4F4" } },
    border: { value: { base: "#D1D1D1", _dark: "#27303F" } },
  },
  navigationLinks: {
    bg: { value: { base: "transparent", _dark: "transparent" } },
    bgActive: { value: { base: "#FDFDFD", _dark: "#27303F" } },
    bgHover: { value: { base: "#FDFDFD", _dark: "#F4F4F4" } },
    border: { value: { base: "#D1D1D1", _dark: "#27303F" } },
  },
  input: {
    bg: {
      form: { value: { base: "#FDFDFD", _dark: "#27303F" } },
    },
    border: {
      form: { value: { base: "#D1D1D1", _dark: "#27303F" } },
    },
    focus: {
      border: {
        value: { base: "#232225", _dark: "#27303F" },
      },
    },
    hover: {
      border: {
        value: { base: "#232225", _dark: "#FDFDFD" },
      },
    },
  },
  buttons: {
    bg: {
      normal: {
        value: { base: "#F4F4F4", _dark: "#0D1625" },
      },
      form: {
        value: { base: "#2E2D30", _dark: "#F4F4F4" },
      },
    },
    bgHover: {
      normal: {
        value: { base: "#2E2D30", _dark: "#F4F4F4" },
      },
      form: {
        value: { base: "#F4F4F4", _dark: "#0D1625" },
      },
    },
    bgDisabled: {
      normal: {
        value: {
          base: "rgba(140, 139, 142, 0.55)",
          _dark: "rgba(140, 139, 142, 0.55)",
        },
      },
      form: {
        value: {
          base: "rgba(140, 139, 142, 0.55)",
          _dark: "rgba(140, 139, 142, 0.55)",
        },
      },
    },
    text: {
      normal: {
        value: { base: "#0D1625", _dark: "#F4F4F4" },
      },
      form: {
        value: { base: "#F4F4F4", _dark: "#0D1625" },
      },
    },
    textHover: {
      normal: {
        value: { base: "#F4F4F4", _dark: "#0D1625" },
      },
      form: {
        value: { base: "#0D1625", _dark: "#F4F4F4" },
      },
    },
  },
  table: {
    header: { value: { base: "#F1F1F1", _dark: "#1B2433" } },
    scrollBar: { value: { base: "#D1D1D1", _dark: "#0D1625" } },
    scrollBarSecond: { value: { base: "#D1D1D1", _dark: "#27303F" } },
  },
  breadCrumbs: {
    active: { value: { base: "", _dark: "#CAC9CB" } },
    inActive: { value: { base: "", _dark: "#8C8B8E" } },
  },
  /* */
  neutrals: {
    white200: { value: { base: "#F4F4F4", _dark: "#F4F4F4" } },
    white600: { value: { base: "#D1D1D1", _dark: "#D1D1D1" } },
    black700: { value: { base: "#3B3A3E", _dark: "#3B3A3E" } },
    black800: { value: { base: "#2E2D30", _dark: "#2E2D30" } },
    gray300: { value: { base: "#8C8B8E", _dark: "#8C8B8E" } },
    gray500: { value: { base: "#535257", _dark: "#535257" } },
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
