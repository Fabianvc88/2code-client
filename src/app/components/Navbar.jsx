import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext, DataContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { logOut } from "../services/firebase";
import axios from "axios";
import { apiUrl } from "../services/serverAddress";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar(props) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  const [userFirstname, setUserFirstname] = useState("");
  let navigation = [
    { name: "Inicio", href: "/", hidden: false, current: false },
    { name: "Problemas", href: "/problems", hidden: false, current: false },
    // { name: "Ayuda", href: "/about", hidden: false, current: false },
    { name: "Historial", href: "/dashboard", hidden: false, current: false },
  ];

  if (userData?.role === "admin") {
    navigation = [
      { name: "Inicio", href: "/", hidden: false, current: false },
      { name: "Ejercicios", href: "/problems", hidden: false, current: false },
      // { name: "Ayuda", href: "/about", hidden: false, current: false },
      {
        name: "Consola",
        href: "/dashboard/admin",
        hidden: false,
        current: false,
      },
    ];
  }

  useEffect(() => {
    //const controller = new AbortController();
    async function getUserData(email) {
      const user = await axios.post(
        apiUrl + "/user/check",
        {
          email,
        }
        // {
        //   //TODO arreglas algo con el usuario. estaba creando el objeto user con todos los datos pero decidi crear solo un usestate con string y guardar solo el nombre. terminar esto mañana
        //   signal: controller.signal,
        // }
      );
      setUserFirstname(user.data.firstname);
    }
    if (currentUser) getUserData(currentUser.email);
    //return controller.abort();
  }, [currentUser]);

  async function handleSignOut() {
    setLoading(true);
    try {
      await logOut();
    } catch (e) {
      alert("Error loggin out");
    }
    setLoading(false);
  }

  return (
    <Disclosure as="nav" className={classNames(props.className, "w-full")}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <Logo adaptive />
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center justify-center ">
                  <img
                    className="hidden h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
              </div>

              <div className="hidden flex-1 items-center justify-end sm:flex ">
                <div className="block sm:ml-6">
                  {/*Links en pantalla sm+*/}
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <NavLink
                        to={item.href}
                        key={item.name}
                        hidden={item.hidden}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-700 hover:text-sky-600",
                          "rounded-md px-3 py-2 text-sm font-semibold"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/**Logged Username and picture */}
              <div
                className="absolute inset-y-0 right-0 flex items-center gap-x-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                hidden={!currentUser}
              >
                <p className=" ml-4 text-sm" hidden={!currentUser}>
                  {/* {currentUser.email.split("@")[0]} */}
                  {userFirstname ? userFirstname : ""}
                </p>
                <Avatar
                  url="https://coaching.papareact.com/ai9"
                  hidden={!currentUser}
                />
                <button
                  className={` ${
                    currentUser ? "flex" : "hidden"
                  } items-center justify-center rounded-md border border-red-500 px-4 py-1 text-red-500 hover:bg-red-500 hover:text-gray-100`}
                  onClick={handleSignOut}
                  disabled={loading || !currentUser}
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-1 h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                  Cerrar Sesión
                </button>
              </div>

              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                hidden={currentUser}
              >
                {/**Login Button */}
                <NavLink
                  to="/login"
                  key="Login"
                  hidden={currentUser}
                  /* className={classNames(,"bg-sky-500 hover:bg-sky-600 text-white hover:text-white px-5 py-2 rounded-md text-sm font-medium")} */
                  className="rounded-md bg-sky-500 px-5 py-2 text-sm font-medium text-white hover:bg-sky-600 hover:text-white"
                >
                  Acceder
                </NavLink>
              </div>

              {/*<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
              {/*<Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>*/}
            </div>
          </div>
          {/**Links en pantalla xs */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:text-sky-600",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <button
                className=" px-4 py-1 text-red-500 hover:text-red-700"
                onClick={handleSignOut}
                disabled={loading || !currentUser}
                hidden={!currentUser}
              >
                Cerrar Sesión
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
