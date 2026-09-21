import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group block relative rounded-xl overflow-hidden aspect-[4/3] shadow-card hover:shadow-card-hover transition-all"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90 opacity-70"
        style={{ background: `linear-gradient(to top, ${category.color || '#000'}, transparent)` }}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          {category.name}
        </h3>
        <p className="text-white/80 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
          {category.count} Products
        </p>
      </div>
    </Link>
  );
}
