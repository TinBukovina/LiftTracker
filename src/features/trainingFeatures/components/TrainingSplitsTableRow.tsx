import React, { useState } from "react";
import { css } from "../../../../styled-system/css";

import { formatDate } from "../../../utils/helperFunction";
import { useUpdateTrainingSplit } from "../customHooks/useUpdateTrainingSplit";
import { TrainingSplitInterface } from "../types/trainingEntities";
import Button from "./Button";
import StatusCode from "./StatusCode";
import { useDeleteTrainingSplit } from "../customHooks/useDeleteTrainingSplits";
import { useWindowWidth } from "../../../customHooks/useWindowWidth";

export interface TrainingSplitTableRowProps {
  entity: TrainingSplitInterface;
  lastChild?: boolean;
  numOfRows?: number;
  onClick?: <T extends HTMLElement>(e: React.MouseEvent<T>) => void;
}

export default function TrainingSplitsTableRow({
  entity,
  lastChild = false,
  numOfRows = 3,
  onClick,
}: TrainingSplitTableRowProps) {
  const [displayAction, setDisplayAction] = useState<boolean>(false);
  const useUpdateTrainingSplitMutation = useUpdateTrainingSplit();
  const deleteTrainingSplit = useDeleteTrainingSplit();

  const windowWidth = useWindowWidth();

  return (
    <div>
      <div
        onClick={onClick}
        className={css({
          padding: "1rem 2rem",

          borderBottom: !lastChild
            ? "2px solid token(colors.effects.border)"
            : "",

          fontSize: "md",
          fontWeight: "normal",
          color: "typography.text",

          _hover: {
            backgroundColor: "surface.s0",
          },
        })}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numOfRows}, 2fr) 1fr`,
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>{entity.name}</span>

        {windowWidth > 768 ? (
          <span
            className={css({
              color: "typography.secondaryText",
            })}
          >
            {formatDate(entity.created_at || "")}
          </span>
        ) : (
          ""
        )}

        {windowWidth > 550 ? (
          entity.is_active ? (
            <StatusCode type="ongoing" />
          ) : (
            <StatusCode type="finished" />
          )
        ) : (
          ""
        )}

        {entity.is_active ? (
          <Button
            onClick={() => {
              setDisplayAction((prev) => !prev);
            }}
            disabled={useUpdateTrainingSplitMutation.isPending}
            center={true}
          >
            Manage
          </Button>
        ) : (
          <Button
            onClick={() => {
              useUpdateTrainingSplitMutation.mutate({
                trainingSplitId: entity.id || "",
                updateData: { is_active: true },
              });
            }}
            disabled={useUpdateTrainingSplitMutation.isPending}
            center={true}
            type="negative"
          >
            Activate
          </Button>
        )}
      </div>
      <div
        className={css({
          display: displayAction ? "flex" : "none",
          justifyContent: "center",
          gap: "1rem",

          padding: "1rem 2rem",

          borderBottom: !lastChild
            ? "2px solid token(colors.effects.border)"
            : "",

          fontSize: "md",
          fontWeight: "normal",
          color: "typography.text",
        })}
      >
        {windowWidth < 550 ? (
          entity.is_active ? (
            <StatusCode type="ongoing" />
          ) : (
            <StatusCode type="finished" />
          )
        ) : (
          ""
        )}
        <Button
          onClick={() => {
            if (!entity.id) return;

            deleteTrainingSplit.mutate(entity.id);
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setDisplayAction(false);
            useUpdateTrainingSplitMutation.mutate({
              trainingSplitId: entity.id || "",
              updateData: { is_active: false },
            });
          }}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
