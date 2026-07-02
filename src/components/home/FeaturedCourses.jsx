import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../animations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { IconClock } from '../ui/Icons';

const courses = [
  {
    title: 'Basic Barista Training',
    slug: 'espresso-fundamentals',
    duration: '2 Weeks',
    level: 'Beginner',
    levelVariant: 'success',
    description: 'Learn espresso extraction, milk steaming, machine operation, and foundation barista skills from scratch.',
    price: 'Rs. 12,000',
    gradient: 'from-amber-700 to-amber-900',
    emoji: '☕',
  },
  {
    title: 'Latte Art & Design',
    slug: 'latte-art-mastery',
    duration: '4 Weeks',
    level: 'Intermediate',
    levelVariant: 'accent',
    description: 'Master pouring techniques — from hearts and tulips to swans and rosettas used in Nepali cafés.',
    price: 'Rs. 18,000',
    gradient: 'from-rose-700 to-rose-900',
    emoji: '🎨',
  },
  {
    title: 'Nepali Pour-Over & Manual Brewing',
    slug: 'advanced-brewing',
    duration: '3 Weeks',
    level: 'Intermediate',
    levelVariant: 'warning',
    description: 'Explore pour-over, siphon, French press, and cold brew methods popular in Nepal\'s specialty coffee scene.',
    price: 'Rs. 15,000',
    gradient: 'from-blue-700 to-blue-900',
    emoji: '⚗️',
  },
  {
    title: 'Coffee Roasting & Cupping',
    slug: 'coffee-science',
    duration: '6 Weeks',
    level: 'Professional',
    levelVariant: 'default',
    description: 'From Nepali green beans to perfect roast — learn roasting profiles, cupping, and sensory evaluation.',
    price: 'Rs. 25,000',
    gradient: 'from-emerald-700 to-emerald-900',
    emoji: '🫘',
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
