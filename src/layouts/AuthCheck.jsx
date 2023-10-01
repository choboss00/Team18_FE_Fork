import { Outlet } from "react-router-dom";

export default function AuthCheck() {
  return (
    <>
      <h1>AuthCheck</h1>
      <Outlet />
    </>
  );
}
