import { styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";

import ThemeBtn from "./ThemeBtn";
import { useLoggedUserInfo } from "../authentification/context/LoggedUserContext";
import { useWindowWidth } from "../../customHooks/useWindowWidth";
import Logo from "./Logo";
import NavigationBtn from "./NavigationBtn";
/* import Search from "./Search";
import AccountBtn from "./AccountBtn";
import IconTemplate from "./IconTemplate"; */

const HeaderDiv = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "1rem 2rem",
    width: "100%",
  },
});

const Actions = styled("div", {
  base: {
    display: "flex",
    gap: {
      base: "1rem",
      xs: "3rem",
    },
  },
});

export default function Header() {
  const { fullName } = useLoggedUserInfo();

  const windowWidth = useWindowWidth();

  return (
    <HeaderDiv>
      {windowWidth > 956 ? (
        <p
          className={css({
            fontSize: "h6",
          })}
        >
          Hi, {fullName.split(" ")[0]}!
        </p>
      ) : (
        <Logo border={false} />
      )}

      <Actions>
        {/* <Search /> */}
        <ThemeBtn />
        {/* <AccountBtn /> */}
        {windowWidth < 550 ? <NavigationBtn /> : ""}
      </Actions>
    </HeaderDiv>
  );
}
