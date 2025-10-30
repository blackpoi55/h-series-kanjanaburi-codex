'use client';
import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';

function Toolselect2({ options, label, value, onChange, disabled, multiple, limitTags, sm = false }) {
    const size = sm ? 'small' : '';
    const [open, setOpen] = useState(false); // State สำหรับควบคุมการเปิดปิดของ options

    const handleDateChange = (event, newValue) => {
        if (multiple) {
            onChange(newValue);
        } else {
            onChange(newValue ? newValue.value : null);
        }
    };
    //อย่าลบ ตัวแก้ปัญหาเวลาวางข้อความแล้ว ค่าไม่ตรง
    const handleInputEvent = (event) => {
        if (event.type === 'paste') {
            // console.log("User pasted text");
            // Toggle open/close
            setOpen(false);
            setTimeout(() => {
                setOpen(true); // ปิด dropdown หลังจากเปิด
            }, 100); // Delay for 100ms
        } else if (event.type === 'keydown') {
            // console.log("User is typing");
        }
    };
    return (
      <Autocomplete
    multiple={multiple}
    disabled={disabled}
    limitTags={limitTags}
    className='w-full'
    size={size}
    options={Array.isArray(options) ? options : []}
    getOptionLabel={(option) => option.label || ''}
    getOptionDisabled={(option) => option.disabled === true}
    isOptionEqualToValue={(option, value) => option.value === value?.value} // ✅ บรรทัดนี้สำคัญ
    onChange={handleDateChange}
    value={
        multiple
            ? (Array.isArray(value) ? value : [])
            : (options.find(option => option.value === value) || null)
    }
    open={open}
    onOpen={() => setOpen(true)}
    onClose={() => setOpen(false)}
    renderInput={(params) => (
        <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            onKeyDown={handleInputEvent}
            onPaste={handleInputEvent}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                },
            }}
        />
    )}
/>

    );
}

export default Toolselect2;
