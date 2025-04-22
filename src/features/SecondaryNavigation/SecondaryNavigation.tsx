import { styled } from "../../../styled-system/jsx";
import Header from "./Header";
import Logo from "./Logo";

const NavigationDiv = styled("div", {
  base: {
    display: "flex",

    height: "85px",

    borderBottom: "2px solid token(colors.effects.border)",
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
