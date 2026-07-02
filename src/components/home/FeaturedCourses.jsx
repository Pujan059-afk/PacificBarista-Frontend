import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../animations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { FiClock } from 'react-icons/fi';

const courses = [
  {
    title: 'Espresso Fundamentals',
    slug: 'espresso-fundamentals',
    duration: '4 Weeks',
    level: 'Beginner',
    levelVariant: 'success',
    description: 'Master the art of espresso extraction, from grind size to tamping pressure and perfect crema.',
    price: '$499',
    gradient: 'from-amber-700 to-amber-900',
    emoji: '☕',
  },
  {
    title: 'Latte Art Mastery',
    slug: 'latte-art-mastery',
    duration: '6 Weeks',
    level: 'Intermediate',
    levelVariant: 'accent',
    description: 'Create stunning latte art patterns from basic hearts to intricate swans and rosettas.',
    price: '$699',
    gradient: 'from-rose-700 to-rose-900',
    emoji: '🎨',
  },
  {
    title: 'Advanced Brewing',
    slug: 'advanced-brewing',
    duration: '8 Weeks',
    level: 'Advanced',
    levelVariant: 'warning',
    description: 'Explore pour-over, siphon, cold brew, and other advanced manual brewing techniques.',
    price: '$899',
    gradient: 'from-blue-700 to-blue-900',
    emoji: '⚗️',
  },
  {
    title: 'Coffee Business',
    slug: 'coffee-business',
    duration: '12 Weeks',
    level: 'Professional',
    levelVariant: 'default',
    description: 'Complete business training for opening and running your own successful coffee shop.',
    price: '$1,299',
    gradient: 'from-emerald-700 to-emerald-900',
    emoji: '🏪',
  },
];

const FeaturedCourses = () => {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Featured Courses"
          title="Professional Training Programs"
          description="Choose from our comprehensive range of barista training programs designed for every skill level."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {courses.map((course, i) => (
            <motion.div
              key={i}
              variants={fadeIn('up')}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Link to={`/courses/${course.slug}`} className="block">
                <div
                  className={`relative h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <span className="text-6xl select-none">{course.emoji}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </Link>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={course.levelVariant}>{course.level}</Badge>
                  <span className="flex items-center gap-1 text-text/50 text-xs font-body">
                    <FiClock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>

                <Link to={`/courses/${course.slug}`}>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {course.title}
                  </h3>
                </Link>

                <p className="font-body text-text/60 text-sm leading-relaxed mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-heading text-xl font-bold text-accent">{course.price}</span>
                  <Link to={`/courses/${course.slug}`}>
                    <Button variant="outline" size="sm">View Course</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
