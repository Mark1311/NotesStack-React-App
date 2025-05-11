import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import {  MdDelete } from "react-icons/md";
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
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium">{title}</h1>
          <span className="text-xs text-slate-600">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`${isPinned ? "text-blue-800 text-xl" : "text-gray-800"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-1 text-xs text-blue-600">
          {(tags || []).map((item, index) => (
            <span key={index} className="bg-blue-100 px-2 py-0.5 rounded">
              #{item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <FaPencilAlt
            className="hover:text-green-600 "
            onClick={onEdit}
          />
          <MdDelete
            className="hover:text-red-600 text-xl"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
