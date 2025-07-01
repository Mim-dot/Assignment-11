import React, { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("service_l3ium29", "template_flhwjwi", formData, "SWlV3urXeG_jpZLaO")
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for reaching out. We'll get back to you soon.",
          });
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        () => {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong. Please try again later.",
          });
        }
      );
  };

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-content text-center py-20">
          <div className="max-w-4xl">
            <h1 className="Contact text-5xl font-bold text-primary">Contact Us</h1>
            <p className="Contact py-6 text-xl text-primary">
              Have questions or ideas? We're here to support your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="container mx-auto px-4 py-16">
        <div className=" flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="lg:w-1/2">
            <div className="card Contactus bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Send us a message</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      What’s your message about?
                    </option>
                    <option>Posting Articles</option>
                    <option>Commenting & Discussions</option>
                    <option>Account & Authentication</option>
                    <option>Technical Support</option>
                    <option>General Feedback</option>
                  </select>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="textarea textarea-bordered w-full h-32"
                    required
                  ></textarea>
                  <button className="btn btn-primary mt-4">Send Message</button>
                </form>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2 space-y-8 Contact">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Get in Touch With Us
              </h2>
              <p className="text-lg">
                Need assistance or want to share feedback? Our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3  rounded-full bg-primary/10 text-primary text-xl">
                  <FaEnvelope className="Contact"/>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p>mimh84297@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary text-xl">
                  <FaPhoneAlt className="Contact" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p>Help Desk: +880 1996 185598 </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent text-xl">
                  <FaMapMarkerAlt className="Contact" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p>Knowledge Sharing HQ</p>
                  <p>456 Academic Ave, Suite 101</p>
                  <p>Boston, MA 02115</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
              <div className="flex gap-4">
                <a  href="https://www.facebook.com/share/1A6dFWW18A/" className="btn Contact-f btn-circle btn-outline text-xl" aria-label="Facebook">
                  <FaFacebookF className="Contact-f"  />
                </a>
                <a href="https://www.instagram.com/antiha_arin?igsh=Mjk2dGppOTY5bmZp" className="btn Contact-f btn-circle btn-outline text-xl" aria-label="Instagram">
                  <FaInstagram className="Contact-f" />
                </a>
                <a href="#" className="btn Contact-f btn-circle btn-outline text-xl" aria-label="Twitter">
                  <FaTwitter className="Contact-f" />
                </a>
                <a href="#" className="btn Contact-f btn-circle btn-outline text-xl" aria-label="LinkedIn">
                  <FaLinkedinIn className="Contact-f" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="faq" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How do I post an article?
            </div>
            <div className="collapse-content">
              <p>Log in to your account and click on "Create Article" to start sharing your knowledge.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="faq" />
            <div className="collapse-title text-xl font-medium">
              Can I edit or delete my comments?
            </div>
            <div className="collapse-content">
              <p>Yes, you can edit or delete your own comments anytime from your profile.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="faq" />
            <div className="collapse-title text-xl font-medium">
              How is my privacy protected?
            </div>
            <div className="collapse-content">
              <p>We use Firebase authentication and secure practices to protect your data.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="faq" />
            <div className="collapse-title text-xl font-medium">
              Who can see my articles and comments?
            </div>
            <div className="collapse-content">
              <p>All posts and comments are visible to all registered users to encourage open knowledge sharing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
