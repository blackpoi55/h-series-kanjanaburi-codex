import React, { useState } from 'react';
import Navbar from '@/components/Nav/Navbar';
import { Collapse } from '@mui/material';
import { getmenuMap } from '@/action/menu';
import { useRouter } from 'next/navigation';
import ScreenshotTool from '../ScreenshotTool/ScreenshotTool';

function Baselayout(props) {
  const [toggleMenu, settoggleMenu] = useState(false);
  const router = useRouter();
  const menuMap = getmenuMap();
  const menuClick = (url) => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-black">
      <Navbar toggleMenu={toggleMenu} settoggleMenu={(v) => settoggleMenu(Boolean(v))} />
      <ScreenshotTool />
      <Collapse in={toggleMenu} timeout="auto" unmountOnExit>
        <div className="w-full h-screen flex flex-col p-5">
          <label onClick={() => menuClick('/patientinfo')} className="cursor-pointer text-[#365382]">
            {"< กลับสู่หน้าหลัก"}
          </label>
          <label className="font-bold text-2xl mt-3">All Menu</label>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-full bg-white p-5 overflow-x-auto">
            {Array.isArray(menuMap) &&
              menuMap.length > 0 &&
              menuMap.map((p, index) => (
                <div key={index} className="w-full flex justify-center">
                  <div
                    onClick={() => menuClick(p.url)}
                    role="button"
                    tabIndex="0"
                    className="flex flex-col items-center justify-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none bg-[#6B84B7] hover:bg-blue-200 hover:bg-opacity-80 hover:text-blue-900 border shadow-lg shadow-gray-400"
                  >
                    <div className="grid place-items-center mr-4">
                      <span
                        className="col-span-1 ml-4"
                        dangerouslySetInnerHTML={{ __html: p.svg || '' }}
                      ></span>
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
    </div>
  );
}

export default Baselayout;
