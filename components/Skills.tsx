"use client";

import React from "react";
import Image from "next/image";

// 🧠 Skill Data (EDIT HERE EASILY)
const skills = [
  { name: "React", img: "/skills/react.png" },
  { name: "Next.js", img: "/skills/nextjs.png" },
  { name: "Node.js", img: "/skills/node.png" },
  { name: "Express", img: "/skills/express.png" },
  { name: "MongoDB", img: "/skills/mongodb.png" },
  { name: "PostgreSQL", img: "/skills/postgres.png" },
  { name: "JavaScript", img: "/skills/js.png" },
  { name: "TypeScript", img: "/skills/typescript.png" },
  { name: "Tailwind CSS", img: "/skills/tailwind.png" },
  { name: "Docker", img: "/skills/docker.png" },
  { name: "Git", img: "/skills/git.png" },
  { name: "GitHub", img: "/skills/github.png" },
];

const Skills = () => {
  return (
    <section className="relative py-24" id="skills">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-600/10 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-16 relative z-10">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-2 max-w-md">
            Technologies I use to build scalable and modern applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-cyan-500/10 transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-md transition duration-300" />

              {/* Icon */}
              <div className="relative w-12 h-12 mb-3">
                <Image
                  src={skill.img}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Name */}
              <span className="text-white/70 text-xs font-medium group-hover:text-white transition">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="text-center text-white/30 text-sm italic">
          "I focus on building real-world, scalable and efficient systems."
        </div>

      </div>
    </section>
  );
};

export default Skills;