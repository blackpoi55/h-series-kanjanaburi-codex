'use client'

import { TextField } from "@mui/material"
import ModalComponent from "../Modal/Modal"
import { useEffect, useState } from "react"
import { addReportSum, addresultAll, updateReportSum, updateresultAll } from "@/action/api"
import { succeedAlert } from "../SweetAlert/sweetAlert"

export const ModalSetupReportUser = (props) => {
    const { data, onRefresh } = props
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        let dataSave = {
            ReportName: form?.ReportName || '',
            ReportShowName: form?.ReportShowName || '',
            path: form?.path || '',
            Type: form?.Type || '',
            Status: form?.Status
        }
        let response = {}
        if (data === 1) {
            response = await addReportSum(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addReportSum api', response.error)
            }
        } else {
            response = await updateReportSum(form?.UID, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateReportSum api', response.error)
            }
        }
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'A'
    }
    return (
        <ModalComponent headname={(data === 1 ? `เพิ่มรายชื่อผู้ใช้งาน` : `แก้ไขรายชื่อผู้ใช้งาน`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[50%] h-[70%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ReportName || ''} onChange={(v) => onChange({ ReportName: v.target.value })} label="Report Name:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.ReportShowName || ''} onChange={(v) => onChange({ ReportShowName: v.target.value })} label="Report ShowName:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.path || ''} onChange={(v) => onChange({ path: v.target.value })} label="Path:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.Type || ''} onChange={(v) => onChange({ Type: v.target.value })} label="Type:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.Status)} onChange={(e) => (onChangeCheckbox('Status', { Status: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='Status1' name="Status" value="" />
                        <label htmlFor='Status1' className='font-medium'>Status</label>
                    </div>
                </div>

            </div>
        </ModalComponent>
    )
}

export const ModalSetupReportCompany = (props) => {
    const { data, onRefresh } = props
    const [form, setForm] = useState({})

    useEffect(() => {
        if (data) {
            setForm(data)
        }
    }, [data])

    const onSave = async () => {
        let dataSave = {
            name: form?.name || '',
            code: form?.code || '',
            type: form?.type || '',
            status: form?.status
        }
        let response = {}
        if (data === 1) {
            response = await addresultAll(dataSave)
            console.log('response', response)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error addresultAll api', response.error)
            }
        } else {
            response = await updateresultAll(form?.uid, dataSave)
            if (!response.error) {
                onClose()
                succeedAlert()
            } else {
                console.log('response.error updateresultAll api', response.error)
            }
        }
    }

    const onClose = () => {
        setForm({})
        onRefresh()
        props.onClose()
    }

    const onChange = (update) => {
        setForm({ ...form, ...update })
    }
    const onChangeCheckbox = (name, update) => {
        update[name] = update[name] ? 'A' : 'N'
        setForm({ ...form, ...update })
    }

    const isChecked = (item) => {
        return item === 'A'
    }
    return (
        <ModalComponent headname={(data === 1 ? `เพิ่มรายชื่อผู้ใช้งาน` : `แก้ไขรายชื่อผู้ใช้งาน`)} classheadname={'text-[#365382]'} setIsModal={() => props.onClose()} isModal={data != null} modalsize={'w-[50%] lg:h-[50%] h-[70%] '} onSave={() => onSave()} onCancel={() => props.onClose()}>
            <div className=" overflow-auto w-full h-full px-4 pb-4 gap-4 flex flex-col">
                <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-4 justify-start items-start pt-2'>
                    <div className='flex gap-4 items-center '>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.name || ''} onChange={(v) => onChange({ name: v.target.value })} label="Name:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.code || ''} onChange={(v) => onChange({ code: v.target.value })} label="Code:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <TextField size='small' className='text-white  w-full   bg-[#FFFFFF]' value={form?.type || ''} onChange={(v) => onChange({ type: v.target.value })} label="Type:" variant="outlined" />
                    </div>
                    <div className='flex gap-4 items-center pt-2'>
                        <div className='flex gap-4 items-center justify-start col-span-8'></div>
                        <input checked={isChecked(form?.status)} onChange={(e) => (onChangeCheckbox('status', { status: e?.target.checked }))} type="checkbox" className='w-5 h-5 min-w-5 min-h-5 accent-[#365382]' id='status1' name="status" value="" />
                        <label htmlFor='status1' className='font-medium'>Status</label>
                    </div>
                </div>

            </div>
        </ModalComponent>
    )
}