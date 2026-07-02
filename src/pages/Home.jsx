import PageTransition from '../components/common/PageTransition';
import Hero from '../components/home/Hero';
import WhyChoose from '../components/home/WhyChoose';
import Statistics from '../components/home/Statistics';
import FeaturedCourses from '../components/home/FeaturedCourses';
import StudentJourney from '../components/home/StudentJourney';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import GalleryPreview from '../components/home/GalleryPreview';
import LatestBlogs from '../components/home/LatestBlogs';

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <WhyChoose />
      <Statistics />
      <FeaturedCourses />
      <StudentJourney />
      <TestimonialsSlider />
      <GalleryPreview />
      <LatestBlogs />
    </PageTransition>
  );
};

export default Home;
