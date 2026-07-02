import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import SectionTitle from '../components/ui/SectionTitle';
import PageTransition from '../components/common/PageTransition';
import { fadeIn, staggerContainer } from '../animations/index';

const trainers = [
  {
    name: 'James Rodriguez',
    experience: 12,
    specialization: 'Espresso Science & Latte Art',
    bio: 'Former World Latte Art finalist with over a decade of experience in specialty coffee. James has trained hundreds of baristas across 15 countries.',
    gradient: 'from-amber-600 to-orange-400',
    social: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Sarah Chen',
    experience: 9,
    specialization: 'Brewing Methods & Sensory Analysis',
    bio: 'SCA Certified Trainer and Q-Grader. Sarah brings a scientific approach to coffee brewing and has developed curriculum for multiple academies.',
    gradient: 'from-rose-500 to-pink-400',
    social: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Marcus Williams',
    experience: 15,
    specialization: 'Roasting & Green Coffee',
    bio: 'Master Roaster with experience sourcing from 20+ origin countries. Marcus leads our roasting program and green coffee procurement training.',
    gradient: 'from-emerald-600 to-teal-400',
    social: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Elena Kowalski',
    experience: 8,
    specialization: 'Competition Coaching',
    bio: 'Two-time National Barista Champion. Elena coaches aspiring competitors and specializes in high-pressure performance and signature beverage development.',
    gradient: 'from-violet-600 to-purple-400',
    social: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'David Park',
    experience: 11,
    specialization: 'Café Operations & Management',
    bio: 'Former café chain operations director. David teaches workflow optimization, team management, and profitable café business models.',
    gradient: 'from-blue-600 to-cyan-400',
    social: { linkedin: '#', twitter: '#', instagram: '#' },
  },
  {
    name: 'Ana Martinez',
    experience: 7,
    specialization: 'Alternative Brewing & Filter Coffee',
    bio: 'Specialty coffee advocate and pour-over specialist. Ana has won multiple brewing competitions across Asia and the Americas.',
    gradient: 'from-amber-500 to-yellow-400',
    social: { linkedin: '#', twitter: '#', instagram: '#' },
  },
];

const Trainers = () => (
  <PageTransition>
    <Helmet>
      <title>Our Expert Trainers | Pacific Barista Academy</title>
      <meta name="description" content="Meet our world-class barista trainers at Pacific Barista Academy. Industry experts dedicated to helping you master the art of coffee." />
      <meta property="og:title" content="Our Expert Trainers | Pacific Barista Academy" />
      <meta property="og:description" content="Meet our world-class barista trainers. Industry experts dedicated to helping you master the art of coffee." />
    </Helmet>

    <section className="relative bg-primary text-cream pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="container-custom relative z-10">
        <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-accent font-body font-semibold text-sm uppercase tracking-[0.2em] mb-4">Our Team</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Our Expert <span className="text-accent">Trainers</span>
          </h1>
          <p className="font-body text-cream/80 text-lg md:text-xl leading-relaxed">
            Learn from award-winning baristas, certified Q-Graders, and industry veterans passionate about sharing their craft.
          </p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
    </section>

    <section className="py-20 bg-cream">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              variants={fadeIn('up', i * 0.1)}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group"
            >
              <div className={`h-48 bg-gradient-to-br ${trainer.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-white">{trainer.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-xl font-bold text-primary">{trainer.name}</h3>
                  <span className="text-xs font-body font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">{trainer.experience} Years</span>
                </div>
                <p className="text-sm font-body font-medium text-accent mb-3">{trainer.specialization}</p>
                <p className="font-body text-text/70 text-sm leading-relaxed mb-4">{trainer.bio}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-primary/5">
                  <a href={trainer.social.linkedin} className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                  <a href={trainer.social.twitter} className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                    <FiTwitter className="w-4 h-4" />
                  </a>
                  <a href={trainer.social.instagram} className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent hover:text-white transition-all duration-300">
                    <FiInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  </PageTransition>
);

export default Trainers;
