'use client'
import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { useLoading } from './LoadingContext ';

function Loading({ wait = false }) {

    let loadingCount = 0
    // ลองใช้ useLoading() และจัดการกรณีที่ไม่ได้ใช้ในบางหน้า
    try {
        const loadingContext = useLoading()
        if (loadingContext && typeof loadingContext.loadingCount !== '') {//undefined
            loadingCount = loadingContext.loadingCount
        }
    } catch (error) {
        // ไม่ต้องทำอะไรถ้าเกิดข้อผิดพลาดเพราะ loadingCount ถูกกำหนดค่าเริ่มต้นไว้แล้ว
    }
    return (
        (wait || (loadingCount > 0)) && (<>
            <div className={'z-[60] w-screen h-screen justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none text-blue-500'}>
                <div className="w-full flex justify-center h-96 items-center">
                    <div className="animate-pulse flex space-x-4">
                        {/* <label className="flex justify-center items-center text-[#46A7FF] text-2xl">Waiting</label> */}
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
        </>)
    )
}

export default Loading