import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { fadeIn, staggerContainer } from '../animations';
import { IconCoffee } from '../components/ui/Icons';

const coursesData = {
  'foundation-barista-course': {
    title: '#1. FOUNDATION BARISTA COURSE',
    subtitle: 'Perfect for Beginners!',
    duration: '15 Days',
    level: 'beginner',
    price: 10000,
    currency: 'NPR',
    image: null,
    description: 'Learn the core skills to start your barista journey. This comprehensive foundation course covers everything from coffee beans and origin to espresso extraction, milk steaming, and café workflow. Perfect for absolute beginners with no prior experience.',
    outcomes: [
      'Coffee beans, origin & roasting basics',
      'Espresso extraction techniques',
      'Milk steaming & texturing',
      'Espresso-based drinks (Cappuccino, Latte, Americano, etc.)',
      'Machine setup, cleaning & maintenance',
      'Café workflow & customer service basics',
    ],
    curriculum: [
      { title: 'Week 1: Coffee Basics & Espresso Foundation', lessons: ['Coffee bean origins & roasting basics', 'Espresso extraction techniques', 'Machine setup & operation', 'Safety and workstation hygiene'] },
      { title: 'Week 2: Milk Work & Café Service', lessons: ['Milk steaming & texturing', 'Espresso-based drinks (Cappuccino, Latte, Americano)', 'Cleaning & maintenance', 'Café workflow & customer service basics'] },
    ],
    requirements: [
      'No prior barista experience required',
      'A passion for coffee and willingness to learn',
      'Closed-toe shoes for practical sessions',
      'Notepad and pen for notes',
    ],
    certificate: true,
    outcomeNote: 'Gain confidence operating coffee machines and making perfect espresso drinks.',
  },
  'full-barista-course': {
    title: '#2. FULL BARISTA COURSE',
    subtitle: 'Step into Professional Barista Skills!',
    duration: '30 Days',
    level: 'intermediate',
    price: 15000,
    currency: 'NPR',
    image: null,
    description: 'Designed for those who want to work in cafés or coffee chains. This comprehensive program covers advanced espresso science, latte art fundamentals, multiple brewing methods, and professional café workflow management.',
    outcomes: [
      'Advanced espresso science & flavor balance',
      'Latte art fundamentals',
      'Brewing methods: Pour-over, AeroPress, French Press',
      'Grinder calibration & troubleshooting',
      'Menu planning & drink presentation',
      'Hygiene & café workflow management',
    ],
    curriculum: [
      { title: 'Week 1: Advanced Espresso & Latte Art', lessons: ['Advanced espresso science & flavor balance', 'Latte art fundamentals (hearts, tulips)', 'Grinder calibration', 'Drink presentation'] },
      { title: 'Week 2: Brewing Methods & Menu Planning', lessons: ['Pour-over techniques', 'AeroPress & French Press', 'Menu planning', 'Flavor balancing'] },
      { title: 'Week 3: Workflow & Troubleshooting', lessons: ['Café workflow management', 'Equipment troubleshooting', 'Hygiene standards', 'Customer service excellence'] },
      { title: 'Week 4: Final Assessment & Practice', lessons: ['Speed & efficiency drills', 'Quality control', 'Practical assessment', 'Career guidance'] },
    ],
    requirements: [
      'Completed Foundation Barista Course or basic barista knowledge',
      'Basic espresso machine familiarity',
      'Passion for coffee and café work',
    ],
    certificate: true,
    outcomeNote: 'Become a skilled barista ready for professional café work or your own setup.',
  },
  'advanced-barista-course': {
    title: '#3. ADVANCED BARISTA COURSE',
    subtitle: 'Master the Art of Coffee!',
    duration: '40 Days',
    level: 'advanced',
    price: 18000,
    currency: 'NPR',
    image: null,
    description: 'For experienced baristas looking to refine advanced techniques. Master advanced latte art, signature beverage creation, coffee tasting, and café leadership skills. Develop into a master barista with technical, creative, and management abilities.',
    outcomes: [
      'Advanced latte art (Hearts, Rosetta, Tulips and Free Pours)',
      'Signature beverage creation & recipe design',
      'Coffee tasting & sensory evaluation',
      'Machine calibration & maintenance mastery',
      'Café leadership & management',
      'Coffee business & entrepreneurship basics',
    ],
    curriculum: [
      { title: 'Week 1-2: Advanced Latte Art & Beverage Design', lessons: ['Advanced pouring techniques (Rosetta, Tulips, Swans)', 'Free pour practice', 'Signature beverage creation', 'Recipe design & costing'] },
      { title: 'Week 3-4: Sensory & Machine Mastery', lessons: ['Coffee tasting & sensory evaluation', 'Machine calibration mastery', 'Preventive maintenance', 'Equipment deep-dive'] },
      { title: 'Week 5-6: Leadership & Business', lessons: ['Café leadership & team management', 'Inventory & cost control', 'Coffee business basics', 'Entrepreneurship essentials'] },
      { title: 'Week 7-8: Final Project & Assessment', lessons: ['Signature drink portfolio', 'Speed & quality certification', 'Business plan presentation', 'Final practical exam'] },
    ],
    requirements: [
      'Completed Full Barista Course or 6+ months café experience',
      'Proficient in espresso extraction and milk texturing',
      'Basic latte art skills',
    ],
    certificate: true,
    outcomeNote: 'Develop into a master barista with technical, creative, and leadership skills.',
  },
};

const levelVariant = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

const CourseDetail = () => {
  const { slug } = useParams();
  const course = coursesData[slug];
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!course) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-primary mb-4">Course not found</h1>
            <Link to="/courses" className="text-accent hover:underline font-body">Back to courses</Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currencySymbol = course.currency === 'NPR' ? 'Rs.' : '$';

  return (
    <PageTransition>
      <Helmet>
        <title>{course.title} | Pacific Barista Academy</title>
        <meta name="description" content={course.description.substring(0, 160)} />
      </Helmet>

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 border border-accent/20 rounded-full" />
          <div className="absolute bottom-10 left-10 w-96 h-96 border border-accent/10 rounded-full" />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-2 text-sm font-body text-cream/50 mb-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-accent transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-cream/80">{course.title}</span>
          </div>
          <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
              {course.title}
            </h1>
            {course.subtitle && (
              <span className="inline-block text-accent font-body font-semibold text-lg mb-4">
                {course.subtitle}
              </span>
            )}
            <p className="font-body text-cream/60 text-lg leading-relaxed">
              {course.description.substring(0, 120)}...
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-6 mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl"
          >
            <div className="flex items-center gap-3 text-cream/80">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-body text-sm">{course.duration}</span>
            </div>
            <Badge variant={levelVariant[course.level]}>{course.level}</Badge>
            <div className="flex items-center gap-3 text-cream/80">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-body text-sm font-semibold text-white">{currencySymbol}. {course.price.toLocaleString()}/-</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <motion.div
                variants={fadeIn('up')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">About This Course</h2>
                <p className="font-body text-text/70 leading-relaxed text-lg">{course.description}</p>
              </motion.div>

              <motion.div
                variants={fadeIn('up')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">What You Will Learn</h2>
                <motion.ul
                  variants={staggerContainer(0.05)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {course.outcomes.map((outcome, i) => (
                    <motion.li
                      key={i}
                      variants={fadeIn('up', i * 0.05)}
                      className="flex items-start gap-3 p-3 rounded-lg bg-accent/5"
                    >
                      <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body text-text/70 text-sm">{outcome}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                {course.outcomeNote && (
                  <motion.div
                    variants={fadeIn('up')}
                    className="mt-6 p-5 bg-accent/10 rounded-xl border border-accent/20"
                  >
                    <p className="font-body text-accent font-semibold text-sm">{course.outcomeNote}</p>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                variants={fadeIn('up')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((week, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn('up', index * 0.05)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="border border-primary/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex items-center justify-between p-5 bg-white hover:bg-accent/5 transition-colors duration-300 text-left"
                      >
                        <span className="font-heading font-semibold text-primary">{week.title}</span>
                        <motion.svg
                          animate={{ rotate: openSections[index] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5 text-accent shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {openSections[index] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <ul className="px-5 pb-5 space-y-2">
                              {week.lessons.map((lesson, i) => (
                                <li key={i} className="flex items-center gap-3 font-body text-sm text-text/60">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                variants={fadeIn('up')}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md border border-primary/5 sticky top-28"
              >
                <div className="w-full h-48 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-6">
                  <IconCoffee className="w-20 h-20 text-cream/30" />
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-text/60">Duration</span>
                    <span className="text-primary font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-text/60">Level</span>
                    <Badge variant={levelVariant[course.level]}>{course.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-text/60">Fee</span>
                    <span className="font-heading text-2xl font-bold text-accent">{currencySymbol}. {course.price.toLocaleString()}/-</span>
                  </div>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={() => window.location.href = '/enroll'}>
                  Enroll Now
                </Button>
              </motion.div>

              {course.certificate && (
                <motion.div
                  variants={fadeIn('up', 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-accent/5 rounded-xl p-6 border border-accent/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <h4 className="font-heading font-bold text-primary">Certificate Included</h4>
                  </div>
                  <p className="font-body text-sm text-text/60">Receive a verified Pacific Barista certificate upon completion.</p>
                </motion.div>
              )}

              {course.requirements.length > 0 && (
                <motion.div
                  variants={fadeIn('up', 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md border border-primary/5"
                >
                  <h3 className="font-heading font-bold text-primary mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {course.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 font-body text-sm text-text/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default CourseDetail;
