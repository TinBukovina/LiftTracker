import { styled } from "../../../styled-system/jsx";
import Header from "./Header";
import Logo from "./Logo";

const NavigationDiv = styled("div", {
  base: {
    display: "flex",

    height: "85px",

    backgroundColor: "navigation.secondary",
    borderBottom: "2px solid token(colors.effects.border)",

    color: "typography.text",
  },
});

export default function SecondaryNavigation() {
  return (
    <NavigationDiv>
      <Logo border={true} />
      <Header />
    </NavigationDiv>
  );
}
