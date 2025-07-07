

// A simple trash can icon SVG
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-white hover:fill-[#5e5656] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const DeleteButtonRenderer = (props) => {
  const { data, handleDelete } = props;

  const onButtonClicked = () => {
    // Confirm before deleting
    if (window.confirm(`Are you sure you want to delete row with ID: ${data.id}?`)) {
      handleDelete(data.id);
    }
  };

  return (
    <label
      type="button"
      onClick={onButtonClicked}
      className="h-full w-full flex items-center justify-center bg-black rounded-md hover:bg-[#cf0b0b]  transition-colors cursor-pointer"
    >
      <TrashIcon />
    </label>
  );
};