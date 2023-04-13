import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../Navigation/SideMenu/SideMenu";

const Home = () => {
  return (
    <div className="d-flex">
      <SideMenu />
      <div className="w-100">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
