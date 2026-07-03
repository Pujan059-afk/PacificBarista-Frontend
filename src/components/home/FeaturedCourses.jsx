import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../animations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Loader from '../common/Loader';
import api from '../../services/api';
import { IconClock, IconCoffee, IconPalette, IconZap } from '../ui/Icons';

const courseStyles = {
  'foundation-barista-course': { gradient: 'from-amber-700 to-amber-900', Icon: IconCoffee, levelVariant: 'success' },
  'full-barista-course': { gradient: 'from-rose-700 to-rose-900', Icon: IconPalette, levelVariant: 'accent' },
  'advanced-barista-course': { gradient: 'from-blue-700 to-blue-900', Icon: IconZap, levelVariant: 'warning' },
};

const defaultStyle = { gradient: 'from-primary to-secondary', Icon: IconCoffee, levelVariant: 'default' };

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses?featured=true')
      .then((res) => setCourses(res.data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Featured Courses"
          title="Professional Training Programs"
          description="Complete international standard barista training package with Advance Latte Art, customer service standards, and food safety & health & safety measurements at work."
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : courses.length === 0 ? null : (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {courses.map((course, i) => {
              const style = courseStyles[course.slug] || defaultStyle;
              const formattedPrice = `Rs. ${course.price.toLocaleString()}`;
              const LevelIcon = style.Icon;
              return (
                <motion.div
                  key={course._id || i}
                  variants={fadeIn('up')}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <Link to={`/courses/${course.slug}`} className="block">
                    <div
                      className={`relative h-48 bg-gradient-to-br ${style.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      <LevelIcon className="w-16 h-16 text-white/80" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={style.levelVariant}>{course.level}</Badge>
                      <span className="flex items-center gap-1 text-text/50 text-xs font-body">
                        <IconClock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>

                    <Link to={`/courses/${course.slug}`}>
                      <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="font-body text-text/60 text-sm leading-relaxed mb-4 line-clamp-2">
                      {course.shortDescription || course.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="font-heading text-xl font-bold text-accent">{formattedPrice}</span>
                      <Link to={`/courses/${course.slug}`}>
                        <Button variant="outline" size="sm">View Course</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;
