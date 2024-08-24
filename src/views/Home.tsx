import { FeaturedCategories } from "@/components/Home/FeaturedCategories";
import { HeroSection } from "@/components/Home/HeroSection";
import "swiper/css";
import "@/assets/css/pagination.css";
import { NewProducts } from "@/components/Home/NewProducts";
import { FeaturedProducts } from "@/components/Home/FeaturedProducts";
import { BestSellers } from "@/components/Home/BestSellers";
import { Feedback } from "@/components/Home/Feedback";
import { Banner } from "@/components/Home/Banner";
import { SupportReturns } from "@/components/Home/SupportReturns";

const Home = () => {
  return (
    <>
    
      <FeaturedCategories />
      <NewProducts />
      <FeaturedProducts />
      <BestSellers />
      <Feedback />
      <Banner />
      <SupportReturns />
    </>
  );
};

export default Home;
