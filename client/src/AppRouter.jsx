import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import UserList from "./pages/User/UserList.jsx";
import CreateUser from "./pages/User/CreateUser.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/list" element={<UserList />} />
      <Route path="/user/create" element={<CreateUser />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
