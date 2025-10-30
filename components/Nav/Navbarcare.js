import { basepathurl } from '@/config';
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { redirect, usePathname } from "next/navigation";
import { decryptData, getHealthUsers, postchangepassword, putHealthUsers } from '@/action/api';
import { getmenuBarMap } from '@/action/menuBar';
import SignatureBox from '../Tool/SignatureBox';
import Swal from 'sweetalert2'

function Navbar(props) {
    const { toggleMenu, settoggleMenu } = props
    const router = useRouter()
    const pathname = usePathname()
    const menuBarMap = getmenuBarMap()
    const [role, setrole] = useState("")
    const [user, setuser] = useState("")
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('th-TH', options);
    const [toggleMenoLogout, settoggleMenoLogout] = useState(false)
    const [toggleMenuTap, settoggleMenuTap] = useState(false)
    const [loginData, setloginData] = useState({})
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileData, setprofileData] = useState({});
    const [userData, setuserData] = useState('');
    const sigRef = useRef(null);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handleClear = () => {
        if (sigRef.current) {
            sigRef.current.clear();
        }
    };

    const handleSave = async () => {
        if (sigRef.current) {
            const dataURL = sigRef.current.getSignature();
            let val = { ...profileData, signature: dataURL }
            delete val.password; // ลบ password ออกแน่ๆ 
            let res = await putHealthUsers(val.id, val);
            console.log("ลายเซ็น base64:", dataURL);
            console.log("res", res)
            if (res?.status == 200) {
                setShowProfileModal(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'ไม่สามารถบันทึกข้อมูลได้',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        }
    };

    useEffect(() => {
        let data = localStorage.getItem('role')
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        setrole(data)
        setuser(user)
        setuserData(user?.user?.role || "")
        const fetchData = async () => {
            try {
                const { Data } = await decryptData(); // Assuming decryptData() is an imported async function
                console.log(Data)
                if (Data?.id) {
                    setloginData(Data); // Assuming setloginData is a defined state updater
                } else if (pathname.includes("/Care-Vista-C/individualreport")) {
                    console.log(pathname);
                }
                else {
                    // router.push('/login');
                }
            } catch (error) {
                // console.error('Error decrypting data:', error);
                if (!pathname.includes("/Care-Vista-C/individualreport")) {
                    // router.push('/login');
                }
            }
        };

        fetchData();

    }, [pathname, router]);

    const logoutClick = () => {
        if (role == "am") {
            router.push('/Care-Vista-C/login')
        }
        else if (role == "g") {
            router.push('/Care-Vista-C')
        }
    }

    const menuClick = (url) => {
        router.push(url)
    }
    const profileClick = async () => {
        let dataT3 = await getHealthUsers()
        console.log('dataT3', dataT3)
        console.log(user)
        if (dataT3?.data && dataT3?.data?.length > 0) {
            let data = dataT3?.data?.find((item) => item.username == user?.user?.username && item.license == user?.user?.license)
            console.log("data", data)
            if (data) {
                setprofileData(data); // เก็บข้อมูลที่รวม signature ไว้แล้ว
                setShowProfileModal(true)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'ไม่สามารถโหลดข้อมูลได้',
                    confirmButtonText: 'OK',
                });
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'ไม่สามารถโหลดข้อมูลได้',
                confirmButtonText: 'OK',
            });
        }

    }
    const changepasswordClick = () => {
        setShowChangePasswordModal(true);
    };

    return (
        <div className="w-full flex bg-gradient-to-b from-[#C1DFFF]   to-[#FFFFFF] py-4 border-b-2 shadow-b-xl navbar text-[#014F7D]">
            {showProfileModal && (
                <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex justify-center items-center transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-6 md:p-8 relative animate-fade-in">
                        {/* ปุ่มปิด */}
                        <button
                            onClick={() => setShowProfileModal(false)}
                            className="absolute top-4 right-4 text-white hover:bg-red-300 text-xl transition-colors border bg-red-500 px-1 rounded-lg"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* หัวข้อ */}
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">👨‍⚕️ Profile</h2>

                        {/* ข้อมูลหมอ */}
                        <div className="mb-6 space-y-1 text-sm text-gray-600">
                            <p><strong className="text-gray-800">Name:</strong> {profileData?.username || loginData?.username}</p>
                            <p><strong className="text-gray-800">Role:</strong> {profileData?.tr_health_role?.role_name}</p>
                        </div>

                        {/* ลายเซ็น */}
                        <div className="space-y-3">
                            <p className="font-medium text-gray-800">Signature</p>
                            <SignatureBox ref={sigRef} initialValue={profileData?.signature || ''} />

                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showChangePasswordModal && (
                <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex justify-center items-center transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-md p-6 relative animate-fade-in">
                        <button
                            onClick={() => setShowChangePasswordModal(false)}
                            className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full px-3 py-1"
                        >✕</button>

                        <h2 className="text-xl font-bold mb-4 text-[#014F7D]">🔐 Change Password</h2>

                        <div className="flex flex-col space-y-3">
                            {/* 🔐 Old Password */}
                            <label className="text-sm text-gray-600">Old Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword.old ? "text" : "password"}
                                    className="border px-3 py-2 rounded-md w-full pr-10"
                                    placeholder="Old Password"
                                    value={passwordForm.oldPassword}
                                    onChange={(e) =>
                                        setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                                    }
                                    onBeforeInput={(e) => {
                                        if (/[ก-๙]/.test(e.data)) e.preventDefault();
                                    }}
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword((prev) => ({ ...prev, old: true }))}
                                    onMouseUp={() => setShowPassword((prev) => ({ ...prev, old: false }))}
                                    onMouseLeave={() => setShowPassword((prev) => ({ ...prev, old: false }))}
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.514 7.51 7.374 4.5 12 4.5s8.486 3.01 9.964 7.183a1.012 1.012 0 010 .634C20.486 16.49 16.626 19.5 12 19.5S3.514 16.49 2.036 12.322z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* 🔐 New Password */}
                            <label className="text-sm text-gray-600">New Password</label>
                            <div className="relative mt-4">
                                <input
                                    type={showPassword.new ? "text" : "password"}
                                    className="border px-3 py-2 rounded-md w-full pr-10"
                                    placeholder="New Password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) =>
                                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                                    }
                                    onBeforeInput={(e) => {
                                        if (/[ก-๙]/.test(e.data)) e.preventDefault();
                                    }}
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword((prev) => ({ ...prev, new: true }))}
                                    onMouseUp={() => setShowPassword((prev) => ({ ...prev, new: false }))}
                                    onMouseLeave={() => setShowPassword((prev) => ({ ...prev, new: false }))}
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.514 7.51 7.374 4.5 12 4.5s8.486 3.01 9.964 7.183a1.012 1.012 0 010 .634C20.486 16.49 16.626 19.5 12 19.5S3.514 16.49 2.036 12.322z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* 🔐 Confirm New Password */}
                            <label className="text-sm text-gray-600">Confirm New Password</label>
                            <div className="relative mt-4">
                                <input
                                    type={showPassword.confirm ? "text" : "password"}
                                    className="border px-3 py-2 rounded-md w-full pr-10"
                                    placeholder="Confirm New Password"
                                    value={passwordForm.confirmNewPassword}
                                    onChange={(e) =>
                                        setPasswordForm({
                                            ...passwordForm,
                                            confirmNewPassword: e.target.value,
                                        })
                                    }
                                    onBeforeInput={(e) => {
                                        if (/[ก-๙]/.test(e.data)) e.preventDefault();
                                    }}
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword((prev) => ({ ...prev, confirm: true }))}
                                    onMouseUp={() => setShowPassword((prev) => ({ ...prev, confirm: false }))}
                                    onMouseLeave={() =>
                                        setShowPassword((prev) => ({ ...prev, confirm: false }))
                                    }
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.514 7.51 7.374 4.5 12 4.5s8.486 3.01 9.964 7.183a1.012 1.012 0 010 .634C20.486 16.49 16.626 19.5 12 19.5S3.514 16.49 2.036 12.322z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <button
                                onClick={async () => {
                                    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
                                        Swal.fire({ icon: 'error', title: 'กรุณาเช็คพาสเวิร์ด', text: 'รหัสผ่านใหม่ไม่ตรงกัน' });
                                        return;
                                    }

                                    const payload = {
                                        username: loginData?.username || user?.user?.username,
                                        oldPassword: passwordForm.oldPassword,
                                        newPassword: passwordForm.newPassword
                                    };

                                    console.log("Change password payload:", payload);
                                    let res = await postchangepassword(payload)
                                    if (!res?.error) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'สำเร็จ',
                                            text: 'เปลี่ยนรหัสผ่านแล้ว!',
                                            showConfirmButton: true, // ให้มีปุ่มกด
                                            confirmButtonText: 'ตกลง'
                                        }).then(() => {
                                            setShowChangePasswordModal(false);
                                            router.push('/Care-Vista-C/login');
                                        });
                                    }
                                    else {
                                        Swal.fire({ icon: 'error', title: 'กรุณาตรวจพาสเวิร์ดอีกครั้ง', text: 'ไม่สามารถเปลี่ยนรหัสผ่านได้', showConfirmButton: false, timer: 3000 });
                                    }
                                }}
                                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                            >
                                เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                    </div>
                </div>
            )
            }


            <div className="w-1/5 pl-2 md:pl-10  flex items-center">
                {/* <img onClick={() => menuClick('/Care-Vista-C')} className='h-16 cursor-pointer' src="/images/BCHlogo.png" alt="" />
                <div className="flex flex-col w-full ml-2 text-[#014F7D] font-bold">
                    <label className=''>โรงพยาบาลกรุงเทพคริสเตียน</label>
                    <label className=''>Health Book Online</label>
                </div> */}
                <img onClick={() => menuClick('/Care-Vista-C')} className='h-6 cursor-pointer' src="/images/icon.png" alt="" />
                <div className="flex flex-col w-full ml-2 text-[#014F7D] font-bold">
                    <label className='text-[#2C92D5] font-bold text-2xl mb-1'>Care Vista-C</label>
                </div>

            </div>
            <div className="w-3/5 flex justify-start items-center ">
                {pathname != "/Care-Vista-C" && pathname != "/Care-Vista-C/loginemailconfirm" ?
                    <>
                        {/* <label onClick={() => menuClick('/Care-Vista-C/importresult')} className='cursor-pointer mr-10'>Home</label> */}
                        {user?.user?.role != "doctor" ?
                            <label onClick={() => menuClick('/Care-Vista-C/healthdashboard')} className='cursor-pointer mr-10'>Summary Report</label>
                            : ""}
                        <label onClick={() => menuClick('/Care-Vista-C/individualtable')} className='cursor-pointer mr-10'>Individual Report</label>
                        {role == "am" && user?.user?.role != "doctor" ?
                            <label onClick={() => menuClick('/Care-Vista-C/healthcompany')} className='cursor-pointer mr-10'>Company</label>
                            : ""}
                    </>

                    : ""}
            </div>
            <div className="w-1/5 flex justify-end items-center pr-2  md:pr-10">
                {(loginData?.username || user?.user?.name || user?.user?.username) && (pathname != "/Care-Vista-C/login") && (pathname != "/Care-Vista-C") ?
                    <div className='flex w-1/2 justify-end'>
                        <button className="w-9 h-9 min-w-9 min-h-9 ml-3 flex justify-center items-center rounded-full border  " onClick={() => settoggleMenoLogout(!toggleMenoLogout)}>
                            {role == "g" ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                </svg>
                                :
                                <img src={userData == "doctor" ? "/images/doctor.png" : userData == "nurse" ? "/images/nurse.png" : "/images/admin.png"} className='h-9 min-h-9 w-9  border rounded-full' alt="" />
                            }
                            {toggleMenoLogout ?
                                <div className="drop-down w-48 z-[9999] shadow-menu-profile overflow-hidden bg-[#EEF6FF] p-1 rounded-l-lg rounded-b-lg absolute top-[3.5rem] right-14">
                                    <ul>
                                        <li className="px-3 py-1  text-sm font-medium flex items-center space-x-2 ">
                                            <span className='font-semibold'> {user?.user?.name || loginData?.username || user?.user?.username || '-'} </span>
                                        </li>
                                        {(user?.user?.role == "doctor" || user?.user?.role == "nurse") && (
                                            <>
                                                <li
                                                    className="px-3 py-1 text-sm font-medium flex items-center space-x-2 cursor-pointer hover:bg-blue-100 rounded"
                                                    onClick={() => profileClick()}
                                                >
                                                    <span>Profile</span>
                                                </li>

                                            </>
                                        )}
                                        {(role == "am") && (
                                            <>
                                                <li
                                                    className="px-3 py-1 text-sm font-medium flex items-center space-x-2 cursor-pointer hover:bg-blue-100 rounded"
                                                    onClick={() => changepasswordClick()}
                                                >
                                                    <span>Change Password</span>
                                                </li>
                                            </>
                                        )}

                                        <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 ">
                                            <button onClick={() => logoutClick()} className=' flex gap-2 w-full justify-center py-1 px-4 rounded-lg  shadow-md bg-[#E54545] text-[#FFFFFF] hover:bg-[#972e2e] hover:text-[#FFFFFF]' >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 min-h-6 min-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span> Logout </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                : ""}
                        </button>
                        <svg className='relative -left-3 -bottom-6 w-[12px] h-[12px] min-h-[12px] min-w-[12px]' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3204_33247)">
                                <rect width="12" height="12" rx="6" fill="#B6B6B6" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.35355 7.85349C6.25979 7.94722 6.13263 7.99988 6.00005 7.99988C5.86747 7.99988 5.74031 7.94722 5.64655 7.85349L2.81805 5.02499C2.77029 4.97887 2.7322 4.92369 2.706 4.86269C2.67979 4.80169 2.666 4.73608 2.66542 4.66969C2.66485 4.6033 2.6775 4.53746 2.70264 4.47601C2.72778 4.41456 2.76491 4.35874 2.81185 4.31179C2.8588 4.26484 2.91462 4.22772 2.97607 4.20258C3.03752 4.17744 3.10336 4.16479 3.16975 4.16536C3.23614 4.16594 3.30175 4.17973 3.36275 4.20594C3.42375 4.23214 3.47893 4.27023 3.52505 4.31799L6.00005 6.79299L8.47505 4.31799C8.56935 4.22691 8.69565 4.17651 8.82675 4.17765C8.95785 4.17879 9.08325 4.23137 9.17596 4.32408C9.26866 4.41678 9.32125 4.54219 9.32239 4.67329C9.32353 4.80439 9.27313 4.93069 9.18205 5.02499L6.35355 7.85349Z" fill="black" />
                            </g>
                            <rect x="0.25" y="0.25" width="11.5" height="11.5" rx="5.75" stroke="#FDFDFD" strokeWidth="0.5" />
                            <defs>
                                <clipPath id="clip0_3204_33247">
                                    <rect width="12" height="12" rx="6" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    : ""}
            </div>
        </div >

    )
}

export default Navbar