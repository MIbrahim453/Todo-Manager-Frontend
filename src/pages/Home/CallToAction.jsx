import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="bg-background px-6 py-16 font-manrope sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl bg-surface-secondary px-6 py-16 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Ready to get your tasks under control?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
          Join professionals who have traded chaotic apps for the serene
          precision of physical studio stationery.
        </p>

        <div className="mt-9 flex flex-col justify-center items-center sm:flex-row sm:items-center">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-center font-semibold text-primary-text shadow-lg shadow-primary/20 transition-colors duration-300 hover:bg-primary-hover"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
