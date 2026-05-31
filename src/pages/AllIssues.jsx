import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function AllIssues(){

 const [issues,setIssues] =
 useState([]);

 useEffect(()=>{

  api.get("/api/issues")
  .then(res =>
   setIssues(res.data.data)
  );

 },[]);

 return(

  <div className="min-h-screen bg-slate-100 p-8">

   <h1 className="text-3xl font-bold mb-6">
    All Issues
   </h1>

   <div className="grid md:grid-cols-3 gap-6">

    {
     issues.map(issue => (

      <div
       key={issue.id}
       className="bg-white rounded-xl shadow p-5"
      >

       <h3 className="font-bold text-xl">
        {issue.title}
       </h3>

       <p>
        {issue.name}
       </p>

       <p>
        {issue.status}
       </p>

       <Link
        className="text-purple-700"
        to={`/issue/${issue.id}`}
       >
        View Details
       </Link>

      </div>

     ))
    }

   </div>

  </div>

 );

}

export default AllIssues;