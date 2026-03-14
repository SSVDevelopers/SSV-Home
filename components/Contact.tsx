import React, { useState, useRef } from "react";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">(
    "idle",
  );

  const [phone, setPhone] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setFormState("sending");

    emailjs
      .sendForm(
        "service_lqr8fts",
        "template_fpqrcah",
        form.current,
        "JpM5DYkOHd_YVRcD4",
      )
      .then(() => {
        setFormState("success");

        setTimeout(() => {
          setFormState("idle");
        }, 5000);

        form.current?.reset();
      })
      .catch(() => {
        alert("Message failed to send");
        setFormState("idle");
      });
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* CONTACT INFO */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-amber-500 font-black tracking-widest uppercase text-xs mb-3">
                Contact Us
              </h2>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Secure Your <br />
                Consultation Today
              </h3>

              <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                We're ready to discuss your next big venture.
              </p>
            </div>

            <div className="grid gap-6">
              {/* PHONE */}
              <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />

                <div>
                  <p className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1">
                    Call
                  </p>

                  <a
                    href="tel:+919150134954"
                    className="text-lg sm:text-xl font-bold hover:text-amber-500"
                  >
                    +91 9150134954
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />

                <div>
                  <p className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1">
                    Email
                  </p>

                  <a
                    href="mailto:ssvbuildersinfra@gmail.com"
                    className="text-lg sm:text-xl font-bold hover:text-amber-500 break-all"
                  >
                    ssvbuildersinfra@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100">
              {formState === "success" ? (
                <div className="text-center py-12 sm:py-16">
                  <CheckCircle className="mx-auto text-green-600 w-14 h-14 sm:w-16 sm:h-16 mb-4 animate-bounce" />

                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Message Sent Successfully
                  </h4>

                  <p className="text-slate-500 text-sm sm:text-base">
                    We will contact you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-8 text-center">
                    Send a Message
                  </h3>

                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* NAME */}
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Full Name"
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 text-slate-900"
                    />

                    {/* EMAIL */}
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="Email Address"
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 text-slate-900"
                    />

                    {/* PHONE */}
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      enableSearch={true}
                      countryCodeEditable={false}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "45px",
                        fontSize: "15px",
                        color: "#000",
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        border: "2px solid #e2e8f0",
                        paddingLeft: "50px",
                      }}
                    />

                    <input type="hidden" name="phone" value={phone} />

                    {/* PROJECT TYPE */}
                    <select
                      name="project_type"
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 text-slate-900"
                    >
                      <option>Residential Construction</option>
                      <option>Commercial Development</option>
                      <option>Industrial Infrastructure</option>
                      <option>Renovation</option>
                    </select>

                    {/* MESSAGE */}
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Project Details"
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 text-slate-900"
                    />

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="w-full bg-amber-500 text-black font-bold py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-600 shadow-lg transition-transform hover:scale-105"
                    >
                      {formState === "sending" ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
