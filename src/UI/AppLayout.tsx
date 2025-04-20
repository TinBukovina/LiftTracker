import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <div>AppLayout</div>
      <Outlet />
    </div>
  );
}
