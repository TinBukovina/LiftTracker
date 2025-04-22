import { styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import Search from "./Search";
import ThemeBtn from "./ThemeBtn";
import AccountBtn from "./AccountBtn";

const HeaderDiv = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",

    padding: "1rem 2rem",
  },
});

const Actions = styled("div", {
  base: {
    display: "flex",
    gap: "2rem",
  },
});

export default function Header() {
  return (
    <HeaderDiv>
      <p
        className={css({
          fontSize: "h6",
        })}
      >
        Hi, Name!
      </p>
      <Actions>
        <Search />
        <ThemeBtn />
        <AccountBtn />
      </Actions>
    </HeaderDiv>
  );
}
