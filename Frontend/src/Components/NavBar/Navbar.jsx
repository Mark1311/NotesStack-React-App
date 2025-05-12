import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SerachBar from "../SerachBar/SerachBar";
import Navbar_icons from "../../assets/images/Navbar_icons.gif";

const Navbar = ({
  userInfo,
  onSearchNotes,
  handleClearSearch,
  showSearchBar = true,
}) => {
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
    <div className="bg-white w-full px-4 py-3 drop-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Logo & Title */}
      <div className="flex items-center gap-2">
        <img src={Navbar_icons} alt="Navbar_icon" className="w-10 h-10" />
        <h1 className="text-xl font-medium text-black">NotesStack</h1>
      </div>

      {/* Search Bar */}
      {showSearchBar && userInfo && (
        <div className="w-full sm:w-auto">
          <SerachBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSerach={handleSerach}
            onClearSearch={onClearSearch}
          />
        </div>
      )}

      {/* Profile Info */}
      {userInfo && (
        <div className="w-full sm:w-auto flex justify-end">
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
