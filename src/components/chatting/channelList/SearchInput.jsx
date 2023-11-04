const SearchInput = ({ onChange, value, onSubmit, placeholder = "Search" }) => {
  return (
    <form
      className="flex items-center gap-2 px-4 py-3 w-full h-fit min-h-[3rem] bg-white border-solid border-b-2"
      onSubmit={onSubmit}
    >
      <span className="material-symbols-outlined">search</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full outline-none"
      />
    </form>
  );
};

export default SearchInput;
