import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("upload image");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-200">
      <div className="w-full max-w-md bg-gradient-to-r from-red-400 to-purple-500 shadow-lg rounded-lg overflow-hidden p-8">
        <div className="flex items-center justify-center relative">
          <img
            src={selectedImg || authUser.profilePic || "/profile-icon.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right ml-20"
          >
            <img
              src="/cam-icon.png"
              alt="Edit"
              className="w-8 h-8 cursor-pointer rounded-full"
            />
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {authUser.firstName}
          </h2>
          <p className="text-xl text-gray-600 mt-2">{authUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
