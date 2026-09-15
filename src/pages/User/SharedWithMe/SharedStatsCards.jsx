import {
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

function SharedStatsCards({ total = 0, pending = 0, completed = 0 }) {
  const cards = [
    {
      title: "Total Shared Todos",
      count: total,
      icon: <TeamOutlined className="text-xl text-primary" />,
      bgIcon: "bg-surface-secondary text-primary",
      subtitle: "Tasks assigned from team members",
    },
    {
      title: "Pending Todos",
      count: pending,
      icon: <ClockCircleOutlined className="text-xl text-amber-600" />,
      bgIcon: "bg-amber-50 text-amber-600",
      subtitle: "Awaiting progress or completion",
    },
    {
      title: "Completed Todos",
      count: completed,
      icon: <CheckCircleOutlined className="text-xl text-success" />,
      bgIcon: "bg-success-bg text-success",
      subtitle: "Finished collaborative items",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {card.title}
            </span>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bgIcon}`}
            >
              {card.icon}
            </div>
          </div>
          <div className="text-3xl font-extrabold text-text-primary leading-tight">
            {card.count}
          </div>
          <p className="m-0 mt-1 text-xs text-text-muted">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SharedStatsCards
