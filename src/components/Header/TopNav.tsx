import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bean from "assets/images/bean.svg";
import logo from "assets/images/logo.png";
import menu from "assets/images/menu.svg";
import shopping from "assets/images/shopping.svg";
import globalDictionary from '../../Dictionary';

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'ro'>('en');

  const handleLoginView = () => {
    navigate("/login");
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ro' : 'en'));
  };

  const t = (key: string) => {
    return language === 'en' ? key : globalDictionary.translateToRomanian(key) || key;
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={shopping}
          alt="shopping-button"
          className="cursor-pointer"
        />
        <button onClick={handleLoginView} className="rounded-full outline-none shadow-none border border-primary text-primary font-medium px-3 py-2 lg:block hidden">
          {t("Login")}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-12">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer"
          />
          <span className="text-primary font-medium text-[18px]">
            {t("Le Coupage")}
          </span>
        </div>
        <span className="text-primary text-sm">
          {t("Coffee & other unique sensations")}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={bean}
          alt="bean"
          className="cursor-pointer lg:block hidden"
        />
        <img
          src={menu}
          alt="menu"
          className="cursor-pointer lg:hidden block w-[53px]"
        />
        <div className="lg:flex hidden flex-col">
          <span className="font-semibold text-secondary">{t("+373")}</span>
          <span className="font-semibold text-primary">{t("68720841")}</span>
        </div>
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:bg-primary transition-transform duration-200 ease-in-out"
            checked={language === 'ro'}
            onChange={toggleLanguage}
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          />
        </div>
        <span className="ml-2 text-gray-700">{language === 'en' ? 'EN' : 'RO'}</span>
      </div>
    </div>
  );
};

export default TopNav;
