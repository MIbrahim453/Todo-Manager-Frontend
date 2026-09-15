import { AppstoreOutlined, AimOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const features = [
  {
    title: "Organize",
    description:
      "Structure tasks into clean ledgers, projects, and custom views tailored to your workflow.",
    icon: <AppstoreOutlined />,
    iconClassName: "text-primary",
  },
  {
    title: "Focus",
    description:
      "Zero in on today's priorities with intelligent filtering and calm, paper-inspired UI states.",
    icon: <AimOutlined />,
    iconClassName: "text-secondary",
  },
  {
    title: "Share",
    description:
      "Seamlessly collaborate by sharing individual items or entire project ledgers without friction.",
    icon: <ShareAltOutlined />,
    iconClassName: "text-success",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-background px-6 py-20 font-manrope sm:px-10 lg:px-16"
    >
      <div className="rounded-3xl bg-surface-secondary/40 p-8 sm:p-12 lg:p-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
              Everything you need to stay on top of your work
            </h2>
            <p className="mt-5 text-base leading-8 text-text-secondary sm:text-lg">
              Designed with absolute restraint. No clutter, no distractions just
              pure execution speed.
            </p>
          </div>

          <Row gutter={[24, 24]} className="mt-12">
            {features.map((feature) => (
              <Col key={feature.title} xs={24} md={8}>
                <Card
                  className="h-full rounded-xl border border-card-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  styles={{ body: { padding: 32 } }}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-surface-muted text-2xl ${feature.iconClassName}`}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-text-secondary">
                    {feature.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
}

export default Features;
