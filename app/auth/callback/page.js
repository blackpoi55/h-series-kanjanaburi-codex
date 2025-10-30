'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createKeyToken, encryptData } from '@/action/api' // ✅ import ให้ถูกต้อง

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get('accessToken')
      const refreshToken = searchParams.get('refreshToken')
      const user = searchParams.get('user')

      if (accessToken && refreshToken && user) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(user))
          localStorage.setItem('user', JSON.stringify({ user: parsedUser }))

          const key = await createKeyToken()
          const encrypted = await encryptData(accessToken)

          // localStorage.setItem('accessToken', encrypted)
          // localStorage.setItem('refreshToken', refreshToken)

          setTimeout(() => {
            router.push('/patientinfo')
          }, 2000)
        } catch (e) {
          console.error('Parsing error', e)
        }
      } else {
        console.error('Missing required params')
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-xl font-medium text-[#365382]">กำลังเข้าสู่ระบบด้วย Google...</span>
      </div>
      <p className="mt-4 text-sm text-gray-500">กรุณารอสักครู่ กำลังโหลดข้อมูลผู้ใช้งาน</p>
    </div>
  )
}
