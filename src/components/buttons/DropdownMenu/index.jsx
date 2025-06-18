import { useState } from 'react';

// A simple chevron icon for the dropdown
const ChevronIcon = ({ isOpen }) => (
  <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);
// Let's modify it to accept an icon and the 'isOpen' state from the sidebar
export const DropdownMenu = ({ title, icon, items, isOpen }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setPanelOpen(!isPanelOpen)}
        className="w-full flex items-center p-3 my-1 rounded-lg text-white hover:bg-gray-700 transition-colors"
      >
        {icon}
        <span className={`overflow-hidden transition-all ${isOpen ? "w-32 ml-3" : "w-0"}`}>
          {title}
        </span>
        <div className={`transition-all ${isOpen ? 'ml-auto' : 'w-0 overflow-hidden'}`}>
           <ChevronIcon isOpen={isPanelOpen} />
        </div>
      </button>

      {/* The dropdown panel itself is not affected by the sidebar's state */}
      {isPanelOpen && (
        <div className="mt-1 bg-gray-800 rounded-md shadow-lg overflow-y-auto max-h-60">
          {/* Add a little padding only when sidebar is open */}
          <ul className={isOpen ? "pl-6" : ""}>
            {items.map((item) => (
              <li key={item}>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-500 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
