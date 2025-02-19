import ImageSlider from "./dashboard/slideshow";
import Navbar from "./navigation/navbar";

export default function Home() {
  return (
      <div>
          <Navbar/>
          <ImageSlider />
          <div className="flex min-h-screen place-content-end">
              <div className="bg-gray-200 p-6 rounded-lg shadow-md w-[400px] h-[600px] mr-32 mt-16">
                  <p className="text-lg font-medium text-center">Neuigkeiten & Aktivitäten</p>
              </div>
          </div>
      </div>
  );
}
