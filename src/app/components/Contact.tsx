"use client";

import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

interface NavBarProps {
  setActiveSection: (section: string) => void;
}
export default function Contact({ setActiveSection }: NavBarProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormSubmitted(true);

    // Reset the form after submission
    setFormData({ name: "", email: "", message: "" });

    // Add functionality here to send data to a backend or email service
  };

  const contactMethods = [
    {
      name: "Email",
      icon: AiOutlineMail ,
      info: "mohamedabuhamida3@gmail.com",
      link: "mailto:mohamedabuhamida3@gmail.com",
    },
    {
      name: "Phone",
      icon: FaWhatsapp,
      info: "+201557557101", // Replace with your phone number
      link: "https://wa.me/+201557557101",
    },
  ];

  const socialLinks = [
    {
      name: "FaceBook",
      icon: FaFacebookF,
      link: "https://www.facebook.com/mohammed.abuhameda.3",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/mohammed-abuhamida",
    },
    {
      name: "Github",
      icon: FaGithub,
      link: "https://github.com/AbuHamida",
    },
  ];

  return (
    <section
      id="contact"
      className=" w-full flex flex-col items-center justify-center text-white px-6  "
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        Contact Me
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-center mb-12 max-w-lg"
      >
        Feel free to reach out to me for collaborations, inquiries, or just a
        friendly chat. I’d love to connect!
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start space-y-6 justify-center"
        >
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.link}
              className="flex items-center gap-4 text-lg hover:text-secondary transition"
            >
              <method.icon className="text-2xl" />
              <span>{method.info}</span>
            </a>
          ))}
          <div className="flex  gap-10 mt-6 w-full  justify-center md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
              >
                <social.icon className="text-2xl" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Message Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-6 w-full space-y-4 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Send Me a Message</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
          >
            Send Message
          </button>
          {formSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-green-500 text-sm"
            >
              Thank you for your message! I will get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
