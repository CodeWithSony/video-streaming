import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  ClipboardDocumentListIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const router = useRouter();
  const [tabs, SetTabss] = useState([
    {
      name: "Add Movie",
      code: "add-movie",
      href: "/admin/add-movie",
      icon: ClipboardDocumentListIcon,
      current: false,
    },
    {
      name: "Delete Movie",
      code: "delete-movie",
      href: "/admin/delete-movie",
      icon: TrashIcon,
      current: false,
    },
  ]);

  useEffect(() => {
    if (router.pathname) {
      const routerPath = router.asPath;

      const updatedTabs = tabs.map((tab) => {
        const currentLhstTab = routerPath.split("/")[1];

        if (tab.code == currentLhstTab) {
          return { ...tab, current: true };
        } else {
          return { ...tab, current: false };
        }
      }, []);

      SetTabss(updatedTabs);
    }
  }, [router.pathname]);

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-32 md:flex-col ">
            <div className="flex flex-grow flex-col overflow-y-auto bg-gray-800">
              <div className=" flex flex-grow flex-col bg-white">
                <nav className="px-2 py-0">
                  {tabs.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`group flex w-full flex-col items-center px-2 py-2 mt-0.5 text-xs font-bold shadow-md
                      ${
                        !item.current &&
                        "text-gray-500 bg-gray-50 hover:bg-gray-200 hover:text-gray-700"
                      }
                      ${item.current && "bg-blue-900 text-white"}
                      ${index == 0 && "rounded-t-xl"}
                      ${index == tabs.length - 1 && "rounded-b-xl"}`}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700",
                          "h-7 w-7"
                        )}
                        aria-hidden="true"
                      />
                      <span className="mt-1 text-xxxs w-full text-center">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex md:pl-32 bg-gray-100">
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Home
              </h1>
              {children}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
