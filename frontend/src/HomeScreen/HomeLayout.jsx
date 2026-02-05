import BlogSection from "../BlogSection/BlogSection";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
import FeaturedCategories from "../Features/FeaturedCategories";
import Features from "../Features/Features";
import InstagramGallery from "../InstagramGallery/InstagramGallery";
import NewArrivals from "../NewArrivals/NewArrivals";
import PromoBanner from "../PromoBanner/PromoBanner";
import TestimonialSlider from "../Testimonial/TestimonialSlider";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import DualPromo from "./DualPromo";
import HeroSection from "./HeroSection";

export default function HomeLayout(){
    return(
        <>
        <HeroSection/>
        <Features/>
        <FeaturedCategories/>
        <NewArrivals/>
        <PromoBanner/>
        <TrendingProducts/>
        <DualPromo/>
        <FeatureProduct/>
        <TestimonialSlider/>
        <BlogSection limit={3}/>
        <InstagramGallery/>
        </>
    )
}