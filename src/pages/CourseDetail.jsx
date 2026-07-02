import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { fadeIn, staggerContainer } from '../animations';

const coursesData = {
  'espresso-fundamentals': {
    title: 'Espresso Fundamentals',
    duration: '4 Weeks',
    level: 'beginner',
    price: 499,
    image: null,
    description: 'Espresso is the foundation of modern coffee culture. This comprehensive course takes you from zero to confident barista, covering everything you need to know about pulling the perfect shot. You will learn the science behind extraction, how to dial in different coffee beans, and how to consistency produce cafe-quality espresso.',
    outcomes: [
      'Understand espresso extraction theory and variables',
      'Dial in any coffee bean to achieve optimal extraction',
      'Produce consistent, well-balanced espresso shots',
      'Steam milk to perfect texture and temperature',
      'Identify and troubleshoot common espresso issues',
      'Maintain and clean professional espresso equipment',
    ],
    curriculum: [
      { title: 'Week 1: Coffee Origins & Espresso Basics', lessons: ['History of espresso', 'Coffee bean varieties', 'Anatomy of an espresso machine', 'Safety and workstation setup'] },
      { title: 'Week 2: The Art of Dialing In', lessons: ['Understanding grind size', 'Dose and yield fundamentals', 'Extraction timing', 'Tasting and adjusting'] },
      { title: 'Week 3: Milk Steaming & Texture', lessons: ['Milk science', 'Steaming technique', 'Achieving microfoam', 'Common milk alternatives'] },
      { title: 'Week 4: Consistency & Workflow', lessons: ['Reproducibility techniques', 'Speed and efficiency', 'Cleaning and maintenance', 'Final assessment'] },
    ],
    requirements: [
      'No prior barista experience required',
      'A passion for coffee and willingness to learn',
      'Closed-toe shoes for practical sessions',
      'Notepad and pen for notes',
    ],
    certificate: true,
  },
  'latte-art-mastery': {
    title: 'Latte Art Mastery',
    duration: '6 Weeks',
    level: 'intermediate',
    price: 699,
    image: null,
    description: 'Transform your coffee presentations with stunning latte art. This course guides you through the fundamentals of milk texturing and pouring techniques, progressing from simple hearts to complex patterns. Develop the muscle memory and artistic eye needed to create cafe-worthy designs consistently.',
    outcomes: [
      'Steam milk to perfect microfoam consistency',
      'Pour hearts, tulips, and rosettas with confidence',
      'Master etching and free-pour techniques',
      'Develop speed without sacrificing quality',
      'Create custom patterns and designs',
      'Understand contrast and espresso crema dynamics',
    ],
    curriculum: [
      { title: 'Week 1: Milk Science & Steaming Mastery', lessons: ['Milk chemistry and proteins', 'Perfect steaming technique', 'Aerating and texturing', 'Temperature control'] },
      { title: 'Week 2: Foundation Pours', lessons: ['The heart pattern', 'Symmetry and positioning', 'Flow rate control', 'Common mistakes and fixes'] },
      { title: 'Week 3: Rosetta & Tulip', lessons: ['Rosetta wiggle technique', 'Tulip layering', 'Stacking and spacing', 'Practice drills'] },
      { title: 'Week 4: Advanced Patterns', lessons: ['Swan and winged designs', 'Combination patterns', 'Etching tools and methods', 'Color contrast techniques'] },
      { title: 'Week 5: Speed & Consistency', lessons: ['Timed pour exercises', 'High-volume workflow', 'Quality control', 'Competition prep basics'] },
      { title: 'Week 6: Final Portfolio', lessons: ['Design portfolio creation', 'Peer review session', 'Final assessment', 'Certification'] },
    ],
    requirements: [
      'Completed Espresso Fundamentals or equivalent experience',
      'Basic espresso machine knowledge',
      'Comfortable with milk steaming basics',
    ],
    certificate: true,
  },
  'advanced-brewing': {
    title: 'Advanced Brewing',
    duration: '5 Weeks',
    level: 'advanced',
    price: 799,
    image: null,
    description: 'Go beyond espresso and explore the diverse world of specialty coffee brewing. This course covers pour-over, immersion, cold brew, siphon, and experimental methods. You will learn to manipulate variables with precision to highlight unique flavor profiles in any coffee.',
    outcomes: [
      'Master multiple brewing methods with precision',
      'Understand extraction chemistry and TDS measurement',
      'Develop and refine your own brew recipes',
      'Evaluate coffee using professional cupping protocols',
      'Troubleshoot and optimize any brewing scenario',
      'Design coffee menus featuring diverse brew methods',
    ],
    curriculum: [
      { title: 'Week 1: Brewing Science', lessons: ['Extraction chemistry', 'Water composition and temperature', 'Grind distribution', 'Brew ratios and strength'] },
      { title: 'Week 2: Pour-Over Methods', lessons: ['V60 technique', 'Chemex brewing', 'Kalita Wave', 'Comparing methods'] },
      { title: 'Week 3: Immersion & Cold Brew', lessons: ['French press mastery', 'AeroPress techniques', 'Cold brew and cold drip', 'Nitrous infusion'] },
      { title: 'Week 4: Siphon & Experimental', lessons: ['Siphon brewing', 'Vacuum extraction', 'Rao spin and other innovations', 'Flavor manipulation'] },
      { title: 'Week 5: Cupping & Menu Design', lessons: ['Professional cupping protocol', 'Sensory evaluation', 'Brew menu development', 'Final assessment'] },
    ],
    requirements: [
      'Solid understanding of espresso fundamentals',
      'At least 6 months of coffee industry experience',
      'SCA Sensory Skills foundation recommended',
    ],
    certificate: true,
  },
  'coffee-science': {
    title: 'Coffee Science',
    duration: '8 Weeks',
    level: 'advanced',
    price: 999,
    image: null,
    description: 'A deep dive into the scientific principles behind coffee. From green bean chemistry to roasting profiles and extraction physics, this course is designed for coffee professionals who want to understand the "why" behind every cup. Combining theory with hands-on lab work.',
    outcomes: [
      'Analyze green coffee bean chemistry and grading',
      'Understand roasting chemistry and profile development',
      'Measure extraction using TDS and refractometers',
      'Apply water chemistry principles to brewing',
      'Conduct professional sensory evaluations',
      'Develop data-driven approaches to quality control',
    ],
    curriculum: [
      { title: 'Week 1-2: Green Coffee Chemistry', lessons: ['Bean anatomy and structure', 'Varietals and processing', 'Grading and defects', 'Storage and aging'] },
      { title: 'Week 3-4: Roasting Science', lessons: ['Heat transfer principles', 'Roast profile development', 'Maillard reaction and caramelization', 'Roast logging and analysis'] },
      { title: 'Week 5-6: Extraction Physics', lessons: ['Solubility and diffusion', 'TDS and extraction yield', 'Refractometer usage', 'Water chemistry adjustment'] },
      { title: 'Week 7-8: Sensory Science & QC', lessons: ['Flavor chemistry', 'SCA cupping protocol', 'Statistical QC methods', 'Final research project'] },
    ],
    requirements: [
      'Professional coffee experience (1+ year recommended)',
      'SCA Intermediate certification or equivalent knowledge',
      'Basic chemistry understanding is helpful',
    ],
    certificate: true,
  },
  'barista-certification': {
    title: 'Barista Certification',
    duration: '10 Weeks',
    level: 'intermediate',
    price: 1299,
    image: null,
    description: 'Our most comprehensive program prepares you for a professional barista career. Combining all core disciplines — espresso, milk, brewing, and service — this course culminates in an industry-recognized certification. You will graduate with the skills and confidence to work at any specialty coffee establishment.',
    outcomes: [
      'Master all core barista skills to professional standard',
      'Develop speed and efficiency in a high-volume setting',
      'Provide exceptional customer service and workflow management',
      'Perform equipment maintenance and troubleshooting',
      'Understand coffee sourcing, roasting, and business operations',
      'Earn Pacific Barista Certification recognized industry-wide',
    ],
    curriculum: [
      { title: 'Week 1-2: Core Espresso Skills', lessons: ['Machine anatomy and setup', 'Dialing in workflow', 'Shot analysis', 'Milk texturing advanced'] },
      { title: 'Week 3-4: Latte Art & Beverage Menu', lessons: ['Free-pour patterns', 'Seasonal drink development', 'Speed pours', 'Quality assurance'] },
      { title: 'Week 5-6: Brewing & Sensory', lessons: ['Alternative brew methods', 'Cupping protocol', 'Flavor profiling', 'Menu costing'] },
      { title: 'Week 7-8: Service & Workflow', lessons: ['Customer service excellence', 'High-volume management', 'Inventory and stock control', 'Health and safety'] },
      { title: 'Week 9-10: Certification Prep & Exam', lessons: ['Skill review and practice', 'Written examination', 'Practical assessment', 'Career planning'] },
    ],
    requirements: [
      'Passion for coffee and commitment to the full program',
      'Basic barista experience recommended',
      'Ability to stand for extended periods during practicals',
    ],
    certificate: true,
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
              <span className="font-body text-sm font-semibold text-white">${course.price}</span>
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
                  <span className="text-cream/30 font-heading text-5xl font-bold">PB</span>
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
                    <span className="text-text/60">Price</span>
                    <span className="font-heading text-2xl font-bold text-accent">${course.price}</span>
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
