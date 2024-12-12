
 import NavLinks from './NavLinks';
 import { IoMenu } from "react-icons/io5";
 import { IoMdClose } from "react-icons/io";
 import { useState } from "react";

 function MobileNavigation() {
    const [click, setClick] = useState(false);
    const Hamburger = <IoMenu className="HamburgerMenu" size="30px" color="black"  onClick={() => setClick(!click)} />
    const Close = <IoMdClose className="HamburgerMenu" size="30px" color="black"  onClick={() => setClick(!click)} />
    const closeMenu = () => setClick(false);

     return(
            <nav className="MobileNavigation">
                <div className="logo">
                    SPP<span className="green-o"></span><span className="green-o"></span>RRT
                </div>
                {click ? Close : Hamburger}
                {click && <NavLinks isClicked={click} closeMenu={closeMenu} />}
        </nav>
     )
 }

 export default MobileNavigation;

