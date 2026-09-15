import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="bg-background px-6 py-14 font-manrope sm:px-10 lg:px-20">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-[#ece6df] bg-[#fbf7f1] px-8 py-14 text-center sm:px-12 sm:py-16">
        <h2 className="mx-auto max-w-xl text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Ready to get your tasks under control?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-text-muted sm:text-sm">
          Join professionals who have traded chaotic apps for the serene
          precision of physical studio stationery.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-lg border border-[#e8e2da] bg-white px-6 py-2.5 text-xs font-bold text-primary shadow-2xs transition-all hover:bg-surface-secondary hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
