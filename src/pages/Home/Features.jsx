import { AppstoreOutlined, AimOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const features = [
  {
    title: "Organize",
    description:
      "Structure tasks into clean ledgers, projects, and custom views tailored to your workflow.",
    icon: <AppstoreOutlined />,
    badgeBg: "bg-error-bg",
    badgeColor: "text-primary",
  },
  {
    title: "Focus",
    description:
      "Zero in on today's priorities with intelligent filtering and calm, paper-inspired UI states.",
    icon: <AimOutlined />,
    badgeBg: "bg-info-bg",
    badgeColor: "text-secondary",
  },
  {
    title: "Share",
    description:
      "Seamlessly collaborate by sharing individual items or entire project ledgers without friction.",
    icon: <ShareAltOutlined />,
    badgeBg: "bg-success-bg",
    badgeColor: "text-success",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-background! px-6! py-24! font-manrope! sm:px-10! lg:px-16!"
    >
      <div className="mx-auto! max-w-7xl! rounded-2xl! bg-surface-muted! p-10! sm:p-14!">
        <div className="mx-auto! max-w-3xl! text-center!">
          <h2 className="text-3xl! font-bold! tracking-tight! text-text-primary! sm:text-4xl! lg:text-5xl!">
            Everything you need to stay on top of your work
          </h2>
          <p className="mt-4! text-base! leading-relaxed! text-text-secondary! sm:text-lg!">
            Designed with absolute restraint. No clutter, no distractions just
            pure execution speed.
          </p>
        </div>

        <Row gutter={[28, 28]} className="mt-14!">
          {features.map((feature) => (
            <Col key={feature.title} xs={24} md={8}>
              <Card
                className="h-full! rounded-lg! border! border-card-border! bg-surface! shadow-none! transition-transform! duration-300! hover:-translate-y-1!"
                styles={{ body: { padding: 28 } }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.badgeBg} text-2xl ${feature.badgeColor}`}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h3 className="mt-7! text-xl! font-bold! text-text-primary! sm:text-2xl!">
                  {feature.title}
                </h3>
                <p className="mt-3! text-sm! leading-relaxed! text-text-secondary! sm:text-base!">
                  {feature.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Features;
