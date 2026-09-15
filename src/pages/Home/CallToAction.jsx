import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="bg-background px-6 py-20 font-manrope sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-surface-secondary px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Ready to get your tasks under control?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
          Join professionals who have traded chaotic apps for the serene
          precision of physical studio stationery.
        </p>

        <div className="mt-9 flex flex-col justify-center items-center sm:flex-row sm:items-center">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
