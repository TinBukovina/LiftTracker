import { css } from "../../../../styled-system/css";

export default function TableHeader() {
  return (
    <div
      className={css({
        position: "sticky",
        top: "0",

        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr 1fr",
        alignItems: "center",
        gap: "1rem",

        padding: "1rem 2rem",

        backgroundColor: "surface.s1",
        borderBottom: "2px solid token(colors.neutrals.white200)",

        fontSize: "h6",
        fontWeight: "semibold",
        color: "neutrals.white200",
      })}
    >
      <span>Name</span>
      <span>Created at</span>
      <span>Status</span>
      <span></span>
    </div>
  );
}
