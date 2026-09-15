import { AppstoreOutlined, AimOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const features = [
  {
    title: "Organize",
    description:
      "Structure tasks into clean ledgers, projects, and custom views tailored to your workflow.",
    icon: <AppstoreOutlined />,
    badgeBg: "bg-[#feece9]",
    badgeColor: "text-[#e34432]",
  },
  {
    title: "Focus",
    description:
      "Zero in on today's priorities with intelligent filtering and calm, paper-inspired UI states.",
    icon: <AimOutlined />,
    badgeBg: "bg-[#e7f1f9]",
    badgeColor: "text-[#0f66ae]",
  },
  {
    title: "Share",
    description:
      "Seamlessly collaborate by sharing individual items or entire project ledgers without friction.",
    icon: <ShareAltOutlined />,
    badgeBg: "bg-[#eaf4ea]",
    badgeColor: "text-[#446c3d]",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-background px-6 py-12 font-manrope sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl rounded-[28px] border border-[#ece6df] bg-[#f8f3ed] p-8 sm:p-12 lg:p-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Everything you need to stay on top of your work
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
            Designed with absolute restraint. No clutter, no distractions just
            pure execution speed.
          </p>
        </div>

        <Row gutter={[20, 20]} className="mt-10">
          {features.map((feature) => (
            <Col key={feature.title} xs={24} md={8}>
              <div className="flex h-full flex-col rounded-2xl border border-[#e8e2da] bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.badgeBg} text-lg ${feature.badgeColor}`}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-base font-bold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Features;
