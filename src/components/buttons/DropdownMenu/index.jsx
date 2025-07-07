import { useState } from 'react';
import { Link } from 'react-router-dom';

// A simple chevron icon for the dropdown
const ChevronIcon = ({ isOpen }) => (
  <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);
// Let's modify it to accept an icon and the 'isOpen' state from the sidebar
export const DropdownMenu = ({ title, icon, items, isOpen }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  const handleTogglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };
  
  // Close the panel when a link is clicked
  const handleLinkClick = () => {
    setPanelOpen(false);
  }

  return (
    <div className="relative w-full">
      <button
        onClick={handleTogglePanel}
        className="w-full flex items-center p-3 my-1 rounded-lg text-white hover:bg-gray-700 transition-colors"
      >
        {icon}
        <span className={`overflow-hidden transition-all ${isOpen ? " ml-3" : "w-0"}`}>
          {title}
        </span>
        <div className={`transition-all ${isOpen ? 'ml-auto' : 'w-0 overflow-hidden'}`}>
           <ChevronIcon isOpen={isPanelOpen} />
        </div>
      </button>

      {isPanelOpen && (
        <div className="mt-1 bg-[#404040] rounded-md shadow-lg overflow-y-auto max-h-60 custom-scrollbar">
          <ul className={isOpen ? "pl-6" : ""}>
            {items.map((item) => (
              <li key={item}>
                {/* The important thing to navigate is here : Use <Link> to navigate to the dynamic URL.
                */}
                <Link
                  to={`/estado/${encodeURIComponent(item)}`}
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-500 hover:text-white"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
