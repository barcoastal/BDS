const SiteFooter = () => (
  <footer className="py-12 border-t border-border bg-card">
    <div className="section-container">
      <div className="text-center mb-8">
        <span className="font-serif text-xl font-bold text-foreground">
          <span className="text-primary">Resolve</span>Advisory
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
        <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          <strong>Disclaimer:</strong> This website is for informational purposes only and does not constitute legal advice.
          No attorney-client relationship is formed by your use of this site or by submitting a contact form.
          Consult with a qualified attorney for advice specific to your situation. Results vary based on individual circumstances.
          Past results do not guarantee future outcomes.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ResolveAdvisory. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
