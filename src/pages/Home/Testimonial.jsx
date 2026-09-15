import { SafetyCertificateOutlined } from "@ant-design/icons";

function Testimonial() {
  return (
    <section
      id="testimonial"
      className="bg-background px-6 py-14 font-manrope sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-[#fbd3cd] bg-[#feece9] text-xl text-primary shadow-2xs">
          <SafetyCertificateOutlined aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Built with control in mind
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-text-muted sm:text-sm">
          Whether you operate as an individual contributor or manage
          organization-wide permissions, Todo Manager scales securely with
          role-based registries and audit logs.
        </p>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#ece6df] bg-[#fbf7f1] px-8 py-9 sm:px-12 sm:py-10">
          <blockquote className="text-base italic leading-relaxed text-text-primary sm:text-lg">
            &ldquo;Simple enough for everyday tasks. Flexible enough for shared
            work.&rdquo;
          </blockquote>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-text-muted sm:text-xs">
            &mdash; PAPER &amp; INK STUDIO LEDGER
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
