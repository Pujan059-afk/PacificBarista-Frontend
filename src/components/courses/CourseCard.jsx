import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { IconCoffee } from '../ui/Icons';

const levelVariant = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

const CourseCard = ({ course, index = 0 }) => {
  const { title, slug, image, duration, level, shortDescription, price, currency, highlight } = course;
  const currencySymbol = currency === 'NPR' ? 'Rs.' : '$';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Card className="h-full flex flex-col">
        <div className="relative overflow-hidden">
          <div className="w-full h-52 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <IconCoffee className="w-14 h-14 text-cream/30" />
            )}
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant={levelVariant[level] || 'default'}>{level}</Badge>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-body font-medium text-primary flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <Link to={`/courses/${slug}`}>
            <h3 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
          </Link>
          {highlight && (
            <span className="inline-block text-accent font-body text-xs font-semibold mb-2">{highlight}</span>
          )}
          <p className="font-body text-text/60 text-sm leading-relaxed flex-1 mb-4">
            {shortDescription}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-primary/5">
            <span className="font-heading text-xl font-bold text-accent">{currencySymbol}. {price.toLocaleString()}/-</span>
            <Link
              to={`/courses/${slug}`}
              className="font-body text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
            >
              View Course &rarr;
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
