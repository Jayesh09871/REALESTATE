import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[40vh] flex items-center justify-center my-6 mx-6 rounded-2xl">
      {/* Radial Gradient Background Section */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          backgroundImage: `url('https://cdn.vectorstock.com/i/preview-2x/66/76/silhouette-buildings-in-new-york-city-downtown-vector-30036676.webp')`,
        }}
      />

      {/* Content Section */}
      <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl leading-relaxed">
          Have questions? We're here to help! Reach out for any inquiries about
          our property listings or services.
        </p>
      </div>
    </div>
  );
}
