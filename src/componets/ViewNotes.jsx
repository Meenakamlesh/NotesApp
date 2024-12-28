import React from "react";
import "./Home.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const ViewNotes = () => {
  const { id } = useParams(); // Get the id from URL parameters

  const allnotes = useSelector((state) => state.Notes.Notes);

  const foundNote = allnotes.find((note) => note._id === id); // Use find to get a single matching note

  return foundNote ? ( // Check if foundNote is not null or undefined
    <>
      <div className="main-view  ">
        <div className="view-input">
          <input
            type="text"
            className="home-inputbox border-2 border-black text-black font-bold bg-white outline-none"
            placeholder="Enter Title here"
            value={foundNote.title || ""} // Access title from the found note
            disabled
          />
        </div>
        <div className="view-textarea  text-black font-bold bg-white outline-none ">
          <textarea
            className="resize-none"
            id="home-textarea"
            placeholder="Enter Your Content"
            rows={16}
            disabled
            value={foundNote.content || ""} // Access content from the found note
          ></textarea>
        </div>
      </div>
    </>
  ) : (
    <div className="text-black text-center ">Not available Notes!</div> // Handle cases where no note is found
  );
};
