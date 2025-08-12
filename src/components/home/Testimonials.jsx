import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-7xl w-[100vw] bg-black/40 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5"></div>
        <div className="max-w-7xl relative mx-auto py-5 md:py-12 px-4 w-full left-0 top-0">
          <h1 className="text-3xl md:text-6xl text-center font-extrabold tracking-tight uppercase bg-gradient-to-r from-white via-emerald-300 to-teal-200 bg-clip-text text-transparent">
            What Our Customers Say
          </h1>
          <p className="mt-4 text-center text-sm md:text-lg text-emerald-100 max-w-2xl mx-auto">
            See how our customers feel about their experience with our service.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 mb-12 justify-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gradient-to-br from-teal-700 to-green-700 rounded-2xl p-10 text-white relative shadow-lg shadow-teal-700/30 cursor-pointer"
              variants={index % 2 === 0 ? leftCardVariants : rightCardVariants} // alternate direction
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="text-5xl text-emerald-300 mb-2 relative z-10">
                  "
                </div>
                <p className="text-lg leading-relaxed mb-4 italic">
                  {testimonial.text}
                </p>
                <div className="text-5xl text-emerald-300 mb-2 relative z-10 text-right">
                  "
                </div>
                <div className="flex items-center gap-5">
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
      </div>
    </div>
  );
};

export default Testimonials;
