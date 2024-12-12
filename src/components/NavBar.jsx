import DesktopNavigation from "./DesktopNavigation";
import { Link, Outlet } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";

function NavBar() {

    return(
        <>
        <div>
            <div>
            <DesktopNavigation />
            <MobileNavigation />
            </div>
         {/* React Router will pass components into the <Outlet /> based on the path */}
        <Outlet />
      </div>
      </>
    );
}

export default NavBar;