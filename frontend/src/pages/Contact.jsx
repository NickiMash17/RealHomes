import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, this would be an actual API call
      // await api.post('/contact', formData)

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Call Us",
      details: ["+27 (0) 21 123 4567", "+27 (0) 82 123 4567"],
      action: "tel:+27211234567",
      actionLabel: "Call now",
      color: "navy",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["info@realhomes.co.za", "sales@realhomes.co.za"],
      action: "mailto:info@realhomes.co.za",
      actionLabel: "Send email",
      color: "gold",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Main Street", "Cape Town, 8001"],
      action: "https://maps.google.com/?q=Cape+Town+8001",
      actionLabel: "Get directions",
      color: "navy",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const inputCls = (field) =>
    [
      "block w-full px-4 py-3 rounded-xl border-2 bg-white text-charcoal-900",
      "placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all",
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-ivory-300 focus:border-gold-600 focus:ring-gold-600/20",
    ].join(" ");

  return (
    <main className="bg-ivory-200 min-h-screen pt-24 pb-20">
      {/* ── Hero strip ── */}
      <section className="bg-navy-900 text-white py-16">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-600/20 text-gold-400 border border-gold-600/30 mb-5">
            GET IN TOUCH
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
            How Can We Help You?
          </h1>
          <p className="text-white/70 mt-3 text-lg max-w-2xl mx-auto">
            Our expert team is ready to assist you with every step of your real
            estate journey across South Africa.
          </p>
        </motion.div>
      </section>

      {/* ── Main content — overlaps hero slightly ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── LEFT COLUMN: info cards + visit card ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Contact info cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-ivory-300 shadow-sm p-6 flex gap-4 items-start"
              >
                {/* Icon box */}
                <div
                  className={[
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    info.color === "gold"
                      ? "bg-gold-50 text-gold-600"
                      : "bg-navy-50 text-navy-700",
                  ].join(" ")}
                >
                  <info.icon className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-charcoal-900 mb-1">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p
                      key={i}
                      className="text-neutral-600 text-sm leading-snug"
                    >
                      {detail}
                    </p>
                  ))}
                  <a
                    href={info.action}
                    target={
                      info.action.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      info.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-block mt-2 text-gold-600 hover:text-gold-700 text-sm font-medium transition-colors"
                  >
                    {info.actionLabel} →
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Visit our offices — navy card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-navy-700 text-white rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-4 h-4 text-gold-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Visit Our Offices
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white/60 uppercase text-xs tracking-wide mb-0.5">
                    Address
                  </p>
                  <p className="text-white/90 font-medium">
                    123 Main Street, Cape Town, 8001
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/60 uppercase text-xs tracking-wide mb-1.5 flex items-center gap-1.5">
                    <FaClock className="w-3 h-3" /> Office Hours
                  </p>
                  <p className="text-white/80">Mon – Fri: 8:00 AM – 6:00 PM</p>
                  <p className="text-white/80">Saturday: 9:00 AM – 4:00 PM</p>
                  <p className="text-white/50">Sunday: Closed</p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center gap-3">
                  <a
                    href="https://wa.me/27821234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/company/realhomes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/realhomes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com/realhomes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center text-white transition-colors"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-ivory-300 shadow-md p-8">
              <h2 className="font-display font-bold text-charcoal-900 text-2xl mb-2">
                Send a Message
              </h2>
              <p className="text-neutral-500 text-sm mb-6">
                Fill in the form below and we'll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* First name + Last name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-800 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={inputCls("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal-800 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={inputCls("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className={inputCls("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27 (0) 82 123 4567"
                    className={inputCls("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputCls("subject")}
                  >
                    <option value="">Select a subject</option>
                    <option value="property-inquiry">Property Inquiry</option>
                    <option value="property-valuation">
                      Property Valuation
                    </option>
                    <option value="general-information">
                      General Information
                    </option>
                    <option value="support">Support</option>
                    <option value="partnership">
                      Partnership Opportunities
                    </option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal-800 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className={`${inputCls("message")} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-neutral-400">
                    {formData.message.length} / 500 characters
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={[
                    "w-full py-3.5 rounded-xl font-bold text-base shadow-navy transition-all",
                    submitSuccess
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-navy-700 hover:bg-navy-800 text-white",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                  ].join(" ")}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : submitSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaCheckCircle className="w-4 h-4" />
                      Message Sent!
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
