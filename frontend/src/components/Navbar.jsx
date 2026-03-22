import { NavLink } from "react-router-dom";
import { MdHomeWork } from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { MdPermContactCalendar } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import AddPropertyModal from "./AddPropertyModal";
import { useState } from "react";
import useAuthCheck from "../hooks/useAuthCheck";

const Navbar = ({ containerStyles }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  const baseLinkClass =
    "flexCenter gap-x-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-600 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200";

  const activeLinkClass =
    "flexCenter gap-x-2 rounded-xl px-3 py-2 text-sm font-medium bg-navy-700 text-white shadow-navy";

  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? activeLinkClass : baseLinkClass
        }
      >
        <MdHomeWork className="text-base" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to={"/listing"}
        className={({ isActive }) =>
          isActive ? activeLinkClass : baseLinkClass
        }
      >
        <RiCheckboxMultipleBlankFill className="text-base" />
        <span>Properties</span>
      </NavLink>

      <NavLink
        to={"/contact"}
        className={({ isActive }) =>
          isActive ? activeLinkClass : baseLinkClass
        }
      >
        <MdPermContactCalendar className="text-base" />
        <span>Contact</span>
      </NavLink>

      <div
        onClick={handleAddPropertyClick}
        className={`${baseLinkClass} cursor-pointer`}
      >
        <MdAddHome className="text-base" />
        <span>List Property</span>
      </div>

      <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
    </nav>
  );
};

export default Navbar;
