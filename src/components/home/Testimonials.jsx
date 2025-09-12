import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Kate Rogers",
      role: "Graphic Designer",
      avatar: "KR",
      text: "I needed a refund for tickets to an event that was changed last minute. I experienced great customer service and the issue was resolved in a timely manner. Thanks to agent Sandra!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Johnson",
      role: "Marketing Manager",
      avatar: "MJ",
      text: "Outstanding support team! They went above and beyond to help me with my order issue. The response time was incredible and the solution was perfect. Highly recommend!",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah Lee",
      role: "Product Manager",
      avatar: "SL",
      text: "The platform is incredibly intuitive and the support team is fantastic. They guided me every step of the way!",
      rating: 5,
    },
    {
      id: 4,
      name: "John Smith",
      role: "Developer",
      avatar: "JS",
      text: "Fast, reliable, and professional service. My go-to team for all digital needs!",
      rating: 5,
    },
  ];

  const leftCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-7xl w-[100vw] bg-black/40 backdrop-blur-md rounded-3xl p-4 md:p-16 shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5"></div>
        <div className="max-w-7xl relative mx-auto py-5 md:py-12 px-4 w-full left-0 top-0">
          <h1 className="text-3xl md:text-6xl text-center font-extrabold tracking-tight uppercase bg-gradient-to-r from-white via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            What Our Customers Say
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-emerald-100 max-w-2xl mx-auto">
            See how our customers feel about their experience with our service.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 mb-12 justify-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gradient-to-br from-teal-700 to-green-700 rounded-2xl p-10 text-white relative shadow-lg shadow-teal-700/30 cursor-pointer"
              variants={index % 2 === 0 ? leftCardVariants : rightCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="text-5xl text-emerald-300 absolute -top-4 -left-2 leading-none">
                    "
                  </div>
                  <p className="text-lg leading-relaxed italic pl-6">
                    {testimonial.text}
                  </p>
                  <div className="text-5xl text-emerald-300 absolute -bottom-6 right-0 leading-none">
                    "
                  </div>
                </div>
                <div className="flex items-center gap-5 mt-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-300 to-green-400 flex items-center justify-center text-2xl font-bold text-green-800 border-4 border-white/20">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-emerald-200 font-medium">
                      {testimonial.role}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden relative mb-8">
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <motion.div
                      className="bg-gradient-to-br from-teal-700 to-green-700 rounded-2xl p-6 text-white relative shadow-lg shadow-teal-700/30 min-h-[20rem]" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl pointer-events-none"></div>
                    <div className="relative z-10">
                      <div className="relative mb-4">
                        <div className="text-3xl text-emerald-300 absolute -top-2 -left-1 leading-none">
                          "
                        </div>
                        <p className="text-base leading-relaxed italic pl-4 pr-4">
                          {testimonial.text}
                        </p>
                        <div className="text-3xl text-emerald-300 absolute -bottom-4 right-2 leading-none">
                          "
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-300 to-green-400 flex items-center justify-center text-lg font-bold text-green-800 border-3 border-white/20">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-emerald-200 font-medium text-sm">
                            {testimonial.role}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-lg">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full border border-white/20 hover:bg-black/50 transition-all duration-200 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full border border-white/20 hover:bg-black/50 transition-all duration-200 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-emerald-400 scale-110"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;