import { ReactNode } from "react";
import { css } from "../../../styled-system/css";
import { useNavigate } from "react-router-dom";

interface NavLinkProps {
  children: ReactNode;
  to?: string;
  isActive?: boolean;
  handleClick?: () => void;
}

export default function NavLink({
  children,
  to,
  isActive = false,
  handleClick,
}: NavLinkProps) {
  const navigation = useNavigate();

  const activeLinkStyles = isActive
    ? {
        backgroundColor: "navigationLinks.bgActive",

        color: "typography.linkActive",
        fill: "typography.linkActive",
      }
    : {};

  const defaultHandleClick = () => {
    if (!to) return;

    navigation(to || "/");
  };
  return (
    <div
      onClick={handleClick || defaultHandleClick}
      className={css({
        display: "flex",
        gap: "0.5rem",

        padding: "0.5rem 0.75rem",

        borderRadius: "sm",

        color: "typography.link",
        cursor: "pointer",
        fill: "typography.link",

        _hover: {
          backgroundColor: "navigationLinks.bgActive",

          color: "typography.linkActive",
          fill: "typography.linkActive",
        },

        ...activeLinkStyles,
      })}
    >
      {children}
    </div>
  );
}
