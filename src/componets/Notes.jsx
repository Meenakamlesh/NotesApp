import React, { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { removefromNotes } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Notes = () => {
  const Notes = useSelector((state) => state.Notes.Notes);
  const [serach, setserach] = useState("");
  const dispatch = useDispatch();

  const filterData = Notes.filter((Notes) =>
    Notes.title.toLowerCase().includes(serach.toLowerCase())
  );

  function Deletenotes(NotesId) {
    dispatch(removefromNotes(NotesId));
  }

  return (
    <div className="text-center max-w-[1180px] text-black mt-5 m-auto border-2 border-gray-900 flex flex-col gap-5 p-5">
      <input
        type="text"
        className="p-3 rounded-md w-full mb-4 border-2 border-gray-700 outline-none text-black bg-white"
        placeholder="Search Here"
        value={serach}
        onChange={(e) => setserach(e.target.value)}
      />
      <div>
        {filterData.length > 0 &&
          filterData.map((Notes) => {
            return (
              <div
                key={Notes._id}
                className="flex flex-col sm:flex-row gap-3 mb-4 overflow-hidden p-3 items-start border-2 border-gray-600"
              >
                {/* Notes Title and Content */}
                <div className="flex-1 flex flex-col">
                  <div id="notes-card-title" className="font-bold text-lg">
                    {Notes.title}
                  </div>
                  <hr className="mb-2 mt-1 border border-black" />
                  <div id="notes-card-content">{Notes.content}</div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col sm:items-end items-center gap-3 sm:gap-6 justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2  text-white rounded-md ">
                      <Link
                        className="text-white"
                        to={`/?NotesId=${Notes?._id}`}
                      >
                        Edit
                      </Link>
                    </button>
                    <button className="px-4 py-2  text-white rounded-md ">
                      <Link className="text-white" to={`/notes/${Notes?._id}`}>
                        View
                      </Link>
                    </button>
                    <button
                      className="px-4 py-2  text-white rounded-md "
                      onClick={() => {
                        navigator.clipboard.writeText(Notes?.content);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <Link className="text-white">Copy</Link>
                    </button>
                    <button
                      className="px-4 py-2  text-white rounded-md "
                      onClick={() => Deletenotes(Notes?._id)}
                    >
                      <Link className="text-white">
                      Delete
                      </Link>
                      
                    </button>
                  </div>
                  <div className="font-bold text-sm sm:mt-auto">
                    {Notes.createAt}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
