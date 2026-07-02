import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiUsers, FiDollarSign, FiUser } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageTransition from '../components/common/PageTransition';
import { fadeIn, staggerContainer } from '../animations/index';

const workshopsData = [
  {
    title: 'Latte Art Masterclass',
    date: 'July 15, 2026',
    time: '10:00 AM - 4:00 PM',
    duration: '6 Hours',
    seats: 12,
    price: '$199',
    instructor: 'James Rodriguez',
    category: 'upcoming',
    description: 'Master the art of pouring stunning latte art patterns. From hearts to rosettas, learn the techniques that impress.',
  },
  {
    title: 'Espresso Science Workshop',
    date: 'July 22, 2026',
    time: '9:00 AM - 3:00 PM',
    duration: '6 Hours',
    seats: 8,
    price: '$249',
    instructor: 'Sarah Chen',
    category: 'upcoming',
    description: 'Dive deep into the science of espresso extraction. Understand how grind size, pressure, and temperature affect flavor.',
  },
  {
    title: 'Coffee Cupping & Sensory',
    date: 'August 5, 2026',
    time: '10:00 AM - 2:00 PM',
    duration: '4 Hours',
    seats: 10,
    price: '$179',
    instructor: 'David Park',
    category: 'upcoming',
    description: 'Develop your palate and learn professional cupping techniques used by Q-Graders and coffee buyers.',
  },
  {
    title: 'Home Brewing Essentials',
    date: 'August 12, 2026',
    time: '11:00 AM - 3:00 PM',
    duration: '4 Hours',
    seats: 15,
    price: '$129',
    instructor: 'Ana Martinez',
    category: 'upcoming',
    description: 'Perfect your home brewing setup. Learn pour-over, French press, AeroPress, and more methods.',
  },
  {
    title: 'Advanced Roasting Techniques',
    date: 'June 10, 2026',
    time: '9:00 AM - 5:00 PM',
    duration: '8 Hours',
    seats: 0,
    price: '$399',
    instructor: 'Marcus Williams',
    category: 'past',
    description: 'An intensive workshop on roast profiling, bean development, and quality control.',
  },
  {
    title: 'Café Management Bootcamp',
    date: 'May 28, 2026',
    time: '10:00 AM - 4:00 PM',
    duration: '6 Hours',
    seats: 0,
    price: '$299',
    instructor: 'Elena Kowalski',
    category: 'past',
    description: 'Comprehensive training on running a successful café, from operations to financial management.',
  },
];

const Workshops = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? workshopsData : workshopsData.filter((w) => w.category === filter);

  return (
    <PageTransition>
      <Helmet>
        <title>Workshops & Events | Pacific Barista Academy</title>
        <meta name="description" content="Join our hands-on barista workshops and coffee events. From latte art to espresso science, learn from the best." />
        <meta property="og:title" content="Workshops & Events | Pacific Barista Academy" />
        <meta property="og:description" content="Join our hands-on barista workshops and coffee events." />
      </Helmet>

      <section className="relative bg-primary text-cream pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-custom relative z-10">
          <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-accent font-body font-semibold text-sm uppercase tracking-[0.2em] mb-4">Events</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Workshops & <span className="text-accent">Events</span>
            </h1>
            <p className="font-body text-cream/80 text-lg md:text-xl leading-relaxed">
              Hands-on learning experiences designed to elevate your coffee skills.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
      </section>

      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="flex justify-center gap-3 mb-12">
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white text-text/60 hover:text-accent hover:bg-accent/5 border border-primary/10'
                }`}
              >
                {f === 'all' ? 'All Workshops' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            key={filter}
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((workshop, i) => (
              <motion.div
                key={i}
                variants={fadeIn('up', i * 0.1)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-primary/5 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={workshop.category === 'upcoming' ? 'accent' : 'default'}>
                      {workshop.category === 'upcoming' ? 'Upcoming' : 'Past'}
                    </Badge>
                    <span className="text-lg font-heading font-bold text-accent">{workshop.price}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">{workshop.title}</h3>
                  <p className="font-body text-text/70 text-sm mb-4 leading-relaxed">{workshop.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-text/60 font-body">
                      <FiCalendar className="w-4 h-4 text-accent" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/60 font-body">
                      <FiClock className="w-4 h-4 text-accent" />
                      <span>{workshop.time} ({workshop.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/60 font-body">
                      <FiUser className="w-4 h-4 text-accent" />
                      <span>{workshop.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/60 font-body">
                      <FiUsers className="w-4 h-4 text-accent" />
                      <span>{workshop.seats > 0 ? `${workshop.seats} seats available` : 'Fully booked'}</span>
                    </div>
                  </div>
                  {workshop.category === 'upcoming' && (
                    <Button variant="primary" className="w-full" icon={FiCalendar} iconPosition="left">Book Now</Button>
                  )}
                  {workshop.category === 'past' && (
                    <Button variant="outline" className="w-full" disabled>Completed</Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center py-16">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-accent" />
              </div>
              <p className="font-body text-text/60 text-lg">No workshops found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Workshops;
