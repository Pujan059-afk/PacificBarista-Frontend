import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../animations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { FiArrowRight } from 'react-icons/fi';

const images = [
  { gradient: 'from-amber-600 to-amber-800', span: 'lg:row-span-2 lg:col-span-2', label: 'Espresso Art', emoji: '☕' },
  { gradient: 'from-rose-600 to-rose-800', span: 'lg:col-span-2', label: 'Latte Art', emoji: '🎨' },
  { gradient: 'from-blue-600 to-blue-800', span: 'lg:col-span-1', label: 'Brewing Lab', emoji: '⚗️' },
  { gradient: 'from-emerald-600 to-emerald-800', span: 'lg:col-span-1', label: 'Student Workspace', emoji: '📚' },
  { gradient: 'from-purple-600 to-purple-800', span: 'lg:col-span-2', label: 'Graduation Day', emoji: '🎓' },
];

const GalleryPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Gallery"
          title="A Glimpse Into Our Academy"
          description="See our state-of-the-art facilities, students in action, and the vibrant coffee community at Pacific Barista."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[240px]"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeIn('up')}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${img.span}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${img.gradient} transition-transform duration-500 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
                <span className="text-4xl select-none">{img.emoji}</span>
                <span className="text-white font-heading font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/gallery">
            <Button variant="outline" size="lg" icon={FiArrowRight} iconPosition="right">
              View Full Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
