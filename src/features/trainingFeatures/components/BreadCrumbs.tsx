import { useLocation, useNavigate, useParams } from "react-router-dom";
import { css } from "../../../../styled-system/css";

interface mapLinksToUrlInterface {
  [key: string]: string;
}

export default function BreadCrumbs() {
  const { id, trainingDayName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const breadCrumbsLinks = [];

  if (location.pathname.includes("trainingSplits")) {
    breadCrumbsLinks.push("Training split");
  }

  if (id) {
    breadCrumbsLinks.push("Training day");
  } else if (location.pathname.includes("create")) {
    breadCrumbsLinks.push("Create training split");
  }

  if (trainingDayName !== "" && trainingDayName) {
    if (location.pathname.includes("history")) {
      breadCrumbsLinks.push("History");
    } else {
      breadCrumbsLinks.push("Training");
    }
  }

  const mapLinksToUrl: mapLinksToUrlInterface = {
    "Training split": "/trainingSplits",
    "Training day": `/trainingSplits/${id}`,
  };

  return (
    <div>
      {breadCrumbsLinks.map((link, index) =>
        index !== breadCrumbsLinks.length - 1 ? (
          <span key={`${link}${index}container`}>
            <span
              key={`${link}${index}`}
              className={css({
                color: "breadCrumbs.inActive",
                cursor: "pointer",

                _hover: {
                  textDecoration: "underline",
                },
              })}
              onClick={() => {
                navigate(mapLinksToUrl[link]);
              }}
            >
              {link}
            </span>
            <span
              key={`${link}${index}-pointer`}
              className={css({
                color: "breadCrumbs.inActive",
                cursor: "pointer",
              })}
            >
              {" > "}
            </span>
          </span>
        ) : (
          <span
            key={`${link}${index}`}
            className={css({
              color: "breadCrumbs.active",
              cursor: "default",
            })}
          >
            {link}
          </span>
        )
      )}
    </div>
  );
}
