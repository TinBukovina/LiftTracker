import { css } from "../../../../styled-system/css";

interface BreadCrumbsProps {
  links: string[];
}

export default function BreadCrumbs({ links }: BreadCrumbsProps) {
  return (
    <div>
      {links.map((link, index) =>
        index !== links.length - 1 ? (
          <span
            className={css({
              color: "breadCrumbs.inActive",
            })}
          >
            {link} {"> "}
          </span>
        ) : (
          <span
            className={css({
              color: "breadCrumbs.active",
            })}
          >
            {link}
          </span>
        )
      )}
    </div>
  );
}
