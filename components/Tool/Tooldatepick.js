'use client'
import { IconButton, Popper, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // ใช้ locale ที่ต้องการ
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // ใช้ไอคอนปฏิทินจาก MUI
import React, { useEffect, useRef, useState } from 'react';
import { toBuddhistDate } from './tools';
import { ClearIcon } from '@mui/x-date-pickers';




function Tooldatepick({ label, value, onChange, disabled, sm, format, BuddhistDate = true }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const size = sm ? 'small' : ''
  const _format = format ? format : 'DD/MM/YYYY'
  const datePickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false)
      }
    }
    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDatePicker])

  const handleDateChange = (date) => {
    value = dayjs(date).format('YYYY/MM/DD')
    onChange(value)
    setShowDatePicker(false) // ซ่อน DatePicker เมื่อเลือกวันที่เสร็จ
  }

  const onClear = () => {
    value = null
    onChange(value)
    setShowDatePicker(false) // ซ่อน DatePicker เมื่อเลือกวันที่เสร็จ
  }

  return (
    <>
      <TextField
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root':
            { backgroundColor: '#FFFFFF' },
        }}
        size={size}
        disabled={disabled}
        variant="outlined"
        label={label || ""}
        value={value ? dayjs(value).add(BuddhistDate ? 543 : 0, 'year').format(_format) : ''}
        onClick={(e) => (setShowDatePicker(!showDatePicker), setAnchorEl(e?.currentTarget))} // เปิด/ปิด DatePicker
        InputProps={{
          endAdornment: (
            !disabled ?
              <IconButton
                aria-label="calendar"
                onClick={() => value ? onClear() : setShowDatePicker(!showDatePicker)}
              >
                {value ? <ClearIcon /> : <CalendarTodayIcon />}
              </IconButton>
              : ""
          ),
        }}
      />
      {showDatePicker && (
        <Popper
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              }
            }
          ]}
          style={{ position: 'absolute', zIndex: 1500 }}
          open={showDatePicker} anchorEl={anchorEl} placement="bottom-start">
          <div ref={datePickerRef}>
            <DatePicker
              selected={value ? new Date(dayjs(value).format('YYYY-MM-DD')) : null}
              onChange={(date) => handleDateChange(date)}
              dateFormat="dd/MM/yyyy"
              inline
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <select
                    value={dayjs(date).year()}
                    className='border-2 rounded-sm mx-1'
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i} value={i + 1950}>
                        {i + 1950 + 543} {/* แสดงปี พ.ศ. */}
                      </option>
                    ))}
                  </select>

                  <select
                    value={dayjs(date).month()}
                    className='border-2 rounded-sm mx-1'
                    onChange={({ target: { value } }) => changeMonth(value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {dayjs().month(i).format("MMMM")}
                      </option>
                    ))}
                  </select>

                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>
        </Popper>
      )}
    </>
  );
}

export default Tooldatepick;
