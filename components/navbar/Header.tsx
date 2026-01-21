"use client";

import Navbar from "@/components/Navbar";

const Header: React.FC = () => {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header>
      <Navbar items={navItems} />
    </header>
  );
};

export default Header;
