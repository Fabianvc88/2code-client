import { ArrowLeftIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function BackButton(props) {
  const defaultClass = "rounded px-5 py-2 hover:bg-gray-100";
  return (
    <NavLink
      className={`flex ${props.className || defaultClass}`}
      to={props.to}
    >
      <ArrowLeftIcon className="mr-2 h-6 w-5" />
      Atrás
    </NavLink>
  );
}
