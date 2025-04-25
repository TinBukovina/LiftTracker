import { css } from "../../../../styled-system/css";
import { uppercaseFirstLetter } from "../../../utils/helperFunction";

interface StatusCodeProps {
  type: "ongoing" | "finished";
}
export default function StatusCode({ type }: StatusCodeProps) {
  return (
    <div
      className={css({
        padding: "0.5rem 0.75rem",
        width: "fit-content",
        height: "fit-content",

        backgroundColor: type === "ongoing" ? "actions.green" : "actions.red",
        borderRadius: "sm",

        color: type === "ongoing" ? "actions.greenLight" : "actions.redLight",
      })}
    >
      {uppercaseFirstLetter(type)}
    </div>
  );
}
