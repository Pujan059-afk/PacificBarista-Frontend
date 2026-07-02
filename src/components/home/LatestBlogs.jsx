import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../../animations';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { IconArrowRight, IconCalendar } from '../ui/Icons';

const blogs = [
  {
    slug: 'art-of-pour-over',
    title: 'The Art of Pour-Over: A Complete Guide',
    excerpt: 'Discover the techniques and tips for mastering the perfect pour-over coffee at home or in a professional setting.',
    date: 'June 15, 2026',
    gradient: 'from-amber-500 to-amber-700',
    emoji: '⚗️',
  },
  {
    slug: 'latte-art-tips',
    title: '5 Essential Latte Art Tips for Beginners',
    excerpt: 'Start your latte art journey with these fundamental techniques that every barista should know before attempting advanced designs.',
    date: 'June 8, 2026',
    gradient: 'from-rose-500 to-rose-700',
    emoji: '🎨',
  },
  {
    slug: 'coffee-bean-guide',
    title: 'Understanding Coffee Bean Origins & Roasts',
    excerpt: 'Learn how different growing regions and roast levels affect flavor profiles and how to choose the right beans for your brew.',
    date: 'June 1, 2026',
    gradient: 'from-emerald-500 to-emerald-700',
    emoji: '🫘',
  },
];

const LatestBlogs = () => {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Our Blog"
          title="Latest from Our Blog"
          description="Stay updated with the latest coffee trends, tips, and stories from the Pacific Barista community."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogs.map((blog, i) => (
            <motion.article
              key={i}
              variants={fadeIn('up')}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Link to={`/blog/${blog.slug}`} className="block">
                <div
                  className={`relative h-48 bg-gradient-to-br ${blog.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <span className="text-5xl select-none">{blog.emoji}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-2 text-text/40 text-xs font-body mb-3">
                  <IconCalendar className="w-3.5 h-3.5" />
                  <span>{blog.date}</span>
                </div>

                <Link to={`/blog/${blog.slug}`}>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                    {blog.title}
                  </h3>
                </Link>

                <p className="font-body text-text/60 text-sm leading-relaxed mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-accent font-body text-sm font-semibold hover:gap-2 transition-all duration-300"
                >
                  Read More
                  <IconArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/blog">
            <Button variant="outline" size="lg" icon={IconArrowRight} iconPosition="right">
              View All Posts
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlogs;
