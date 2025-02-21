"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/Uni4.jpg", "/Uni3.jpg", "/Uni1.jpg"];

export default function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Automatischer Wechsel alle 10s
    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative w-full max-w-5xl h-80 md:h-[500px] overflow-hidden">
                {images.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt="Slideshow Image"
                        fill
                        style={{ objectFit: "cover" }}
                        className={`rounded-lg absolute inset-0 transition-opacity duration-700 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                    />
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
