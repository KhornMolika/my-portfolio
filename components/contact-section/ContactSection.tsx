import React from "react";

const ContactSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
      <div className="max-w-md mx-auto">
        <form className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Name"
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />
          <textarea
            placeholder="Message"
            className="textarea-field"
            rows={4}
          ></textarea>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
