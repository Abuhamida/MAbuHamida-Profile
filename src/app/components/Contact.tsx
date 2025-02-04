"use client";

import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import khamsat from "../../../public/khamsat.png";
import mostaqel from "@../../../public/mostaql-logo-white.svg";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const contactMethods = [
    {
      name: "Email",
      icon: AiOutlineMail,
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
      image: "",
      link: "https://www.facebook.com/mohammed.abuhameda.3",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      image: "",
      link: "https://www.linkedin.com/in/mohammed-abuhamida",
    },
    {
      name: "Github",
      icon: FaGithub,
      image: "",
      link: "https://github.com/AbuHamida",
    },
    {
      name: "UpWork",
      icon: FaUpwork,
      image: "",
      link: "https://www.upwork.com/freelancers/~0191d02b8deff4294c?viewMode=1",
    },
    {
      name: "Mostaql",
      icon: "",
      image: mostaqel,
      link: "https://www.upwork.com/freelancers/~0191d02b8deff4294c?viewMode=1",
    },
    {
      name: "Khamsat",
      icon: "",
      image: khamsat,
      link: "https://www.upwork.com/freelancers/~0191d02b8deff4294c?viewMode=1",
    },
  ];

  return (
    <section
      id="contact"
      className=" w-full flex flex-col items-center justify-center text-white px-6  py-20"
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
          className="flex flex-col items-center space-y-6 justify-center"
        >
          <div className="flex flex-col items-start space-y-6 justify-center w-full">
            {contactMethods.map((method) => (
              <a
                key={method.name}
                href={method.link}
                className="flex items-center gap-4 text-lg hover:text-secondary transition-all duration-200"
              >
                <method.icon className="text-2xl" />
                <span>{method.info}</span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 ">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                target="_blank"
                className="hover:text-secondary transition-all duration-300 flex items-center justify-center"
              >
                {social.icon && <social.icon className="text-3xl md:text-2xl" />}
                {social.image && (
                  <Image
                    src={social.image}
                    alt={social.name}
                    height={40}
                    width={40}
                    className="w-12 pb-1 object-contain hover:border-b-2 hover:border-secondary"
                  />
                )}
              </Link>
            ))}
          </div>
        </motion.div>
        {/* Message Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="text-white rounded-lg p-6 w-full space-y-4 shadow-md shadow-primary/10 "
        >
          <h2 className="text-2xl font-semibold mb-4">Send Me a Message</h2>

          <div className="w-full">
            <div className="relative w-full min-w-[200px]">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="peer h-full min-h-12 w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></input>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Name
              </label>
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px]">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="peer h-full min-h-12 w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></input>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px]">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200
                border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Message
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white py-2 px-4 rounded-md shadow-md shadow-primary/10 hover:shadow-primary/20 hover:text-secondary transition-all duration-200 hover:scale-95"
          >
            Send Message
          </button>
          {formSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-primary text-sm"
            >
              Thank you for your message! I will get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
