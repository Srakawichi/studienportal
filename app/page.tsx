"use client";
import NewsPage from "./dashboard/news";
import SlideShow from "./dashboard/slideshow";

export default function Home() {

    return (
        <div>
            <div className="min-h-screen bg-red-50">
                <title>Studienportal Yay</title>

                <div className="flex gap-0 p-4">

                    <div className="w-2/3">
                        <SlideShow/>
                    </div>

                    <div className="w-1/3 -ml-16">
                        <NewsPage/>
                    </div>
                </div>


                <div className="max-w-7xl mx-auto px-4 mt-12 text-center">
                    <h2 className="text-3xl font-semibold text-red-600">Dein Weg zu einer erfolgreichen Zukunft beginnt
                        hier!</h2>
                    <p className="mt-4 text-lg text-gray-700">Nutze die besten Ressourcen, lerne von Experten und wachse
                        mit uns. Dein Studium, dein Erfolg, deine Zukunft!</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-12">
                    <h2 className="text-2xl font-semibold text-center text-red-600">Unser Standort</h2>
                    <div className="mt-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2184356902367!2d13.383538177307809!3d52.51138587205899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851cfe93c9055%3A0xa9b9fb9fef147409!2sBotschaft%20der%20Demokratischen%20Volksrepublik%20Korea!5e0!3m2!1sde!2sde!4v1740914530650!5m2!1sde!2sde"
                            width="100%" height="450" style={{border: 0}} allowFullScreen={true} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

                <div className="flex justify-around items-center bg-red-100 py-12">
                    <div className="text-center p-6">
                        <h3 className="text-xl font-semibold text-red-600">Neue Kurse</h3>
                        <p className="mt-2 text-gray-700">Bleibe immer auf dem neuesten Stand mit unseren neuesten
                            Kursen!</p>
                        <a href="/courseoverview" className="text-red-600 font-semibold hover:text-red-800 mt-4 block">Mehr
                            erfahren &rarr;</a>
                    </div>
                    <div className="text-center p-6">
                        <h3 className="text-xl font-semibold text-red-600">Studierenden-Ressourcen</h3>
                        <p className="mt-2 text-gray-700">Zugang zu allen notwendigen Ressourcen für deinen Erfolg!</p>
                        <a href="#resources" className="text-red-600 font-semibold hover:text-red-800 mt-4 block">Mehr
                            erfahren &rarr;</a>
                    </div>
                </div>

                <div id="impressum" className="flex justify-center mt-12">
                    <h1 className="text-4xl font-bold text-red-800">Impressum</h1>
                </div>
                <p className="text-center mt-4 text-lg text-gray-600">
                    Willkommen auf unserem Studienportal. Hier finden Sie alle wichtigen Informationen und Ressourcen,
                    die
                    Sie für Ihren Studienerfolg benötigen. Entdecken Sie neue Kurse, aktuelle Nachrichten und vieles
                    mehr.
                    Wir sind stets bemüht, Ihnen die besten Inhalte und Unterstützung zu bieten.
                </p>

                <footer className="bg-red-800 text-white text-center p-4 mt-12">
                    <p>&copy; 2025 Studienportal. Alle Rechte vorbehalten.</p>
                    <div className="mt-2">
                        <a href="#" className="text-red-400 hover:text-red-200 mx-2">Datenschutz</a>
                        <a href="#" className="text-red-400 hover:text-red-200 mx-2">AGB</a>
                    </div>
                </footer>

            </div>
        </div>
    );
}
