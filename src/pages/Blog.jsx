import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageTransition from '../components/common/PageTransition';
import { fadeIn, staggerContainer } from '../animations/index';

const posts = [
  {
    id: 1,
    title: 'The Art of Espresso: A Beginner\'s Guide',
    category: 'Training',
    date: 'June 28, 2026',
    author: 'James Rodriguez',
    excerpt: 'Master the fundamentals of espresso extraction with our comprehensive guide. From grind size to tamping pressure, learn what makes the perfect shot.',
    slug: 'art-of-espresso-beginners-guide',
    gradient: 'from-amber-600 to-orange-400',
  },
  {
    id: 2,
    title: 'Understanding Coffee Roast Profiles',
    category: 'Coffee Science',
    date: 'June 22, 2026',
    author: 'Marcus Williams',
    excerpt: 'Dive into the science of coffee roasting and understand how different roast levels affect flavor, aroma, and body.',
    slug: 'understanding-coffee-roast-profiles',
    gradient: 'from-emerald-600 to-teal-400',
  },
  {
    id: 3,
    title: '5 Essential Latte Art Patterns for Beginners',
    category: 'Techniques',
    date: 'June 15, 2026',
    author: 'Elena Kowalski',
    excerpt: 'Start your latte art journey with these five fundamental patterns. Practice tips and common mistakes to avoid.',
    slug: 'essential-latte-art-patterns-beginners',
    gradient: 'from-rose-500 to-pink-400',
  },
  {
    id: 4,
    title: 'Choosing the Right Coffee Beans for Your Café',
    category: 'Business',
    date: 'June 8, 2026',
    author: 'David Park',
    excerpt: 'A comprehensive guide to selecting coffee beans for your café, covering origin, roast level, and supplier relationships.',
    slug: 'choosing-right-coffee-beans-cafe',
    gradient: 'from-blue-600 to-cyan-400',
  },
  {
    id: 5,
    title: 'The Science of Milk Texturing',
    category: 'Training',
    date: 'June 1, 2026',
    author: 'Sarah Chen',
    excerpt: 'Perfect microfoam is the foundation of great milk-based drinks. Learn the physics and technique behind silky smooth milk.',
    slug: 'science-of-milk-texturing',
    gradient: 'from-violet-600 to-purple-400',
  },
  {
    id: 6,
    title: 'Coffee Trends to Watch in 2026',
    category: 'Industry',
    date: 'May 25, 2026',
    author: 'Ana Martinez',
    excerpt: 'Stay ahead of the curve with our predictions for the biggest coffee trends shaping the specialty coffee industry.',
    slug: 'coffee-trends-2026',
    gradient: 'from-indigo-600 to-blue-400',
  },
];

const categories = ['All', 'Training', 'Coffee Science', 'Techniques', 'Business', 'Industry'];

const ITEMS_PER_PAGE = 4;

const Blog = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = posts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Our Blog | Pacific Barista Academy</title>
        <meta name="description" content="Explore the Pacific Barista Academy blog for coffee tips, training guides, industry insights, and barista stories." />
        <meta property="og:title" content="Our Blog | Pacific Barista Academy" />
        <meta property="og:description" content="Explore the Pacific Barista Academy blog for coffee tips and training guides." />
      </Helmet>

      <section className="relative bg-primary text-cream pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-custom relative z-10">
          <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-accent font-body font-semibold text-sm uppercase tracking-[0.2em] mb-4">Blog</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Our <span className="text-accent">Blog</span>
            </h1>
            <p className="font-body text-cream/80 text-lg md:text-xl leading-relaxed">
              Insights, guides, and stories from the Pacific Barista community.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
      </section>

      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                  className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-white text-text/60 hover:text-accent border border-primary/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text/30 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-primary/10 rounded-lg font-body text-sm outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,60,0.1)] transition-all duration-300"
              />
            </div>
          </div>

          <motion.div
            key={activeCategory + search + currentPage}
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8"
          >
            {paginated.map((post, i) => (
              <motion.div
                key={post.id}
                variants={fadeIn('up', i * 0.1)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className={`h-52 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative`}>
                    <span className="text-2xl font-heading font-bold text-white/30 uppercase tracking-widest">{post.category}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="accent">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-text/50 font-body">
                      <FiCalendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="font-body text-text/70 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-primary/5">
                    <span className="flex items-center gap-1 text-xs text-text/50 font-body">
                      <FiUser className="w-3 h-3" />
                      {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-accent font-body text-sm font-medium hover:gap-2 transition-all duration-300"
                    >
                      Read More <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {paginated.length === 0 && (
            <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center py-16">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-8 h-8 text-accent" />
              </div>
              <p className="font-body text-text/60 text-lg">No articles found matching your criteria.</p>
            </motion.div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-primary/10 text-text/60 hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-body font-medium text-sm transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-white border border-primary/10 text-text/60 hover:text-accent'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-primary/10 text-text/60 hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Blog;
