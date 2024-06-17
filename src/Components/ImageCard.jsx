import React from 'react';

const ImageCard = ({ image, onImageClick, isFavorite, toggleFavorite }) => {
  return (
    <div
      className="hover:scale-[1.05] ease-out duration-300 overflow-hidden cursor-pointer rounded-custom shadow-custom-neumorphism p-6 bg-gradient-to-r from-[#fff] to-[#f0f0f0] custom-gradient shadow-2xl" 
      onClick={() => onImageClick(image)}
    >
      <img src={image.src.original} alt={image.photographer} className="w-full h-48 object-cover" />
      <div className="p-2 flex justify-between items-center">
        <h2 className="text-base font-semibold">{image.photographer}</h2>
        <i
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(image);
          }}
          className={`ri-heart-3-fill text-lg ease-out duration-300 ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-xl`}
        ></i>
      </div>
    </div>
  );
};

export default ImageCard;
