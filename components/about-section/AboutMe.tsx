import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, subtitle }) => (
  <div className="flex flex-col">
    <div className="flex items-baseline gap-1">
      <span className="text-5xl font-bold text-white">{value}</span>
      <span className="text-2xl text-purple-400">+</span>
    </div>
    <p className="text-white font-medium mt-2">{label}</p>
    {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
  </div>
);

const AboutMe: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto p-6">
      <div className="relative rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border-2 border-purple-500/50 p-8 md:p-12 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl blur-xl" />

        <div className="relative z-10 grid md:grid-cols-[1fr,300px] gap-8 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Me
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              I'm Faris Edrik Proyoga, a full-stack developer passionate about
              building modern, high-performance applications with an intuitive
              user experience. I enjoy working with the latest technologies like
              Artificial Intelligence, Machine Learning, and cloud-based
              development, blending creativity with precision to deliver
              impactful solutions. With over three years of experience and more
              than 20 completed projects, I'm committed to helping users and
              businesses grow in the digital era through functional, aesthetic,
              and scalable digital products.
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              <StatCard
                value="20"
                label="Project Finished"
                subtitle="Working with heart, creating with mind."
              />
              <StatCard value="3" label="Years of Experience" />
            </div>
          </div>

          {/* Right content - Phone mockup */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-48 h-96 bg-gradient-to-b from-gray-900 to-black rounded-[3rem] border-4 border-purple-500 shadow-2xl shadow-purple-500/50 p-3">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-b from-purple-900/40 to-gray-900 rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />

                  {/* Screen content */}
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          FE
                        </span>
                      </div>
                      <p className="text-white text-sm font-medium">
                        Portfolio
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-purple-500/30 blur-3xl -z-10 scale-110" />
            </div>
          </div>
        </div>

        {/* Decorative cursor */}
        <div className="absolute bottom-32 right-1/3 w-6 h-6 border-2 border-white/50 rounded-full hidden md:block" />
      </div>
    </section>
  );
};

export default AboutMe;
