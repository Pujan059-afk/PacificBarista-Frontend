import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowLeft, FiLinkedin, FiTwitter, FiFacebook, FiArrowRight, FiClock } from 'react-icons/fi';
import Badge from '../components/ui/Badge';
import PageTransition from '../components/common/PageTransition';
import { fadeIn } from '../animations/index';

const posts = {
  'art-of-espresso-beginners-guide': {
    title: 'The Art of Espresso: A Beginner\'s Guide',
    category: 'Training',
    date: 'June 28, 2026',
    author: 'James Rodriguez',
    readTime: '8 min read',
    gradient: 'from-amber-600 to-orange-400',
    content: `
      <p>Espresso is more than just a coffee brewing method — it's a science and an art form. In this guide, we'll walk you through everything you need to know to pull the perfect shot.</p>
      <h2>The Basics of Espresso</h2>
      <p>At its core, espresso is created by forcing hot water through finely-ground coffee under pressure. The result is a concentrated, flavorful shot with a characteristic layer of crema on top.</p>
      <p>The key variables that affect your espresso include grind size, dose, tamp pressure, water temperature, and extraction time. Mastering these will set you on the path to consistently excellent shots.</p>
      <h2>Choosing the Right Grind</h2>
      <p>Grind size is perhaps the most critical factor. Too coarse and your espresso will flow too quickly, resulting in a weak, sour shot. Too fine and the water will struggle to pass through, leading to over-extraction and bitterness.</p>
      <p>A good starting point is a grind that allows 25-30 seconds for a double shot. Adjust from there based on taste.</p>
      <h2>Dosing and Tamping</h2>
      <p>Consistency in dosing is essential. Use a scale to measure your dose — typically 18-20 grams for a double shot. Tamp with even pressure, keeping the tamper level to ensure uniform extraction.</p>
      <h2>Temperature and Pressure</h2>
      <p>Most espresso machines are set to around 90-96°C (195-205°F). The standard pressure is 9 bars. While you may not have control over these on basic machines, understanding their impact helps you diagnose issues.</p>
      <h2>Dialing In</h2>
      <p>Dialing in is the process of adjusting your variables to achieve the best-tasting shot. Start with a benchmark recipe, then adjust one variable at a time. Keep a log of your settings and tasting notes.</p>
      <p>Remember: great espresso takes practice. Don't be discouraged by early failures — every shot teaches you something new.</p>
    `,
  },
  'understanding-coffee-roast-profiles': {
    title: 'Understanding Coffee Roast Profiles',
    category: 'Coffee Science',
    date: 'June 22, 2026',
    author: 'Marcus Williams',
    readTime: '6 min read',
    gradient: 'from-emerald-600 to-teal-400',
    content: `
      <p>Coffee roasting is where green beans transform into the aromatic, flavorful beans we love. Understanding roast profiles helps you choose and brew better coffee.</p>
      <h2>Light Roast</h2>
      <p>Light roasts are roasted for the shortest time, preserving the bean's original characteristics. They have higher acidity, more complex floral and fruity notes, and a lighter body.</p>
      <h2>Medium Roast</h2>
      <p>Medium roasts strike a balance between acidity and body. They're the most common roast level, offering a well-rounded flavor profile with caramel sweetness and mild acidity.</p>
      <h2>Dark Roast</h2>
      <p>Dark roasts develop rich, bold flavors with low acidity. The roasting process brings out chocolate, nutty, and smoky notes, but can mask the bean's origin characteristics.</p>
    `,
  },
};

const relatedPosts = [
  { title: 'The Science of Milk Texturing', slug: 'science-of-milk-texturing', gradient: 'from-violet-600 to-purple-400' },
  { title: '5 Essential Latte Art Patterns for Beginners', slug: 'essential-latte-art-patterns-beginners', gradient: 'from-rose-500 to-pink-400' },
  { title: 'Choosing the Right Coffee Beans for Your Café', slug: 'choosing-right-coffee-beans-cafe', gradient: 'from-blue-600 to-cyan-400' },
];

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts[slug];

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
          <div className="text-center">
            <h1 className="font-heading text-6xl text-primary font-bold">404</h1>
            <p className="font-body text-text/60 mt-2">Post not found</p>
            <Link to="/blog" className="inline-block mt-4 text-accent hover:underline font-body">Back to Blog</Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | Pacific Barista Academy</title>
        <meta name="description" content={post.content.replace(/<[^>]+>/g, '').slice(0, 160)} />
        <meta property="og:title" content={`${post.title} | Pacific Barista Academy`} />
        <meta property="og:description" content={post.content.replace(/<[^>]+>/g, '').slice(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
      </Helmet>

      <section className="relative bg-primary text-cream pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-custom relative z-10">
          <motion.div variants={fadeIn('up')} initial="hidden" animate="show">
            <Link to="/blog" className="inline-flex items-center gap-2 text-cream/70 hover:text-accent font-body text-sm mb-6 transition-colors">
              <FiArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="max-w-4xl">
              <Badge variant="accent" className="mb-4">{post.category}</Badge>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-cream/70 font-body text-sm">
                <span className="flex items-center gap-1"><FiUser className="w-4 h-4" />{post.author}</span>
                <span className="flex items-center gap-1"><FiCalendar className="w-4 h-4" />{post.date}</span>
                <span className="flex items-center gap-1"><FiClock className="w-4 h-4" />{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className={`w-full h-64 md:h-80 bg-gradient-to-br ${post.gradient} rounded-2xl flex items-center justify-center mb-10`}>
              <span className="text-4xl font-heading font-bold text-white/20 uppercase tracking-widest">{post.category}</span>
            </motion.div>

            <motion.article
              variants={fadeIn('up', 0.1)}
              initial="hidden"
              animate="show"
              className="prose prose-lg max-w-none font-body text-text/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <motion.div variants={fadeIn('up', 0.2)} initial="hidden" animate="show" className="mt-10 pt-8 border-t border-primary/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-body text-sm text-text/60">Share this article:</span>
                <div className="flex gap-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                    <FiFacebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                    <FiTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <motion.div key={i} variants={fadeIn('up', i * 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <Link to={`/blog/${rp.slug}`} className="group block">
                    <div className={`h-32 bg-gradient-to-br ${rp.gradient} rounded-xl flex items-center justify-center mb-3`}>
                      <span className="font-heading text-lg font-bold text-white/20 uppercase tracking-widest">Article</span>
                    </div>
                    <h3 className="font-heading text-base font-bold text-primary group-hover:text-accent transition-colors duration-300">{rp.title}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default BlogPost;
