import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Myprofile from "./pages/Myprofile";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import Library from "./pages/Library";
import Book from "./pages/Book";
import NewBook from "./pages/NewBook";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/my-profile",
      element: <Myprofile />,
    },{
      path: "/library",
      element: <Library/>,
    },
    {
      path: "/book/:id",
      element: <Book/>,
    },{
      path: "/newbook",
      element: <NewBook/>,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/users",
      element: <Users />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
