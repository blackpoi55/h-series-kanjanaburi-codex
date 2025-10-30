'use client'

import Swal from "sweetalert2";

export const cancelAlert = ({ onCancel, onSave }) => {
  return Swal.fire({
    html: `<div style="z-index: 999;" className="flex justify-center  items-end w-full h-full">
        <lable className="font-semibold">บันทึกการเปลี่ยนแปลงหรือไม่?</lable>
        </div>`,
    showCancelButton: true,
    confirmButtonText: `
        <div className="flex items-center justify-center">
          💾
          บันทึก
        </div>
      `,
    cancelButtonText: `
        <div className="flex items-center justify-center">
          ❌
          ยกเลิก
        </div>
      `,
    customClass: {
      popup: 'custom-swal-modal-cancel-height',
      confirmButton: 'z-auto h-10 w-40 py-1 shadow-button-cardInformation ml-1 text-base text-white rounded-lg bg-[#365382]',
      cancelButton: 'z-auto h-10 w-40 shadow-button-cardInformation py-1 mr-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382]',
    },
    buttonsStyling: false,
    reverseButtons: true,
    // ---------------- ปิดโฟกัส ----------------
    focusConfirm: false,
    focusCancel: false,
    willOpen: (popup) => {
      document.activeElement.blur()
      const confirmButton = popup.querySelector('.swal2-confirm');
      const cancelButton = popup.querySelector('.swal2-cancel');
      if (confirmButton) {
        confirmButton.setAttribute('tabindex', '-1');
      }
      if (cancelButton) {
        cancelButton.setAttribute('tabindex', '-1');
      }
    }
    // ---------------- ปิดโฟกัส ----------------
  }).then((result) => {
    if (result.isConfirmed) {
      onSave();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
}

export const clearAlert = ({ onCancel, onSave }) => {
  return Swal.fire({
    html: `<div style="z-index: 999;" className="flex flex-col justify-end items-center  w-full h-full gap-4">
        <lable className="font-semibold text-xl text-[#365382]">ล้างข้อมูลหรือไม่?</lable>
        <lable className="text-[#E54545] text-base" >ข้อมูลบางส่วนอาจสูญหาย</lable>
        </div>`,
    showCancelButton: true,
    confirmButtonText: `
        <div className="flex items-center justify-center">
          <img src="/icon/clear.svg" alt="clear Icon" className="w-5 h-5 mr-2" />
          ล้างข้อมูล
        </div>
      `,
    cancelButtonText: `
        <div className="flex items-center justify-center">
          ❌
          ยกเลิก
        </div>
      `,
    customClass: {
      popup: 'custom-swal-modal-clear-height ',
      confirmButton: 'z-auto  h-10 w-40 py-1 shadow-button-cardInformation ml-1 text-base text-white rounded-lg bg-[#E54545]',
      cancelButton: 'z-auto h-10 w-40 shadow-button-cardInformation py-1 mr-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382]',
    },
    buttonsStyling: false,
    reverseButtons: true,
    // ---------------- ปิดโฟกัส ----------------
    focusConfirm: false,
    focusCancel: false,
    willOpen: (popup) => {
      document.activeElement.blur()
      const confirmButton = popup.querySelector('.swal2-confirm');
      const cancelButton = popup.querySelector('.swal2-cancel');
      if (confirmButton) {
        confirmButton.setAttribute('tabindex', '-1');
      }
      if (cancelButton) {
        cancelButton.setAttribute('tabindex', '-1');
      }
    }
    // ---------------- ปิดโฟกัส ----------------
  }).then((result) => {
    if (result.isConfirmed) {
      onSave();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
}

export const saveAlert = ({ onCancel, onSave }) => {
  return Swal.fire({
    html: `<div style="z-index: 999;" className="flex flex-col justify-end items-center w-full h-full  gap-4">
        <lable className=" text-xl font-semibold text-[#365382]">บันทึกการเปลี่ยนแปลงหรือไม่?</lable> 
        </div>`,
    showCancelButton: true,
    confirmButtonText: `
        <div className="flex items-center justify-center">
          💾
          บันทึก
        </div>
      `,
    cancelButtonText: `
        <div className="flex items-center justify-center">
          ❌
          ยกเลิก
        </div>
      `,
    customClass: {
      popup: 'custom-swal-modal-save-height',
      confirmButton: 'z-auto h-10 w-40 py-1 shadow-button-cardInformation ml-1 text-base text-white rounded-lg bg-[#365382]',
      cancelButton: 'z-auto h-10 w-40 shadow-button-cardInformation py-1 mr-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382]',
    },
    buttonsStyling: false,
    reverseButtons: true,
    // ---------------- ปิดโฟกัส ----------------
    focusConfirm: false,
    focusCancel: false,
    willOpen: (popup) => {
      document.activeElement.blur()
      const confirmButton = popup.querySelector('.swal2-confirm');
      const cancelButton = popup.querySelector('.swal2-cancel');
      if (confirmButton) {
        confirmButton.setAttribute('tabindex', '-1');
      }
      if (cancelButton) {
        cancelButton.setAttribute('tabindex', '-1');
      }
    }
    // ---------------- ปิดโฟกัส ----------------
  }).then((result) => {
    if (result.isConfirmed) {
      onSave();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
}

// export const succeedAlert = () => {
//   return Swal.fire({
//     html: `<div style="z-index: 999;" className="flex flex-col justify-end items-center w-full h-full  gap-4">
//      <img src="/icon/check_mark_green.svg" alt="Warning Icon" className="w-20 h-20 mr-2" />
//         <lable className=" text-xl font-semibold text-[#365382]">บันทึกข้อมูลสำเร็จ</lable>
//         </div>`,
//     confirmButtonText: `
//         <div className="flex items-center justify-center">
//           ตกลง
//         </div>
//       `,
//     customClass: {
//       popup: 'custom-swal-modal-succeed-height',
//       confirmButton: 'z-auto h-10 w-40 py-1 shadow-button-cardInformation ml-1 text-base text-white rounded-lg bg-[#365382]',
//     },
//     buttonsStyling: false,
//     reverseButtons: true,
//     // ---------------- ปิดโฟกัส ----------------
//     focusConfirm: false,
//     willOpen: (popup) => {
//       document.activeElement.blur()
//       const confirmButton = popup.querySelector('.swal2-confirm');
//       const cancelButton = popup.querySelector('.swal2-cancel');
//       if (confirmButton) {
//         confirmButton.setAttribute('tabindex', '-1');
//       }
//     }
//     // ---------------- ปิดโฟกัส ----------------
//   })
// }

export const succeedAlert = () => {
  return Swal.fire({
    icon: 'success',
    title: 'บันทึกข้อมูลสำเร็จ!',
    showConfirmButton: false,
    timer: 2000
  });

}

export const warningAlert = (text) => {
  return Swal.fire({
    html: `<div style="z-index: 999;" className="flex flex-col justify-end items-center w-full h-full  gap-4">
     <img src="/icon/warning.svg" alt="Warning Icon" className="w-20 h-20 mr-2" />
        <lable className=" text-xl font-semibold text-[#FB5C2A]">${text || 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน'}</lable>
        </div>`,
    confirmButtonText: `<div className="flex items-center justify-center">
          ตกลง
        </div>
      `,
    customClass: {
      popup: 'custom-swal-modal-warning-height',
      confirmButton: 'z-auto h-10 w-40 py-1 shadow-button-cardInformation ml-1 text-base text-[#365382] rounded-lg bg-[#FFFFFF]',
    },
    buttonsStyling: false,
    reverseButtons: true,
    // ---------------- ปิดโฟกัส ----------------
    focusConfirm: false,
    willOpen: (popup) => {
      document.activeElement.blur()
      const confirmButton = popup.querySelector('.swal2-confirm');
      const cancelButton = popup.querySelector('.swal2-cancel');
      if (confirmButton) {
        confirmButton.setAttribute('tabindex', '-1');
      }
    }
    // ---------------- ปิดโฟกัส ----------------
  })
}

export const approveAlert = ({ onCancel, onSave }) => {
  return Swal.fire({
    html: `<div style="z-index: 999;" className="flex flex-col justify-end items-center w-full h-full  gap-4">
        <lable className=" text-xl font-semibold text-[#365382]">ต้องการยืนยันผลการตรวจใช่หรือไม่?</lable>
        </div>`,
    showCancelButton: true,
    confirmButtonText: `
        <div className="flex items-center justify-center">
          💾
          ยืนยัน
        </div>
      `,
    cancelButtonText: `
        <div className="flex items-center justify-center">
          ❌
          ยกเลิก
        </div>
      `,
    customClass: {
      popup: 'custom-swal-modal-save-height',
      confirmButton: 'z-auto h-10 w-40 py-1 shadow-button-cardInformation ml-1 text-base text-white rounded-lg bg-[#365382]',
      cancelButton: 'z-auto h-10 w-40 shadow-button-cardInformation py-1 mr-1 text-base rounded-lg bg-[#FFFFFF] text-[#365382]',
    },
    buttonsStyling: false,
    reverseButtons: true,
    // ---------------- ปิดโฟกัส ----------------
    focusConfirm: false,
    focusCancel: false,
    willOpen: (popup) => {
      document.activeElement.blur()
      const confirmButton = popup.querySelector('.swal2-confirm');
      const cancelButton = popup.querySelector('.swal2-cancel');
      if (confirmButton) {
        confirmButton.setAttribute('tabindex', '-1');
      }
      if (cancelButton) {
        cancelButton.setAttribute('tabindex', '-1');
      }
    }
    // ---------------- ปิดโฟกัส ----------------
  }).then((result) => {
    if (result.isConfirmed) {
      onSave();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
}