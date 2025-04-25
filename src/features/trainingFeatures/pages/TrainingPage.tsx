import React from "react";
import { css } from "../../../../styled-system/css";

export default function TrainingPage() {
  return (
    <div
      className={css({
        width: "100%",
      })}
    >
      <div
        className={css({
          color: "breadCrumbs.inActive",
        })}
      >
        Training split
      </div>
      <div>
        <div>
          <p>Trainging Split</p>
          <p>List of your training plans and programs</p>
        </div>
        <button>Create</button>
      </div>

      <div>CONTENT</div>
    </div>
  );
}
