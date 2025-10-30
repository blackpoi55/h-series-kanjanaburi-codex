import { GET, POST, PUT, DELETE, POSTnoAUTH, uploadFileFormData, GETnoAUTH, UploadWithToken, DELETE_DATA, POST_Login, PATCH, POST_Token_NoDecryp, PATCH_Token_NoDecryp, PUT_Token_NoDecryp, GET_Token_NoDecryp, uploadFileFormData_Token_NoDecryp, POST_Token_NoDecryp_noapi, POST_Login_online, PATCH_Token_NoDecryp_Online, POSTnoAUTH_Online, PATCH_Token_NoDecryp_offline } from '../components/apicomponent/api'


export const GenerateKey = async () => {
    // สร้าง key
    return crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256
        },
        true,
        ['encrypt', 'decrypt']
    )
}

export const exportKey = async (key) => {
    // เข้า รหัส key เพื่อไว้ดึง key ตัวเดิมกลับมาใช้ และ แปลงเป็น 64
    const exported = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

export const importKey = async (storedKey) => {
    // นำแปลง key เดิมกลับมาใช้
    const rawKey = Uint8Array.from(atob(storedKey), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
    );
}


export const createKeyToken = async () => {
    const key = await GenerateKey()
    const Encryptkey = await exportKey(key)
    localStorage.setItem('encryptionKey', Encryptkey)
}

export const encryptData = async (data) => {
    // เข้ารหัส token และเก็บไว้ใน localStorage
    const storedKey = localStorage.getItem('encryptionKey');
    const key = await importKey(storedKey)
    const enc = new TextEncoder()
    const iv = crypto.getRandomValues(new Uint8Array(12)) //สร้าง IV (initialization vector)
    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        enc.encode(data)
    )
    localStorage.setItem('345dp0asks9adls99235k33m12k5993klfp95', btoa(String.fromCharCode(...new Uint8Array(encrypted))));
    localStorage.setItem('iv', btoa(JSON.stringify(Array.from(iv))))
}

export const decryptData = async () => {
    // แปลงข้อมูลกลับ และคือค่าข้อมูลผู้ใช้
    const storedKey = localStorage.getItem('encryptionKey');
    const encryptedData = localStorage.getItem('345dp0asks9adls99235k33m12k5993klfp95');
    const _iv = localStorage.getItem('iv')
    if (storedKey && encryptedData && _iv) {
        const key = await importKey(storedKey)
        const iv = JSON.parse(atob(_iv))
        const encryptedArray = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: Uint8Array.from(iv),
            },
            key,
            encryptedArray
        )

        const dec = new TextDecoder();
        const decode_data = dec.decode(decrypted)
        console.log(decode_data)
        return { Data: JSON.parse(atob(decode_data.split('.')[1])), Token: decode_data }
    }
    return null
}


export const loginapi = (data) => {
    return POST_Login("/auth/login", data)
}
export const checkmail = (data) => {
    return POST_Login("/api/users/checkMail", data)
}
export const createUser = (data) => {
    return POST_Login("/api/users/createUser", data)
}
export const login_care_api = (data) => {
    return POST_Login("/auth/login_care", data)
}
export const login_sendotp = (data) => {
    return POST_Login_online("/api/send-otp", data)
}
export const sendLineMessage = (data) => {
    return POST_Login("/api/sendLineMessage", data)
}
export const getSetupCodeByAttrType = (data) => { return GET("/setupcode/getSetupCodeByAttrType/" + data) }
export const bugreport = (data) => { return POST("/bugreport", data) }
export const getbugreport = () => { return GET("/bugreport") }
export const updatebugstatus = (data, id) => { return PUT("/bugreport/" + id, data) }

// Register
export const healthpackages = () => { return GET("/healthpackages") }
export const packagedetailsbypackagecode = (id) => { return GET("/servicesandprices/package-details/" + id) }
export const servicesandprices = () => { return GET("/servicesandprices") }
//settuppackage
export const servicesandpricesadd = (data) => { return POST("/servicesandprices", data) }
export const servicesandpricesedit = (id, data) => { return PUT("/servicesandprices/" + id, data) }
export const servicesandpricesdelete = (id) => { return DELETE("/servicesandprices/" + id) }
export const createPatientAndDetail = (data) => { return POST("/patient/createPatientAndDetail", data) }
export const createHealthpackagesAndDetail = (data) => { return POST("/healthpackages/createHealthpackagesAndDetail", data) }
export const deleteAndDetail = (id) => { return DELETE("/healthpackages/deleteAndDetail/" + id) }
export const updateAndDetail = (id, data) => { return PUT("/healthpackages/updateAndDetail/" + id, data) }
export const postLabCodeCategory = (data) => { return POST("/labcode/postLabCodeCategory",data) }

// Patient Search
export const searchPatientList = (data) => { return POST("/patient/list", data) }

//Patient Information
export const GetPatientInfomation = (id) => { return GET("/patient/info_package/" + id) }
export const searchLabbyPatientId = (data) => { return POST("/lab/byPatientId", data) }
export const getVitalsignById = (id) => { return GET("/vitalsign/" + id) }
export const getPatientHistoryById = (id) => { return GET("/patienthistory/" + id) }

export const addPatient = (data) => { return POST("/patient", data) }
export const updatePatient = (id, data) => { return PUT("/patient/" + id, data) }
export const addPatienthistory = (data) => { return POST("/patienthistory", data) }
export const updatePatienthistory = (id, data) => { return PUT("/patienthistory/" + id, data) }
export const addVitalsign = (data) => { return POST("/vitalsign", data) }
export const updateVitalsign = (id, data) => { return PUT("/vitalsign/" + id, data) }
export const updateLab = (id, data) => { return PUT("/Lab/" + id, data) }

export const addEkg = (data) => { return POST("/ekg", data) }
export const updateEkg = (id, data) => { return PUT("/ekg/" + id, data) }
export const addEst = (data) => { return POST("/est", data) }
export const updateEst = (id, data) => { return PUT("/est/" + id, data) }

// xray
export const getXrayfromssbById = (id) => { return GET("/xrayfromssb/" + id) }
export const addXrayFromssb = (data) => { return POST("/xrayFromssb", data) }
export const updateXrayFromssb = (id, data) => { return PUT("/xrayFromssb/" + id, data) }

// titmus
export const getTitmusById = (id) => { return GET("/titmus/" + id) }
export const addTitmus = (data) => { return POST("/titmus", data) }
export const updateTitmus = (id, data) => { return PUT("/titmus/" + id, data) }

// audio
export const getAudioById = (id) => { return GET("/audio/" + id) }
export const addAudio = (data) => { return POST("/audio", data) }
export const updateAudio = (id, data) => { return PUT("/audio/" + id, data) }

// EKG
export const getEkgById = (id) => { return GET("/ekg/" + id) }
export const getEchoId = (id) => { return GET("/echo/" + id) }
export const getEstById = (id) => { return GET("/est/" + id) }
export const getAbiById = (id) => { return GET("/abi/" + id) }
export const addhAbi = (data) => { return POST("/abi", data) }
export const updateAbi = (id, data) => { return PUT("/abi/" + id, data) }
export const addhEcho = (data) => { return POST("/echo", data) }
export const updateEcho = (id, data) => { return PUT("/echo/" + id, data) }

// Spiro
export const getSpiroById = (id) => { return GET("/spiro/" + id) }
export const addSpiro = (data) => { return POST("/spiro", data) }
export const updateSpiro = (id, data) => { return PUT("/spiro/" + id, data) }

// Dental
export const getDentalById = (id) => { return GET("/dental/" + id) }
export const updateDental = (id, data) => { return PUT("/dental/" + id, data) }
export const addDental = (data) => { return POST("/dental", data) }

// Pap Smear
export const getPapSmearById = (id) => { return GET("/obg_pap/" + id) }
export const updateSmear = (id, data) => { return PUT("/obg_pap/" + id, data) }
export const addPapSmear = (data) => { return POST("/obg_pap", data) }

// Flexibility & Muscular Strength
export const getFlexibilityById = (id) => { return GET("/flexibility/" + id) }
export const addFlexibility = (data) => { return POST("/flexibility", data) }
export const updateFlexibility = (id, data) => { return PUT("/flexibility/" + id, data) }

// visualPerformance
export const getVisualPerformanceById = (id) => { return GET("/visualPerformance/" + id) }
export const addVisualPerformance = (data) => { return POST("/visualPerformance", data) }
export const updateVisualPerformance = (id, data) => { return PUT("/visualPerformance/" + id, data) }

// setup--> Users
export const getUsers = () => { return GET("/users") }
export const addUsers = (data) => { return POST("/users", data) }
export const updateUsers = (id, data) => { return PUT("/users/" + id, data) }
export const deleteUsersByid = (id) => { return DELETE("/users/" + id) }

// setup--> company
export const getCompany = () => { return GET("/company") }
export const addCompany = (data) => { return POST("/company", data) }
export const updateCompany = (id, data) => { return PUT("/company/" + id, data) }
export const deleteCompanyByid = (id) => { return DELETE("/company/" + id) }

// setup--> Xray
export const getXray = () => { return GET("/xraycodessb") }
export const addXray = (data) => { return POST("/xraycodessb", data) }
export const updateXray = (id, data) => { return PUT("/xraycodessb/" + id, data) }
export const deleteXrayByid = (id) => { return DELETE("/xraycodessb/" + id) }

// setup--> Labcode
export const getLabcode = () => { return GET("/labcode") }
export const addLabcode = (data) => { return POST("/labcode", data) }
export const updateLabcode = (id, data) => { return PUT("/labcode/" + id, data) }
export const deleteLabcodeByid = (id) => { return DELETE("/labcode/" + id) }
export const getTransletById = (id) => { return GET("/condition/Labcode/" + id) }


// setup--> Translate
export const getTranslate = () => { return GET("/refmess") }
export const addTranslate = (data) => { return POST("/refmess", data) }
export const updateTranslate = (id, data) => { return PUT("/refmess/" + id, data) }
export const deleteTranslateByid = (id) => { return DELETE("/refmess/" + id) }

// setup--> Translate
export const getTranslateResult = () => { return GET("/labInterpretation") }


// setup--> Station
export const getStation = () => { return GET("/station") }
export const addStation = (data) => { return POST("/station", data) }
export const updateStation = (id, data) => { return PUT("/station/" + id, data) }
export const deleteStationByid = (id) => { return DELETE("/station/" + id) }

// setup--> Doctor
export const getDoctor = () => { return GET("/doctor") }
export const addDoctor = (data) => { return POST("/doctor", data) }
export const updateDoctor = (id, data) => { return PUT("/doctor/" + id, data) }
export const deleteDoctorByid = (id) => { return DELETE("/doctor/" + id) }

// setupReport--> Users
export const getReportSum = () => { return GET("/ReportSum") }
export const addReportSum = (data) => { return POST("/ReportSum", data) }
export const updateReportSum = (id, data) => { return PUT("/ReportSum/" + id, data) }
export const deleteReportSumByid = (id) => { return DELETE("/ReportSum/" + id) }

// setupReport--> Company
export const getresultAll = () => { return GET("/resultAll") }
export const addresultAll = (data) => { return POST("/resultAll", data) }
export const updateresultAll = (id, data) => { return PUT("/resultAll/" + id, data) }
export const deleteresultAllByid = (id) => { return DELETE("/resultAll/" + id) }

//Print_Report
export const postReportSum = (data) => { return POST("/ReportSum/summary", data) }

//Management
export const PatientManagementReport = (data) => { return POST("/Patient/PatientManagementReport", data) }


// ------------------------------------------------- Doctor Result -------------------------------------------------
export const getPhysicalexamById = (id) => { return GET("/physicalexam/" + id) }
export const addPhysicalexam = (data) => { return POST("/physicalexam", data) }
export const updatePhysicalexam = (id, data) => { return PUT("/physicalexam/" + id, data) }
//conclusion
export const getCallmessage = (data) => { return POST("/callmessage/bycode", data) }
export const AddCallmessage = (data) => { return POST("/callmessage", data) }


// ------------------------------------------------- Print Report -------------------------------------------------
export const getPatientReportById = (id) => { return GET("/Patient/PatientReport/" + id) }
export const updatePatientReport = (data) => { return POST("/Patient/PatientReport", data) }
export const getPatientReportA5 = (data) => { return POST("/patient/PatientReportA5", data) }
export const getPatientTranslateResult = (id) => { return GET("/patient/PatientTranslateResult/" + id) }

// ------------------------------------------------- Dropdown -------------------------------------------------
export const searchCategory = (data) => { return POST("/resulttemplate/Category", data) }
export const searcXraycodessb = (data) => { return POST("/xraycodessb/xraycode", data) }

//ExcelReport
export const summaryExcel = (data) => { return POST("/reportsum/summaryExcel", data) }
export const summaryExcelAll = (data) => { return POST("/reportsum/summaryExcelAll", data) }

export const generateCode = (data) => { return POST('/patient/generateCode', data) }
//ImpoerReportResult

export const ImpoerReportResult = (data) => { return POST_Token_NoDecryp('/HealthRecords/bulk', data) }

//Dashboard

//individualreport
export const HealthRecordsbyHNEN = (data) => { return POST_Token_NoDecryp("/HealthRecords/byHN", data) }
export const HealthRecordsbyHNEN_Online = (data) => { return POSTnoAUTH_Online("/HealthRecords_online/byHN", data) }
export const HealthRecordsCompanyall = (data) => { return POST_Token_NoDecryp("/HealthRecords_online/Companyall", data) }
export const HealthRecordsCompanyall_Online = (data) => { return POSTnoAUTH_Online("/HealthRecords_online/Companyall", data) }


export const ListHealthRecords = (data) => { return POST_Token_NoDecryp("/HealthRecords/bycompanylist", data) }
export const ListHealthRecordsbyDoctorList = (data) => { return POST_Token_NoDecryp("/HealthRecords/byDoctorList", data) }
export const HealthRecords = (data) => { return POST_Token_NoDecryp("/HealthRecords/byHN", data) }

export const addNurseApprove = (id, data) => { return PATCH_Token_NoDecryp("/HealthRecords/" + id, data) }
export const addApproveLine = (id, data) => { return PATCH_Token_NoDecryp_offline("/HealthRecords/" + id, data) } //OnlineGolbal
export const translateCareC = (data) => { return POST_Token_NoDecryp("/translate/translateCareC", data) }

// Care-Vista-C
export const getHealthRecords = (id) => { return POST_Token_NoDecryp("/HealthRecords/company") }
export const getDashboard = (data) => { return POST_Token_NoDecryp('/HealthRecords/bycompany', data) }
export const postCompanybyEmail = (data) => { return POST_Login_online("/auth/CompanybyEmail", data) }  //OnlineGolbal
export const importbulk = (data) => { return POST_Token_NoDecryp("/HealthRecords/bulk", data) }
export const putHealthRecords = (id, data) => { return PUT_Token_NoDecryp("/HealthRecords/" + id, data) }
export const getbylineid = (id) => { return GETnoAUTH("/healthPatients/bylineid/" + id) }
export const updateCompanyHealthRecord = (uid, data) => { return PUT_Token_NoDecryp("/HealthRecords/updateCompany/" + uid, data) }
export const summaryList = (data) => { return POST_Token_NoDecryp("/HealthRecords_online/summaryList", data) }
export const getHealthPatients = (id) => { return GET_Token_NoDecryp("/healthPatients") }
export const getHealthUsers = (id) => { return GET_Token_NoDecryp("/healthUsers") }
export const putHealthUsers = (id, data) => { return PUT_Token_NoDecryp("/healthUsers/" + id, data) }
export const postHealthUsers = (data) => { return POST_Token_NoDecryp("/healthUsers", data) }
export const puthealthPatients = (id, data) => { return PUT_Token_NoDecryp("/healthPatients/" + id, data) }
export const gettrhealthfiles = (id) => { return GET_Token_NoDecryp("/tr-health-files/" + id) }
export const posttrhealthfiles = (id, data) => { return POST_Token_NoDecryp("/tr-health-files/" + id, data) }
export const postchangepassword = (data) => { return POST_Token_NoDecryp_noapi("/auth/change-password", data) }
export const postsummaryListbyHN = (data) => { return POST_Token_NoDecryp("/HealthRecords/summaryListbyHN", data) }

export const gettrhealthfiles_Online = (id) => { return GETnoAUTH("/tr-health-files/" + id) }

// เพิ่ม function สำหรับ upload ไฟล์แบบใช้ FormData
export const uploadPdfFile = (formData) => {
    return uploadFileFormData_Token_NoDecryp("/upload", formData); // สมมติ endpoint backend คือ /upload
};
