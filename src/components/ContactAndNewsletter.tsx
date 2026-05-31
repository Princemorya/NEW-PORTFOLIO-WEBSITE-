import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MailCheck, CheckCircle2, ChevronRight, Bookmark, CircleEllipsis } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function ContactAndNewsletter() {
  // Contact States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactLd, setContactLd] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactErr, setContactErr] = useState<string | null>(null);

  // Newsletter States
  const [newsEmail, setNewsEmail] = useState("");
  const [newsLd, setNewsLd] = useState(false);
  const [newsSuccess, setNewsSuccess] = useState<string | null>(null);
  const [newsErr, setNewsErr] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) {
      setContactErr("Please fill out all required fields: Name, Email, and Message.");
      return;
    }

    setContactLd(true);
    setContactErr(null);
    setContactSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMsg
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "An unexpected error occurred. Please check details.");
      }

      setContactSuccess(data.message || "Thank you! Your message has been received.");
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMsg("");
    } catch (err: any) {
      console.error("Contact send error:", err);
      setContactErr(err.message || "Could not post message at this moment.");
    } finally {
      setContactLd(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim() || !newsEmail.includes("@")) {
      setNewsErr("Please enter a valid email address.");
      return;
    }

    setNewsLd(true);
    setNewsErr(null);
    setNewsSuccess(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsEmail })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup error. Please check parameters.");
      }

      setNewsSuccess(data.message || "Thank you! You are enrolled.");
      setNewsEmail("");
    } catch (err: any) {
      console.error("Newsletter send error:", err);
      setNewsErr(err.message || "Could not complete registration.");
    } finally {
      setNewsLd(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Divided Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Details & Info Card Column (5-stretch span) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-violet-500 bg-violet-500/10 px-2.5 py-1 rounded">
                Let's Collaborate
              </span>
              <h2 className="mt-3 font-sans text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Get in Touch
              </h2>
              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Have a project design description or looking to optimize your backend endpoints? Fill out the portal, or drop a line via direct email circles.
              </p>
            </div>

            {/* Direct Connect Elements */}
            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                id="contact-detail-mail"
                className="flex items-center space-x-4 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors"
              >
                <div className="p-2.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                    Official Email
                  </div>
                  <div className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                id="contact-detail-phone"
                className="flex items-center space-x-4 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors"
              >
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                    Direct Line
                  </div>
                  <div className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </a>

              <div
                id="contact-detail-location"
                className="flex items-center space-x-4 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30"
              >
                <div className="p-2.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                    Location Residence
                  </div>
                  <div className="font-sans text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {PERSONAL_INFO.location}, India
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Box (Wrapped cleanly nested here) */}
            <div
              id="newsletter-subscription-box"
              className="p-6 bg-gradient-to-r from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-zinc-900 border border-zinc-800/80 dark:border-zinc-900 rounded-2xl text-white shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-emerald-400">
                  Intellectual Newsletter
                </span>
              </div>
              <h3 className="mt-3 font-sans text-sm font-bold text-white tracking-snug">
                Receive Technical Recaps
              </h3>
              <p className="mt-1.5 text-[11px] text-zinc-400 leading-relaxed">
                Join readers getting technical post-mortems regarding scaling Node databases and diagnostic AI classifiers.
              </p>

              {newsSuccess ? (
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{newsSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsSubmit} className="mt-5 space-y-3">
                  <div className="relative">
                    <input
                      id="newsletter-email-input"
                      type="email"
                      placeholder="Enter legal email..."
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      disabled={newsLd}
                      className="w-full text-xs text-zinc-100 placeholder-zinc-500 pl-4 pr-10 py-2.8 bg-zinc-900/50 border border-zinc-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-50 font-sans"
                    />
                    <button
                      id="newsletter-submit-button"
                      type="submit"
                      disabled={newsLd}
                      className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-500 hover:opacity-90 text-zinc-950 rounded-md transition-all shrink-0 cursor-pointer disabled:opacity-30"
                      aria-label="Subscribe"
                    >
                      {newsLd ? <CircleEllipsis className="w-3.5 h-3.5 animate-spin" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {newsErr && (
                    <p className="text-[10px] text-rose-400 font-mono mt-1">
                      {newsErr}
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>

          {/* Message Dispatcher Form (7-stretch span) */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-900 p-6 sm:p-10 rounded-2xl shadow-sm">
            
            {contactSuccess ? (
              <div id="contact-success-panel" className="text-center py-10 space-y-4">
                <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-500 rounded-full mb-2">
                  <MailCheck className="w-8 h-8" />
                </div>
                <h3 className="font-sans text-lg font-bold text-zinc-900 dark:text-white">
                  Transmission Complete
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  {contactSuccess}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setContactSuccess(null)}
                    className="px-5 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 rounded-xl text-xs font-semibold"
                  >
                    Send Another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 flex flex-col font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label id="lbl-contact-name" className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-zinc-400 mb-1.5">
                      Your Name <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Liam Smith"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={contactLd}
                      className="w-full text-xs text-zinc-800 dark:text-zinc-100 pl-4 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label id="lbl-contact-email" className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-zinc-400 mb-1.5">
                      Email Address <span className="text-emerald-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. liam@domain.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={contactLd}
                      className="w-full text-xs text-zinc-800 dark:text-zinc-100 pl-4 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label id="lbl-contact-subj" className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-zinc-400 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Developer hiring scope / roomzy integration"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    disabled={contactLd}
                    className="w-full text-xs text-zinc-800 dark:text-zinc-100 pl-4 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label id="lbl-contact-msg" className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-zinc-400 mb-1.5">
                    Your Message <span className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Describe your design specifications/goals..."
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    disabled={contactLd}
                    className="w-full text-xs text-zinc-800 dark:text-zinc-100 pl-4 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all disabled:opacity-50"
                  />
                </div>

                {contactErr && (
                  <p className="text-xs text-rose-500 font-mono">
                    {contactErr}
                  </p>
                )}

                <button
                  id="submit-contact"
                  type="submit"
                  disabled={contactLd}
                  className="mt-3.5 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-semibold hover:opacity-90 active:scale-98 transition-all cursor-pointer disabled:opacity-50 text-xs w-full sm:max-w-fit"
                >
                  {contactLd ? (
                    <>
                      <CircleEllipsis className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
