import React from "react";
import "./index.scss";

interface SearchBoxProps {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onChangeHandler, placeholder }) => {
  return (
    <input
      className="search"
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;
