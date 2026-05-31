import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateIssue from "./pages/CreateIssue";
import MyIssues from "./pages/MyIssues";
import AllIssues from "./pages/AllIssues";
import IssueDetails from "./pages/IssueDetails";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/create-issue"
          element={<CreateIssue />}
        />

        <Route
          path="/my-issues"
          element={<MyIssues />}
        />

        <Route
          path="/all-issues"
          element={<AllIssues />}
        />

        <Route
          path="/issue/:id"
          element={<IssueDetails />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;