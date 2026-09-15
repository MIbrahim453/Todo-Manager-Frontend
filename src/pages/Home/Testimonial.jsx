import { SafetyCertificateOutlined } from "@ant-design/icons";

function Testimonial() {
  return (
    <section
      id="testimonial"
      className="bg-background px-6 py-20 font-manrope sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-error-bg text-4xl text-primary">
          <SafetyCertificateOutlined aria-hidden="true" />
        </div>
        <h2 className="mt-9 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
          Built with control in mind
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-text-secondary sm:text-xl">
          Whether you operate as an individual contributor or manage
          organization-wide permissions, Todo Manager scales securely with
          role-based registries and audit logs.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-surface-secondary px-6 py-10 sm:px-10 sm:py-11">
          <blockquote className="text-xl italic leading-relaxed text-text-primary sm:text-2xl">
            &ldquo;Simple enough for everyday tasks. Flexible enough for shared
            work.&rdquo;
          </blockquote>
          <p className="mt-6 text-base font-medium uppercase tracking-widest text-text-secondary sm:text-lg">
            &mdash; Paper &amp; Ink Studio Ledger
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
