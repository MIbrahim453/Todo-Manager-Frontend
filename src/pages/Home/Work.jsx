import { Card, Col, Row } from "antd";

const steps = [
  {
    number: "01",
    title: "Created",
    description:
      "Jot down tasks instantly with keyboard shortcuts or voice memos. Everything lands cleanly in your inbox.",
    numberColor: "text-[#e34432]",
  },
  {
    number: "02",
    title: "Organize",
    description:
      "Categorize into ledgers, tag with metadata, and prioritize with slender accent bars.",
    numberColor: "text-[#0f66ae]",
  },
  {
    number: "03",
    title: "Share",
    description:
      "Send direct task links to collaborators or invite team members to entire project views.",
    numberColor: "text-[#446c3d]",
  },
];

function Work() {
  return (
    <section
      id="work"
      className="bg-background px-6 py-14 font-manrope sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            How Todo Manager works
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
            Three straightforward steps to complete clarity.
          </p>
        </div>

        <Row gutter={[20, 20]} className="mt-10">
          {steps.map((step) => (
            <Col key={step.number} xs={24} md={8}>
              <div className="flex h-full flex-col rounded-2xl border border-[#e8e2da] bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span
                  className={`text-2xl font-bold leading-none ${step.numberColor}`}
                >
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-bold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Work;
