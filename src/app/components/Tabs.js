import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  let [categories] = useState({
    Enunciado: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Notas: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Comentarios: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div
      className={classNames(
        props.className,
        " flex w-full flex-col px-2 py-2 sm:px-0 xl:w-4/5"
      )}
    >
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-blue-900/20 p-1 xl:rounded-md">
          {Object.keys(categories).map((category) => (
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
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className=" p-5">
              <h2 className="py-5 font-bold ">Titulo del ejercicio</h2>
              <ul className="">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="hover:bg-coolGray-100 relative rounded-md py-3"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
