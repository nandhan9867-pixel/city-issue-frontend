import { useEffect, useState } from "react";
import api from "../api/axios";

function MyIssues() {

  const [issues,setIssues] =
  useState([]);

  useEffect(()=>{

    api.get("/api/issues/my-issues")
    .then(res =>
      setIssues(res.data.data)
    );

  },[]);

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Issues
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {
          issues.map(issue => (

            <div
              key={issue.id}
              className="bg-white rounded-xl shadow p-5"
            >

              {
                issue.image_url && (

                  <img
                    src={`http://localhost:5000/uploads/${issue.image_url}`}
                    alt=""
                    className="w-full h-48 object-cover rounded mb-4"
                  />

                )
              }

              <h3 className="font-bold text-xl mb-2">
                {issue.title}
              </h3>

              <p className="mb-2">
                {issue.description}
              </p>

              <p>
                Status:
                <span className="font-bold ml-2">
                  {issue.status}
                </span>
              </p>

              <p>
                Priority:
                <span className="font-bold ml-2">
                  {issue.priority}
                </span>
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default MyIssues;