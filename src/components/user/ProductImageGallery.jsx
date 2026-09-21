import React, { useState } from 'react';

export default function ProductImageGallery({ images = [], productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  const mainImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 dark:border-gray-700 group cursor-crosshair relative">
        <img
          src={mainImage}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150 origin-center"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 snap-start transition-all ${
                activeIndex === idx ? 'border-primary-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
