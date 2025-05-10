import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SerachBar from "../SerachBar/SerachBar";

const Navbar = ({ userInfo, onSearchNotes, handleClearSearch, showSearchBar = true, }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSerach = () => {
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {showSearchBar && userInfo && (
        <SerachBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSerach={handleSerach}
          onClearSearch={onClearSearch}
        />
      )}

      {/* <ProfileInfo userInfo={userInfo} onLogout = {onLogout}/> */}
      {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};

export default Navbar;
