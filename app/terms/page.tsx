import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Business Debt Insider.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const updated = "April 13, 2026";
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="font-serif text-4xl font-bold text-primary mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {updated}</p>

      <div className="prose prose-stone max-w-none space-y-8 text-foreground">

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">1. About This Website</h2>
          <p className="text-muted-foreground leading-relaxed">
            Business Debt Insider ("we," "us," "our") is owned and operated by{" "}
            <strong>Albert Capital SRL</strong>, a company incorporated in Romania. This website
            provides educational content about business debt relief options and operates as a
            lead referral platform connecting business owners with licensed debt settlement
            agencies in the United States.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            By accessing or using this website, you agree to these Terms of Service. If you do
            not agree, please do not use this website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">2. Not Legal or Financial Advice</h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on this website is for informational and educational purposes only.
            Nothing on this website constitutes legal advice, financial advice, or debt
            settlement services. Business Debt Insider is not a law firm, debt settlement
            company, or licensed financial advisor.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            You should consult a licensed attorney or financial professional before making any
            decisions regarding your business debt. Results described on this website are not
            guaranteed and vary based on individual circumstances.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">3. How the Referral Process Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you submit the contact form on this website, your information is shared with
            one or more licensed debt settlement agencies within our partner network. The
            matching is based on factors including your reported debt amount and business
            location. A representative from the matched agency will contact you directly to
            discuss your situation and present available options.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            You are under no obligation to engage with or accept any offer from any agency that
            contacts you. We do not guarantee that a partner agency will be available in your
            area or that you will qualify for any particular relief program.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We may receive compensation from our partner agencies when a referral is made. This
            compensation does not affect the information or content we provide on this website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">4. Accuracy of Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            We strive to keep the educational content on this website accurate and up to date.
            However, laws, regulations, and industry practices change frequently. We make no
            warranties regarding the completeness, accuracy, or timeliness of any content on
            this website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">5. Your Responsibilities</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">By using this website, you agree to:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Provide accurate and truthful information when submitting any form</li>
            <li>Use this website only for lawful purposes</li>
            <li>Not attempt to reverse engineer, scrape, or misuse the website or its systems</li>
            <li>Not submit false or misleading information on behalf of another person without their consent</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by applicable law, Albert Capital SRL and Business
            Debt Insider shall not be liable for any indirect, incidental, special, or
            consequential damages arising from your use of this website or reliance on its
            content. Our total liability for any claim related to this website shall not exceed
            $100 USD.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">7. Third-Party Links and Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            This website may contain links to third-party websites or reference third-party
            services. We are not responsible for the content, practices, or privacy policies of
            any third-party websites. Links do not constitute endorsement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">8. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on this website, including text, graphics, and design, is the property
            of Albert Capital SRL or its content providers and is protected by applicable
            copyright laws. You may not reproduce or distribute content from this website
            without written permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">9. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Service are governed by the laws of Romania. Any disputes arising
            from the use of this website shall be subject to the exclusive jurisdiction of the
            courts of Romania, except where prohibited by applicable consumer protection laws
            in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">10. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms, contact us at{" "}
            <a href="mailto:legal@businessdebtinsider.com" className="text-accent hover:underline">legal@businessdebtinsider.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
