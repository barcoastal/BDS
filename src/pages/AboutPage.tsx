const AboutPage = () => (
  <div className="container-narrow py-12">
    <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">About Business Debt Insider</h1>
    <div className="article-body">
      <p>
        Business Debt Insider is a free educational resource for business owners navigating financial difficulty. We provide in-depth, expert-level content on business debt, restructuring, bankruptcy, tax resolution, and financial recovery.
      </p>
      <h2>Our Mission</h2>
      <p>
        Business owners facing debt crises often struggle to find clear, unbiased information. Most online content is thinly disguised marketing for debt settlement companies or law firms. We believe business owners deserve better — straightforward, thoroughly researched information that helps them understand their situation and make informed decisions.
      </p>
      <h2>What We Are Not</h2>
      <p>
        We are not a law firm, a debt settlement company, or a financial advisory service. We do not sell services, capture leads, or refer readers to specific providers. Our content is purely educational.
      </p>
      <h2>Important Disclaimer</h2>
      <div className="callout-warning">
        <p className="text-sm font-medium leading-relaxed !mb-0" style={{ color: "inherit" }}>
          All content on this site is for general informational purposes only and does not constitute legal, financial, or tax advice. Every business situation is unique. Please consult with qualified attorneys, CPAs, or financial advisors for advice specific to your circumstances.
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
