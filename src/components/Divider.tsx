import { ReactNode } from "react";

export default function Divider({
  value = "1rem",
}: {
  value: string;
}): ReactNode {
  return (
    <div
      style={{
        marginTop: value,
      }}
    ></div>
  );
}
