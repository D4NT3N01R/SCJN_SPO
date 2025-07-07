
// This component displays a server status indicator with a loading spinner, status text, and an optional process count.
// export const ServerStatusIndicator = ({ isLoading, statusText, statusColor, dotColor, processCount }) => (
//   <div className="flex items-center gap-2 text-sm">
//     {isLoading ? (
//       <svg className="animate-spin h-3 w-3 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//       </svg>
//     ) : (
//       <span className={`w-3 h-3 ${dotColor} rounded-full`}></span>
//     )}
//     <span className={statusColor}>{statusText}</span>
//     {typeof processCount === 'number' && (
//       <span className="text-xs text-gray-400">({processCount})</span>
//     )}
//   </div>
// );