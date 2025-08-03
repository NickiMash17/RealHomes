import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Ready to find your dream property? Our expert team is here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPhone className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">Call Us</h3>
            <p className="text-neutral-600 mb-2">+27 (0) 21 123 4567</p>
            <p className="text-neutral-600">+27 (0) 82 123 4567</p>
          </div>

          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">Email Us</h3>
            <p className="text-neutral-600 mb-2">info@realhomes.co.za</p>
            <p className="text-neutral-600">sales@realhomes.co.za</p>
          </div>

          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">Visit Us</h3>
            <p className="text-neutral-600 mb-2">123 Main Street</p>
            <p className="text-neutral-600">Cape Town, 8001</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="card-premium p-8">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="+27 (0) 82 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Select a subject</option>
                  <option>Property Inquiry</option>
                  <option>Property Valuation</option>
                  <option>General Information</option>
                  <option>Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-premium rounded-xl py-4 text-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-16 text-center">
          <div className="card-premium p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaClock className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">Office Hours</h3>
            <div className="space-y-2 text-neutral-600">
              <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
              <p><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
              <p><strong>Sunday:</strong> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact 