import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type VibeType = "Formal" | "Casual" | "Religious" | "Funny";

interface DropDownProps {
  vibe: VibeType;
  setVibe: (vibe: VibeType) => void;
  language?: "id" | "en";
}

const vibeOptions = {
  id: {
    Formal: "Formal",
    Casual: "Santai",
    Religious: "Religius",
    Funny: "Lucu"
  },
  en: {
    Formal: "Formal",
    Casual: "Casual",
    Religious: "Religious",
    Funny: "Funny"
  }
};

let vibes: VibeType[] = ["Formal", "Casual", "Religious", "Funny"];

export default function DropDown({ vibe, setVibe, language = "id" }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          {vibeOptions[language][vibe]}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {vibes.map((vibeItem) => (
              <Menu.Item key={vibeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setVibe(vibeItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      vibe === vibeItem ? "bg-gray-50" : "",
                      "px-4 py-2 text-left text-sm w-full flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{vibeOptions[language][vibeItem]}</span>
                    {vibe === vibeItem && <CheckIcon className="w-4 h-4" />}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
