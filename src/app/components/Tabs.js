import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs(props) {
  const [categories] = useState(["Enunciado", "Notas", "Comentarios"]);
  const [showHelp, setShowHelp] = useState(false);

  const [comments, setComments] = useState([
    {
      id: 1,
      title: "Muy facil, no?",
      date: "hace 5h",
      commentCount: 5,
      upvoteCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: "hace 2h",
      commentCount: 3,
      upvoteCount: 2,
    },
    {
      id: 3,
      title: "Is tech making coffee better or worse?",
      date: "Ene 7",
      commentCount: 29,
      upvoteCount: 16,
    },
    {
      id: 4,
      title: "The most innovative things happening in coffee",
      date: "Mar 19",
      commentCount: 24,
      upvoteCount: 12,
    },
    {
      id: 5,
      title: "Ask Me Anything: 10 answers to your questions about coffee",
      date: "hace 2d",
      commentCount: 9,
      upvoteCount: 5,
    },
    {
      id: 6,
      title: "The worst advice we've ever heard about coffee",
      date: "hace 4d",
      commentCount: 1,
      upvoteCount: 2,
    },
  ]);

  return (
    <div
      className={classNames(
        props.className,
        " flex w-full flex-col px-2 py-2 sm:px-0 xl:w-4/5"
      )}
    >
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-blue-900/20 p-1 xl:rounded-md">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-sky-700",
                  "ring-white ring-opacity-60 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : " hover:bg-white/[0.12] hover:text-sky-600"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2 h-full rounded-md bg-white">
          <Tab.Panel className=" p-5">
            <h2 className=" py-5 font-bold">{props.title}</h2>
            <p className="text-justify">{props.description}</p>
            <button
              className={` my-5 text-gray-500 underline hover:cursor-pointer`}
              onClick={() => {
                setShowHelp((prev) => !prev);
              }}
            >
              {showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}
            </button>
            <p
              className={`${showHelp ? " block" : " hidden"} px-4 text-justify`}
            >
              {props.help}
            </p>
          </Tab.Panel>

          <Tab.Panel className=" p-5">
            <h2 className=" py-5 font-bold">2</h2>
          </Tab.Panel>

          <Tab.Panel className=" p-5">
            <ul>
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="hover:bg-coolGray-100 relative rounded-md py-3"
                >
                  <h3 className="text-sm font-medium leading-5">
                    {comment.title}
                  </h3>

                  <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                    <li>{comment.date}</li>
                    <li>&middot;</li>
                    <li>{comment.commentCount} comentarios</li>
                    <li>&middot;</li>
                    <li>{comment.upvoteCount} likes</li>
                  </ul>
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
