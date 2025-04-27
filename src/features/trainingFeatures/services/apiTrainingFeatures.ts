import supabase from "../../../services/supabse";
import { TrainingSplitInterface } from "../types/trainingEntities";

export async function getTrainingSplits(
  loggedUserId: string
): Promise<TrainingSplitInterface[]> {
  const { data: trainingSplits, error } = await supabase
    .from("training_splits")
    .select("*")
    .eq("user_id", loggedUserId);

  if (error) {
    console.log(error);
    throw new Error("Training splits can not be fetched from database!");
  }

  return trainingSplits as TrainingSplitInterface[];
}

/**
 * 
 * location.pathname.includes("home") ? (
        <div
          className={css({
            flex: "1",
            minHeight: "0",

            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",

            overflow: "hidden",
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
            })}
          >
            <div>
              <p
                className={css({
                  fontSize: "h5",
                })}
              >
                Trainging Split
              </p>
              <p
                className={css({
                  color: "typography.secondaryText",
                })}
              >
                List of your training plans and programs
              </p>
            </div>
            <Button svgOn={true} svgFunction={plusSvgInfo} type="positive">
              Create
            </Button>
          </div>

          <Table></Table>
        </div>
      ) : (
        ""
      )
 */
