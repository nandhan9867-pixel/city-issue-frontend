import { useEffect, useState } from "react";
import api from "../api/axios";

function UserDashboard() {

  const [data, setData] = useState({});

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {

    api.get("/api/dashboard/user")
      .then(res => {
        setData(res.data);
      });

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="bg-[#2E073F] text-white p-5 flex justify-between">

        <h1 className="text-2xl font-bold">
          Citizen Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <div className="p-8">

        <div className="flex gap-4 mb-8">

          <a
            href="/create-issue"
            className="bg-[#7A1CAC] text-white px-6 py-3 rounded"
          >
            Create Issue
          </a>

          <a
            href="/my-issues"
            className="bg-[#AD49E1] text-white px-6 py-3 rounded"
          >
            My Issues
          </a>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded p-5">
            <h3>Total Issues</h3>
            <p className="text-3xl font-bold">
              {data.myIssues}
            </p>
          </div>

          <div className="bg-yellow-100 shadow rounded p-5">
            <h3>Pending</h3>
            <p className="text-3xl font-bold">
              {data.pending}
            </p>
          </div>

          <div className="bg-blue-100 shadow rounded p-5">
            <h3>In Progress</h3>
            <p className="text-3xl font-bold">
              {data.inProgress}
            </p>
          </div>

          <div className="bg-green-100 shadow rounded p-5">
            <h3>Solved</h3>
            <p className="text-3xl font-bold">
              {data.solved}
            </p>
          </div>

        </div>

      </div>

    </div>

  );

}

export default UserDashboard;