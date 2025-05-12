import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const SerachBar = ({ value, onChange, handleSerach, onClearSearch }) => {
  return (
    <div className="w-full max-w-md h-10 flex items-center px-3 sm:px-4 bg-slate-300 rounded-md">
      <input
        type="text"
        placeholder="Search Notes Tags..."
        className="flex-1 text-sm bg-transparent py-[10px] pr-2 outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-lg sm:text-xl text-slate-500 cursor-pointer hover:text-black mr-2"
          onClick={onClearSearch}
        />
      )}

      <IoSearch
        className="text-lg sm:text-xl text-slate-500 cursor-pointer hover:text-black"
        onClick={handleSerach}
      />
    </div>
  );
};

export default SerachBar;
