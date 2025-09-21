import MenuButton from "../components/molecules/MenuButton";
import { useNavigate } from "react-router-dom";

import { FaBook, FaClipboardList, FaQuestionCircle, FaUserFriends, FaCameraRetro, FaPowerOff } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

function HomePage() {
  const navigate = useNavigate();

  const handleARClick = () => {
    navigate("/ar");
  };

  const menuItems = [
    { label: "Standar Kompetensi Kompetensi Dasar", icon: FaClipboardList, color: "bg-orange-500" },
    { label: "Augmented Reality Elektronika", icon: FaCameraRetro, color: "bg-fuchsia-600", onClick: handleARClick },
    { label: "Materi Pembelajaran", icon: FaBook, color: "bg-red-500" },
    { label: "Soal", icon: FaQuestionCircle, color: "bg-amber-500" },
    { label: "Petunjuk Penggunaan", icon: IoIosInformationCircleOutline, color: "bg-sky-500" },
    { label: "Tentang", icon: FaUserFriends, color: "bg-green-600" },
  ];

  return (
    <div className="bg-slate-300 min-h-screen flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col flex-grow">
        {/* === Header === */}
        <header className="flex items-center justify-start gap-4 p-4">
          <div className="bg-orange-500 p-2 rounded-full text-white font-bold text-2xl">R</div>
          <div className="bg-sky-600 text-white px-4 py-2 rounded-md font-bold text-lg shadow-md">AR DASAR ELEKTRONIKA</div>
        </header>

        {/* === Subtitle === */}
        <h2 className="text-center text-xl font-semibold text-gray-700 my-4">Memahami Komponen Elektronika</h2>

        {/* === Organisme: Grid Menu === */}
        <main className="grid grid-cols-2 gap-4 flex-grow">
          {menuItems.map((item) => (
            <MenuButton key={item.label} label={item.label} icon={item.icon} color={item.color} onClick={item.onClick} />
          ))}
        </main>

        {/* === Tombol Power di Footer === */}
        <footer className="flex justify-center items-center py-6">
          <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-colors">
            <FaPowerOff size={28} />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
