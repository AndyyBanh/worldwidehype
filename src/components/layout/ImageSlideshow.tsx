'use client';

import Image from 'next/image';
import React from 'react';

const images = [
  { src: '/image1.jpg', alt: 'Showcase 1' },
  { src: '/image2.jpg', alt: 'Showcase 2' },
  { src: '/image3.jpg', alt: 'Showcase 3' },
  { src: '/image4.jpg', alt: 'Showcase 4' },
  { src: '/image5.jpg', alt: 'Showcase 5' },
  { src: '/image 6.jpg', alt: 'Showcase 6' },
];

// Duplicate images for seamless infinite loop
const duplicatedImages = [...images, ...images];

export default function ImageSlideshow() {
  return (
    <section className='w-full overflow-hidden pt-4 pb-24'>
      <div className='slideshow-track'>
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className='slideshow-slide'
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className='object-cover rounded-xl'
              sizes='(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px'
            />
          </div>
        ))}
      </div>
    </section>
  );
}
