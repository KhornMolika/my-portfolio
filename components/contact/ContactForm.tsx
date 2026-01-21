'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'success',
    message: ''
  });

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setModalState({
        isOpen: true,
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModalState({
        isOpen: true,
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://formsubmit.co/alexkgm2412@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Contact Form Submission from ${formData.name}`,
            _captcha: "false",
            _template: "table",
          }),
        }
      );
      
      if (response.ok) {
        setModalState({
          isOpen: true,
          type: "success",
          message:
            "Your message has been sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalState({
        isOpen: true,
        type: "error",
        message:
          "Failed to send your message. Please try again or email me directly at alexkgm2412@gmail.com",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-icon ${modalState.type === 'success' ? 'modal-success' : 'modal-error'}`}>
              {modalState.type === 'success' ? '✓' : '✕'}
            </div>
            <h3 className="modal-title">
              {modalState.type === 'success' ? 'Success!' : 'Oops!'}
            </h3>
            <p className="modal-message">{modalState.message}</p>
            <button onClick={closeModal} className="modal-button">
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side - Form */}
        <div className="space-y-8 animate-slide-in-left">
          <div className="space-y-8">
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-4 focus:outline-none focus:border-transparent transition-all duration-500 input-field"
              />
              <div className="input-line"></div>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-4 focus:outline-none focus:border-transparent transition-all duration-500 input-field"
              />
              <div className="input-line"></div>
            </div>

            <div className="input-wrapper">
              <textarea
                name="message"
                placeholder="Share your thoughts"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-4 focus:outline-none focus:border-transparent transition-all duration-500 resize-none input-field"
              />
              <div className="input-line"></div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn-submit group relative overflow-hidden disabled:cursor-not-allowed w-full"
            >
              {/* Animated gradient border */}
              <div className="btn-border"></div>
              <div className="btn-glow"></div>
              
              {/* Button content */}
              <div className="btn-content">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="loader"></div>
                    <span className="loading-text">SENDING</span>
                    <span className="loading-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </div>
                ) : (
                  <div className="btn-text-wrapper">
                    <span className="btn-text">SHARE YOUR FEEDBACK</span>
                    <span className="btn-icon">→</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Right Side - Contact Us Text */}
        <div className="flex flex-col items-center justify-center animate-slide-in-right">
          <div className="relative mb-12">
            <div className="text-center">
              <h2 className="text-6xl md:text-8xl font-bold mb-6 animate-float">
                <span className="glitch-text" data-text="Contact">Contact</span>
              </h2>
              <div className="flex items-center justify-center gap-6 mb-2">
                <div className="accent-line"></div>
                <h2 className="text-6xl md:text-8xl font-bold animate-float-delayed">
                  <span className="glitch-text-blue" data-text="Me">Me</span>
                </h2>
              </div>
            </div>
            
            {/* Static circle outline */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="circle-outline-static"></div>
            </div>
          </div>

          <p className="text-gray-400 text-center max-w-md leading-relaxed animate-fade-in text-lg">
            It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Modal styles */
        .modal-container {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 40px;
          max-width: 450px;
          width: 100%;
          text-align: center;
          border: 1px solid rgba(255, 215, 0, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.15);
          animation: modal-slide-in 0.4s ease-out;
        }

        @keyframes modal-slide-in {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: bold;
          animation: icon-pop 0.5s ease-out 0.2s both;
        }

        @keyframes icon-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-success {
          background: linear-gradient(135deg, #32CD32 0%, #228B22 100%);
          color: white;
          box-shadow: 0 0 30px rgba(50, 205, 50, 0.5);
        }

        .modal-error {
          background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
          color: white;
          box-shadow: 0 0 30px rgba(255, 68, 68, 0.5);
        }

        .modal-title {
          color: white;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 16px;
          animation: fade-in-up 0.5s ease-out 0.3s both;
        }

        .modal-message {
          color: #d1d1d1;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
          animation: fade-in-up 0.5s ease-out 0.4s both;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-button {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: #000;
          font-weight: 600;
          padding: 14px 40px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          animation: fade-in-up 0.5s ease-out 0.5s both;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .modal-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 215, 0, 0.5);
        }

        .modal-button:active {
          transform: translateY(0);
        }

        /* Particle animations */
        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: float-particle 20s infinite ease-in-out;
        }
        
        .particle-1 {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          left: 80%;
          animation-delay: -5s;
        }
        
        .particle-3 {
          width: 80px;
          height: 80px;
          top: 80%;
          left: 20%;
          animation-delay: -10s;
        }
        
        .particle-4 {
          width: 120px;
          height: 120px;
          top: 30%;
          right: 15%;
          animation-delay: -15s;
        }
        
        .particle-5 {
          width: 90px;
          height: 90px;
          bottom: 20%;
          left: 50%;
          animation-delay: -7s;
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(50px, -50px) scale(1.2);
            opacity: 0.5;
          }
          50% {
            transform: translate(-30px, 30px) scale(0.8);
            opacity: 0.2;
          }
          75% {
            transform: translate(30px, 50px) scale(1.1);
            opacity: 0.4;
          }
        }

        /* Input animations */
        .input-wrapper {
          position: relative;
        }
        
        .input-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #FFD700, #00D9FF);
          transition: width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .input-field:focus + .input-line {
          width: 100%;
        }

        /* Button styles */
        .btn-submit {
          position: relative;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          height: 70px;
          transition: transform 0.3s ease;
        }
        
        .btn-submit:active {
          transform: scale(0.98);
        }
        
        .btn-border {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          padding: 3px;
          background: linear-gradient(
            45deg,
            #FFD700,
            #FFA500,
            #32CD32,
            #006400,
            #FFD700
          );
          background-size: 400% 400%;
          animation: gradient-rotate 4s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        .btn-glow {
          position: absolute;
          inset: -20px;
          border-radius: 4px;
          background: linear-gradient(
            45deg,
            rgba(255, 215, 0, 0.3),
            rgba(255, 165, 0, 0.3),
            rgba(50, 205, 50, 0.3),
            rgba(0, 100, 0, 0.3)
          );
          background-size: 400% 400%;
          animation: gradient-rotate 4s ease infinite, glow-pulse 2s ease-in-out infinite;
          filter: blur(30px);
          opacity: 0.6;
          z-index: -1;
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
        
        .btn-content {
          position: relative;
          z-index: 2;
          background: white;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          font-weight: 600;
          letter-spacing: 1px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .btn-text-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #000;
        }
        
        .btn-text {
          transition: transform 0.3s ease;
        }
        
        .btn-icon {
          font-size: 24px;
          transition: transform 0.3s ease;
        }
        
        .btn-submit:hover .btn-text {
          transform: translateX(-5px);
        }
        
        .btn-submit:hover .btn-icon {
          transform: translateX(5px);
        }
        
        .btn-submit:hover {
          animation: btn-bounce 0.6s ease;
        }
        
        @keyframes btn-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(-4px);
          }
          75% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Loading animations */
        .loader {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .loading-text {
          font-weight: 600;
          letter-spacing: 2px;
        }
        
        .loading-dots span {
          animation: dot-pulse 1.4s infinite ease-in-out;
          display: inline-block;
        }
        
        .loading-dots span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes dot-pulse {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }

        /* Glitch text effect */
        .glitch-text {
          position: relative;
          display: inline-block;
          color: white;
          text-shadow: 
            0 0 20px rgba(255, 215, 0, 0.5),
            3px 0 0 rgba(255, 100, 0, 0.7),
            -3px 0 0 rgba(0, 150, 255, 0.7);
          animation: glitch-skew 5s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff00de;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        
        .glitch-text-blue {
          position: relative;
          display: inline-block;
          color: white;
          text-shadow: 
            0 0 20px rgba(0, 217, 255, 0.5),
            3px 0 0 rgba(255, 100, 0, 0.7),
            -3px 0 0 rgba(0, 150, 255, 0.7);
        }
        
        @keyframes glitch-anim {
          0% {
            clip: rect(39px, 9999px, 94px, 0);
          }
          20% {
            clip: rect(96px, 9999px, 88px, 0);
          }
          40% {
            clip: rect(15px, 9999px, 36px, 0);
          }
          60% {
            clip: rect(62px, 9999px, 43px, 0);
          }
          80% {
            clip: rect(81px, 9999px, 61px, 0);
          }
          100% {
            clip: rect(46px, 9999px, 78px, 0);
          }
        }
        
        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          97% {
            transform: skew(0deg);
          }
          98% {
            transform: skew(2deg);
          }
          99% {
            transform: skew(-2deg);
          }
          100% {
            transform: skew(0deg);
          }
        }

        /* Circle - Static */
        .circle-outline-static {
          width: 420px;
          height: 420px;
          border: 1px solid rgba(100, 100, 100, 0.3);
          border-radius: 50%;
        }

        /* Accent line */
        .accent-line {
          height: 3px;
          width: 120px;
          background: linear-gradient(90deg, transparent, #0e7835, transparent);
          animation: line-pulse 2s ease-in-out infinite;
        }
        
        @keyframes line-pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scaleX(1);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.2);
          }
        }

        /* Float animations */
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Slide animations */
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}