import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import UserList from "./pages/User/UserList.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/list" element={<UserList />} />
      {/* <Route path="/user/create" element={<UserList />} /> */}
      {/* // TODO Pending task - Create NotFoundPage component */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
