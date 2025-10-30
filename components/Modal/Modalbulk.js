'use client'
import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import { Backdrop, Grow } from '@mui/material';

function Modalbulk({ headname, savedisabled = false, classheadname = null, isModal, children, z = 100, modalsize, setIsModal, onSave, onCancel, button = null, footCenter, x = true }) {

    const checkFooter = onSave || onCancel || button

    return <Modal sx={{ zIndex: z }} closeAfterTransition onClose={() => setIsModal(!isModal)} slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 300, }, }} open={isModal} className='w-screen h-screen  justify-center items-center flex   overflow-y-auto overflow-x-hidden fixed inset-0 outline-none focus:outline-none '>
        <Grow in={isModal} timeout={500} unmountOnExit >
            <div className={'relative ' + modalsize + ' my-6 mx-auto bg-white rounded-lg'}>
                {x && <div className='w-full relative h-12 justify-end flex items-center p-2'>
                    {headname && <div className="absolute left-0 w-full h-full top-0 justify-center flex items-center "><span className={`${classheadname ? classheadname : ''} font-semibold text-xl`} >{headname || '-'}</span></div>}

                    <img onClick={() => setIsModal(!isModal)} style={{ zIndex: z }} className=' cursor-pointer' width={24} height={24} src="/icon/x.svg" />
                </div>}
                <div style={{ zIndex: z }} className={` absolute ${x ? 'top-12' : 'top-0 my-4 '} w-full left-0  bg-white ${checkFooter ? 'bottom-16 ' : 'bottom-0 rounded-b-lg'} text-base`}>
                    {children}
                </div>

                {checkFooter && <div style={{ zIndex: z + 1 }} className={`absolute bottom-0  rounded-b-lg left-0 bg-white h-16 w-full md:px-4 px-2 flex ${footCenter ? 'justify-center' : 'justify-end'} items-center gap-2 border-t`}>
                    {button ? button
                        : <>
                            {onCancel && <button onClick={() => onCancel()} className={`z-auto h-10 w-40 shadow-md py-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382] `}>
                                <div className='flex gap-2 justify-center items-center' >
                                    <img style={{ zIndex: z + 1 }} className=' cursor-pointer' width={24} height={24} src="/icon/x_red.svg" />
                                    <label className='font-semibold cursor-pointer'>ยกเลิก</label>
                                </div></button>}
                            {onSave && <button disabled={savedisabled} onClick={() => onSave()} className="z-auto h-10 w-40 py-1 shadow-md text-base text-white rounded-lg bg-[#365382] disabled:bg-gray-500 hover:bg-[#0B2756]">
                                <div className='flex gap-2 justify-center items-center' >
                                    <img style={{ zIndex: z + 1 }} className=' ' width={24} height={24} src="/icon/save.svg" />
                                    <label className='font-semibold '>บันทึก</label>
                                </div>
                            </button>}
                        </>
                    }
                </div>}
            </div>
        </Grow>
    </Modal>


}
export default Modalbulk