import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/ui/SectionTitle';
import CourseCard from '../components/courses/CourseCard';
import CourseFilter from '../components/courses/CourseFilter';
import Loader from '../components/common/Loader';
import api from '../services/api';
import { staggerContainer, fadeIn } from '../animations';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesLevel = activeLevel === 'all' || course.level?.toLowerCase() === activeLevel;
      const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [activeLevel, searchQuery, courses]);

  if (loading) return <Loader />;

  return (
    <PageTransition>
      <Helmet>
        <title>Our Courses | Pacific Barista Academy</title>
        <meta name="description" content="Explore our range of professional barista training courses — from espresso fundamentals to full certification." />
      </Helmet>

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 border border-accent/20 rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-accent/10 rounded-full" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            <span className="inline-block text-accent font-body font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Start Your Journey
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              Barista Course Detail
            </h1>
            <p className="font-body text-cream/60 text-lg max-w-2xl mx-auto">
              Roast Your Barista Skill — from foundation to mastery.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn('up')}
            initial="hidden"
            animate="show"
            className="mt-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <p className="font-body text-cream/90 text-base leading-relaxed text-center">
              We provide complete international standard barista training package, Advance Latte Art. Including customer service standards, food safety measurements and health & safety measurements at work.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <CourseFilter
            activeLevel={activeLevel}
            onFilterChange={setActiveLevel}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {filteredCourses.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={fadeIn('up')}
              initial="hidden"
              animate="show"
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">No courses found</h3>
              <p className="font-body text-text/60">Try adjusting your filters or search term.</p>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Courses;
