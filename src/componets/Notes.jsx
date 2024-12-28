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
    <div className=" text-center max-w-[1180px] text-black mt-5 m-auto border-2 border-gray-900 flex flex-col gap-5 p-5 ">
      <input
        type="text"
        className="p-3 rounded-md w-full mb-4 border-2 border-gray-700 outline-none text-black bg-white"
        placeholder="Sreach Here"
        value={serach}
        onChange={(e) => setserach(e.target.value)}
      />
      <div>
        {filterData.length > 0 &&
          filterData.map((Notes) => {
            return (
              <div className=" flex gap-2 mb-4 overflow-hidden p-3 items-start   border-2 border-gray-600 ">
                <div className="flex flex-col ">
                <div id="notes-card-title">{Notes.title}</div>
                <hr className="mb-1 mt-1 border border-black" />
                <div id="notes-card-content">{Notes.content}</div>
                </div>

                <div className="flex flex-col gap-[160px] ml-[100px] justify-end items-end">
                  <div className="flex gap-3 text-white">
                  <button>
                    <Link className="text-white" to={`/?NotesId=${Notes?._id}`}>Edit</Link>
                  </button>
                  <button>
                    <Link  className="text-white" to={`/notes/${Notes?._id}`}>View</Link>
                  </button>
                  <button
                    onClick={(e) => {
                      navigator.clipboard.writeText(Notes?.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    Copy
                  </button>
                  {/* <button>Share</button> */}
                  <button onClick={() => Deletenotes(Notes?._id)}>
                    Delete
                  </button>
                  </div>
                <div className="font-bold" >{Notes.createAt}</div>

                </div>
                
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
