import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-background px-6 py-16 font-manrope sm:px-10">
      <section className="flex max-w-4xl flex-col items-center text-center">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-[54px] lg:leading-[1.16]">
          Organize your work. Share
          <br className="hidden sm:inline" /> your progress.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
          Built with the quiet clarity of a sunlit physical studio. Experience
          focused task execution, precise collaboration, and absolute calm.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            Get started - free
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg border border-[#d7d6d4] bg-white px-6 py-2.5 text-xs font-semibold text-text-primary shadow-2xs transition-all hover:bg-surface-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Hero;
