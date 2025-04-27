import { Session, User } from "@supabase/supabase-js";

export interface AuthResponseInterface {
  session: Session | null;
  user: User | null;
}
