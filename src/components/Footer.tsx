export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-6">
            <a href="/" className="flex flex-col select-none">
              <span className="font-serif text-3xl tracking-[0.15em] uppercase text-white font-medium">
                Castle Carpentry
              </span>
              <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-brand-secondary mt-1">
                Carpentry, Remodeling & Renovation
              </span>
            </a>
            <p className="font-sans text-xs text-brand-bg/60 leading-relaxed max-w-sm">
            Serving the Western Massachusetts area, Castle Carpenters takes pride in providing high-quality results.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white">Contact Information</h4>
            <ul className="space-y-2.5 font-sans text-xs text-brand-bg/50">
              <li>E-mail: contact@castlecarpenters.us</li>
              <li>Phone Number: +1 (413) 273-6134</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 text-brand-bg/40 font-sans text-xs gap-4">
          <p>&copy; 2026 Castle Carpenters Inc. All Rights Reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-secondary transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
