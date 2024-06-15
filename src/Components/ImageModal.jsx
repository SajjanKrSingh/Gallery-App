import React from 'react';
import ImageCard from './ImageCard';

const ImageModal = ({ image, similarImages, onClose }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-7xl w-full">
          <div className="relative">
            <img src={image.src.original} alt={image.photographer} className="w-full h-96 object-cover" />
            <button
              className="absolute top-2 right-2 text-white bg-gray-500 rounded-full p-2 hover:bg-gray-600"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{image.photographer}</h2>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Similar Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarImages.map((similarImage) => (
                  <ImageCard
                    key={similarImage.id}
                    image={similarImage}
                    onImageClick={onClose}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;