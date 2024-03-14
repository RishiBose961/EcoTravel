import React from "react";
import { Tab } from "@headlessui/react";
import TravelHotels from "../../components/CreatePage/TravelHotels";
import TravelStation from "../../components/CreatePage/TravelStation";
import StoryCreate from "../../components/CreatePage/StoryCreate";
import ChargingStation from "../../components/CreatePage/ChargingStation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const CreateNew = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mt-4 mb-4">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white text-blue-700 shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
         Hospitality
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white text-blue-700 shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Vehicle
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white text-blue-700 shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Story Post
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white text-blue-700 shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Charging Station
        </Tab>

      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <TravelHotels/>
        </Tab.Panel>
        <Tab.Panel><TravelStation/></Tab.Panel>
        <Tab.Panel><StoryCreate/></Tab.Panel>
        <Tab.Panel><ChargingStation/></Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CreateNew;
