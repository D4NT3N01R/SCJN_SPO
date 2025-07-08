

// A simple delete button component that uses an SVG icon to delete a row in a table
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-white hover:stroke-[#ff0000] transition-colors"  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path  strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
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
      className="h-full w-20 flex items-center justify-center  rounded-md  transition-colors cursor-pointer"
    >
      <TrashIcon />
    </label>
  );
};