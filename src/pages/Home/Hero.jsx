import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-background px-6 py-20 font-manrope sm:px-10">
      <section className="flex max-w-4xl flex-col items-center text-center">
        <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Organize your work. Share your progress.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
          Built with the quiet clarity of a sunlit physical studio. Experience
          focused task execution, precise collaboration, and absolute calm.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 font-semibold text-primary-text transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            Get started - free
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-md border border-border px-7 py-3 font-semibold text-text-primary transition-colors hover:bg-secondary-hover-bg hover:text-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Hero;
