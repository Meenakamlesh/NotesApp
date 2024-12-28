import React, { useState } from "react";
import "./Home.css";
import { data, Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToNotes, updateToNotes } from "../redux/noteSlice";
import Toaster, { toast } from "react-hot-toast";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [title, settitle] = useState("");
  const [value, setvalue] = useState("");
  const [Searchparams, setSearchparams] = useSearchParams();
  const NotesId = Searchparams.get("NotesId");
  const dispatch = useDispatch();
  const allnotes = useSelector((state) => state.Notes.Notes);

  useEffect(() => {
    if (NotesId) {
      const Notes = allnotes.find((n) => n._id === NotesId);
      settitle(Notes.title);
      setvalue(Notes.content);
    }
  }, [NotesId]);

  function Notes() {
    const formatDate = (date) => {
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
      const year = d.getFullYear();
      const hours = d.getHours().toString().padStart(2, "0");
      const minutes = d.getMinutes().toString().padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const notes = {
      title: title,
      content: value,
      _id: NotesId || Date.now().toString(20),
      createAt: formatDate(new Date()), // Use formatted date
    };

    // Check karte hain ki title aur content dono present hain ya nahi
    if (!title.trim() || title == "[@#%^*]") {
      toast("❌ Title is required and should not contain special characters!");
      return; // Stop the function here
    }

    if (!value.trim()) {
      toast("❌ Content is required!");
      return; // Function ko yahin stop karte hain
    }

    // Agar NotesId hai toh update karein, warna add karein
    if (NotesId) {
      dispatch(updateToNotes(notes));
      // toast("✅ Note updated successfully!");
    } else {
      dispatch(addToNotes(notes));
      // toast("✅ Note added successfully!");
    }

    // Fields reset karte hain
    settitle("");
    setvalue("");
    setSearchparams({});
  }

  return (
    <div className="home bg-white">
      <div className="home-inside ">
        <input
          type="text"
          className="home-inputbox bg-transparent border-2 border-black text-black"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button className="home-btn bg-blue-700 font-bold" onClick={Notes}>
          {NotesId ? "Update My Notes" : "Create My Notes"}
        </button>
        <div className="flex gap-1 mt-3 ml-3 cursor-pointer">
          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <NavLink to="/notes" className="w-full h-full" />
          </span>
          <span className="w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center">
            <NavLink to="/notes/:id" className="w-full h-full" />
          </span>
          <span className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
            {/* <NavLink to="/notes" className="w-full h-full" /> */}
          </span>
        </div>
        <div className="text-content">
          <textarea
            className="resize-none bg-white border-2 border-gray-700 text-black"
            id="home-textarea"
            placeholder="Enter Your Content"
            rows={16}
            value={value}
            onChange={(e) => setvalue(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
