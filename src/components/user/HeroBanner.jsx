import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Discover Premium Products",
    subtitle: "Shop the latest trends with up to 50% off",
    cta: "Shop Now",
    link: "/products",
    bgClass: "from-indigo-600 to-indigo-800"
  },
  {
    id: 2,
    title: "New Arrivals Are Here",
    subtitle: "Be the first to explore our newest collection",
    cta: "Explore",
    link: "/products?sort=newest",
    bgClass: "from-emerald-600 to-emerald-800"
  },
  {
    id: 3,
    title: "Flash Sale - Limited Time",
    subtitle: "Don't miss out on incredible deals",
    cta: "View Deals",
    link: "/products?tag=bestseller",
    bgClass: "from-rose-600 to-rose-800"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bgClass} transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black/10 blur-3xl"></div>
          
          <div className="container-custom h-full flex flex-col justify-center items-center text-center relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {slide.subtitle}
            </p>
            <Link
              to={slide.link}
              className="btn-accent px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
