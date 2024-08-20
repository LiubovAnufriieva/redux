import css from "./SearchBox.module.css";


const SearchBox =({ value, onFilter })=> {
  return (
    <div className={css.container}>
      <p className={css.label}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(e) => onFilter(e.target.value)}
        placeholder="Enter the name..."
      />
    </div>
  );
}

export default SearchBox;
