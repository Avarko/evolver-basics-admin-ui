import { Outlet } from "react-router-dom";
import BreadCrumbs from "./components/BreadCrumbs";

const Root = () => {
  return (
    <>
      <BreadCrumbs />

      <Outlet />
    </>
  );
};

export default Root;
