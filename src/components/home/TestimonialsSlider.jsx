import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { fadeIn } from '../../animations';
import SectionTitle from '../ui/SectionTitle';
import { IconStar } from '../ui/Icons';

const testimonials = [
  {
    name: 'Beeju Bk',
    course: 'Espresso Fundamentals',
    content: 'Pacific Barista completely transformed my understanding of coffee. The hands-on training and expert guidance helped me land my dream job at a specialty cafe within weeks of graduating.',
    rating: 5,
    gradient: 'from-purple-400 to-pink-400',
    initials: 'SJ',
  },
  {
    name: 'Prabin Shrestha',
    course: 'Latte Art Mastery',
    content: 'The attention to detail in the latte art course was incredible. I went from pouring basic shapes to creating intricate designs. The instructors are true artists.',
    rating: 5,
    gradient: 'from-blue-400 to-cyan-400',
    initials: 'MC',
  },
  {
    name: 'Kaushal Thapa',
    course: 'Coffee Business',
    content: 'Thanks to the Coffee Business program, I successfully opened my own cafe. The curriculum covers everything from sourcing beans to financial management. Invaluable experience.',
    rating: 5,
    gradient: 'from-amber-400 to-orange-400',
    initials: 'ER',
  },
  {
    name: 'Ashim Bahadur Shrestha',
    course: 'Advanced Brewing',
    content: 'As someone who thought they knew coffee, the Advanced Brewing course opened my eyes to a whole new world. The science behind extraction and flavor profiling is fascinating.',
    rating: 5,
    gradient: 'from-emerald-400 to-teal-400',
    initials: 'JP',
  },
];

const TestimonialsSlider = () => {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Testimonials"
          title="What Our Students Say"
          description="Hear from our graduates about how Pacific Barista helped shape their careers."
        />

        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.testimonials-pagination' }}
            navigation={{
              nextEl: '.testimonials-next',
              prevEl: '.testimonials-prev',
            }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-heading font-semibold text-lg flex-shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-semibold text-primary">
                        {t.name}
                      </h4>
                      <p className="font-body text-text/50 text-xs">
                        {t.course}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <IconStar key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="font-body text-text/70 text-sm leading-relaxed flex-1">
                    "{t.content}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center gap-4 mt-2">
            <button className="testimonials-prev w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text/40 hover:text-accent hover:border-accent transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="testimonials-pagination flex gap-2" />
            <button className="testimonials-next w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text/40 hover:text-accent hover:border-accent transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
