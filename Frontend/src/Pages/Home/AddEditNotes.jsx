import React from "react";
import TagInput from "../../Components/Input/TagInput";

const AddEditNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-lable">TITEL</label>
        <input
          type="text"
          className="text-2xl text-slate-900 outline-none"
          placeholder="Go Your PlaceHolder"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <lable className="input-lable">CONTENT</lable>
        <textarea
          type="text"
          className="text-sm text-slate-950 potline-none bg-slate-50 rounded"
          placeholder="Content"
          rows={10}
        />
      </div>

      <div className="mt-3">
        <lable className="btn-primary font-medium mt-5 p-3">TAGS</lable>
        <TagInput/>
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
