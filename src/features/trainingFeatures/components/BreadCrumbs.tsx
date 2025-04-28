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
            key={`${link}${index}`}
            className={css({
              color: "breadCrumbs.inActive",
            })}
          >
            {link} {"> "}
          </span>
        ) : (
          <span
            key={`${link}${index}`}
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
