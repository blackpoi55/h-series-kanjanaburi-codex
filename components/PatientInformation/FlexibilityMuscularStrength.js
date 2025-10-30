'use client'
import { Collapse, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
//import Toolselect2 from '../Tool/Toolselect2'
import { InputSwitch } from '../Tool/input'
import { useLoading } from '../Tool/LoadingContext '
import { addFlexibility, getFlexibilityById, updateFlexibility } from '@/action/api'
import { clearAlert, saveAlert, succeedAlert } from '../SweetAlert/sweetAlert'

function FlexibilityMuscularStrength({ module = 'patient-information', activeTap, onActiveTap, UID, data }) {
  const { startLoading, stopLoading } = useLoading()
  const [form, setForm] = useState({})
  const [list, setList] = useState([])
  const [switchStaus, setSwitchStaus] = useState(null)

  useEffect(() => {
    if (UID) {
      refresh()
    }
  }, [UID])

  const refresh = async () => {
    try {
      startLoading()
      const res = await getFlexibilityById(UID)
      if (res?.message === 'success') {
        setForm(res?.data || {})
        if (res?.data === null && module === 'patient-information') {
          onActiveTap('flexibility_muscular_strength', false)
        }
      } else {
        console.log('error', res?.error)
        if (module === 'patient-information') {
          onActiveTap('flexibility_muscular_strength', false)
        }
      }

    } catch (err) {
      console.error('An error occurred while refreshing data:', err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    if (module === 'patient-information') {
      setSwitchStaus(activeTap?.flexibility_muscular_strength)
    } else if (module === 'docter-result') {
      setSwitchStaus(activeTap?.lab_and_xray)
    }
  }, [activeTap?.flexibility_muscular_strength, activeTap?.lab_and_xray, module])

  const onChangeSwitch = (update) => {
    setSwitchStaus(update?.target?.checked)
    onActiveTap('flexibility_muscular_strength', update.target.checked)
  }

  const handleChange = (update) => {
    setForm({ ...form, ...update })
  }

  const onClear = () => {
    clearAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: () => {
        console.log('Saved');
        setForm((p) => ({
          ...p, ...{
            FlexibilityTestingNum: null,
            FlexibilityTestingDetail: null,
            FlexibilityTestingResult: null,
            MuscularStrengthNum: null,
            MuscularStrengthDetail: null,
            MuscularStrengthResult: null,
            FlexibilityTestingDetailEN: null,
            FlexibilityTestingResultEN: null,
            MuscularStrengthDetailEN: null,
            MuscularStrengthResultEN: null,
          }
        }))
      }
    })
  }
  const onSave = () => {
    saveAlert({
      onCancel: () => { console.log('Cancelled') },
      onSave: async () => {
        console.log('Saved')
        const saveData = {
          UID: form?.UID || null,
          trPatientUID: form?.trPatientUID || null,
          FlexibilityTestingNum: form?.FlexibilityTestingNum || null,
          FlexibilityTestingDetail: form?.FlexibilityTestingDetail || null,
          FlexibilityTestingResult: form?.FlexibilityTestingResult || null,
          MuscularStrengthNum: form?.MuscularStrengthNum || null,
          MuscularStrengthDetail: form?.MuscularStrengthDetail || null,
          MuscularStrengthResult: form?.MuscularStrengthResult || null,
          Cuser: form?.Cuser || null,
          Muser: form?.Muser || null,
          Cwher: form?.Cwher || null,
          Mwher: form?.Mwher || null,
          FlexibilityTestingDetailEN: form?.FlexibilityTestingDetailEN || null,
          FlexibilityTestingResultEN: form?.FlexibilityTestingResultEN || null,
          MuscularStrengthDetailEN: form?.MuscularStrengthDetailEN || null,
          MuscularStrengthResultEN: form?.MuscularStrengthResultEN || null,
        }
        console.log('saveData', saveData)
        try {
          startLoading()
          if (form?.UID) {
            const res = await updateFlexibility(form?.UID, saveData)
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          } else {
            const res = await addFlexibility({ ...saveData, trPatientUID: UID })
            if (!res?.error) {
              succeedAlert()
              refresh()
            } else {
              console.log('res error', res?.error)
            }
          }
        } catch (error) {
          console.error('An error occurred while onSave:', error)
        } finally {
          stopLoading()
        }
      }
    })
  }
  function FlexibilityTestingCal(num, ageString, sex) {
    const age = calculateAgeInYears(ageString);
    console.log(num, age, sex)
    let text = flexcal1(num, age, sex)
    let text2 = flexcal2(num, age, sex)

    setForm({ ...form, FlexibilityTestingDetail: text, FlexibilityTestingResult: text2 });
  }
  function MuscularStrengthCal(num, ageString, sex) {
    const age = calculateAgeInYears(ageString);
    console.log(num, age, sex)
    let text = Muscularcal1(num, age, sex)
    let text2 = Muscularcal2(num, age, sex)

    setForm({ ...form, MuscularStrengthDetail: text, MuscularStrengthResult: text2 });
  }
  const flexcal1 = (num, age, sex) => {


    let text = "";
    const strNormal1 = "จากการทดสอบท่านสามารถก้มงอตัวไปข้างหน้าได้ระยะทาง.. ";
    const strNormal2 = " เซนติเมตรระดับสมรรถภาพอยู่ในเกณฑ์ ..";
    const strNormal3 = " ท่านเป็นผู้ที่มี ความยืดหยุ่นของกล้ามเนื้อหลัง และขาด้านหลังดี สามารถปฏิบัติกิจกรรมประจำวันได้ดี ท่านมีโอกาสน้อยที่จะเป็นโรคปวดหลังและปวดหัวเข่า";
    const strAbnormal1 = "จากการทดสอบท่านสามารถก้มงอตัวไปข้างหน้าได้ระยะทาง.. ";
    const strAbnormal2 = " เซนติเมตรระดับสมรรถภาพอยู่ในเกณฑ์.. ";
    const strAbnormal3 = " ท่านมีปัญหาสุญเสียความยืดหยุ่นของร่างกาย ทำให้กล้ามเนื้อเกิดการบาดเจ็บได้ง่าย ความคล่องแคล่วว่องไวลดลงมากกว่าปกติ ท่านควรยืดเหยียดกล้ามเนื้อ เพื่อเพิ่มความอ่อนตัวแก่ร่างกายอย่างสม่ำเสมอ";

    const lowerSex = sex.toLowerCase();

    if (lowerSex === "ชาย" || lowerSex === "male") {
      text = getMaleResult(num, age, strNormal1, strNormal2, strNormal3, strAbnormal1, strAbnormal2, strAbnormal3);
    } else if (lowerSex === "หญิง" || lowerSex === "female") {
      text = getFemaleResult(num, age, strNormal1, strNormal2, strNormal3, strAbnormal1, strAbnormal2, strAbnormal3);
    }
    console.log(text)
    return text;
  }
  function flexcal2(num, age, sex) {
    let text = '';

    const lowerSex = sex.toLowerCase();

    if (lowerSex === 'ชาย' || lowerSex === 'male') {
      if (age >= 17 && age <= 19) {
        if (num >= 21) {
          text = "ดีมาก";
        } else if (num <= 20 && num >= 17) {
          text = "ดี";
        } else if (num <= 16 && num >= 8) {
          text = "ปานกลาง";
        } else if (num <= 7 && num >= 4) {
          text = "ต่ำ";
        } else if (num <= 3) {
          text = "ต่ำมาก";
        }
      } else if (age >= 20 && age <= 29) {
        if (num >= 20) {
          text = "ดีมาก";
        } else if (num <= 19 && num >= 17) {
          text = "ดี";
        } else if (num <= 16 && num >= 9) {
          text = "ปานกลาง";
        } else if (num <= 8 && num >= 6) {
          text = "ต่ำ";
        } else if (num <= 5) {
          text = "ต่ำมาก";
        }
      } else if (age >= 30 && age <= 39) {
        if (num >= 19) {
          text = "ดีมาก";
        } else if (num <= 18 && num >= 15) {
          text = "ดี";
        } else if (num <= 14 && num >= 6) {
          text = "ปานกลาง";
        } else if (num <= 5 && num >= 2) {
          text = "ต่ำ";
        } else if (num <= 1) {
          text = "ต่ำมาก";
        }
      } else if (age >= 40 && age <= 49) {
        if (num >= 17) {
          text = "ดีมาก";
        } else if (num <= 16 && num >= 13) {
          text = "ดี";
        } else if (num <= 12 && num >= 5) {
          text = "ปานกลาง";
        } else if (num <= 4 && num >= 1) {
          text = "ต่ำ";
        } else if (num <= 0) {
          text = "ต่ำมาก";
        }
      } else if (age >= 50 && age <= 59) {
        if (num >= 17) {
          text = "ดีมาก";
        } else if (num <= 16 && num >= 13) {
          text = "ดี";
        } else if (num <= 12 && num >= 4) {
          text = "ปานกลาง";
        } else if (num <= 3 && num >= 0) {
          text = "ต่ำ";
        } else if (num <= -1) {
          text = "ต่ำมาก";
        }
      } else if (age >= 60) {
        if (num >= 14) {
          text = "ดีมาก";
        } else if (num <= 13 && num >= 10) {
          text = "ดี";
        } else if (num <= 9 && num >= 2) {
          text = "ปานกลาง";
        } else if (num <= -1 && num >= -2) {
          text = "ต่ำ";
        } else if (num <= -3) {
          text = "ต่ำมาก";
        }
      }
    } else if (lowerSex === 'หญิง' || lowerSex === 'female') {
      if (age >= 17 && age <= 19) {
        if (num >= 19) {
          text = "ดีมาก";
        } else if (num <= 18 && num >= 16) {
          text = "ดี";
        } else if (num <= 15 && num >= 9) {
          text = "ปานกลาง";
        } else if (num <= 8 && num >= 6) {
          text = "ต่ำ";
        } else if (num <= 5) {
          text = "ต่ำมาก";
        }
      } else if (age >= 20 && age <= 29) {
        if (num >= 20) {
          text = "ดีมาก";
        } else if (num <= 19 && num >= 17) {
          text = "ดี";
        } else if (num <= 16 && num >= 10) {
          text = "ปานกลาง";
        } else if (num <= 9 && num >= 7) {
          text = "ต่ำ";
        } else if (num <= 6) {
          text = "ต่ำมาก";
        }
      } else if (age >= 30 && age <= 39) {
        if (num >= 21) {
          text = "ดีมาก";
        } else if (num <= 20 && num >= 17) {
          text = "ดี";
        } else if (num <= 16 && num >= 8) {
          text = "ปานกลาง";
        } else if (num <= 7 && num >= 4) {
          text = "ต่ำ";
        } else if (num <= 3) {
          text = "ต่ำมาก";
        }
      } else if (age >= 40 && age <= 49) {
        if (num >= 20) {
          text = "ดีมาก";
        } else if (num <= 19 && num >= 16) {
          text = "ดี";
        } else if (num <= 15 && num >= 8) {
          text = "ปานกลาง";
        } else if (num <= 7 && num >= 4) {
          text = "ต่ำ";
        } else if (num <= 3) {
          text = "ต่ำมาก";
        }
      } else if (age >= 50 && age <= 59) {
        if (num >= 18) {
          text = "ดีมาก";
        } else if (num <= 17 && num >= 15) {
          text = "ดี";
        } else if (num <= 14 && num >= 8) {
          text = "ปานกลาง";
        } else if (num <= 7 && num >= 5) {
          text = "ต่ำ";
        } else if (num <= 4) {
          text = "ต่ำมาก";
        }
      } else if (age >= 60) {
        if (num >= 18) {
          text = "ดีมาก";
        } else if (num <= 17 && num >= 15) {
          text = "ดี";
        } else if (num <= 14 && num >= 8) {
          text = "ปานกลาง";
        } else if (num <= 7 && num >= 5) {
          text = "ต่ำ";
        } else if (num <= 4) {
          text = "ต่ำมาก";
        }
      }
    }

    return text;
  }

  function calculateAgeInYears(ageString) {
    const [years, months, days] = ageString.match(/\d+/g).map(Number);
    return years + (months / 12) + (days / 365);
  }
  function getMaleResult(num, age, strNormal1, strNormal2, strNormal3, strAbnormal1, strAbnormal2, strAbnormal3) {
    let text = "";
    console.log("ชาย")

    if (age >= 17 && age <= 19) {
      if (num >= 21) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num >= 17) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num >= 8) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num >= 4) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 20 && age <= 29) {
      if (num >= 20) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num >= 17) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num >= 9) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num >= 6) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    }
    else if (age >= 30 && age <= 39) {
      if (num >= 19) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 18 && num >= 15) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 14 && num >= 6) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 6 && num >= 2) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= 1) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 40 && age <= 49) {
      if (num >= 17) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 16 && num >= 13) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 12 && num >= 5) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 3 && num >= 0) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= 0) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 50 && age <= 59) {
      if (num >= 17) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 16 && num >= 13) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 12 && num >= 4) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 3 && num >= 0) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= -1) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 60) {
      if (num >= 14) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 13 && num >= 10) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 9 && num >= 2) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= -1 && num >= -2) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= -3) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    }

    return text;
  }

  function getFemaleResult(num, age, strNormal1, strNormal2, strNormal3, strAbnormal1, strAbnormal2, strAbnormal3) {
    let text = "";
    console.log("หญิง")
    if (age >= 17 && age <= 19) {
      if (num >= 19) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num >= 16) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num >= 9) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num >= 6) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 20 && age <= 29) {
      if (num >= 20) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num >= 17) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num >= 10) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num >= 7) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 30 && age <= 39) {
      if (num >= 21) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 20 && num >= 17) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 16 && num >= 8) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 7 && num >= 4) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= 3) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 40 && age <= 49) {
      if (num >= 20) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 19 && num >= 16) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 15 && num >= 8) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 7 && num >= 4) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= 3) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 50 && age <= 59) {
      if (num >= 18) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 17 && num >= 15) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 14 && num >= 8) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 7 && num >= 5) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= 4) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    } else if (age >= 60) {
      if (num >= 18) {
        text = strNormal1 + num + strNormal2 + " ดีมาก " + strNormal3;
      } else if (num <= 17 && num >= 15) {
        text = strNormal1 + num + strNormal2 + " ดี " + strNormal3;
      } else if (num <= 14 && num >= 8) {
        text = strNormal1 + num + strNormal2 + " ปานกลาง " + strNormal3;
      } else if (num <= 7 && num >= 5) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำ " + strAbnormal3;
      } else if (num <= 4) {
        text = strAbnormal1 + num + strAbnormal2 + " ต่ำมาก " + strAbnormal3;
      }
    }
    return text;
  }
  function Muscularcal1(num, age, sex) {
    let text = '';
    const strnomal1 = 'จากการทดสอบ แรงบีบมือของท่านเท่ากับ.. ';
    const strnomal2 = ' ระดับสมรรถภาพอยู่ในเกณฑ์..';
    const strnomal3 = ' แสดงว่าท่านเป็นผู้ที่มีความแข็งแรงของกล้ามเนื้อแขนดี สามารถปฏิบัติกิจกรรมประจำวันได้ดี โดยกล้ามเนื้อจะไม่ปวดเมื่อย ท่านสามารถทำงานได้หนักกว่าคนปกติ';
    const strabnomal1 = 'จากการทดสอบ แรงบีบมือของท่านเท่ากับ.. ';
    const strabnomal2 = ' ระดับสมรรถภาพอยู่ในเกณฑ์.. ';
    const strabnomal3 = ' แสดงว่าท่านไม่ค่อยได้ฝึกความแข็งแรงและอดทนของกล้ามเนื้อหรือทำงานประเภทไม่ค่อยออกแรง';

    if (sex.toLowerCase() === 'ชาย' || sex.toLowerCase() === 'male') {
      if (age >= 17 && age <= 19) {
        if (num >= 0.86) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.85 && num >= 0.80) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.79 && num >= 0.67) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.66 && num >= 0.61) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.60) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 20 && age <= 29) {
        if (num >= 0.84) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.83 && num >= 0.79) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.78 && num >= 0.68) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.67 && num >= 0.63) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.62) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 30 && age <= 39) {
        if (num >= 0.83) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.82 && num >= 0.75) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.74 && num >= 0.65) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.64 && num >= 0.60) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.59) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 40 && age <= 49) {
        if (num >= 0.79) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.78 && num >= 0.70) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.69 && num >= 0.60) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.59 && num >= 0.53) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.52) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 50 && age <= 59) {
        if (num >= 0.73) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.72 && num >= 0.65) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.64 && num >= 0.56) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.55 && num >= 0.50) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.49) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 60 ) {
        if (num >= 0.65) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.64 && num >= 0.58) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.57 && num >= 0.50) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.49 && num >= 0.45) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.44) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      }
    } else if (sex.toLowerCase() === 'หญิง' || sex.toLowerCase() === 'female') {
      if (age >= 17 && age <= 19) {
        if (num >= 0.65) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.64 && num >= 0.60) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.59 && num >= 0.49) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.48 && num >= 0.44) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.43) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 20 && age <= 29) {
        if (num >= 0.68) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.67 && num >= 0.61) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.60 && num >= 0.51) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.50 && num >= 0.45) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.44) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 30 && age <= 39) {
        if (num >= 0.67) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.66 && num >= 0.60) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.59 && num >= 0.51) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.50 && num >= 0.45) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.44) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 40 && age <= 49) {
        if (num >= 0.60) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.59 && num >= 0.55) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.54 && num >= 0.46) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.45 && num >= 0.40) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.39) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 50 && age <= 59) {
        if (num >= 0.55) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.54 && num >= 0.50) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.49 && num >= 0.42) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.41 && num >= 0.36) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.35) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      } else if (age >= 60 ) {
        if (num >= 0.52) {
          text = strnomal1 + num + strnomal2 + 'ดีมาก' + strnomal3;
        } else if (num <= 0.51 && num >= 0.45) {
          text = strnomal1 + num + strnomal2 + 'ดี' + strnomal3;
        } else if (num <= 0.44 && num >= 0.38) {
          text = strnomal1 + num + strnomal2 + 'ปานกลาง' + strnomal3;
        } else if (num <= 0.37 && num >= 0.32) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำ' + strabnomal3;
        } else if (num <= 0.31) {
          text = strabnomal1 + num + strabnomal2 + 'ต่ำมาก' + strabnomal3;
        }
      }
    }

    return text;
  }
  function Muscularcal2(num, age, sex) {
    let text = "";

    if (sex.toLowerCase() === "ชาย" || sex.toLowerCase() === "male") {
      if (age >= 17 && age <= 19) {
        if (num >= 0.86) {
          text = "ดีมาก";
        } else if (num <= 0.85 && num >= 0.80) {
          text = "ดี";
        } else if (num <= 0.79 && num >= 0.67) {
          text = "ปานกลาง";
        } else if (num <= 0.66 && num >= 0.61) {
          text = "ต่ำ";
        } else if (num <= 0.60) {
          text = "ต่ำมาก";
        }
      } else if (age >= 20 && age <= 29) {
        if (num >= 0.84) {
          text = "ดีมาก";
        } else if (num <= 0.83 && num >= 0.79) {
          text = "ดี";
        } else if (num <= 0.78 && num >= 0.68) {
          text = "ปานกลาง";
        } else if (num <= 0.67 && num >= 0.63) {
          text = "ต่ำ";
        } else if (num <= 0.62) {
          text = "ต่ำมาก";
        }
      } else if (age >= 30 && age <= 39) {
        if (num >= 0.81) {
          text = "ดีมาก";
        } else if (num <= 0.80 && num >= 0.76) {
          text = "ดี";
        } else if (num <= 0.75 && num >= 0.65) {
          text = "ปานกลาง";
        } else if (num <= 0.64 && num >= 0.60) {
          text = "ต่ำ";
        } else if (num <= 0.59) {
          text = "ต่ำมาก";
        }
      } else if (age >= 40 && age <= 49) {
        if (num >= 0.77) {
          text = "ดีมาก";
        } else if (num <= 0.76 && num >= 0.72) {
          text = "ดี";
        } else if (num <= 0.71 && num >= 0.61) {
          text = "ปานกลาง";
        } else if (num <= 0.60 && num >= 0.56) {
          text = "ต่ำ";
        } else if (num <= 0.55) {
          text = "ต่ำมาก";
        }
      } else if (age >= 50 && age <= 59) {
        if (num >= 0.72) {
          text = "ดีมาก";
        } else if (num <= 0.71 && num >= 0.67) {
          text = "ดี";
        } else if (num <= 0.66 && num >= 0.56) {
          text = "ปานกลาง";
        } else if (num <= 0.55 && num >= 0.51) {
          text = "ต่ำ";
        } else if (num <= 0.50) {
          text = "ต่ำมาก";
        }
      } else if (age >= 60 ) {
        if (num >= 0.65) {
          text = "ดีมาก";
        } else if (num <= 0.64 && num >= 0.60) {
          text = "ดี";
        } else if (num <= 0.59 && num >= 0.49) {
          text = "ปานกลาง";
        } else if (num <= 0.48 && num >= 0.44) {
          text = "ต่ำ";
        } else if (num <= 0.43) {
          text = "ต่ำมาก";
        }
      }
    } else if (sex.toLowerCase() === "หญิง" || sex.toLowerCase() === "female") {
      if (age >= 17 && age <= 19) {
        if (num >= 0.65) {
          text = "ดีมาก";
        } else if (num <= 0.64 && num >= 0.60) {
          text = "ดี";
        } else if (num <= 0.59 && num >= 0.49) {
          text = "ปานกลาง";
        } else if (num <= 0.48 && num >= 0.44) {
          text = "ต่ำ";
        } else if (num <= 0.43) {
          text = "ต่ำมาก";
        }
      } else if (age >= 20 && age <= 29) {
        if (num >= 0.66) {
          text = "ดีมาก";
        } else if (num <= 0.65 && num >= 0.61) {
          text = "ดี";
        } else if (num <= 0.60 && num >= 0.50) {
          text = "ปานกลาง";
        } else if (num <= 0.49 && num >= 0.45) {
          text = "ต่ำ";
        } else if (num <= 0.44) {
          text = "ต่ำมาก";
        }
      } else if (age >= 30 && age <= 39) {
        if (num >= 0.61) {
          text = "ดีมาก";
        } else if (num <= 0.60 && num >= 0.57) {
          text = "ดี";
        } else if (num <= 0.56 && num >= 0.48) {
          text = "ปานกลาง";
        } else if (num <= 0.47 && num >= 0.44) {
          text = "ต่ำ";
        } else if (num <= 0.43) {
          text = "ต่ำมาก";
        }
      } else if (age >= 40 && age <= 49) {
        if (num >= 0.57) {
          text = "ดีมาก";
        } else if (num <= 0.56 && num >= 0.53) {
          text = "ดี";
        } else if (num <= 0.52 && num >= 0.44) {
          text = "ปานกลาง";
        } else if (num <= 0.43 && num >= 0.40) {
          text = "ต่ำ";
        } else if (num <= 0.39) {
          text = "ต่ำมาก";
        }
      } else if (age >= 50 && age <= 59) {
        if (num >= 0.52) {
          text = "ดีมาก";
        } else if (num <= 0.51 && num >= 0.48) {
          text = "ดี";
        } else if (num <= 0.47 && num >= 0.39) {
          text = "ปานกลาง";
        } else if (num <= 0.38 && num >= 0.35) {
          text = "ต่ำ";
        } else if (num <= 0.34) {
          text = "ต่ำมาก";
        }
      } else if (age >= 60 ) {
        if (num >= 0.49) {
          text = "ดีมาก";
        } else if (num <= 0.48 && num >= 0.45) {
          text = "ดี";
        } else if (num <= 0.44 && num >= 0.36) {
          text = "ปานกลาง";
        } else if (num <= 0.35 && num >= 0.32) {
          text = "ต่ำ";
        } else if (num <= 0.321) {
          text = "ต่ำมาก";
        }
      }
    }
  
    return text
  }
  return (
    <div className={`w-full flex flex-col rounded-2xl ${module === 'docter-result' ? 'bg-[#F3F3F3]' : 'bg-[#F8F8F8]'}  shadow-box p-5 my-4`}>
      <div className='flex text-xl font-semibold text-[#365382] justify-between w-full'>
        <label id='flexibility_muscular_strength' className='font-semibold text-[#365382]'>Flexibility & Muscular Strength</label>
        <div>
          {module != 'docter-result' && <InputSwitch checked={switchStaus} onChange={(v) => onChangeSwitch(v)} />}
        </div>
      </div>
      <Collapse timeout={300} className="transition-all duration-500" in={module === 'docter-result' ? true : switchStaus}>
        <div className='grid grid-cols-12  items-start   w-full gap-4 mt-4 p-2'>
          {/* การวัดความอ่อนตัว (Flexibility Testing) */}
          <div className='col-span-6 bg-[#EDF4FC] rounded-lg shadow-box flex flex-col gap-4 p-4'>
            <label className='font-semibold text-base col-span-12 text-[#365382]' >การวัดความอ่อนตัว (Flexibility Testing)</label>
            <label className='whitespace-nowrap col-span-12 font-light ml-4'>การวัดความอ่อนตัว (Flexibility Testing)</label>
            <div className='lg:flex lg:flex-row grid grid-cols-5 gap-4 items-center w-full '>
              <label className='whitespace-nowrap col-span-2'>ความอ่อนตัว:</label>
              <TextField value={form?.FlexibilityTestingNum || ''} onChange={(e) => handleChange({ FlexibilityTestingNum: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' className='text-white  col-span-3  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
              <button onClick={() => FlexibilityTestingCal(form?.FlexibilityTestingNum, data.AgeDetail, data.Sex)} className='h-10 col-span-5  px-6 whitespace-nowrap border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล</button>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <TextareaAutosize value={form?.FlexibilityTestingDetail || ''} onChange={(e) => handleChange({ FlexibilityTestingDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex gap-4 items-center w-full '>
              <TextField value={form?.FlexibilityTestingResult || ''} onChange={(e) => handleChange({ FlexibilityTestingResult: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
          </div>

          {/* การวัดความแข็งแรงของกล้ามเนื้อ (Muscular Strength) */}
          <div className='col-span-6 bg-[#EDF4FC] rounded-lg shadow-box flex flex-col gap-4 p-4'>
            <label className='font-semibold text-base col-span-12 text-[#365382]' >การวัดความแข็งแรงของกล้ามเนื้อ (Muscular Strength)</label>
            <label className='whitespace-nowrap col-span-12 font-light ml-4'>การทดสอบแรงบีบมือ (Grip Strength)</label>
            <div className='lg:flex lg:flex-row grid grid-cols-5 gap-4 items-center w-full '>
              <label className='whitespace-nowrap col-span-2'>แรงบีบมือ:</label>
              <TextField value={form?.MuscularStrengthNum || ''} onChange={(e) => handleChange({ MuscularStrengthNum: e?.target.value.replace(/[^0-9.]/g, '') })} size='small' className='text-white  w-full col-span-3   bg-[#FFFFFF]' label="" variant="outlined" />
              <button  onClick={() => MuscularStrengthCal(form?.MuscularStrengthNum, data.AgeDetail, data.Sex)} className='h-10 col-span-5  px-6 whitespace-nowrap border rounded-lg bg-[#6B84B7] hover:bg-[#586f9e] text-[#FFFFFF]' >แปลผล</button>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <TextareaAutosize value={form?.MuscularStrengthDetail || ''} onChange={(e) => handleChange({ MuscularStrengthDetail: e?.target.value })} minRows={3} maxRows={3} className="w-full rounded-lg  p-2" aria-label="" placeholder="" />
            </div>
            <div className='flex gap-4 items-center w-full '>
              <TextField value={form?.MuscularStrengthResult || ''} onChange={(e) => handleChange({ MuscularStrengthResult: e?.target.value })} size='small' className='text-white  w-full   bg-[#FFFFFF]' label="" variant="outlined" />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12  items-start   w-full gap-2 mt-4 p-2'>
          {/* foot */}
          <div className='flex col-span-12 flex-col gap-4 justify-center items-center my-4'>
            <label className='text-[#E54545] font-light text-sm'>สามารถบันทึกผลได้ถึงวันที่ 22/11/2565 6:43:28</label>
          </div>

          <div className='flex gap-4 col-span-12  justify-center items-center'>
            <button onClick={() => onClear()} className='cursor-pointer w-56  h-10 border rounded-lg bg-[#E54545] hover:bg-[#bb3939] text-[#FFFFFF]' >
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/clear.svg" />
                <label className='cursor-pointer'>ล้าง</label>
              </div>
            </button>
            <button onClick={() => onSave()} className='cursor-pointer w-56 h-10 border rounded-lg bg-[#365382] hover:bg-[#2a4376] text-[#FFFFFF]' >
              <div className='cursor-pointer flex gap-2 justify-center items-center'>
                <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
                <label className='cursor-pointer'>บันทึก</label>
              </div>
            </button>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div>
        {/* <div className='w-full flex justify-end mt-4'>
          <div className='w-[50%] flex gap-2 items-center'>
            <TextField size='small' className='text-white w-[100%] bg-[#FFFFFF]' label="ลงชื่อผู้คัดกรอง" variant="outlined" />
            <div className='bg-[#365382] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/save.svg" />
            </div>
            <div className='bg-[#6B84B7] rounded-full min-w-[45px] min-h-[45px] flex justify-center items-center'>
              <img className=' cursor-pointer' width={25} height={24} src="/icon/clock_white.svg" />
            </div>
          </div>
        </div> */}
      </Collapse>
    </div >
  )
}

export default FlexibilityMuscularStrength