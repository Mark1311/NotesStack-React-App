import React, { useState } from "react";
import TagInput from "../../Components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axisoInstance from "../../Utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  //Add new notes
  const addNewNote = async () => {
    try {
      const response = await axisoInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Notes Add SuccessFully", "ADD");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //Edit Notes
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axisoInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Notes Edit SuccessFully", "edit");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Enter Content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 "
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-800 hover:text-white"/>
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-2xl text-slate-900">Title...</label>
        <input
          type="text"
          className="text-xl text-slate-900 px-4 py-2 bg-slate-100 border border-slate-300 rounded-md outline-none"
          placeholder="Go Your Title Here....."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xl text-slate-900">Content...</label>
        <textarea
          type="text"
          className="text-sm px-4 py-2 text-slate-950 potline-none bg-slate-100 rounded"
          placeholder="Write Your Content Here..."
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="text-xl text-slate-900">Tag's...</label>
        <TagInput tags={tags} setTag={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
