import { Card, Col, Row } from "antd";

const steps = [
  {
    number: "01",
    title: "Created",
    description:
      "Jot down tasks instantly with keyboard shortcuts or voice memos. Everything lands cleanly in your inbox.",
    numberClassName: "text-primary",
  },
  {
    number: "02",
    title: "Organize",
    description:
      "Categorize into ledgers, tag with metadata, and prioritize with slender accent bars.",
    numberClassName: "text-secondary",
  },
  {
    number: "03",
    title: "Share",
    description:
      "Send direct task links to collaborators or invite team members to entire project views.",
    numberClassName: "text-success",
  },
];

function Work() {
  return (
    <section
      id="work"
      className="bg-background px-6 py-24 font-manrope sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            How Todo Manager works
          </h2>
          <p className="mt-5 text-base leading-8 text-text-secondary sm:text-lg">
            Three straightforward steps to complete clarity.
          </p>
        </div>

        <Row gutter={[24, 24]} className="mt-12">
          {steps.map((step) => (
            <Col key={step.number} xs={24} md={8}>
              <Card
                className="h-full rounded-lg! border-card-border! bg-surface! shadow-none! transition-transform duration-300 hover:-translate-y-1"
                styles={{ body: { padding: 28 } }}
              >
                <span
                  className={`text-4xl font-bold leading-none ${step.numberClassName}`}
                >
                  {step.number}
                </span>
                <h3 className="mt-8 text-xl font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {step.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Work;
