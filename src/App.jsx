import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from "./Context/UserContext";

function App() {

  const routes = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> }
    ]
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> }])
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
