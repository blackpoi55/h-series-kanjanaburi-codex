import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Nav/Navbarcare';
import { Collapse } from '@mui/material';
import { getmenuMap } from '@/action/menu';
import { useRouter } from 'next/navigation';

function Baselayout(props) {
  const [toggleMenu, settoggleMenu] = useState(false);
  const [role, setrole] = useState('');
  const [devMode, setdevMode] = useState("");
  const router = useRouter();
  const menuMap = getmenuMap();

  const inactivityTimer = useRef(null);
  const lastBlurTime = useRef(null);

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 นาที

  const menuClick = (url) => {
    router.push('/Care-Vista-C');
  };

  // โหลด role จาก localStorage
  useEffect(() => {
    const data = localStorage.getItem('role');
    const dev = localStorage.getItem('Dev');
    console.log(dev)
    setdevMode(dev);
    setrole(data);
    console.log('โหลด role:', data);
  }, []);

  // ฟังก์ชัน redirect ตาม role
  const redirectByRole = () => {
    console.log("devMode:", devMode);
    if (devMode === 'Boat') {
      // ถ้าเป็น dev mode Boat ไม่ redirect
      console.log('Dev Mode Boat - ไม่ redirect');
    }
    else if (role === 'am') {
      router.push('/Care-Vista-C/login');
    } else if (role === 'g') {
      router.push('/Care-Vista-C');
    } else {
      console.log('ไม่พบ role หรือ role ไม่ถูกต้อง:', role);
    }
  };

  // ตั้งเวลา focus/blur
  useEffect(() => {
    if (!role) return; // รอ role พร้อมก่อน

    const handleBlur = () => {
      lastBlurTime.current = Date.now();
      console.log('หน้าถูก unfocus เวลา:', new Date().toLocaleString());

      inactivityTimer.current = setTimeout(() => {
        console.log('ไม่มีการใช้งานเกิน 20 นาที - redirect');
        redirectByRole();
      }, INACTIVITY_LIMIT);
    };

    const handleFocus = () => {
      const now = Date.now();
      if (lastBlurTime.current) {
        const inactiveDuration = now - lastBlurTime.current;
        console.log('กลับมา focus เวลา:', new Date().toLocaleString());
        console.log(`ไม่อยู่ ${Math.floor(inactiveDuration / 1000)} วินาที`);

        if (inactiveDuration >= INACTIVITY_LIMIT) {
          console.log('หมดเวลา 20 นาที - redirect');
          redirectByRole();
        }
      }

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = null;
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [router, role]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-black">
      <Navbar toggleMenu={toggleMenu} settoggleMenu={(v) => settoggleMenu(Boolean(v))} />
      <Collapse in={toggleMenu} timeout="auto" unmountOnExit>
        <div className="w-full h-screen flex flex-col p-5">
          <label onClick={() => menuClick('/Care-Vista-C')} className="cursor-pointer text-[#365382]">
            {'< กลับสู่หน้าหลัก'}
          </label>
          <label className="font-bold text-2xl mt-3">All Menu</label>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-full bg-white p-5 overflow-x-auto">
            {menuMap &&
              menuMap.length > 0 &&
              menuMap.map((p, index) => (
                <div key={index} className="w-full flex justify-center">
                  <div
                    onClick={() => menuClick(p.url)}
                    role="button"
                    tabIndex={0}
                    className="flex flex-col items-center justify-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none bg-[#6B84B7] hover:bg-blue-200 hover:bg-opacity-80 hover:text-blue-900 border shadow-lg shadow-gray-400"
                  >
                    <div className="grid place-items-center mr-4">
                      <span className="col-span-1 ml-4" dangerouslySetInnerHTML={{ __html: p.svg }}></span>
                    </div>
                    <label className="text-white mt-3">{p.text}</label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Collapse>

      <div className="flex flex-1 overflow-y-auto">
        <div className="flex-1">{props.children}</div>
      </div>

      <div className="w-full flex bg-gradient-to-t from-[#C1DFFF] to-[#FFFFFF] py-2 border-b-2 shadow-b-xl navbar text-[#014F7D]">
        <div className="w-full flex items-center justify-center">
          <label className="">Copyright © 2025 Telecorp | All Rights Reserved</label>
        </div>
      </div>
    </div>
  );
}

export default Baselayout;
