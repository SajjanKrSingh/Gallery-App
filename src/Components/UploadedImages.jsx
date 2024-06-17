import React, { useState } from "react";

const UploadedImages = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        uploaded.push(e.target.result);
        if (uploaded.length === files.length) {
          setUploadedImages(uploaded);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center">Uploaded Images</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {uploadedImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded Image ${index}`}
            className="w-full h-48 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default UploadedImages;
