import React from 'react';

const PhotoGallery = () => {
  // Mock photo data
  const photos = [
    { url: 'https://via.placeholder.com/150', description: 'Photo 1' },
    { url: 'https://via.placeholder.com/150', description: 'Photo 2' },
    { url: 'https://via.placeholder.com/150', description: 'Photo 3' },
  ];

  return (
    <div>
      <h2>Photo Gallery</h2>
      <div className="photo-gallery">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.url} alt={photo.description} />
            <p>{photo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
