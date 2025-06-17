import React from 'react'
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";


// icon
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoCaretUpSharp } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNewspaperFill } from "react-icons/ri";
import { IoCaretDownSharp } from "react-icons/io5";
import { BiSolidUserVoice } from "react-icons/bi";



const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleDropdown = (label) => {
    setOpenDropdown(prev => (prev === label ? null : label));
  };


  const menuItems = [
    {
      label: "Dashboard",
      icon:  <RiDashboardHorizontalFill className='w-8 h-8 text-[#004A76]'/>,
      to: "/dashboardadmin"
    },
    {
      label: "Konsultasi",
      icon: <BiSolidUserVoice className='w-8 h-8 text-[#004A76]' />,
      to: "/konsultasi"
    },
    {
      label: "Data Masyarakat",
      icon: <HiMiniUserGroup className='w-8 h-8 text-[#004A76]'/>,
      children: [
        { label: "Data Masyarakat", to: "/masyarakat/data" },
        { label: "Verifikasi Data", to: "/masyarakat/verifikasi" }
      ]
    },
    {
      label: "Data Dokter",
      icon: <FaUserDoctor className='w-8 h-8 text-[#004A76]'/>,
      children: [
        { label: "Data Dokter", to: "/dokter/datadokter" },
        { label: "Data Jadwal", to: "/dokter/jadwal" }
      ]
    },
    {
      label: "Artikel",
      icon:  <RiNewspaperFill className='w-8 h-8 text-[#004A76]' />,
      to: "/artikel"
    }
  ];

  
  // Tampilan sidebar
  return (
  
    <div className={`bg-white h-full shadow-lg p-4 pt-10 md:w-2/6 lg:w-64 transition-all duration-400`}>

      <div className={`flex items-center justify-center gap-5 mb-6 ${!isOpen }`}>
          <div className='flex flex-row gap-2 overflow-hidden'>
                 <img className={`transition-all duration-500 relative w-21`}
                 src="/Logo Mojokerto Sehat.svg" 
                 alt="imglogo" />
                {isOpen && (
                  <h1 className="font-[raleway] font-extrabold text-[#025F96] text-xl transition-opacity duration-300">
                    MOJOKERTO SEHAT
                  </h1>)}
          </div>
      </div>



      <ul className="space-y-4 pt-12 items-center justify-center">
        {menuItems.map((item, idx) => (
          // parent
          <li key={idx}>
            {item.children ? (
              <>
                <div
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-300 rounded-md  font-[raleway] ${
                    item.children.some(child => location.pathname === child.to)
                      ? "bg-[#E0F2FE]  text-[#025F96] font-extrabold "
                      : "text-[#025F96] font-medium"
                    }`} >
                  <div className="flex items-center gap-3 text-[#025F96]">
                    <span className="w-6 h-6">{item.icon}</span>
                    <span
                      className={`transition-all duration-300 origin-left text-md  justify-center items-center ${
                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {isOpen && (openDropdown === item.label ? <IoCaretUpSharp /> : <IoCaretDownSharp />)}
                </div>

              {/* dropdown*/}
                <div
                  className={`ml-8 mt-1 overflow-hidden transition-all duration-300 font-[raleway] ${
                  openDropdown === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child, i) => (
                    <Link
                      key={i}
                      to={child.to}
                      className={`block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md font-[raleway]
                        ${location.pathname === child.to
                        ? "bg-[#E0F2FE]  text-[#025F96] font-semibold"
                        : "text-gray-700 hover:bg-gray-100"}`}
                      
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-2 py-2 rounded-md transition font-[raleway] 
                  ${location.pathname === item.to
                    ? "bg-[#E0F2FE] text-[#025F96] font-extrabold"
                    : "text-[#025F96] hover:bg-gray-100 font-medium"}`}>
                <span className="w-6 h-6">{item.icon}</span>
                <span
                  className={`transition-all duration-300 origin-left ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}>
                  {item.label}
                </span>
              </Link>

            )}
          </li>
        ))}
      </ul>

      
      
    </div>
  )
}

export default Sidebar;



