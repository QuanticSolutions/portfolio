'use client'
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';
import { CountrySelect } from '@/components/contact/CountrySelect';
import { PhoneInput } from '@/components/contact/PhoneInput';
import { countries } from '@/components/contact/countries';

export default function GrowthPlatformSection() {
  const form = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    message: '',
  });

  const [countryIso, setCountryIso] = useState('');
  const [dialCode, setDialCode] = useState('+92');
  const [phoneRaw, setPhoneRaw] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredTextFields = ['firstName', 'lastName', 'businessEmail', 'message'];
    const textFieldsValid = requiredTextFields.every(field => formData[field].trim() !== '');
    return textFieldsValid && countryIso !== '' && phoneRaw.trim() !== '';
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

    const countryName = countries.find(c => c.iso === countryIso)?.name || countryIso;
    const fullPhone = `${dialCode} ${phoneRaw}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          businessEmail: formData.businessEmail,
          phone: fullPhone,
          country: countryName,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', businessEmail: '', message: '' });
      setCountryIso('');
      setDialCode('+92');
      setPhoneRaw('');
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ...rest of the component (JSX) stays exactly the same
