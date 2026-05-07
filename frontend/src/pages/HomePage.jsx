import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import Process from "../components/Home/Process";
import Blog from "../components/Home/Blog";

const HomePage = () => {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <Services />
      <Process />
      <Blog />
    </div>
  );
};

export default HomePage;
