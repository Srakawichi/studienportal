"use client";

import { useEffect, useState } from "react";

interface NewsItem {
    id: number;
    title: string;
    content: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("/api/news"); // REST-API aufrufen
                if (!response.ok) throw new Error("Fehler beim Laden der News");

                const data: NewsItem[] = await response.json();
                setNews(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-lg mr-16">
            <h2 className="text-xl font-bold mb-4">Neuigkeiten</h2>
            {news.length > 0 ? (
                news.map((item) => (
                    <div key={item.id} className="mb-4 p-2 border rounded bg-white shadow">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p>{item.content}</p>
                    </div>
                ))
            ) : (
                <p>Lade Neuigkeiten...</p>
            )}
        </div>
    );
}
