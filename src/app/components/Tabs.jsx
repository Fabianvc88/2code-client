import { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import { getNoteData, writeNoteData } from "../services/tocodeApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs(props) {
  const [categories, setCategories] = useState(["Enunciado", "Notas"]); // "Comentarios" tab is disabled
  const [showHelp, setShowHelp] = useState(false);
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const noteRef = useRef();

  useEffect(() => {
    getNoteData(parseInt(props.problemid), parseInt(props.userid))
      .then((response) => {
        setNote(response);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.status === "NOTE_NOT_FOUND") {
          setLoading(false);
        }
      });
  }, [props.problemid, props.userid]);

  async function saveNote() {
    setLoading(true);
    try {
      const response = await writeNoteData(
        props.problemid,
        props.userid,
        noteRef.current.value
      );
      if (response.status === "CREATE" || response.status === "UPDATE") {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

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
            <div className=" flex flex-row justify-between">
              <p className=" p-2">Tus notas personales:</p>
              <button
                onClick={saveNote}
                className={`${
                  loading ? " " : ""
                } flex rounded bg-sky-500 p-2 px-3 py-2 text-white transition-colors `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`${
                    loading ? " animate-spin" : " hidden"
                  } mr-2 h-6 w-6`}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg>
                Guardar nota
              </button>
            </div>
            <textarea
              className=" my-3 h-40 max-h-96 w-full rounded border py-2 px-3 leading-tight text-gray-700  focus:outline-none"
              id="help1"
              type="text"
              autoComplete="off"
              defaultValue={note.content}
              ref={noteRef}
              onChange={(event) => {
                setNote((prev) => ({
                  ...prev,
                  content: event.target.value,
                }));
              }}
            />
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
