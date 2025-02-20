import NewsPage from "./dashboard/news";
import SlideShow from "./dashboard/slideshow";
import Navbar from "./navigation/navbar";

export default function Home() {
  return (
      <div>
          <title> Studienportal </title>
          <Navbar/>
          <div className="flex gap-4 p-4">
              <div className="w-1/2"><SlideShow/></div>
              <div className="w-50%"><NewsPage/></div>
          </div>
      </div>
  );
}
