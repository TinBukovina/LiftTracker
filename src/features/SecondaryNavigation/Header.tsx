import { styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import Search from "./Search";
import ThemeBtn from "./ThemeBtn";
import AccountBtn from "./AccountBtn";
import { useLoggedUserInfo } from "../authentification/context/LoggedUserContext";

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
    gap: "2rem",
  },
});

export default function Header() {
  const { fullName } = useLoggedUserInfo();

  return (
    <HeaderDiv>
      <p
        className={css({
          fontSize: "h6",
        })}
      >
        Hi, {fullName.split(" ")[0]}!
      </p>
      <Actions>
        <Search />
        <ThemeBtn />
        <AccountBtn />
      </Actions>
    </HeaderDiv>
  );
}
