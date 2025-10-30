import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, styled, Switch, TextField } from '@mui/material';
import React, { createContext, useContext, useRef, useState } from 'react'
//const LoadingContext = createContext();


export const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#365382' : '#365382',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#365382',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 16,
        height: 16,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export const InputSwitch = ({ checked, onChange }) => {

    return <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="hidden peer" checked={checked} onChange={(v) => (onChange(v))} />
        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#365382]"></div>
    </label>
}

export const InputSearch = ({ value, label = '', onChange, className, sm, disabled }) => {
    const size = sm ? 'small' : ''

    return (
        <TextField
            fullWidth
            className={` ${className ? className : ''}`}
            size={size}
            disabled={disabled}
            variant="outlined"
            label={label || ""}
            value={value}
            onChange={onChange}
            sx={{
                '& .MuiOutlinedInput-root':
                    { backgroundColor: '#FFFFFF' },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}


export const InputUpload = ({ value, label = '', onChange, muit = false, sm, disabled }) => {
    const size = sm ? 'small' : ''
    const inputFileRef = useRef(null)
    const handleClickInputFile = () => {
        inputFileRef.current.click()
    }
    const [file, setfile] = useState("")

    const handleChangeInputFile = (event) => {
        event.preventDefault();
        let formData = new FormData()
        formData.append('topath', '')
        formData.append('file', event.target.files[0])
        // let res = await uploadsFile(formData)
        // if (res?.message === 'success') {
        // 	if (onchange) onchange(res?.data || null)
        // 	setfile(res?.data?.filename)
        // }
        setfile(event.target.files[0]?.name)
        onChange(event.target.files[0]?.name)
    }
    console.log('file', file)
    return <div>
        <TextField
            fullWidth
            sx={{ input: { cursor: 'pointer' } }}
            className='bg-[#FFFFFF] cursor-pointer'
            size={size}
            disabled={disabled}
            variant="outlined"
            label={label || ""}
            value={file}
            onClick={handleClickInputFile}
            InputProps={{
                readOnly: true,
                endAdornment: (
                    <InputAdornment>
                        <IconButton>
                            <img width={24} height={24} src="/icon/upload.svg" />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
        <input type="file" multiple={muit} ref={inputFileRef} onChange={handleChangeInputFile} style={{ display: "none" }} />
    </div>
}

