import React, { use } from 'react'
import axios from 'axios' //library untuk melakukan request HTTP
import { useState, useEffect,useCallback,useMemo } from 'react' //hook untuk state dan efek samping
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL


import { TiUser } from 'react-icons/ti'
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { BsExclamationCircle } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import Basetable from "../../components/Table/Basetable";
import ModalContent  from "../../components/Modal/ModalContent";
import Modal from "../../components/Modal/ModalTemplate";



function DataMasyarakat() {
  
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState("");
  const [isModalVisible, setModalVisible] = useState(true);
  const [DataMasyarakat, setDataMasyarakat] = useState([]);
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const {user} = useAuth();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const openModalWithId = (type,id) => {
    if (!id) {
    alert("ID artikel tidak valid!");
    return;
    }
    setSelectedId(id);
    setModalType(type);
    setIsModalOpen(true);
  };

  const openModal = (type, id) => {
    setModalType(type);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setModalType("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchDataMasyarakat();
  };

    const handleLogout = () => {
  // Hapus token dari localStorage
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
    navigate(`/detail/${data._id}`);
  };

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  


  const fetchDataMasyarakat = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/masyarakat/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filter data untuk verifikasi_akun_masyarakat === 'diterima'
      const filteredData = res.data.filter(
        (item) => item.verifikasi_akun_masyarakat === "diterima"
      );
      // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Uncomment jika perlu sorting

      setDataMasyarakat(filteredData);
    } catch (err) {
      console.error("Gagal fetch DataMasyarakat:", err);
    }
  }, [token]);


  //mengambil data by id
  useEffect(() => {
     if (!selectedId) return; 
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${selectedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataMasyarakatbyId(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[selectedId, token]);


  const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


    
  const filteredRows = DataMasyarakat.filter(
    (item) => {
      const search = searchTerm.toLowerCase().trim();
      return (
        item.nama_masyarakat?.toLowerCase().includes(search) ||
        item.email_masyarakat?.toLowerCase().includes(search) ||
        item.notlp_masyarakat?.toLowerCase().includes(search) ||
        item.nik_masyarakat?.includes(search)
      );
    },
    [DataMasyarakat, searchTerm]
  );

  console.log("datamasyarakat diterima",filteredRows) //debug

  useEffect(() => {
    fetchDataMasyarakat();
  }, [fetchDataMasyarakat, reloadTrigger]);
  

      

  // paramater tabel
  const columns = [
    {
      header: "No",
      enableSorting: false,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "foto_profil_masyarakat",
      header: "Foto",
      enableSorting: false,
      cell: ({ getValue }) => {
        const imageUrl = getValue();
        console.log("Image URL profil_masyarakat:", imageUrl);

        return imageUrl ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`}
            alt="foto"
            className="w-10 h-10 object-cover rounded-md"
          />
        ) : (
          <div className="w-10 h-10  ">
            <img
              src="/default-avatar.jpg"
              alt="foto_default"
              className="rounded-md"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "nama_masyarakat",
      header: "Nama",
      enableSorting: false,
      cell: ({ getValue }) => (
        <div
          className="whitespace-normal break-words max-w-60"
          title={getValue()}
        >
          {getValue()}
        </div>
      ),
    },
    {
      accessorKey: "email_masyarakat",
      header: "Email",
      enableSorting: false,
    },
    {
      accessorKey: "notlp_masyarakat",
      header: "Kontak",
      enableSorting: false,
    },
    {
      accessorKey: "nik_masyarakat",
      header: "NIK Pengguna",
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Registrasi",
      enableSorting: true,
      cell: (info) => formatTanggal(info.getValue()),
    },
    {
      accessorKey: "Edit",
      header: "Edit",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-center p-2 w-10 h-10">
          <button
            onClick={() => openModal("formeditmasyarakat", row.original._id)}
            title="Edit"
          >
            <FaEdit className="text-gray-600 hover:text-[#004A76] text-xl cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];
  const totalItems = filteredRows.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      return filteredRows.slice(start, start + itemsPerPage);
  }, [filteredRows, currentPage, itemsPerPage]);

    

  return (
    <div className="flex flex-row min-h-screen">
      <main className="flex flex-col sm:p-4 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Data Masyarakat
          </h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="flex items-center rounded-[19px] px-3 py-1 border-[1.5px] border-gray-300 gap-3 w-full sm:w-auto">
                <IoIosSearch className="text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Cari Nama"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-700 text-sm outline-none bg-transparent flex-1 sm:w-40"
                />
              </div>
  
              {/* Profile Dropdown */}
              <div className="flex flex-row gap-4 relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                >
                  <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
                </button>
  
                <div>
                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsOpen(false)}
                      ></div>
                      <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                        <div className="py-1 justify-center">
                          <a className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                            <HiOutlineUser className="text-xl sm:text-2xl md:text-[30px]" />
                            {user?.username}
                          </a>
  
                          <a
                            onClick={handleLogout}
                            className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer"
                          >
                            <IoLogOutOutline className="text-xl sm:text-2xl md:text-[30px]" />
                            Log Out
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
        </div>
        
        <img src="/line style.svg" alt=""className='w-screen' />

        {/* Statistics Card */}
        <div className="flex flex-row justify-start sm:justify-between w-full items-center px-2 sm:px-6 md:px-10 py-2">
          <div className="flex flex-row gap-3 sm:gap-6 md:gap-8 bg-[#033E61] h-[60px] sm:h-[70px] p-2 rounded-xl items-center px-3 sm:px-4 md:px-6 shadow-2xl w-full sm:w-auto">
            <div className="bg-white p-2 sm:p-3 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="/icon_user_verifikasi.svg"
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-[raleway] text-white font-bold text-[13px] sm:text-[14px] md:text-[15px]">
                Jumlah Pengguna
              </div>
              <div className="font-[Nunito] text-white font-medium text-[13px] sm:text-[14px] md:text-[15px]">
                {DataMasyarakat.length}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <div className="h-full ">
              <Basetable data={paginatedData} columns={columns} />
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 items-center justify-center gap-3 sm:gap-0 py-3 border-t border-gray-200">
          {/* Results info */}
          <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            hasil
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
            {/* Pagination Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 cursor-pointer text-sm
                  ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed border-gray-300"
                      : "hover:bg-[#004A76] hover:text-white"
                  }
                `}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {/* Show limited page numbers on mobile */}
              <div className="flex items-center space-x-1">
                {window.innerWidth < 640 ? (
                  // Mobile: Show current page and total
                  <span className="px-2 py-1 text-sm text-gray-600">
                    {currentPage} / {totalPages}
                  </span>
                ) : (
                  // Desktop: Show all page numbers
                  [...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-2 sm:px-3 py-1 cursor-pointer text-sm rounded-md transition duration-200 ${
                        currentPage === i + 1 
                          ? "bg-[#004A76] text-white" 
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))
                )}
              </div>

              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 cursor-pointer text-sm
                  ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed border-gray-300"
                      : "hover:bg-[#004A76] hover:text-white"
                  }
                `}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Empty div for grid alignment */}
          <div className="hidden sm:block order-3"></div>
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          <ModalContent
            modalType={modalType}
            idMasyarakat={selectedId}
            token={token}
            dataMasyarakatbyId={dataMasyarakatbyId}
            onClose={handleCloseModal}
          />
        </Modal>
      </main>
    </div>
  );
}

export default DataMasyarakat