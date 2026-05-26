import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MovieCard from './MovieCard';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative group/row space-y-3 px-6 md:px-12 select-none">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide hover:text-brand transition-colors duration-200 cursor-pointer inline-block">
        {title}
      </h2>

      {/* Slider Container */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.swiper-button-next-${title.replace(/\s+/g, '-')}`,
            prevEl: `.swiper-button-prev-${title.replace(/\s+/g, '-')}`,
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="movie-swiper !overflow-visible"
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={`${movie.imdbID || movie.movieId}-${idx}`} className="!h-auto">
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Controls */}
        <button
          className={`swiper-button-prev-${title.replace(/\s+/g, '-')} absolute left-0 top-1/2 -translate-y-1/2 -ml-6 md:-ml-10 z-10 w-10 h-16 bg-black/60 hover:bg-black/95 text-white flex items-center justify-center rounded-r-lg opacity-0 group-hover/row:opacity-100 transition-all duration-300 border border-l-0 border-neutral-800 disabled:!hidden cursor-pointer active:scale-95`}
        >
          <BiChevronLeft className="w-8 h-8" />
        </button>

        <button
          className={`swiper-button-next-${title.replace(/\s+/g, '-')} absolute right-0 top-1/2 -translate-y-1/2 -mr-6 md:-mr-10 z-10 w-10 h-16 bg-black/60 hover:bg-black/95 text-white flex items-center justify-center rounded-l-lg opacity-0 group-hover/row:opacity-100 transition-all duration-300 border border-r-0 border-neutral-800 disabled:!hidden cursor-pointer active:scale-95`}
        >
          <BiChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
