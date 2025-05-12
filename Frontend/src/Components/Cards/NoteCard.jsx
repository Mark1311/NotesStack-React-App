import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white transition-all shadow-xl ease-in-out duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">{title}</h1>
          <span className="text-xs text-slate-700">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`${isPinned ? "text-blue-800 text-xl" : "text-gray-800"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm text-slate-700 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-1 text-xs text-blue-600">
          {(tags || []).map((item, index) => (
            <span key={index} className="bg-blue-200 px-2 py-0.5 rounded">
              #{item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <FaPencilAlt className="hover:text-green-600 " onClick={onEdit} />
          <MdDelete className="hover:text-red-600 text-xl" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
