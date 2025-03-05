import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { useChatStore } from '../store/useChatStore';

const ChatInput = () => {
  const {sendMessage} = useChatStore()
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);

  const compressImage = async (image) => {
      
      if (!image) return;
      
      const options = {
        maxSizeMB: 0.05, // 50KB
        maxWidthOrHeight: 512,
        useWebWorker: true,
      };
  
      try {
        const compressedFile = await imageCompression(image, options);
        return compressedFile
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    };
  

  const handlePhotoChange =async (event) => {
    const file =await compressImage(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (e) => {
    e.preventDefault()
    const data = {text:message,image:photo}
    sendMessage(data)
    setMessage('');
    setPhoto(null);
  };

  const handleCancelPhoto = () => {
    setPhoto(null);
  };

  return (
    <form className="px-4 pb-5 bg-pink-200 relative bottom-0 w-full ">
      {photo && (
        <div className="mb-4 relative">
          <img src={photo} alt="Preview" className="w-24 h-24 object-cover rounded bg-red-400" />
          <button
            onClick={handleCancelPhoto}
            className="absolute top-0 left-0 rounded-br-lg p-1 bg-white text-black"
          >
            &#x2715;
          </button>
        </div>
      )}
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded bg-white text-gray-800"
          placeholder="Type your message..."
        />
        <label htmlFor="photo-upload" className="ml-2 cursor-pointer">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <span className="p-2 bg-purple-500 text-white rounded text-nowrap">Add Photo</span>
        </label>
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-red-400 text-white rounded"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
