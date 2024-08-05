import { NavLink, useLocation } from "react-router-dom";

import "./BreadCrumbs.css";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="bread-crumbs">
      <span className="bread-crumb">
        <NavLink to="/">Home</NavLink>
      </span>
      {pathNames.map((path, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <span key={routeTo}>{path}</span>
        ) : (
          <span key={routeTo} className="bread-crumb">
            <NavLink to={routeTo}>{path}</NavLink>
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
