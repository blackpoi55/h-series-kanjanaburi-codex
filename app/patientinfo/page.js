'use client';

import Baselayout from '@/components/Baselayout/Baselayout';
import Bodyinfo from '@/components/Patientinfo/Bodyinfo';
import Headerinfo from '@/components/Patientinfo/Headerinfo';
import { RegisterModelstep } from '@/components/Patientinfo/RegisterModelstep';
import Loading from '@/components/Tool/Loading';
import { Pagination } from '@/components/Tool/Pagination';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const [patientlist, setPatientList] = useState(null);
  const [nodate, setnodate] = useState(false);
  const [isModal, setisModal] = useState(false);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [values, setvalues] = useState({
    datefrom: '',
    dateto: '',
    page: 1,
    limit: 20,
    search: '',
  });
  const [modelRegister, setModelRegister] = useState(null);
  const [wait, setWait] = useState(false);

  const firstDayOfMonth = dayjs().format('YYYY-MM-DD');
  const lastDayOfMonth = dayjs().format('YYYY-MM-DD');

  const refresh = useCallback(async () => {
    setWait(true);
    let res = {};

    // อย่ากลาย state ตรง ๆ — สร้าง params แยก
    const paramsWithDate = {
      ...values,
      datefrom: values.datefrom || firstDayOfMonth,
      dateto: values.dateto || lastDayOfMonth,
    };

    const paramsNoDate = {
      page: values.page,
      limit: values.limit,
      search: values.search,
    };

    try {
      if (nodate === true) {
        res = await searchPatientList(paramsNoDate);
      } else {
        res = await searchPatientList(paramsWithDate);
      }

      if (res?.message === 'success') {
        setPatientList(res?.data || []);
        setPaging({
          currentPage: res?.currentPage ?? 1,
          totalPages: res?.totalPages ?? 1,
          totalItems: res?.totalItems ?? 0,
        });
      } else {
        console.log('error', res?.error);
      }
    } finally {
      setWait(false);
    }
  }, [values, nodate, firstDayOfMonth, lastDayOfMonth]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <Baselayout>
      <div className="w-full h-full bg-[#FFFFFF] p-4 pb-10 px-10 font-sarabun text-black">
        <Loading wait={wait} />

        <div className="w-full flex">
          <label className="text-3xl font-bold">Patient Search Engine</label>
        </div>

        <Headerinfo
          setnodate={setnodate}
          setPatientList={setPatientList}
          setvalues={setvalues}
          values={values}
          setModelRegister={setModelRegister}
          setisModal={setisModal}
        />

        <div className="w-full my-5 border-b-2 border-gray-200" />

        <Bodyinfo patientlist={patientlist} />

        <div className="flex fixed bottom-0 left-0 w-full">
          <Pagination setvalues={setvalues} paging={paging} />
        </div>

        <RegisterModelstep
          refresh={refresh}
          setWait={setWait}
          isModal={isModal}
          onClose={() => setisModal(false)}
        />
        {/* <RegisterModel setWait={setWait} data={modelRegister} onClose={() => setModelRegister(null)} refresh={refresh} /> */}
      </div>
    </Baselayout>
  );
}

/* ===== helper imports ที่ใช้จริงในไฟล์นี้ ===== */
import { searchPatientList } from '@/action/api';
