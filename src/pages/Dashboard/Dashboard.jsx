// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../components/Auth";
import useDashboard from '../../components/_hooks/useDashboard';
import useLogout  from '../../components/_hooks/useLogout';
import Calendar from '../../components/Dashboard/Calendar';
import Bar from '../../components/Bar/Bar';
import "../../index.css";
import.meta.env.VITE_BASE_URL


// icon
import { TiUser } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { BsFillBarChartFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { FaUserClock } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";


// kenapa diluar func? agar tidak boros memori,dan efisien apabila terdapat elemen dashboard yg dirender ulang
const StatBox = ({ icon, title, value }) => (
  <div className='w-[400px] h-[90px] flex flex-row justify-center gap-3 items-center'>
    <div className='bg-[#38B6FE]/30 rounded-full p-4'>
      {icon}
    </div>
    <div className='flex flex-col'>
      <p className='text-[18px] font-bold text-white underline'>{title}</p>
      <p className='text-[17px] font-medium italic text-white'>{value}</p>
    </div>
  </div>
);


function Dashboard() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    setIsOpen,
   
    jumlahPengguna,
    verifikasiAkun,
    artikelLog,
    akunBaru,
    artikelPublish,
    allDokter,
    jadwalByTanggal,
    formatTanggal,
    toggleDropdown,
    isOpen,
    dataBar,
    handleLogout,
  } = useDashboard(selectedDate);

  return (
    <div className="flex flex-row min-h-screen ">
     {/* container main */}
      <main className="flex flex-col sm:p-4 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1">

        {/* navbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Dashboard
          </h1>
          <div className="flex flex-row gap-4 relative">
            <button
              onClick= {toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none cursor-pointer">
              <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
            </button>
            <div>
              {isOpen && (
                <>
                 <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)}></div>
                  <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                    <div className="py-1 justify-center">
                      <a
                        href="#"
                        className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">                        
                        <HiOutlineUser className='text-xl sm:text-2xl md:text-[30px]'/>
                        {user?.username}
                      </a>
                      
                      <a
                        onClick={handleLogout}
                        className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer">
                        <IoLogOutOutline className='text-xl sm:text-2xl md:text-[30px]'/>
                        Log Out
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <img src="line style.svg" alt="" className='w-screen' />

        {/* header */}
        <div className='relative w-full'>
          {/* Gambar sebagai latar */}
          <img src="img_org.svg" alt="" className="w-full object-cover h-48 sm:h-56 md:h-64 lg:h-auto rounded-lg"/>

          {/* Overlay teks dan kalender */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-3 sm:p-4 md:p-5">
            {/* Kalender */}
            <div className="rounded p-2 ">
              < Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            {/* Heading */}
             <div className="text-white text-center md:text-left">
              <h2 className="font-[Poppins] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Halo, Admin
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl italic text-[#004A76] font-medium font-[Poppins]">
                Selamat datang di Website Mojokerto Sehat
              </p>
            </div>
          </div>
        </div>

        {/* statistik  */}
        <div className="bg-[#004A76] flex flex-row rounded-lg mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-white items-center font-[raleway]">
               <div className="flex items-center gap-3">
                   <StatBox
                      icon={
                      <BsFillBarChartFill className="w-[30px] h-[30px] text-white font-[raleway]"/>}
                      title="Jumlah Pengguna"
                      value={jumlahPengguna}
                    />
               </div>

               <div className="flex items-center gap-3">
                    <StatBox
                      icon={<GrArticle className="w-[30px] h-[30px] text-white"/>}
                      title="Artikel Publish"
                      value={artikelPublish}
                    />
                </div>

               <div className="flex items-center gap-3">
                  <StatBox
                    icon={<FaUserClock className="w-[30px] h-[30px] text-white" />}
                    title="Verifikasi Pengguna"
                    value={verifikasiAkun}
                  />
               </div>
          </div>
        </div>

        {/* LogPengguna */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
           <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-[#025f96]'>
              Log Pengguna Harian
           </h2>
          </div>

          <div className='flex flex-col xl:flex-row gap-6'>
            <div className="w-full xl:w-1/2">

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Kartu 1 */}
                <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl flex flex-col items-start">
                  <div className='flex justify-between items-center w-full mb-2'>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                      {jadwalByTanggal}
                    </p>
                    <IoStatsChart className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#FF8FA7]/70'/>
                  </div>
                  <a href='/konsultasi' className="cursor-pointer text-sm sm:text-base md:text-lg text-[#004A76] font-bold underline hover:text-[#025f96]">
                    Konsultasi
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {formatTanggal(selectedDate)}
                  </p>
                </div>
                
                {/* Kartu 2 */}
                <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl flex flex-col items-start">
                  <div className='flex justify-between items-center w-full mb-2'>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                      {akunBaru}
                    </p>
                    <IoStatsChart className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#4ED9D9]/70'/>
                  </div>
                  <a href='/datamasyarakat' className="cursor-pointer text-sm sm:text-base md:text-lg text-[#004A76] font-bold underline hover:text-[#025f96]">
                    Akun Baru
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {formatTanggal(selectedDate)}
                  </p>
                </div>
                
                
                {/* Card 3 - Dokter Terdaftar */}
                <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl flex flex-col items-start">
                  <div className='flex justify-between items-center w-full mb-2'>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                      {allDokter}
                    </p>
                    <IoStatsChart className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#5EB5EF]/70'/>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-[#004A76] font-semibold underline">
                    Dokter Terdaftar
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {formatTanggal(selectedDate)}
                  </p>
                </div>

                {/* Card 4 - Artikel Publish */}
                <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl flex flex-col items-start">
                    <div className='flex justify-between items-center w-full mb-2'>
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                        {artikelLog}
                      </p>
                      <IoStatsChart className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#FFD778]/70'/>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-[#004A76] font-semibold underline">
                      Artikel Publish
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {formatTanggal(selectedDate)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full xl:w-1/2 flex justify-center'>
                <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <span className='text-lg sm:text-xl md:text-2xl font-bold font-[raleway] text-[#025f96] underline text-center mb-4'>Statistik Total Data</span>
                  <div className='flex-1 flex items-center justify-center'>
                    <Bar values={dataBar} className="w-full h-full min-h-[400px] sm:min-h-[400px] md:min-h-[500px]"/>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </main>
    </div>
  )
}

export default Dashboard