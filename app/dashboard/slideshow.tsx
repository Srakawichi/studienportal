"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    "/Uni2.jpg",
    "/Uni3.jpg",
    "/Uni1.jpg"
];

export default function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const prevSlide = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            setIsFading(false);
        }, 500); // Übergangsdauer
    };

    const nextSlide = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            setIsFading(false);
        }, 800);
    };

    // Automatischer Bildwechsel
    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative w-full max-w-5xl h-80 md:h-[500px] overflow-hidden">
                <div className={`transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}>
                    <Image
                        src={images[currentIndex]}
                        alt="Slideshow Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
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
