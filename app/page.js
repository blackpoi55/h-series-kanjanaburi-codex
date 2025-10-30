'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, TextField } from '@mui/material';

function Home() {
  const router = useRouter();

  // ไว้เช็คสิทธิ์: null = กำลังเช็ค, true/false = ผลลัพธ์
  const [allowed, setAllowed] = useState(null);

  // state ของ Autocomplete (multiple ควรเป็น array)
  const [value, setValue] = useState([]);

  const options = [
    { label: 'Ten', value: 10 },
    { label: 'Twenty', value: 20 },
    { label: 'Thirty', value: 30 },
  ];

  // ทำการ redirect ใน useEffect เท่านั้น (ห้ามทำตอน render)
  useEffect(() => {
    // รันเฉพาะฝั่ง client
    if (typeof window === 'undefined') return;

    const storedKey = localStorage.getItem('encryptionKey');
    const encryptedData = localStorage.getItem('345dp0asks9adls99235k33m12k5993klfp95');
    const _iv = localStorage.getItem('iv');

    const ok = !!(storedKey && encryptedData && _iv);
    setAllowed(ok);

    // ใช้ replace() จะไม่ทับ stack ประวัติ
    router.replace(ok ? '/patientinfo' : '/login');
  }, [router]);

  // ระหว่างเช็ค/กำลังเปลี่ยนหน้า ไม่ต้องแสดง UI เพื่อลดกระพริบ
  if (allowed === null) return null;

  // ถ้ามาถึงตรงนี้แปลว่ายังไม่โดน redirect (กันกรณีบาง env)
  return (
    <div>
      <TextField id="outlined-basic" label="user" variant="outlined" />
      <Autocomplete
        multiple
        options={options}
        value={value}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => setValue(newValue ?? [])}
        renderInput={(params) => <TextField {...params} label="Age" variant="outlined" fullWidth />}
      />
    </div>
  );
}

export default Home;
