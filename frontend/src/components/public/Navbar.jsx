import { NavLink } from "react-router-dom";
import { useState } from "react";
import Map from "../../pages/map";

import controller from "../../assets/controller.png";
import menu_map from "../../assets/map.png";
import list from "../../assets/list.png";
import "../../App.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const active = "bg-white text-orange font-poppins font-bold";
  const deactive = "text-gray font-poppins font-bold";
  const Menus = [
    { title: "Map", src: menu_map, link: "../mainpage" },
    { title: "List", src: list, link: "/" },
  ];

  return (
    <>
      <div
        className={`${
          open ? "w-screen sm:w-72" : "w-screen sm:w-20 h-20 sm:h-screen"
        }
            bg-blue p-5  sm:pt-8 relative duration-300 fixed sm:relative z-40`}
      >
        <img
          src={controller}
          className={`absolute cursor-pointer -right-0 mr-6 sm:mr-0 sm:-right-3 w-5 scale-150 rounded-full  ${
            !open
              ? "top-9 rotate-90 sm:rotate-0"
              : "-bottom-0 sm:top-9 -rotate-90 sm:rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div className="flex justify-between flex-col h-full ">
          <div
            className={!open ? "hidden sm:block sm:pt-6" : "block pt3 sm:pt-6"}
          >
            {Menus.map((menu, index) => (
              <div>
                <NavLink
                  key={index}
                  to={menu.link}
                  className={({ isActive }) => (isActive ? active : deactive)}
                >
                  <div>
                    {menu.gap && (
                      <div className="w-full border-b border-white border-opacity-30"></div>
                    )}
                    <li
                      className={` flex gap-3 rounded-md p-2 cursor-pointer hover:bg-lightblue text-sm items-center transition-all duration-300 gap-x-4
                                ${menu.gap ? "mt-7" : "mt-6"}
                                ${index === 0 && "bg-light-white"} `}
                    >
                      <img src={menu.src} className="w-5 h-5" alt="" />
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200 text-base`}
                      >
                        {menu.title}
                      </span>
                    </li>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
