import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiStar, FiPlay } from 'react-icons/fi';
import Badge from '../components/ui/Badge';
import PageTransition from '../components/common/PageTransition';
import { fadeIn, staggerContainer } from '../animations/index';

const courses = ['All', 'Foundation', 'Professional', 'Master', 'Workshop'];

const testimonials = [
  {
    id: 1,
    name: 'Sophie Anderson',
    course: 'Professional',
    rating: 5,
    content: 'Pacific Barista Academy completely transformed my career. The hands-on training and expert mentorship gave me the confidence to open my own specialty café. The curriculum is world-class.',
    gradient: 'from-amber-500 to-orange-400',
    featured: true,
    video: false,
  },
  {
    id: 2,
    name: 'Michael Torres',
    course: 'Foundation',
    rating: 5,
    content: 'I started with zero knowledge about coffee. The foundation course was incredibly well-structured. Within weeks I was pulling consistent shots and pouring basic latte art.',
    gradient: 'from-rose-500 to-pink-400',
    featured: false,
    video: false,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    course: 'Master',
    rating: 5,
    content: 'The Master Barista program pushed me to new heights. The competition coaching and sensory training were invaluable. I placed 3rd in the national championships!',
    gradient: 'from-violet-500 to-purple-400',
    featured: false,
    video: true,
  },
  {
    id: 4,
    name: 'James Mitchell',
    course: 'Workshop',
    rating: 4,
    content: 'Attended the Latte Art Masterclass and it was amazing. James is a fantastic instructor who breaks down complex patterns into manageable steps.',
    gradient: 'from-emerald-500 to-teal-400',
    featured: false,
    video: false,
  },
  {
    id: 5,
    name: 'Emma Richardson',
    course: 'Professional',
    rating: 5,
    content: 'The facilities are top-notch and the trainers genuinely care about your progress. The Professional Diploma gave me the skills to become head barista at a renowned coffee house.',
    gradient: 'from-blue-500 to-cyan-400',
    featured: false,
    video: true,
  },
  {
    id: 6,
    name: 'Daniel Kim',
    course: 'Foundation',
    rating: 5,
    content: 'Great atmosphere and excellent teaching methodology. The small class sizes meant plenty of one-on-one time with instructors. Highly recommend!',
    gradient: 'from-indigo-500 to-blue-400',
    featured: false,
    video: false,
  },
  {
    id: 7,
    name: 'Aisha Patel',
    course: 'Master',
    rating: 5,
    content: 'The Q-Grader preparation course was intense but incredibly rewarding. I passed my certification on the first try thanks to the thorough training.',
    gradient: 'from-amber-600 to-yellow-400',
    featured: false,
    video: false,
  },
  {
    id: 8,
    name: 'Carlos Mendoza',
    course: 'Workshop',
    rating: 5,
    content: 'The Espresso Science Workshop changed how I approach brewing. Understanding the physics behind extraction made me a better barista overnight.',
    gradient: 'from-green-500 to-emerald-400',
    featured: false,
    video: true,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <FiStar
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-accent fill-accent' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ t, featured }) => (
  <motion.div
    variants={fadeIn('up')}
    className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-primary/5 ${
      featured ? 'md:col-span-2 md:flex' : ''
    }`}
  >
    {t.video && (
      <div className={`${featured ? 'md:w-1/2' : ''} relative bg-gradient-to-br ${t.gradient} h-48 flex items-center justify-center cursor-pointer group`}>
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FiPlay className="w-7 h-7 text-white ml-0.5" />
        </div>
      </div>
    )}
    <div className={`p-6 ${featured && t.video ? 'md:w-1/2' : ''}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
          <span className="text-lg font-heading font-bold text-white">{t.name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div>
          <h3 className="font-heading font-bold text-primary">{t.name}</h3>
          <Badge variant="accent">{t.course}</Badge>
        </div>
      </div>
      <StarRating rating={t.rating} />
      <p className="font-body text-text/70 text-sm leading-relaxed mt-3 italic">"{t.content}"</p>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? testimonials
    : testimonials.filter((t) => t.course === filter);

  const featured = filtered.find((t) => t.featured);
  const rest = filtered.filter((t) => !t.featured);

  return (
    <PageTransition>
      <Helmet>
        <title>Student Success Stories | Pacific Barista Academy</title>
        <meta name="description" content="Read success stories from Pacific Barista Academy graduates. Discover how our training has transformed careers and lives." />
        <meta property="og:title" content="Student Success Stories | Pacific Barista Academy" />
        <meta property="og:description" content="Read success stories from Pacific Barista Academy graduates." />
      </Helmet>

      <section className="relative bg-primary text-cream pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-custom relative z-10">
          <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-accent font-body font-semibold text-sm uppercase tracking-[0.2em] mb-4">Testimonials</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Student Success <span className="text-accent">Stories</span>
            </h1>
            <p className="font-body text-cream/80 text-lg md:text-xl leading-relaxed">
              Hear from our graduates about how Pacific Barista Academy changed their coffee journey.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
      </section>

      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {courses.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                  filter === c
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white text-text/60 hover:text-accent border border-primary/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div
            key={filter}
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {featured && <TestimonialCard t={featured} featured />}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center py-16">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-8 h-8 text-accent" />
              </div>
              <p className="font-body text-text/60 text-lg">No testimonials found for this course.</p>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Testimonials;
