import AboutTag from "./AboutTag";

export default function AboutContent() {
  return (
    <div>
      <AboutTag />
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4">
        About Me
      </h2>

      <p className="leading-relaxed mb-8" style={{ color: "#6F8F7A" }}>
        {`I'm a full-stack developer with a passion for creating beautiful and
        functional web applications. I have a strong background in both
        front-end and back-end development, and I'm always looking for new
        challenges and opportunities to learn.`}
      </p>

      <p className="leading-relaxed" style={{ color: "#6F8F7A" }}>
        {`When I'm not coding, you can find me exploring the latest in AI and
        machine learning, or tinkering with new technologies. I'm a firm
        believer in the power of technology to make a positive impact on the
        world, and I'm excited to be a part of this ever-evolving industry.`}
      </p>
    </div>
  );
}
