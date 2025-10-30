'use client'
import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import React, { useEffect, useState } from 'react'
import ModalComponent from '../Modal/Modal'
import Toolselect2 from '../Tool/Toolselect2'
import { InputUpload } from '../Tool/input'
import { addCompany, addDoctor, addLabcode, addStation, addTranslate, addUsers, addXray, getTransletById, updateCompany, updateDoctor, updateLabcode, updateStation, updateTranslate, updateUsers, updateXray } from '@/action/api'
import { InputCheckbox } from '../input'
import { clearAlert, saveAlert, succeedAlert, warningAlert } from '../SweetAlert/sweetAlert'
import { useLoading } from '../Tool/LoadingContext '

export const ModalSetupUser = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        let dataSave = {
            Name: form?.Name || '',
            Username: form?.Username || '',
            msUserGroupUID: form?.msUserGroupUID || '',
            PrenameTH: form?.PrenameTH || '',
            ForenameTH: form?.ForenameTH || '',
            SurnameTH: form?.SurnameTH || '',
            StatusFlag: form?.StatusFlag
        }
        let response = {}
        if (data === 1) {
            response = await addUsers(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addUsers api', response.error)
            }
        } else {
            response = await updateUsers(form?.UID, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateUsers api', response.error)
            }
        }
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    Name: null,
                    Username: null,
                    msUserGroupUID: null,
                    PrenameTH: null,
                    ForenameTH: null,
                    SurnameTH: null,
                    StatusFlag: null
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChangeCheckbox = (name, update) => {
        update[name] = update[name] ? 'A' : 'N'
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'A'
    }

    let button = <div className='flex gap-4'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `เพิ่มรายชื่อผู้ใช้งาน` : `แก้ไขรายชื่อผู้ใช้งาน`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[50%] h-[70%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Name || ''} onChange={(v) => onChange({ Name: v.target.value })} label="Name:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Username || ''} onChange={(v) => onChange({ Username: v.target.value })} label="Username:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.msUserGroupUID || ''} onChange={(v) => onChange({ msUserGroupUID: v.target.value })} label="msUserGroupUID:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.PrenameTH || ''} onChange={(v) => onChange({ PrenameTH: v.target.value })} label="PrenameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ForenameTH || ''} onChange={(v) => onChange({ ForenameTH: v.target.value })} label="ForenameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.SurnameTH || ''} onChange={(v) => onChange({ SurnameTH: v.target.value })} label="SurnameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.StatusFlag)} onChange={(e) => (onChangeCheckbox('StatusFlag', { StatusFlag: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='StatusFlag1' name="StatusFlag" value="" />
                        <label htmlFor='StatusFlag1' className='font-medium'>StatusFlag</label>
                    </div>

                    {/* <div className='flex gap-4 items-center '>
                        <Toolselect2 sm options={[]} label={"User Group:"} value={''} change={''} name={" "}></Toolselect2>

                    </div>
                    <div className='flex gap-4 items-center'>
                        <Toolselect2 sm options={[]} label={"PrenameTH:"} value={''} change={''} name={" "}></Toolselect2>
                    </div> 

                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="ForenameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="SurnameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="SurnameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="ForenameEN:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="SurnameEN:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="LicenseNo:" variant="outlined" />
                    </div>*/}
                </div>

            </div>
        </ModalComponent>
    )
}

export const ModalSetupCompany = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])


    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onSave = async () => {
        // saveAlert({
        //     onCancel: () => { console.log('Cancelled') },
        //     onSave: async () => {

        let dataSave = {
            SSB_ARCode: form?.SSB_ARCode || '',
            Name: form?.Name || '',
            NameEN: form?.NameEN || '',
            Tel: form?.Tel || '',
            Address: form?.Address || '',
            UID: form?.UID || null,
            StatusFlag: form?.StatusFlag
        }
        let response = {}
        if (data === 1) {
            response = await addCompany(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addCompany api', response.error)
            }
        } else {
            response = await updateCompany(form?.UID, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateCompany api', response.error)
            }
        }
        // }})
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    SSB_ARCode: null,
                    Name: null,
                    NameEN: null,
                    Tel: null,
                    Address: null,
                    StatusFlag: null,
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChangeCheckbox = (name, update) => {
        update[name] = update[name] ? 'Y' : 'N'
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'Y'
    }

    let button = <div className='flex gap-4'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `เพิ่มรายชื่อบริษัทผู้สัญญา` : `แก้ไขรายชื่อบริษัทผู้สัญญา`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[50%] h-[70%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 pt-2 justify-start items-start'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.SSB_ARCode || ''} onChange={(v) => onChange({ SSB_ARCode: v.target.value })} label="ARCode:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Name || ''} onChange={(v) => onChange({ Name: v.target.value })} label="Name:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.NameEN || ''} onChange={(v) => onChange({ NameEN: v.target.value })} label="NameEN:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Tel || ''} onChange={(v) => onChange({ Tel: v.target.value })} label="Tel:" variant="outlined" />
                    </div>

                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Address || ''} onChange={(v) => onChange({ Address: v.target.value })} label="Address:" variant="outlined" />
                    </div>

                    <div className='flex gap-4 items-center pt-2'>
                        {/* <InputCheckbox label={false} boxclassName={'col-span-6 py-2'}
                            textCheckbox={"StatusFlag"} checked={form?.StatusFlag}
                            onchange={(StatusFlag) => onChange({ StatusFlag })} /> */}
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.StatusFlag)} onChange={(e) => (onChangeCheckbox('StatusFlag', { StatusFlag: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='StatusFlag1' name="StatusFlag" value="" />
                        <label htmlFor='StatusFlag1' className='font-medium'>StatusFlag</label>
                    </div>

                    {/* <div className='flex gap-4 items-center '>
                        <Toolselect2 sm options={[]} label={"User Group:"} value={''} change={''} name={" "}></Toolselect2>

                    </div>
                    <div className='flex gap-4 items-center'>
                        <Toolselect2 sm options={[]} label={"PrenameTH:"} value={''} change={''} name={" "}></Toolselect2>
                    </div>
                    
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="ForenameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="SurnameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="SurnameTH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="ForenameEN:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="SurnameEN:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="LicenseNo:" variant="outlined" />
                    </div> */}
                </div>

            </div>
        </ModalComponent>
    )
}

export const ModalSetupStation = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        // saveAlert({
        //     onCancel: () => { console.log('Cancelled') },
        //     onSave: async () => {
        let dataSave = {
            Name: form?.Name || '',
            Description: form?.Description || '',
            Sort: form?.Sort || '',
            StatusFlag: form?.StatusFlag
        }
        let response = {}
        if (data === 1) {
            response = await addStation(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addStation api', response.error)
            }
        } else {
            response = await updateStation(form?.UID, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateStation api', response.error)
            }
        }
        // } })
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    Name: null,
                    Description: null,
                    Sort: null,
                    StatusFlag: null
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChangeCheckbox = (name, update) => {
        update[name] = update[name] ? 'A' : 'N'
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'A'
    }

    let button = <div className='flex gap-4'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `Add Station` : `Edit Station`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[40%] h-[60%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Name || ''} onChange={(v) => onChange({ Name: v.target.value })} label="Name:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Description || ''} onChange={(v) => onChange({ Description: v.target.value })} label="Description:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Sort || ''} onChange={(v) => onChange({ Sort: v.target.value })} label="Sort:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.StatusFlag)} onChange={(e) => (onChangeCheckbox('StatusFlag', { StatusFlag: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='StatusFlag1' name="StatusFlag" value="" />
                        <label htmlFor='StatusFlag1' className='font-medium'>StatusFlag</label>
                    </div>
                    {/* <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Sort" variant="outlined" />
                    </div> */}

                    {/* <InputUpload label='Icon' sm value={''} onChange={(e) => onChange({ e })}></InputUpload> */}
                </div>

            </div>
        </ModalComponent>
    )
}

export const ModalSetupMapStation = (props) => {
    const { data } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClear = () => {
        setForm({})
    }

    let button = <div className='flex gap-4'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={`รายชื่อบริษัทผู้ใช้บริการ`} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[30%] h-[50%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Name" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Description" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Form name:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Sort" variant="outlined" />
                    </div>

                    <InputUpload label='Icon' sm value={''} onChange={(e) => onChange({ e })}></InputUpload>
                </div>

            </div>
        </ModalComponent>
    )
}

export const ModalSetupXRayCode = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onSave = async () => {
        // saveAlert({
        //     onCancel: () => { console.log('Cancelled') },
        //     onSave: async () => {
        let dataSave = {
            Code: form?.Code || '',
            Name: form?.Name || '',
            Activity: form?.Activity
        }
        let response = {}
        if (data === 1) {
            response = await addXray(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addXray api', response.error)
            }
        } else {
            response = await updateXray(form?.uid, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateXray api', response.error)
            }
        }
        // }})
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    Code: null,
                    Name: null,
                    Activity: null
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChangeCheckbox = (name, update) => {
        update[name] = update[name] ? 'Y' : 'N'
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'Y'
    }

    let button = <div className='flex gap-4'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `Add X-Ray Code` : `Edit X-Ray Code`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[70%] h-[70%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col mt-2">
                <div className='grid  grid-cols-12 w-full gap-4 pt-2 justify-start items-start'>
                    <div className='flex col-span-4 gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Code || ''} onChange={(v) => onChange({ Code: v.target.value })} label="Code" variant="outlined" />
                    </div>
                    <div className='flex col-span-8  gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Name || ''} onChange={(v) => onChange({ Name: v.target.value })} label="Name" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.Activity)} onChange={(e) => (onChangeCheckbox('Activity', { Activity: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Activity1' name="Activity" value="" />
                        <label htmlFor='Activity1' className='font-medium'>Activity</label>
                    </div>
                </div>
            </div>

            {/* <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col mt-2">
                <div className='grid  grid-cols-12 w-full gap-4 justify-start items-start'>
                    <div className='flex col-span-4 gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Code" variant="outlined" />
                    </div>
                    <div className='flex col-span-8  gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Name" variant="outlined" />
                    </div>

                    <div className='col-span-12 border-b border-[#365382]'></div>

                    <div className='flex col-span-12 justify-between items-center'>
                        <label className='font-semibold text-lg'>Add Translate</label>
                        <button className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] border rounded-full bg-[#496AAB] hover:bg-[#586f9e] text-[#FFFFFF]' >
                            <div className='flex gap-2 justify-center items-center'>
                                <img className=' cursor-pointer' width={24} height={24} src="/icon/plus.svg" />
                            </div>
                        </button>
                    </div>

                    <div className='rounded-lg col-span-12 flex gap-4 flex-col bg-[#A2B6E0] p-4'>
                        <div className='w-full flex justify-between '>
                            <div className='flex w-48 gap-4 items-center rounded-lg'>
                                <Toolselect2 sm options={[]} label={"Language"} value={''} change={''} name={" "}></Toolselect2>
                            </div>
                            <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
                                <img width={26} height={26} src="/icon/trashcan.svg" />
                            </div>
                        </div>

                        <div className='ml-6 lg:ml-0 w-full flex gap-2 items-end'>
                            <TextareaAutosize value={''} onChange={(abnormalsymptoms_detail) => onChange({})} minRows={3} maxRows={4} className="w-full rounded-lg  p-2" aria-label="" placeholder="Translate Result" />
                        </div>
                    </div>

                    <div className='rounded-lg col-span-12 flex gap-4 flex-col bg-[#A2B6E0] p-4'>
                        <div className='w-full flex justify-between '>
                            <div className='flex w-48 gap-4 items-center rounded-lg'>
                                <Toolselect2 sm options={[]} label={"Language"} value={''} change={''} name={" "}></Toolselect2>
                            </div>
                            <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
                                <img width={26} height={26} src="/icon/trashcan.svg" />
                            </div>
                        </div>

                        <div className='ml-6 lg:ml-0 w-full flex gap-2 items-end'>
                            <TextareaAutosize value={''} onChange={(abnormalsymptoms_detail) => onChange({})} minRows={3} maxRows={4} className="w-full rounded-lg  p-2" aria-label="" placeholder="Translate Result" />
                        </div>
                    </div>
                </div>

            </div> */}
        </ModalComponent>
    )
}

export const ModalSetupLabCode = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        // saveAlert({
        //     onCancel: () => { console.log('Cancelled') },
        //     onSave: async () => {
        let dataSave = {
            Code: form?.Code || '',
            Desc: form?.Desc || '',
            sq: form?.sq,
            mapExtCode: form?.mapExtCode,
            Rpt_NormalRang: form?.Rpt_NormalRang,
            Unit: form?.Unit,
            Category: form?.Category
        }
        let response = {}
        if (data === 1) {
            response = await addLabcode(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addLabcode api', response.error)
            }
        } else {
            response = await updateLabcode(form?.UID, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateLabcode api', response.error)
            }
        }
        // }})
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    Code: null,
                    Desc: null,
                    sq: null,
                    mapExtCode: null,
                    Rpt_NormalRang: null,
                    Unit: null,
                    Category: null,
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    let button = <div className='flex gap-4'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `Add LabCode` : `Edit LabCode`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[80%] h-[80%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 pt-2 justify-start items-start'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Code || ''} onChange={(v) => onChange({ Code: v.target.value })} label="LabCode:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Desc || ''} onChange={(v) => onChange({ Desc: v.target.value })} label="DESC:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.sq || ''} onChange={(v) => onChange({ sq: v.target.value })} label="SQ:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.mapExtCode || ''} onChange={(v) => onChange({ mapExtCode: v.target.value })} label="ExCode:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Rpt_NormalRang || ''} onChange={(v) => onChange({ Rpt_NormalRang: v.target.value })} label="NormalRang:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Unit || ''} onChange={(v) => onChange({ Unit: v.target.value })} label="Unit:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Category || ''} onChange={(v) => onChange({ Category: v.target.value })} label="Category:" variant="outlined" />
                    </div>
                </div>
            </div>

            {/* <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col mt-2">
                <div className='grid  grid-cols-12 w-full gap-4 justify-start items-start'>
                    <div className='flex col-span-3 gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Code" variant="outlined" />
                    </div>
                    <div className='flex col-span-6  gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Name" variant="outlined" />
                    </div>
                    <div className='flex col-span-3 gap-4 items-center rounded-lg'>
                        <Toolselect2 sm options={[]} label={"Gender"} value={''} change={''} name={" "}></Toolselect2>
                    </div>

                    <div className='flex col-span-9 gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ConclusionResultHIS || ''} onChange={(v) => onChange({ ConclusionResultHIS: v.target.value })} label="Code" variant="outlined" />
                    </div>
                    <div className='flex col-span-3 gap-4 items-center rounded-lg'>
                        <Toolselect2 sm options={[]} label={"Status"} value={''} change={''} name={" "}></Toolselect2>
                    </div>


                    <div className='col-span-12 border-b border-[#365382]'></div>

                    <div className='flex col-span-12 justify-between items-center'>
                        <label className='font-semibold text-lg'>Add Translate</label>
                        <button className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] border rounded-full bg-[#496AAB] hover:bg-[#586f9e] text-[#FFFFFF]' >
                            <div className='flex gap-2 justify-center items-center'>
                                <img className=' cursor-pointer' width={24} height={24} src="/icon/plus.svg" />
                            </div>
                        </button>
                    </div>

                    <div className='rounded-lg col-span-12 flex gap-4 flex-col bg-[#A2B6E0] p-4'>
                        <div className='w-full flex justify-between '>
                            <div className='flex w-48 gap-4 items-center rounded-lg'>
                                <Toolselect2 sm options={[]} label={"Language"} value={''} change={''} name={" "}></Toolselect2>
                            </div>
                            <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
                                <img width={26} height={26} src="/icon/trashcan.svg" />
                            </div>
                        </div>

                        <div className='ml-6 lg:ml-0 w-full flex gap-2 items-end'>
                            <TextareaAutosize value={''} onChange={(abnormalsymptoms_detail) => onChange({})} minRows={3} maxRows={4} className="w-full rounded-lg  p-2" aria-label="" placeholder="Translate Result" />
                        </div>
                        <div className='ml-6 lg:ml-0 w-full flex gap-2 items-end'>
                            <TextareaAutosize value={''} onChange={(abnormalsymptoms_detail) => onChange({})} minRows={3} maxRows={4} className="w-full rounded-lg  p-2" aria-label="" placeholder="Recommend" />
                        </div>
                    </div>

                    <div className='rounded-lg col-span-12 flex gap-4 flex-col bg-[#A2B6E0] p-4'>
                        <div className='w-full flex justify-between '>
                            <div className='flex w-48 gap-4 items-center rounded-lg'>
                                <Toolselect2 sm options={[]} label={"Language"} value={''} change={''} name={" "}></Toolselect2>
                            </div>
                            <div className='min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] shadow-heart  w-[40px] h-[40px] bg-[#E54545]  rounded-full flex justify-center items-center shadow-lg'>
                                <img width={26} height={26} src="/icon/trashcan.svg" />
                            </div>
                        </div>

                        <div className='ml-6 lg:ml-0 w-full flex gap-2 items-end'>
                            <TextareaAutosize value={''} onChange={(abnormalsymptoms_detail) => onChange({})} minRows={3} maxRows={4} className="w-full rounded-lg  p-2" aria-label="" placeholder="Translate Result" />
                        </div>
                        <div className='ml-6 lg:ml-0 w-full flex gap-2 items-end'>
                            <TextareaAutosize value={''} onChange={(abnormalsymptoms_detail) => onChange({})} minRows={3} maxRows={4} className="w-full rounded-lg  p-2" aria-label="" placeholder="Recommend" />
                        </div>
                    </div>
                </div>

            </div> */}
        </ModalComponent>
    )
}

export const ModalSetupTransletLabCode = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [list, setList] = useState([])
    const { startLoading, stopLoading } = useLoading()
    const [addsupmodal, setAddSupModal] = useState(null)
    useEffect(() => {
        onLoad()
        return () => {
            // Cleanup function
            console.log("Cleanup function called!")
        }
    }, [data])

    const onLoad = async () => {
        try {
            startLoading()
            let res = await getTransletById(data.Code)
            if (res?.message === 'success') {
                setList(res?.data || [])
            } else {
                console.log('error', res?.error)
            }
        } catch (err) {
            console.error('An error occurred while refreshing data:', err)
        } finally {
            stopLoading()
        }
    }

    // const onDrop = async (item) => {
    //     let _s = await Swal.fire({
    //         icon: 'question',
    //         title: 'Want to delete?',
    //         showConfirmButton: true,
    //         showCancelButton: true,
    //     }).then((res) => {
    //         return res.isConfirmed
    //     })
    //     if (_s) {
    //         let response = await deleteXrayByid(item?.uid)
    //         if (!response.error) {
    //             Swal.fire("ลบสำเร็จ!", "", "success");
    //             onLoad()
    //         } else {
    //             Swal.fire("ลบไม่สำเร็จ!", "", "error");
    //         }
    //     }
    // }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onEdit = (e) => {
        setAddSupModal(e)
    }

    const isChecked = (item) => {
        return item === 'TRUE'
    }

    console.log('list', list)

    // let button = <div className='flex gap-4'>
    //     <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
    //         <div className='flex gap-2 justify-center items-center'>
    //             <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
    //             <label className='cursor-pointer'>ล้าง</label>
    //         </div>
    //     </button>
    //     <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
    //         <div className='flex gap-2 justify-center items-center' >
    //             <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
    //             <label className='font-semibold cursor-pointer'>บันทึก</label>
    //         </div>
    //     </button>
    // </div>

    return (
        <ModalComponent headname={`Translet LabCode`} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[80%] lg:h-[90%] h-[90%] '} onCancel={() => props.onClose()}>
            <div className='flex flex-col col-span-12 justify-start gap-2'>
                <div className='flex justify-end gap-4 pr-10'>
                    <button onClick={() => setAddSupModal(1)} className={` border max-h-10 min-h-10 min-w-[100px] px-4 rounded-lg border-[#365382] bg-[#365382] text-[#FFFFFF] `}>
                        <div className='flex gap-4 justify-center items-center'>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5317 4C13.0839 4.00072 13.5311 4.44903 13.5303 5.00131L13.5225 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H13.5199L13.512 19.0013C13.5113 19.5536 13.063 20.0007 12.5107 20C11.9584 19.9993 11.5113 19.551 11.512 18.9987L11.5199 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11.5225L11.5304 4.99869C11.5311 4.44641 11.9794 3.99928 12.5317 4Z" fill="white" />
                            </svg>
                            <label className='cursor-pointer'>Add</label>
                        </div>
                    </button>
                </div>
                <div className='flex flex-col justify-start h-[60vh] overflow-y-auto pb-2 p-2'>
                    <table className="tablePatientInformation w-full">
                        <thead className='text-[#4E4E4E] text-sm '>
                            <tr className="text-left bg-[#E2E2E2]">
                                <th className="font-light">No.</th>
                                <th className="font-light whitespace-nowrap">Lab Code</th>
                                <th className="font-light">Condition</th>
                                <th className="font-light">TranslateResult</th>
                                <th className="font-light">Status</th>
                                <th className="font-light"> </th>
                            </tr>
                        </thead>
                        {/* whitespace-nowrap */}
                        <tbody className='text-base font-light'>
                            {list?.length > 0 && list?.map((item, index) => {
                                return <tr key={`TableSetupTransletLabCode${index}`} className="hover">
                                    <td className="text-left">{index + 1}</td>
                                    <td className="text-left whitespace-nowrap">{item?.LabCode || ''}</td>
                                    <td className="text-left whitespace-nowrap">{item?.Condition || ''}</td>
                                    <td className="text-left whitespace-nowrap">{item?.msResultTranslate?.TranslateResult || ''}</td>
                                    <td className={`text-left whitespace-nowrap ${item?.msResultTranslate?.NormalStatus == "TRUE" ? '' : 'text-red-600'}`}>
                                        {item?.msResultTranslate?.NormalStatus || ''}
                                    </td>
                                    {/* <td className="text-left">
                                        <div className='flex gap-4 items-center pt-2'>
                                            <div className='flex gap-4 items-center justify-start col-span-8'></div>
                                            <input checked={isChecked(item?.msResultTranslate?.NormalStatus)} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='NormalStatus1' name="NormalStatus" value="" />
                                        </div>
                                    </td> */}
                                    <td className="text-left">
                                        <div className='flex gap-2'>
                                            <button onClick={() => onEdit(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#6B84B7] rounded-full' >
                                                <img width={20} height={20} src="/icon/edit.svg" />
                                            </button>

                                            <button onClick={() => onDrop(item)} className='flex shadow-button justify-center items-center min-w-[32px] min-h-[32px] bg-[#E54545] rounded-full' >
                                                <img width={20} height={20} src="/icon/trashcan.svg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    {/* {list.length <= 0 && <div className='flex justify-center items-center mt-4'>
            <label className='text-3xl font-semibold'>ไม่มีข้อมูล</label>
          </div>} */}
                </div>
                <ModalSupSetupTransletLabCode data={addsupmodal} onClose={() => setAddSupModal(null)} onRefresh={() => onLoad()} />
            </div>
        </ModalComponent>
    )
}

export const ModalSupSetupTransletLabCode = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        let dataSave = {
            Condition: form?.Condition || '',
            TranslateResult: form?.msResultTranslate?.TranslateResult || '',
            Recommend: form?.msResultTranslate?.Recommend || '',
            NormalStatus: form?.msResultTranslate?.NormalStatus
        }
        console.log("dataSave", dataSave)
        // let response = {}
        // if (data === 1) {
        //     response = await addUsers(dataSave)
        //     console.log('response', response)
        //     if (!response.error) {
        //         onClose()
        //         succeedAlert()
        //     } else {
        //         console.log('response.error addUsers api', response.error)
        //     }
        // }
    }


    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChangeCheckbox = (name, update) => {
        let newdata = { ...form?.msResultTranslate }
        update[name] = update[name] ? 'TRUE' : 'FALSE'
        newdata[name] = update[name]
        setForm((p) => ({ ...p, ...{ msResultTranslate: newdata } }))
    }
    const isChecked = (item) => {
        return item === 'TRUE'
    }

    const onChange = (update, name) => {
        if (name) {
            let newdata = { ...form?.msResultTranslate }
            newdata = { ...newdata, ...update }
            setForm((p) => ({ ...p, ...{ msResultTranslate: newdata } }))
        } else {
            setForm({ ...form, ...update })
        }
    }


    // let button = <div className='flex gap-4'>
    //     <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
    //         <div className='flex gap-2 justify-center items-center'>
    //             <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
    //             <label className='cursor-pointer'>ล้าง</label>
    //         </div>
    //     </button>
    //     <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
    //         <div className='flex gap-2 justify-center items-center' >
    //             <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
    //             <label className='font-semibold cursor-pointer'>บันทึก</label>
    //         </div>
    //     </button>
    // </div>
    return (
        <ModalComponent headname={(data === 1 ? `Add Translet LabCode` : `Edit Translet LabCode`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[60%] lg:h-[70%] h-[70%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Condition || ''} onChange={(v) => onChange({ Condition: v.target.value })} label="Condition:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.msResultTranslate?.TranslateResult || ''} onChange={(v) => onChange({ TranslateResult: v.target.value }, 'TranslateResult')} label="TranslateResult:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.msResultTranslate?.Recommend || ''} onChange={(v) => onChange({ Recommend: v.target.value }, 'Recommend')} label="Recommend:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.msResultTranslate?.NormalStatus)} onChange={(e) => (onChangeCheckbox('NormalStatus', { NormalStatus: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='NormalStatus2' name="NormalStatus" value="" />
                        <label htmlFor='NormalStatus2' className='font-medium'>NormalStatus</label>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export const ModalSetupTranslate = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        // saveAlert({
        //     onCancel: () => { console.log('Cancelled') },
        //     onSave: async () => {
        let dataSave = {
            slocal: form?.slocal || '',
            Mess: form?.Mess || '',
            Flag_Active: form?.Flag_Active
        }
        let response = {}
        if (data === 1) {
            response = await addTranslate(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addTranslate api', response.error)
            }
        } else {
            response = await updateTranslate(form?.UID, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateTranslate api', response.error)
            }
        }
        // }})
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChangeCheckbox = (name, update) => {
        update[name] = update[name] ? 'Y' : 'N'
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'Y'
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    slocal: null,
                    Mess: null,
                    Flag_Active: null
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    let button = <div className='flex gap-4 justify-center items-center'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `Insert Data Translate` : `Edit Data Translate`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[60%] lg:h-[60%] h-[60%] '} footCenter={true} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col mt-2">
                <div className='grid  grid-cols-12 w-full gap-4 justify-start items-start'>
                    <div className='col-span-12 w-full flex gap-2 items-end'>
                        <TextareaAutosize value={form?.slocal || ''} onChange={(e) => onChange({ slocal: e?.target.value })} minRows={3} maxRows={4} className="w-full border border-[#365382] rounded-lg  p-2" aria-label="" placeholder="Slocal" />
                    </div>
                    <div className='col-span-12 w-full flex gap-2 items-end'>
                        <TextareaAutosize value={form?.Mess || ''} onChange={(e) => onChange({ Mess: e?.target.value })} minRows={3} maxRows={4} className="w-full border border-[#365382] rounded-lg  p-2" aria-label="" placeholder="Mess" />
                    </div>
                    <div className='flex gap-4 col-span-12 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.Flag_Active)} onChange={(e) => (onChangeCheckbox('Flag_Active', { Flag_Active: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='FlagActive1' name="Flag_Active" value="" />
                        <label htmlFor='FlagActive1' className='font-medium'>Flag Active</label>
                    </div>
                    {/* <div className='flex col-span-3  gap-4 items-center rounded-lg'>
                        <Toolselect2 sm options={[]} label={"Language"} value={''} change={''} name={" "}></Toolselect2>
                    </div> */}
                </div>
            </div>
        </ModalComponent>
    )
}
export const ModalSetupTranslateResult = (props) => {
    const { data, onRefresh, onClose: closeModal } = props
    const [form, setForm] = useState({ title: '', description: '', conditions: [] })

    useEffect(() => {
        if (data) {
            setForm({
                title: data?.title || '',
                description: data?.description || '',
                conditions: data?.conditions || []
            })
        }
    }, [data])

    const onSave = async () => {
        const dataSave = {
            title: form?.title || '',
            description: form?.description || '',
            conditions: form?.conditions || []
        }

        let response = {}
        if (data === 1) {
            response = await addTranslate(dataSave)
        } else {
            response = await updateTranslate(data?.id, dataSave)
        }

        if (!response.error) {
            succeedAlert()
            handleClose()
        } else {
            console.error('save error:', response.error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleConditionChange = (index, field, value) => {
        const updated = [...form.conditions]
        updated[index][field] = value
        setForm({ ...form, conditions: updated })
    }

    const handleAddCondition = () => {
        setForm({
            ...form,
            conditions: [
                ...form.conditions,
                { lab_type: '', operator: '', value_min: '', value_max: '', unit: '' }
            ]
        })
    }

    const handleRemoveCondition = (index) => {
        const updated = [...form.conditions]
        updated.splice(index, 1)
        setForm({ ...form, conditions: updated })
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { },
            onSave: () => {
                setForm({ title: '', description: '', conditions: [] })
            }
        })
    }

    const handleClose = () => {
        setForm({ title: '', description: '', conditions: [] })
        onRefresh()
        closeModal()
    }
    const handleNumericInput = (value) => {
        // อนุญาตเฉพาะตัวเลข และ . เดียวเท่านั้น
        if (/^\d*\.?\d*$/.test(value)) {
            return value
        }
        return ''
    }

    const button = (
        <div className='flex gap-4 justify-center items-center'>
            <button onClick={onClear} className='h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-white'>
                <div className='flex gap-2 justify-center items-center'>
                    <img width={25} height={24} src="/icon/clear.svg" />
                    <label>ล้าง</label>
                </div>
            </button>
            <button onClick={onSave} className="h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756]">
                <div className='flex gap-2 justify-center items-center'>
                    <img width={24} height={24} src="/icon/save.svg" />
                    <label className='font-semibold'>บันทึก</label>
                </div>
            </button>
        </div>
    )

    return (
        <ModalComponent
            button={button}
            headname={data === 1 ? `เพิ่มผลแปลใหม่` : `แก้ไขผลแปล`}
            classheadname='text-[#365382]'
            setIsModal={handleClose}
            isModal={!!data}
            modalsize='w-[70%] lg:h-[75%] h-[75%]'
            footCenter
            onSave={onSave}
            onCancel={handleClose}
        >
            <div className="overflow-auto w-full h-full px-4 pb-4 flex flex-col mt-2 gap-6 text-black">
                <div className="grid grid-cols-12 w-full gap-4">
                    <div className='col-span-12'>
                        <label className='font-medium text-[#365382]'>หัวข้อ</label>
                        <textarea
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-[#365382] rounded-lg p-2"
                            placeholder="ระบุหัวข้อผลแปล"
                        />
                    </div>
                    <div className='col-span-12'>
                        <label className='font-medium text-[#365382]'>คำอธิบาย</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-[#365382] rounded-lg p-2"
                            placeholder="รายละเอียดเพิ่มเติม"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <label className="font-medium text-[#365382] text-lg">เงื่อนไข (Conditions)</label>
                    <button onClick={handleAddCondition} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">+ เพิ่มเงื่อนไข</button>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 w-full">
                        <table className="min-w-full border border-collapse border-gray-300 text-sm">
                            <thead className="bg-gray-100 text-[#365382]">
                                <tr>
                                    <th className="border px-2 py-2">Lab Type</th>
                                    <th className="border px-2 py-2">Operator</th>
                                    <th className="border px-2 py-2">Min</th>
                                    <th className="border px-2 py-2">Max</th>
                                    <th className="border px-2 py-2">Unit</th>
                                    <th className="border px-2 py-2 text-center">ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form.conditions.length > 0 ? form.conditions.map((cond, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="border px-2 py-1">
                                            <input
                                                className="w-full p-1 border rounded"
                                                value={cond.lab_type}
                                                onChange={(e) => handleConditionChange(index, 'lab_type', e.target.value)}
                                                placeholder="Lab Type"
                                            />
                                        </td>
                                        <td className="border px-2 py-1">
                                            <select
                                                className="w-full p-1 border rounded text-center"
                                                value={cond.operator}
                                                onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                                            >
                                                <option value="">เลือก</option>
                                                <option value="<">&lt;</option>
                                                <option value="<=">&le;</option>
                                                <option value=">">&gt;</option>
                                                <option value=">=">&ge;</option>
                                                <option value="==">=</option>
                                                <option value="between">between</option>
                                            </select>
                                        </td>
                                        <td className="border px-2 py-1">
                                            <input
                                                type="number"
                                                step="any"
                                                className="w-full p-1 border rounded text-center"
                                                value={cond.value_min}
                                                onChange={(e) => handleConditionChange(index, 'value_min', handleNumericInput(e.target.value))}
                                                placeholder="Min"
                                            />
                                        </td>
                                        <td className="border px-2 py-1">
                                            <input
                                                type="number"
                                                step="any"
                                                className="w-full p-1 border rounded text-center"
                                                value={cond.value_max || ''}
                                                onChange={(e) => handleConditionChange(index, 'value_max', handleNumericInput(e.target.value))}
                                                placeholder="Max"
                                            />
                                        </td>
                                        <td className="border px-2 py-1">
                                            <input
                                                className="w-full p-1 border rounded text-center"
                                                value={cond.unit}
                                                onChange={(e) => handleConditionChange(index, 'unit', e.target.value)}
                                                placeholder="หน่วย"
                                            />
                                        </td>
                                        <td className="border px-2 py-1 text-center">
                                            <button onClick={() => handleRemoveCondition(index)} className="text-red-600 hover:text-red-800">
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-400">ยังไม่มีเงื่อนไข</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </ModalComponent>
    )
}


export const ModalSetupDoctor = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        if (!form?.name_th) {
            warningAlert()
            return
        }
        let dataSave = {
            name_th: form?.name_th || '',
            name_en: form?.name_en || '',
            doctor_code: form?.doctor_code || '',
            type: form?.type || ''
        }

        let response = {}
        if (data === 1) {
            response = await addDoctor(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addDoctor api', response.error)
            }
        } else {
            response = await updateDoctor(form?.uid, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateDoctor api', response.error)
            }
        }
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    name_th: null,
                    name_en: null,
                    doctor_code: null,
                    type: null
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    let button = <div className='flex gap-4 justify-center items-center'>
        <button onClick={() => onClear()} className='z-auto h-10 w-40 py-1 shadow-md text-base rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
            <div className='flex gap-2 justify-center items-center'>
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
            </div>
        </button>
        <button onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] hover:bg-[#0B2756] ">
            <div className='flex gap-2 justify-center items-center' >
                <img style={{ zIndex: 100 }} className=' cursor-pointer' width={24} height={24} src="/icon/save.svg" />
                <label className='font-semibold cursor-pointer'>บันทึก</label>
            </div>
        </button>
    </div>

    return (
        <ModalComponent button={button} headname={(data === 1 ? `Insert Data Doctor` : `Edit Data Doctor`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[60%] h-[60%] '} footCenter={true} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.name_th || ''} onChange={(v) => onChange({ name_th: v.target.value })} label="Name TH:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.name_en || ''} onChange={(v) => onChange({ name_en: v.target.value })} label="Name EN:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.doctor_code || ''} onChange={(v) => onChange({ doctor_code: v.target.value })} label="Doctor Code:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.type || ''} onChange={(v) => onChange({ type: v.target.value })} label="Type:" variant="outlined" />
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}
export const ModalViewPackage = (props) => {
    const { data, onRefresh } = props
    const [search, setSearch] = useState({ page: 1, limit: 20, Category: '' })
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        if (!form?.name_th) {
            warningAlert()
            return
        }
        let dataSave = {
            name_th: form?.name_th || '',
            name_en: form?.name_en || '',
            doctor_code: form?.doctor_code || '',
            type: form?.type || ''
        }

        let response = {}
        if (data === 1) {
            response = await addDoctor(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addDoctor api', response.error)
            }
        } else {
            response = await updateDoctor(form?.uid, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateDoctor api', response.error)
            }
        }
    }

    const onSearch = (update) => {
        setSearch({ ...search, ...update })
        if (!update.hasOwnProperty('page')) {
            setTap(Object.values(update).join(''))
        }
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onClear = () => {
        clearAlert({
            onCancel: () => { console.log('Cancelled') },
            onSave: () => {
                const saveData = {
                    name_th: null,
                    name_en: null,
                    doctor_code: null,
                    type: null
                }
                setForm((p) => ({ ...p, ...saveData }))
            }
        })
    }

    let button = <div className='flex gap-4 justify-center items-center'>

    </div>

    return (
        <ModalComponent button={button} headname={(`ข้อมูลแพ็คเกจ`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[60%] h-[60%] '} footCenter={true} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='col-span-12 overflow-x-auto px-1 pb-1'>
                        <table className=" tablePatientInformation  mt-4 w-full ">
                            <thead className='text-[#4E4E4E]  text-sm truncate'>
                                <tr className=" text-left bg-[#E2E2E2]">
                                    <th className="font-light">No.</th>
                                    <th className="font-light">Package Code</th>
                                    <th className="font-light">Package Name</th>
                                    <th className="font-light">Item Price</th>
                                </tr>
                            </thead>
                            <tbody className='text-base font-light truncate text-black'>
                                {data && data.length > 0 && data.map((item, index) => {
                                    return <tr key={`trPatients${index}`} className=" text-center hover">
                                        <td className=" text-left ">{index + 1 || '-'}</td>
                                        <td className=" text-left ">{item.package_code || '-'}</td>
                                        <td className=" text-left ">{item.item_name || '-'}</td>
                                        <td className=" text-left ">{item.item_price || '-'}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}
