"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { decryptData } from "@/action/api";
import { getmenuBarMap } from "@/action/menuBar";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const menuBarMap = getmenuBarMap();

  const [toggleMenoLogout, settoggleMenoLogout] = useState(false);
  const [toggleMenuTap, settoggleMenuTap] = useState(false);
  const [loginData, setloginData] = useState({});
  const [checking, setChecking] = useState(true);

  // refs สำหรับคลิกนอก
  const menuTapRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { Data } = await decryptData();
        if (!alive) return;
        if (Data?.id) {
          setloginData(Data);
        } else if (!pathname.includes("/Care-Vista-C/individualreport")) {
          router.replace("/login");
        }
      } catch {
        if (!pathname.includes("/Care-Vista-C/individualreport")) {
          router.replace("/login");
        }
      } finally {
        if (alive) setChecking(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [pathname, router]);

  // ปิด dropdown เมื่อคลิกนอก / กด Esc
  useEffect(() => {
    const handleClick = (e) => {
      if (menuTapRef.current && !menuTapRef.current.contains(e.target)) {
        settoggleMenuTap(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        settoggleMenoLogout(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") {
        settoggleMenuTap(false);
        settoggleMenoLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const logoutClick = () => {
    router.replace("/login");
  };
  const menuClick = (url) => router.push(url);

  if (checking) return null;

  return (
    <div className="w-full flex bg-gradient-to-r from-[#0F2027] via-[#2C5364] to-[#014F7D] py-4 border-b-2 shadow-b-xl navbar text-[#014F7D]">
      <div className="w-1/5 pl-2 md:pl-10 mt-1 flex items-center">
        <img
          onClick={() => menuClick("/patientinfo")}
          className="h-7 cursor-pointer"
          src="/images/care_vista_c.png"
          alt="Care Vista"
        />
        <div className="flex flex-col w-full ml-2 text-[#014F7D] font-bold">
          <label className="text-3xl text-white mb-1">Care Vista AI</label>
        </div>
      </div>

      <div className="w-3/5 flex justify-start items-center">{/* center menu (optional) */}</div>

      <div className="w-1/5 flex justify-end items-center pr-2 md:pr-10">
        {loginData.id && pathname !== "/login" && pathname !== "/login/register" ? (
          <div className="flex w-1/2 justify-end items-center">
            {/* Home button */}
            <button
              type="button"
              onClick={() => router.push("/patientinfo")}
              className="shadow-button w-9 h-9 min-w-9 min-h-9 ml-3 flex justify-center items-center p-2 rounded-full bg-white"
              aria-label="Home"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3493 2.81157C12.7297 2.50723 13.2703 2.50723 13.6507 2.81157L21.463 9.0614L24.0674 11.1449C24.5166 11.5043 24.5895 12.1598 24.2301 12.609C23.8707 13.0583 23.2152 13.1311 22.7659 12.7717L21.8542 12.0423V22.375C21.8542 22.9503 21.3878 23.4166 20.8125 23.4166H5.1875C4.6122 23.4166 4.14583 22.9503 4.14583 22.375V12.0423L3.23405 12.7717C2.78482 13.1311 2.12931 13.0583 1.76993 12.609C1.41054 12.1598 1.48338 11.5043 1.93261 11.1449L4.53677 9.06157L12.3493 2.81157ZM6.22916 10.3756L13 4.95896L19.7708 10.3756V21.3333H16.6458V15.6041C16.6458 15.0288 16.1795 14.5625 15.6042 14.5625H10.3958C9.82053 14.5625 9.35416 15.0288 9.35416 15.6041V21.3333H6.22916V10.3756ZM11.4375 21.3333H14.5625V16.6458H11.4375V21.3333Z"
                  fill="#365382"
                />
              </svg>
            </button>

            {/* Bell */}
            <button
              type="button"
              className="shadow-button w-9 h-9 min-w-9 min-h-9 ml-3 flex justify-center items-center p-2 rounded-full bg-white"
              aria-label="Notifications"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path
                    d="M4.66671 8.83333C4.66671 6.6232 5.54468 4.50358 7.10748 2.94078C8.67029 1.37797 10.7899 0.5 13 0.5C15.2102 0.5 17.3298 1.37797 18.8926 2.94078C20.4554 4.50358 21.3334 6.6232 21.3334 8.83333V13.726L23.4167 16.851V21.3333H17.5719C17.335 22.3685 16.7537 23.2925 15.9233 23.9543C15.0929 24.6161 14.0624 24.9765 13.0006 24.9765C11.9387 24.9765 10.9082 24.6161 10.0778 23.9543C9.24737 23.2925 8.66614 22.3685 8.42921 21.3333H2.58337V16.851L4.66671 13.726V8.83333ZM10.6125 21.3333C10.815 21.7982 11.1488 22.1938 11.5729 22.4717C11.997 22.7495 12.493 22.8975 13 22.8975C13.5071 22.8975 14.0031 22.7495 14.4272 22.4717C14.8513 22.1938 15.1851 21.7982 15.3875 21.3333H10.6125ZM13 2.58333C11.3424 2.58333 9.75273 3.24181 8.58062 4.41392C7.40852 5.58602 6.75004 7.17573 6.75004 8.83333V14.3573L4.66671 17.4823V19.25H21.3334V17.4823L19.25 14.3573V8.83333C19.25 7.17573 18.5916 5.58602 17.4195 4.41392C16.2474 3.24181 14.6576 2.58333 13 2.58333Z"
                    fill="#365382"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="25" height="25" fill="white" transform="translate(0.5 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {/* Menu dropdown (สามขีด) */}
            <div className="relative ml-3" ref={menuTapRef}>
              <button
                type="button"
                onClick={() => settoggleMenuTap((v) => !v)}
                className="w-9 h-9 min-w-9 min-h-9 flex justify-center items-center rounded-full bg-white hover:bg-[#a5c2ee]"
                aria-haspopup="menu"
                aria-expanded={toggleMenuTap}
                aria-controls="main-menu"
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.40625 6.75H21.5938M4.40625 13H21.5938M4.40625 19.25H21.5938" stroke="#365382" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {toggleMenuTap && (
                <div
                  id="main-menu"
                  role="menu"
                  className="drop-down w-60 z-[9999] shadow-menu-profile bg-[#EEF6FF] p-0.5 rounded-l-lg rounded-b-lg absolute top-[3.5rem] right-0 overflow-hidden"
                >
                  {Array.isArray(menuBarMap) &&
                    menuBarMap.map((p, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => menuClick(p.url)}
                        className="w-full flex items-start justify-start p-2 rounded-lg text-start leading-tight outline-none bg-[#EEF6FF] hover:bg-[#6B84B7] hover:bg-opacity-80 hover:text-blue-900"
                        role="menuitem"
                      >
                        <span className="w-9 h-9 mr-3 ml-3" dangerouslySetInnerHTML={{ __html: p.svg }} />
                        <span className="text-[#365382] mt-2 text-sm">{p.text}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative ml-3" ref={profileRef}>
              <button
                type="button"
                className="w-9 h-9 min-w-9 min-h-9 flex justify-center items-center rounded-full border"
                onClick={() => settoggleMenoLogout((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={toggleMenoLogout}
                aria-controls="profile-menu"
              >
                <img src="/images/doctor.png" className="h-9 w-9 border rounded-full" alt="Profile" />
              </button>

              {toggleMenoLogout && (
                <div
                  id="profile-menu"
                  role="menu"
                  className="drop-down w-48 z-[9999] shadow-menu-profile overflow-hidden bg-[#EEF6FF] p-1 rounded-l-lg rounded-b-lg absolute top-[3.5rem] right-0"
                >
                  <ul>
                    <li className="px-3 py-1 text-sm font-medium">
                      <span className="font-semibold">{loginData?.username || "-"}</span>
                    </li>
                    <li className="px-3 py-1 text-sm font-medium">
                      <span>โรงพยาบาลวรารักษ์</span>
                    </li>
                    <li className="px-3 py-3 text-sm font-medium">
                      <button
                        type="button"
                        onClick={logoutClick}
                        className="flex gap-2 w-full justify-center py-1 px-4 rounded-lg shadow-md bg-[#E54545] text-white hover:bg-[#972e2e]"
                        role="menuitem"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 min-h-6 min-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* status dot */}
            <svg className="relative -left-3 -bottom-6 w-[12px] h-[12px] min-h-[12px] min-w-[12px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0dot)">
                <rect width="12" height="12" rx="6" fill="#B6B6B6" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.35355 7.85349C6.25979 7.94722 6.13263 7.99988 6.00005 7.99988C5.86747 7.99988 5.74031 7.94722 5.64655 7.85349L2.81805 5.02499C2.77029 4.97887 2.7322 4.92369 2.706 4.86269C2.67979 4.80169 2.666 4.73608 2.66542 4.66969C2.66485 4.6033 2.6775 4.53746 2.70264 4.47601C2.72778 4.41456 2.76491 4.35874 2.81185 4.31179C2.8588 4.26484 2.91462 4.22772 2.97607 4.20258C3.03752 4.17744 3.10336 4.16479 3.16975 4.16536C3.23614 4.16594 3.30175 4.17973 3.36275 4.20594C3.42375 4.23214 3.47893 4.27023 3.52505 4.31799L6.00005 6.79299L8.47505 4.31799C8.56935 4.22691 8.69565 4.17651 8.82675 4.17765C8.95785 4.17879 9.08325 4.23137 9.17596 4.32408C9.26866 4.41678 9.32125 4.54219 9.32239 4.67329C9.32353 4.80439 9.27313 4.93069 9.18205 5.02499L6.35355 7.85349Z"
                  fill="black"
                />
              </g>
              <rect x="0.25" y="0.25" width="11.5" height="11.5" rx="5.75" stroke="#FDFDFD" strokeWidth="0.5" />
              <defs>
                <clipPath id="clip0dot">
                  <rect width="12" height="12" rx="6" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
}
