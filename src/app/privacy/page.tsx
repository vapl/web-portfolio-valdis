// "use client"; // Not needed for a static policy page

import React from "react";
import EmailLink from "@/components/contact/EmailLink";

// Tip: keep the component name PascalCase for conventions
const PrivacyPage = () => {
  // NOTE: Prefer a hard-coded date for legal clarity rather than new Date().
  const lastUpdated = "2025-08-23";

  return (
    <div className="flex flex-col items-center pt-28 pb-20 px-12 md:px-16">
      {/* Header block */}
      <div className="flex flex-col items-center mb-28 gap-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">Privacy Policy</h1>
        <p className="text-2xl">Last updated: {lastUpdated}</p>
      </div>

      {/* Content container */}
      <div className="w-full max-w-4xl space-y-8">
        {/* Intro */}
        <p className="text-2xl">
          This website respects your privacy. We do not collect or store
          personal information in a database.
        </p>

        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">Contact Form</h2>
          <p className="text-2xl">
            If you choose to contact us via the contact form, the information
            you provide (such as your name, email address, and message) will
            only be used to respond to your inquiry. We do not share or sell
            this information.
          </p>
        </section>

        {/* Email Communication */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">Email Communication</h2>
          <p className="text-2xl">
            Any email you send through the contact form is delivered directly to
            our email inbox and is treated as confidential communication.
          </p>
        </section>

        {/* No Cookies */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">Cookies</h2>
          <p className="text-2xl">We do not use cookies on this website.</p>
        </section>

        {/* Analytics (privacy-friendly) */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">Analytics</h2>
          <p className="text-2xl">
            We use a privacy-friendly analytics tool to understand general
            traffic patterns (e.g., number of visitors, popular pages). This
            tool does not use cookies and does not collect personal data that
            can identify you.
          </p>
        </section>

        {/* GDPR / Rights */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">Your Rights</h2>
          <p className="text-2xl">
            If you contact us and wish for your email to be deleted from our
            records, you can request it at any time by replying to our
            communication. If you are located in the EU/EEA, you may also have
            rights under the GDPR, such as access, rectification, and erasure of
            your personal data related to email communications.
          </p>
        </section>

        {/* Data Controller & Retention (optional but useful) */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">
            Data Controller & Retention
          </h2>
          <p className="text-2xl">
            The data controller for emails received via the contact form is
            Valdis Vascenkovs. Emails are retained only as long as necessary to
            handle your inquiry and for basic record-keeping, after which they
            may be deleted.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-3xl font-bold mt-8 mb-4">Contact</h2>
          <p className="text-2xl">
            If you have any questions about this Privacy Policy, please contact
            us at <EmailLink />.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
