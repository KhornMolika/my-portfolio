interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="flex flex-col">
    <div className="flex items-baseline gap-1">
      <span className="text-5xl font-bold text-white">{value}</span>
      <span className="text-2xl" style={{ color: "#C6A15B" }}>
        +
      </span>
    </div>
    <p className="text-white font-medium mt-2">{label}</p>
  </div>
);

export default function AboutContent() {
  const stats = [
    {
      value: "5",
      label: "Projects Finished",
    },
    {
      value: "1",
      label: "Years of Experience",
    },
    // {
    //   value: "5",
    //   label: "Clients Served",
    // },
  ];

  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        About Me
      </h2>

      <p className="leading-relaxed mb-8" style={{ color: "#6F8F7A" }}>
        {`I’m Khorn Molika, a Cambodia-based full-stack developer passionate about
        building modern, high-performance applications with an intuitive user
        experience. I enjoy working with the latest technologies, including
        Artificial Intelligence, Machine Learning, and cloud-based development,
        blending creativity with precision to deliver impactful solutions. With
        over three years of experience and more than 20 completed projects, I’m
        committed to helping users and businesses grow in the digital era
        through functional, aesthetic, and scalable digital products.`}
      </p>

      {/* Stats */}
      <div className="flex gap-12">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
      <p className="text-sm mt-5" style={{ color: "#6F8F7A" }}>
        Working with heart, creating with mind.
      </p>
    </div>
  );
}
