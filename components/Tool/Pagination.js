import React, { useEffect, useState } from 'react'

export const Pagination = (props) => {
    const { paging, setvalues } = props
    const [inputValue, setInputValue] = useState(paging?.currentPage)
    useEffect(() => {
        setInputValue(paging?.currentPage)
    }, [paging.currentPage])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setvalues((p) => ({ ...p, page: inputValue }))
        }
    }
    const handleChange = (e) => {
        if (/^\d*$/.test(e.target.value)) {
            if (e.target.value > paging?.totalPages) {
                setInputValue(Number(paging?.totalPages))
                setvalues((p) => ({ ...p, page: paging?.totalPages }))
            } else {
                setInputValue(Number(e.target.value))
                setvalues((p) => ({ ...p, page: e.target.value }))
            }
        }
    }

    const handleChangepage = (event) => {
        setvalues((prevValues) => {
            const newValues = { ...prevValues }
            if (event === 'back') {
                if (paging.currentPage > 1) {
                    newValues.page = paging.currentPage - 1
                }
            } else if (event === 'next') {
                if (paging.currentPage < (paging.totalPages)) {
                    newValues.page = paging.currentPage + 1
                }
            } else if (event === 'next-last') {
                newValues.page = paging.totalPages
            } else if (event === 'back-last') {
                newValues.page = 1
            }
            return newValues
        })
    }

    return (
        <div className=' bg-[#E2F0FF] h-14 w-full flex justify-center '>
            <div className='flex justify-center items-center gap-4'>
                <div className='back-last cursor-pointer'>
                    <svg onClick={() => handleChangepage('back-last')} width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 5.29289C8.09763 5.68342 8.09763 6.31658 7.70711 6.70711L2.41421 12L7.70711 17.2929C8.09763 17.6834 8.09763 18.3166 7.70711 18.7071C7.31658 19.0976 6.68342 19.0976 6.29289 18.7071L0.292893 12.7071C-0.0976311 12.3166 -0.0976311 11.6834 0.292893 11.2929L6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289Z" fill="#365382" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z" fill="#365382" />
                    </svg>
                </div>
                <div className='back cursor-pointer'>
                    <svg onClick={() => handleChangepage('back')} width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 5.29289C8.09763 5.68342 8.09763 6.31658 7.70711 6.70711L2.41421 12L7.70711 17.2929C8.09763 17.6834 8.09763 18.3166 7.70711 18.7071C7.31658 19.0976 6.68342 19.0976 6.29289 18.7071L0.292893 12.7071C-0.0976311 12.3166 -0.0976311 11.6834 0.292893 11.2929L6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289Z" fill="#365382" />
                    </svg>
                </div>
                <div className=' flex gap-2 text-[#4E4E4E]'>
                    <label>หน้าที่</label>
                    <div className='rounded-lg '>
                        <input
                            value={inputValue || ''}
                            type="text"
                            style={{ width: `3ch`, border: '1px solid #365382', borderRadius: '6px', textAlign: 'center', outline: 'none' }}
                            onChange={(e) => handleChange(e)}
                            onKeyDown={handleKeyDown} />
                    </div>
                    <div className='flex gap-1'>
                        <label>จาก</label>
                        <label className='text-[#365382]'>{paging?.totalPages || 1}</label>
                        <label>หน้า</label>
                    </div>
                </div>
                <div className='next cursor-pointer'>
                    <svg onClick={() => handleChangepage('next')} width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 18.7071C-0.0976314 18.3166 -0.0976313 17.6834 0.292894 17.2929L5.58579 12L0.292894 6.70711C-0.0976303 6.31658 -0.0976303 5.68342 0.292895 5.29289C0.683419 4.90237 1.31658 4.90237 1.70711 5.29289L7.70711 11.2929C8.09763 11.6834 8.09763 12.3166 7.70711 12.7071L1.70711 18.7071C1.31658 19.0976 0.683417 19.0976 0.292893 18.7071Z" fill="#365382" />
                    </svg>

                </div>
                <div className='next-last cursor-pointer'>
                    <svg onClick={() => handleChangepage('next-last')} width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 18.7071C-0.0976314 18.3166 -0.0976313 17.6834 0.292894 17.2929L5.58579 12L0.292894 6.70711C-0.0976303 6.31658 -0.0976303 5.68342 0.292895 5.29289C0.683419 4.90237 1.31658 4.90237 1.70711 5.29289L7.70711 11.2929C8.09763 11.6834 8.09763 12.3166 7.70711 12.7071L1.70711 18.7071C1.31658 19.0976 0.683417 19.0976 0.292893 18.7071Z" fill="#365382" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071Z" fill="#365382" />
                    </svg>

                </div>
            </div>
        </div>
    )
}