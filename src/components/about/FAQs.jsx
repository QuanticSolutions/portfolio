"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { id: 1, question: "What services does Quantic Solutions offer?", answer: "We specialize in web development..." },
    { id: 2, question: "How long does it take to complete a project?", answer: "Project timelines vary..." },
    { id: 3, question: "Do you offer custom design or use templates?", answer: "We create fully custom designs..." },
    { id: 4, question: "Can you redesign my existing website or app?", answer: "Absolutely! We specialize in modernizing..." },
    { id: 5, question: "What platforms or technologies do you work with?", answer: "We work with a range of technologies..." },
    { id: 6, question: "Do you provide ongoing support after the project is completed?", answer: "Yes! We offer maintenance..." },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <div className="bg-gradient-to-br from-emerald-400/20 via-black to-teal-700 relative overflow-hidden animate-bg text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
        <motion.div
          className="space-y-6 sm:space-y-8"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8">
              FREQUENTLY
              <br />
              ASKED QUESTIONS
            </h1>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-teal-400">
              Need More Information?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              If your question isn't covered here, don't worry. Our dedicated team is always ready to assist you directly.
            </p>
          </div>

          <div className="w-full flex justify-start items-center py-3 sm:py-5">
            <button className="group relative z-10 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-110 overflow-hidden"
              onClick={()=>{window.location.href = "/contact"}}
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                Contact Us
                <motion.div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </div>
        </motion.div>

        {/* Right Column - FAQ items fade from left one by one */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="border border-gray-800 rounded-xl sm:rounded-2xl bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-teal-500/50"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between group transition-all duration-300"
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300 pr-3 sm:pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-600 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
                  {openFAQ === faq.id ? (
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  ) : (
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  openFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="h-px bg-gradient-to-r from-teal-500 to-emerald-500 mb-3 sm:mb-4"></div>
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
