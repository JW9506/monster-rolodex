import React from "react";
import "./index.scss";

interface SearchBoxProps {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onChangeHandler }) => {
  return (
    <input
      className="search"
      type="search"
      placeholder="search monster"
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;
