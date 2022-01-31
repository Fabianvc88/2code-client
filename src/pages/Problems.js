import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Problems() {
  return (
    <div className="flex flex-col items-center h-screen">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-1/3 border-r">
          {/**Tabs */}
          <ul
            id="tabs"
            className="flex flex-wrap border-b-2 space-x-0 text-gray-800"
          >
            <li className="inline-block py-2 px-4  hover:bg-gray-100 font-medium">
              <a id="default-tab" href="first">
                Enunciado
              </a>
            </li>
            <li className="inline-block py-2 px-4 hover:bg-gray-100 font-medium">
              <a href="second">Menú</a>
            </li>
            <li className="inline-block py-2 px-4 hover:bg-gray-100 font-medium">
              <a href="third">Notas</a>{" "}
            </li>
            <li className="inline-block py-2 px-4 hover:bg-gray-100 font-medium">
              <a href="fourth">Comentarios</a>
            </li>
          </ul>

          {/**Tabs content*/}
          <div id="tab-contents" className="w-full p-5 md:px-12">
            <div id="first" className="">
              <p className="py-5 font-bold ">Titulo del ejercicio</p>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Gravida neque convallis a cras semper. Diam donec adipiscing
                tristique risus nec feugiat. Lectus quam id leo in vitae turpis
                massa.
              </p>
            </div>
            <div id="second" className="hidden ">
              Second tab
            </div>
            <div id="third" className="hidden ">
              Third tab
            </div>
            <div id="fourth" className="hidden ">
              Fourth tab
            </div>
          </div>
        </div>

        {/**Right Panels */}
        <div className="flex flex-col sm:w-2/3 max-h-full">
          <div className="flex p-3 border-l border-b">
            <button className="mx-3 py-2 px-4 w-24 bg-gray-200">Prev</button>
            <button className="mx-3 py-2 px-4 w-24 bg-gray-200">Next</button>
            <p>something</p>
          </div>

          <div className="flex p-3 border-l border-b">
            <button className="mx-3 py-2 px-4 w-24 bg-gray-200">Prev</button>
            <button className="mx-3 py-2 px-4 w-24 bg-gray-200">Next</button>
            <p>something</p>
            <button className="mx-3 py-2 px-4 w-24 bg-gray-200">
              End test
            </button>
          </div>

          <div className="flex h-full">
            <div className="flex flex-col border-l border-t border-r pl-5 pt-3 w-10 text-sm">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div className="border-l border-t w-full p-3">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Gravida neque convallis a cras semper. Diam donec adipiscing
                tristique risus nec feugiat. Lectus quam id leo in vitae turpis
                massa.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
