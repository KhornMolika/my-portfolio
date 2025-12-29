"use client";

import GooeyNav from "@/components/GooeyNav";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  items: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ items }) => {
  return (
    <header className="w-full fixed top-0 left-0 bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Brand */}
          <div className="text-xl font-semibold text-white tracking-wide">
            KHORN Molika
          </div>

          {/* RIGHT: Gooey Nav */}
          <GooeyNav items={items} initialActiveIndex={0} />
        </div>
      </div>

      {/* Spacer so content doesn't hide under header if fixed */}
      <div className="h-20"></div>
    </header>
  );
};

export default Header;
