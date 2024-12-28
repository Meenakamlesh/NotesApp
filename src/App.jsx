import "./App.css";
import Home from "./componets/Home";
import Navbar from "./componets/Navbar";
import Notes from "./componets/Notes";
import { ViewNotes } from "./componets/ViewNotes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/notes",
    element: (
      <div>
        <Navbar />
        <Notes />
      </div>
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <div>
        <Navbar />
        <ViewNotes />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
