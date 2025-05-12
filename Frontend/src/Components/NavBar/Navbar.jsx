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
    <div className="relative bg-white w-full px-4 py-4 drop-shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Logo & Title */}
      <div className="flex items-center gap-2 z-10">
        <img src={Navbar_icons} alt="Navbar_icon" className="w-10 h-10" />
        <h1 className="text-xl font-semibold text-black">NotesStack</h1>
      </div>

      {/* Search Bar */}
      {showSearchBar && userInfo && (
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <SerachBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSerach={handleSerach}
            onClearSearch={onClearSearch}
          />
        </div>
      )}

      {/* Search bar for mobile view */}
      {showSearchBar && userInfo && (
        <div className="block sm:hidden w-full">
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
        <div className="flex justify-center sm:justify-end z-10">
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
