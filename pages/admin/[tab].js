// import { useState, useEffect } from "react";
// import Layout from "../../components/general/Layout";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Tab() {
//   const [currentPage, setCurrentPage] = useState();
//   const router = useRouter();

//   const [pillTabs, setPillTabs] = useState([]);

//   useEffect(() => {
//     const { tab } = router.query;

//     const updatedTabs = pillTabs.map((pill) => {
//       if (tab == pill.code) {
//         return { ...pill, current: true };
//       } else {
//         return { ...pill, current: false };
//       }
//     }, []);

//     setPillTabs(updatedTabs);

//     if (tab == "add-movie") {
//       const AddMovie = dynamic(() => import("../../components/movie/AddMovie"));
//       setCurrentPage(<AddMovie />);
//     } else if (tab == "delete-movie") {
//       const DeleteMovie = dynamic(() =>
//         import("../../components/movie/DeleteMovie")
//       );
//       setCurrentPage(<DeleteMovie />);
//     }
//   }, [router]);

//   return (
//     <Layout>
//       <div className="bg-white px-2  shadow-sm sticky top-0 z-40">
//         <nav
//           className="isolate flex rounded-lg justify-start space-x-8"
//           aria-label="Tabs"
//         >
//           {pillTabs.map((tab) => (
//             <a
//               key={tab.name}
//               href={tab.href}
//               className={classNames(
//                 tab.current
//                   ? "border-blue-700 text-blue-700"
//                   : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
//                 "group inline-flex items-center border-b py-2 px-1 text-md font-thin"
//               )}
//               aria-current={tab.current ? "page" : undefined}
//             >
//               <span className="">{tab.name}</span>
//             </a>
//           ))}
//         </nav>
//       </div>

//       {currentPage}
//     </Layout>
//   );
// }

import { useState, useEffect } from "react";
import Layout from "../../components/general/Layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const initialPillTabs = [];

export default function Tab() {
  const [currentPage, setCurrentPage] = useState();
  const [pillTabs, setPillTabs] = useState(initialPillTabs);
  const router = useRouter();

  useEffect(() => {
    const { tab } = router.query;
    if (!tab) return;

    // Update current tab
    const updatedTabs = initialPillTabs.map((pill) => ({
      ...pill,
      current: pill.code === tab,
    }));
    setPillTabs(updatedTabs);

    // Dynamically load component based on tab
    if (tab === "add-movie") {
      const AddMovie = dynamic(() => import("../../components/movie/AddMovie"));
      setCurrentPage(<AddMovie />);
    } else if (tab === "delete-movie") {
      const DeleteMovie = dynamic(() =>
        import("../../components/movie/DeleteMovie")
      );
      setCurrentPage(<DeleteMovie />);
    }
  }, [router.query]);
  // }, [router.query.tab]);

  return (
    <Layout>
      <div className="bg-white px-2 shadow-sm sticky top-0 z-40">
        <nav
          className="isolate flex rounded-lg justify-start space-x-8"
          aria-label="Tabs"
        >
          {pillTabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "group inline-flex items-center border-b py-2 px-1 text-md font-thin"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {currentPage}
    </Layout>
  );
}
