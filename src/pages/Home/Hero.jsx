import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-background px-6 py-20 font-manrope sm:px-10">
      <section className="flex max-w-5xl flex-col items-center text-center">
        <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Organize your work. Share
          <br className="hidden sm:inline" /> your progress.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
          Built with the quiet clarity of a sunlit physical studio. Experience
          focused task execution, precise collaboration, and absolute calm.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-md bg-primary! px-7 py-3 font-semibold! text-primary-text! hover:bg-primary-hover! transition-colors!"
          >
            Get started - free
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-7 py-3 font-semibold text-text-primary hover:bg-surface-secondary hover:text-primary transition-colors"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Hero;
