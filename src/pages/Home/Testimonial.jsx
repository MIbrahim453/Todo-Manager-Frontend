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
        <h2 className="mt-7 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Built with control in mind
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          Whether you operate as an individual contributor or manage
          organization-wide permissions, Todo Manager scales securely with
          role-based registries and audit logs.
        </p>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-surface-secondary px-6 py-10 sm:px-10 sm:py-11">
          <blockquote className="text-xl italic leading-relaxed text-text-primary sm:text-2xl lg:text-3xl">
            &ldquo;Simple enough for everyday tasks. Flexible enough for shared
            work.&rdquo;
          </blockquote>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-text-muted sm:text-sm">
            &mdash; PAPER &amp; INK STUDIO LEDGER
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
