import { styled } from "../../../styled-system/jsx";
import { useWindowWidth } from "../../customHooks/useWindowWidth";
import Header from "./Header";
import Logo from "./Logo";

const NavigationDiv = styled("div", {
  base: {
    display: "flex",

    height: "85px",

    backgroundColor: "navigation.secondary",
    borderBottom: "2px solid token(colors.effects.border)",

    color: "typography.text",

    zIndex: "10",
  },
});

export default function SecondaryNavigation() {
  const windowWidth = useWindowWidth();

  return (
    <NavigationDiv>
      {windowWidth > 956 ? <Logo border={true} /> : ""}

      <Header />
    </NavigationDiv>
  );
}
