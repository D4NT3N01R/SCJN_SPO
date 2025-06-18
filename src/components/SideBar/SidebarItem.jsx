import React from 'react';
// This component represents a single item in the sidebar.
// It can be a link or a button with an icon and text.
export const SidebarItem = ({ icon, text, isOpen, active }) => {
  return (
    <a
      href="#"
      className={`
        flex items-center p-3 my-1 rounded-lg text-white transition-colors
        ${active ? 'bg-blue-600' : 'hover:bg-gray-700'}
      `}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all
          ${isOpen ? "w-40 ml-3" : "w-0"}
        `}
      >
        {text}
      </span>
    </a>
  );
};