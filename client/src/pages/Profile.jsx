import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("IT is default bio");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form data submission here
    console.log({ name, bio, selectedImg });
    navigate("/");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImg(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          className="flex flex-col gap-5 p-10 flex-1"
          onSubmit={handleSubmit}
        >
          <h3 className="text-lg">Profile Details</h3>

          {/* File Input */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
              onChange={handleImageChange}
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt="avatar"
              className={`w-12 h-12 object-cover ${
                selectedImg ? "rounded-full" : ""
              }`}
            />
            Upload profile picture
          </label>

          {/* Name Input */}
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Bio Input */}
          <textarea
            name="bio"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
            rows={4}
          ></textarea>

          {/* Save Button */}
          <button
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </form>

        {/* Side Image */}
        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          src={assets.logo_icon}
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Profile;
