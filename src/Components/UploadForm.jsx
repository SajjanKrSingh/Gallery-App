import React, { useState, useEffect } from "react";

const Upload = () => {
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageType, setImageType] = useState("");
  const [uploadedImages, setUploadedImages] = useState(
    () => JSON.parse(localStorage.getItem("uploadedImages")) || []
  );

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  const handleLike = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages[index].liked = !updatedImages[index].liked;
    setUploadedImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newImage = { imageLink, description, imageType, liked: false };
    setUploadedImages([...uploadedImages, newImage]);
    setImageLink("");
    setDescription("");
    setImageType("");
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Upload Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="imageLink" className="block font-medium text-lg">
            Image Link:
          </label>
          <input
            type="text"
            id="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium text-lg">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="imageType" className="block font-medium text-lg">
            Image Type:
          </label>
          <input
            type="text"
            id="imageType"
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {uploadedImages.map((image, index) => (
          <div
            key={index}
            className="hover:scale-[1.05] ease-out duration-300 overflow-hidden cursor-pointer rounded-custom shadow-custom-neumorphism p-6 bg-gradient-to-r from-[#fff] to-[#f0f0f0] custom-gradient shadow-2xl"
          >
            <img
              src={image.imageLink}
              alt={image.description}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 flex justify-between items-center">
              <h2 className="text-base font-semibold">{image.description}</h2>
              <button
                className={`ri-heart-3-fill text-lg ${
                  image.liked ? "text-red-500" : "text-gray-400"
                } hover:text-red-600`}
                onClick={() => handleLike(index)}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
