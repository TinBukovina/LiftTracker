import React from "react";
import { css } from "../../../../styled-system/css";

import { formatDate } from "../../../utils/helperFunction";
import { useUpdateTrainingSplit } from "../customHooks/useUpdateTrainingSplit";
import { TrainingSplitInterface } from "../types/trainingEntities";
import Button from "./Button";
import StatusCode from "./StatusCode";

export interface TrainingSplitTableRowProps {
  entity: TrainingSplitInterface;
  lastChild?: boolean;
  onClick?: <T extends HTMLElement>(e: React.MouseEvent<T>) => void;
}

export default function TrainingSplitsTableRow({
  entity,
  lastChild = false,
  onClick,
}: TrainingSplitTableRowProps) {
  const useUpdateTrainingSplitMutation = useUpdateTrainingSplit();

  return (
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
        gridTemplateColumns: `repeat(3, 2fr) 1fr`,
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span>{entity.name}</span>
      <span
        className={css({
          color: "typography.secondaryText",
        })}
      >
        {formatDate(entity.created_at || "")}
      </span>
      {entity.is_active ? (
        <StatusCode type="ongoing" />
      ) : (
        <StatusCode type="finished" />
      )}
      {entity.is_active ? (
        <Button
          onClick={() => {
            useUpdateTrainingSplitMutation.mutate({
              trainingSplitId: entity.id || "",
              updateData: { is_active: false },
            });
          }}
          disabled={useUpdateTrainingSplitMutation.isPending}
          center={true}
        >
          Finish
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
        >
          Activate
        </Button>
      )}
    </div>
  );
}
