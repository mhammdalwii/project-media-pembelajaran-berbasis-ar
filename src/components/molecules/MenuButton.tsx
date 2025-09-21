import React from "react";
import type { IconType } from "react-icons";

interface MenuButtonProps {
  label: string;
  icon: IconType;
  color: string;
  onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, icon: Icon, color, onClick }) => {
  // Menggabungkan kelas dasar dengan kelas warna dari props
  const buttonClasses = `
    ${color} 
    text-white 
    p-4 
    rounded-lg 
    flex 
    flex-col 
    items-center 
    justify-center 
    gap-2 
    shadow-md 
    hover:opacity-90 
    transition-opacity
    cursor-pointer
    aspect-square 
  `;

  return (
    <div className={buttonClasses} onClick={onClick}>
      <Icon size={40} />
      <span className="font-bold text-center text-sm">{label}</span>
    </div>
  );
};

export default MenuButton;
