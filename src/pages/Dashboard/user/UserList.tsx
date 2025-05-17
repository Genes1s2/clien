import React from "react";
import { Tab } from "@headlessui/react";
import AllUser from "../../../components/user/AllUsers";
import AllActiveUser from "../../../components/user/AllActiveUsers";
import AllInactiveUser from "../../../components/user/AllInactiveUsers";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const UserList = () => {
  return (
    <div className="w-full max-w-[80rem] px-2 py-10 sm:px-0 mx-auto">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {["Tous", "Actifs", "Inactifs"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <AllUser />
          </Tab.Panel>
          <Tab.Panel>
            <AllActiveUser />
          </Tab.Panel>
          <Tab.Panel>
            <AllInactiveUser />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserList;
