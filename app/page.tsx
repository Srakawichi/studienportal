"use client";
import NewsPage from "./dashboard/news";
import SlideShow from "./dashboard/slideshow";

export default function Home() {

    return (
        <div>
            <title>Studienportal</title>
                <div className="flex gap-0 p-4">
                    <div className="w-2/3">
                        <SlideShow />
                    </div>
                    <div className="w-1/3 -ml-16">
                        <NewsPage />
                    </div>
                </div>
        </div>
    );
}
