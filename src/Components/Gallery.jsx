import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import Pagination from "./Pagination";
import FilterOptions from "./FilterOptions";
import { createClient } from "pexels";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const api_key = "4UAfDdBkVDuXJ5htSGN3WAfKEWEltJV45pBopLx135ZZqh1Lf1QO0zyz";
  const client = createClient(api_key);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [filterCriteria, setFilterCriteria] = useState("");

  const fetchImages = async () => {
    try {
      const query = filterCriteria ? filterCriteria : "nature";
      const response = await client.photos.search({
        query,
        per_page: 12,
        page: currentPage,
      });
      setImages([...response.photos]);
      setTotalPages(response.total_results / 12);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [currentPage, filterCriteria, favorites]);

  const handleImageClick = async (image) => {
    setSelectedImage(image);
    try {
      const response = await client.photos.search({
        query: "nature",
        per_page: 12,
      });
      setSimilarImages([...response.photos]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setSimilarImages([]);
  };

  const toggleFavorite = (image) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === image.id)) {
        return prevFavorites.filter((fav) => fav.id !== image.id);
      } else {
        return [...prevFavorites, image];
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-6xl font-[voyage] mb-4 text-center">Image Gallery</h1>
      <FilterOptions setFilterCriteria={setFilterCriteria} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images && images.length > 0 ? (
          images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onImageClick={handleImageClick}
              isFavorite={favorites.some((fav) => fav.id === image.id)}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          similarImages={similarImages}
          onClose={handleModalClose}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Gallery;
