import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

import {
  MapContainer,
  TileLayer,
  Marker
} from "react-leaflet";

function IssueDetails() {

  const { id } = useParams();

  const [issue, setIssue] =
    useState(null);

  const [status, setStatus] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  useEffect(() => {

    api.get(`/api/issues/${id}`)
      .then(res => {

        setIssue(
          res.data.data
        );

        setStatus(
          res.data.data.status
        );

      });

  }, [id]);

  const updateStatus =
    async () => {

      await api.put(
        `/api/issues/${id}/status`,
        {
          status,
          remarks
        }
      );

      alert(
        "Updated Successfully"
      );

    };

  if (!issue)
    return <h2>Loading...</h2>;

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        {
          issue.image_url && (

            <img
              src={`http://localhost:5000/uploads/${issue.image_url}`}
              alt=""
              className="w-full h-80 object-cover rounded mb-6"
            />

          )
        }

        <h1 className="text-3xl font-bold mb-4">
          {issue.title}
        </h1>

        <p className="mb-4">
          {issue.description}
        </p>

        <p className="mb-2">
          <strong>Address:</strong>
          {" "}
          {issue.location_address}
        </p>

        <p className="mb-2">
          <strong>Latitude:</strong>
          {" "}
          {issue.latitude}
        </p>

        <p className="mb-4">
          <strong>Longitude:</strong>
          {" "}
          {issue.longitude}
        </p>

        <div className="mb-6">

          <MapContainer
            center={[
              Number(issue.latitude),
              Number(issue.longitude)
            ]}
            zoom={16}
            style={{
              height: "400px",
              width: "100%"
            }}
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[
                Number(issue.latitude),
                Number(issue.longitude)
              ]}
            />

          </MapContainer>

        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="border p-3 rounded mb-4 w-full"
        >

          <option>
            Pending
          </option>

          <option>
            In Progress
          </option>

          <option>
            Solved
          </option>

        </select>

        <textarea
          className="w-full border p-3 rounded mb-4"
          placeholder="Remarks"
          onChange={(e) =>
            setRemarks(
              e.target.value
            )
          }
        />

        <button
          onClick={updateStatus}
          className="bg-[#7A1CAC] text-white px-6 py-3 rounded"
        >
          Update Status
        </button>

      </div>

    </div>

  );

}

export default IssueDetails;