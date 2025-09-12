'use client'
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function GrowthPlatformSection() {
  const form = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    phoneNumber: '',
    country: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // EmailJS configuration - Replace these with your actual values
  const EMAILJS_SERVICE_ID = 'service_lwq5qze';
  const EMAILJS_TEMPLATE_ID = 'template_bydc1ye';
  const EMAILJS_PUBLIC_KEY = '32kNWcc-q4rD03DRg';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'businessEmail', 'phoneNumber', 'country', 'message'];
    return requiredFields.every(field => formData[field].trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.businessEmail,
          phone: formData.phoneNumber,
          country: formData.country,
          message: formData.message,
          to_name: 'Your Company Name', // Replace with your company name
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: '',
        phoneNumber: '',
        country: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-black to-teal-900">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Section */}
        <motion.div
          className="w-full lg:w-1/2 bg-black/70 backdrop-blur-md p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-teal-400 mb-4 tracking-wide pt-25 lg:pt-2">GET IN TOUCH</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Build your next <br />
              <span className="text-teal-400">digital</span> <span className="text-emerald-400">solution</span> with us.
            </h1>
            <p className="text-slate-300 mb-8 text-base sm:text-lg leading-relaxed">
              We craft scalable, secure, and high-performance digital products tailored 
              to your business needs. From web platforms to mobile apps and enterprise solutions,
              we turn your ideas into reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3 sm:space-y-4 mb-10">
              <FeaturePoint text="Custom software and mobile app development." />
              <FeaturePoint text="Full-cycle product design and cloud integration." />
              <FeaturePoint text="Agile development and transparent communication." />
            </div>
            <RatingSection />
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-1/2 relative py-12"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <AnimatedBackground />
          <motion.div
            className="relative z-10 p-6 sm:p-10 lg:p-16 flex items-center justify-center min-h-full w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 w-full shadow-2xl border border-teal-500/20">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                Let's discuss your project
              </h2>
              <p className="text-slate-300 text-sm mb-6">
                Fill out the form and our team will contact you within 24 hours.
              </p>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 text-sm">Please fill in all required fields and try again.</span>
                </motion.div>
              )}

              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField 
                    label="First Name*" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <InputField 
                    label="Last Name*" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField 
                    label="Business Email*" 
                    name="businessEmail" 
                    type="email" 
                    value={formData.businessEmail} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <InputField 
                    label="Phone Number*" 
                    name="phoneNumber" 
                    type="tel" 
                    value={formData.phoneNumber} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Country*</label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 appearance-none"
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Tell us about your project*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg mt-6 ${
                    isSubmitting 
                      ? 'bg-slate-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600'
                  } text-white`}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Sending...' : 'Request Free Consultation'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label className="block text-sm text-slate-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
    />
  </div>
);

const FeaturePoint = ({ text }) => (
  <div className="flex items-start gap-3">
    <div className="w-2 h-2 bg-teal-400 rounded-full mt-3"></div>
    <p className="text-slate-300">{text}</p>
  </div>
);

const RatingSection = () => (
  <div className="flex items-center flex-wrap gap-4 mb-8">
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-teal-400 text-teal-400" />
      ))}
    </div>
    <span className="text-slate-300">Trusted by 50+ global clients</span>
    <div className="bg-teal-900 px-2 py-1 rounded text-teal-300 text-xs font-semibold border border-teal-700">
      Excellence<br />Award
    </div>
  </div>
);

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-20 left-20 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  </div>
);