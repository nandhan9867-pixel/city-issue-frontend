import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from "react-leaflet";

function ChangeMapView({ center }) {

  const map = useMap();

  map.setView(center, 16);

  return null;
}

function CreateIssue() {

  const [form, setForm] = useState({
    category_id: "",
    title: "",
    description: "",
    location_address: "",
    latitude: "",
    longitude: "",
    priority: "Medium"
  });

  const [position, setPosition] =
    useState([12.9716, 77.5946]);

  const [image, setImage] =
    useState(null);

  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(
      (pos) => {

        const lat =
          pos.coords.latitude;

        const lng =
          pos.coords.longitude;

        setPosition([lat, lng]);

        setForm(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng
        }));

      },
      () => {

        alert(
          "Issue Created Successfully"
        );

        setForm({
          category_id: "",
          title: "",
          description: "",
          location_address: "",
          latitude: "",
          longitude: "",
          priority: "Medium"
        });

        setImage(null);

        setPosition([
          12.9716,
          77.5946
        ]);

        navigate("/user-dashboard");

      }
    );

  };

  const submitIssue = async () => {

    try {

      const issueResponse =
        await api.post(
          "/api/issues",
          form
        );

      const issueId =
        issueResponse.data.issueId;

      if (image) {

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        await api.post(
          `/api/issues/${issueId}/upload-image`,
          formData
        );

      }

      alert(
        "Issue Created Successfully"
      );

    } catch {

      alert("Failed");

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Create Issue
        </h1>

        <input
          placeholder="Title"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
        />

        <textarea
          placeholder="Description"
          rows="5"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
        />

        <select
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              category_id: e.target.value
            })
          }
        >
          <option value="">
            Select Category
          </option>

          <option value="1">
            Road Damage
          </option>

          <option value="2">
            Garbage
          </option>

          <option value="3">
            Drainage
          </option>

          <option value="4">
            Water Leakage
          </option>

          <option value="5">
            Street Light
          </option>

        </select>

        <input
          placeholder="Address"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              location_address:
                e.target.value
            })
          }
        />

        <input
          value={form.latitude}
          readOnly
          placeholder="Latitude"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          value={form.longitude}
          readOnly
          placeholder="Longitude"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="file"
          className="mb-4"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <button
          type="button"
          onClick={getCurrentLocation}
          className="bg-green-600 text-white px-6 py-3 rounded mb-4 mr-4"
        >
          Get Current Location
        </button>

        <div className="mb-6">

          <MapContainer
            center={position}
            zoom={15}
            style={{
              height: "350px",
              width: "100%"
            }}
          >

            <ChangeMapView
              center={position}
            />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={position}
            />

          </MapContainer>

        </div>

        <button
          onClick={submitIssue}
          className="bg-[#7A1CAC] text-white px-6 py-3 rounded"
        >
          Submit Issue
        </button>

      </div>

    </div>

  );

}

export default CreateIssue;