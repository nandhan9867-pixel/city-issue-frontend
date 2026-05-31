import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminDashboard() {

  const [data, setData] = useState({});

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {

    api.get("/api/dashboard/admin")
      .then(res => {
        setData(res.data);
      });

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="bg-[#2E073F] text-white p-5 flex justify-between">

        <h1 className="text-2xl font-bold">
          Municipality Admin
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <div className="p-8">

        <a
          href="/all-issues"
          className="bg-[#7A1CAC] text-white px-6 py-3 rounded inline-block mb-8"
        >
          View All Issues
        </a>

        <div className="grid md:grid-cols-5 gap-5">

          <div className="bg-white shadow rounded p-5">
            <h3>Users</h3>
            <p className="text-3xl font-bold">
              {data.totalUsers}
            </p>
          </div>

          <div className="bg-white shadow rounded p-5">
            <h3>Issues</h3>
            <p className="text-3xl font-bold">
              {data.totalIssues}
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

export default AdminDashboard;