import React from 'react';
import { navItems } from "@/data";
import instagram from "assets/images/instagram.png";
import globalDictionary from '../../Dictionary';

interface NavbarProps {
  language: 'en' | 'ro';
}

const Navbar: React.FC<NavbarProps> = ({ language }) => {
  const t = (key: string) => {
    return language === 'en' ? key : globalDictionary.translateToRomanian(key) || key;
  };

  return (
    <div className="w-full lg:flex hidden items-center justify-between pl-6 pr-3 bg-primary rounded-full h-[60px] mt-7">
      <div className="flex items-center gap-10">
        {navItems.map((item) => (
          <a
            href={item.path}
            key={item.title}
            className="text-navlinks text-[14px]"
          >
            {t(item.title)}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <img
          src={instagram}
          alt="instagram-link"
          className="cursor-pointer w-[28px]"
        />
        <a href="#" className="text-navlinks text-[14px]">
          {t("coffe_alex")}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
