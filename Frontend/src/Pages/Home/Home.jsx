import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import NoteCard from "../../Components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axisoInstance from "../../Utils/axiosInstance";
import Toasty from "../../Components/ToastMessage/Toasty";
import EmptyCard from "../../Components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/HomePage.png";
import NoNotesImg from "../../assets/images/No_Notes.png";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    date: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShow: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShow: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShow: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShow: false,
      message: "",
    });
  };

  //Get User Info

  const getUserInfo = async () => {
    try {
      const response = await axisoInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All Notes

  const getAllNotes = async () => {
    try {
      const response = await axisoInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An Expected Error Occured , Please Try Again");
    }
  };

  // Delete Notes

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axisoInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An Expected Error Occured , Please Try Again");
      }
    }
  };

  // Search for Notes

  const onSearchNotes = async (query) => {
    console.log("Query being searched:", query); // Add this log
    try {
      const response = await axisoInstance.get("/search-notes", {
        params: { query },
      });
      console.log("API Response:", response.data);
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // IsPinned Notes

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axisoInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        showToastMessage(
          !noteData.isPinned
            ? "Note Pinned Successfully"
            : "Note Unpinned Successfully",
          "edit"
        );
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoNotesImg : AddNotesImg}
            message={isSearch ? "Oops..!! No Notes Available" : "Start Your Notes Here....!!!"}
          />
        )}
      </div>

      <button
  className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 border border-transparent hover:bg-white hover:border-blue-500 group fixed right-10 bottom-10 transition-colors duration-200"
  onClick={() => {
    setOpenAddEditModal({ isShow: true, type: "add", date: null });
  }}
>
  <MdAdd className="text-[32px] text-black group-hover:text-blue-500 transition-colors duration-200" />
</button>


      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[90%] sm:w-[60%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", date: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toasty
        isShow={showToastMsg.isShow}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
