import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Business Debt Insider — how we collect, use, and protect your information.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const updated = "April 13, 2026";
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="font-serif text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {updated}</p>

      <div className="prose prose-stone max-w-none space-y-8 text-foreground">

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">1. Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            Business Debt Insider is owned and operated by <strong>Albert Capital SRL</strong>, a company
            incorporated in Romania. We operate this website as an educational resource and lead
            referral platform connecting business owners with licensed debt settlement agencies in
            the United States. We do not provide debt settlement, legal, or financial advisory
            services directly.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Contact: <a href="mailto:privacy@businessdebtinsider.com" className="text-accent hover:underline">privacy@businessdebtinsider.com</a>
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">When you submit the form on our website, we collect:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>First and last name</li>
            <li>Business name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Self-reported debt type and amount range</li>
            <li>IP address and browser/device information (collected automatically)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We do not collect Social Security numbers, bank account details, credit card numbers,
            or any sensitive financial documents through this website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Your information is used to:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Match you with a licensed debt settlement agency in our partner network based on your debt size and business location</li>
            <li>Transmit your contact details to that partner agency so they can reach out to you with a personalized offer</li>
            <li>Improve our website and understand how visitors use our services</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We do not use your information for automated decision-making or profiling in ways that
            produce legal or similarly significant effects.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">4. How We Share Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We share your information only with <strong>vetted partner debt settlement agencies</strong> within
            our network. These agencies are licensed to operate in the United States and are
            contractually required to handle your data in compliance with applicable privacy laws.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell, rent, or trade your personal information to third parties outside of
            our partner agency network. We may also disclose information when required by law or
            to protect our legal rights.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">5. Cookies and Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Google Analytics and Google Ads tracking tags (including Google Tag Manager)
            to understand website traffic and measure ad performance. These tools may set cookies
            on your device. You can opt out of Google Analytics tracking at{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your submitted information for up to 24 months from the date of submission,
            or until you request deletion. After that period, your data is permanently deleted
            from our systems.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:privacy@businessdebtinsider.com" className="text-accent hover:underline">privacy@businessdebtinsider.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">8. Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use industry-standard security measures including HTTPS encryption and access
            controls to protect your data. Our data is stored in Cloudflare's infrastructure.
            No method of transmission over the internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">9. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            This website is intended for business owners and is not directed at individuals under
            the age of 18. We do not knowingly collect information from minors.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">10. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated "Last updated" date. Continued use of the website after changes
            constitutes acceptance of the revised policy.
          </p>
        </section>

      </div>
    </div>
  );
}
