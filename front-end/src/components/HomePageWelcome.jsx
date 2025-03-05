import React from "react";

const HomePageWelcome = () => {
  return (
    <div className="bg-pink-200 text-gray-800 p-4 h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Our Chat Application!
      </h1>
      <p className="text-lg mb-8">
        Please select a contact from the list on the left to start chatting.
      </p>
    </div>
  );
};

export default HomePageWelcome;
