import axios from 'axios';
import { API, API_Online, APILOGIN, APILOGIN_Online } from '../../config';
import { decryptData } from '@/action/api';
import { redirect } from 'next/navigation';

export const GET = async (URL) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    return axios({
      method: 'GET',
      url: `${checkRole()}${URL}`,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      console.log(URL, err);
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const POST = async (URL, data) => {
  try {
    const result = await decryptData();
    console.log("result", result)
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    console.log(Token)

    return axios({
      method: 'POST',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.data

    }).catch(err => {
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const POST2 = async (URL, data) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;

    return axios({
      method: 'POST',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data.data

    }).catch(err => {
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const POST_CheckToken = async (URL, data) => {
  const { Token } = await decryptData()
  return axios({
    method: 'POST',
    url: `${checkRole()}${URL}`,
    data: data,
    headers: {
      'Authorization': Token ? ('Bearer ' + Token) : '',
      'Content-Type': 'application/json'
    },
  }).then((result) => {
    // console.log('getCookie', result.data)
    return result.data

  }).catch(err => {
    if (Token === null) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
    }
    console.log(err);
    return { error: err, message: err?.response?.data?.message || "" }
  });
}

export const GET_Token_NoDecryp = async (URL, data) => {
  try {
    const Token = localStorage.getItem('cto');
    // console.log("cto", Token);

    return axios({
      method: 'GET',
      url: `${checkRole()}${URL}`, // ใช้ process.env เพื่อเข้าถึง API URL
      // data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.data;
    }).catch(err => {
      console.log(err?.response?.status);
      if (err?.response?.status === 403) {
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      return { error: err, message: err?.response?.data?.message || "" };
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
};
export const POST_Token_NoDecryp = async (URL, data) => {
  try {
    const Token = localStorage.getItem('cto');
    // console.log("cto", Token);

    return axios({
      method: 'POST',
      url: `${checkRole()}${URL}`, // ใช้ process.env เพื่อเข้าถึง API URL
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.data;
    }).catch(err => {
      console.log(err?.response?.status);
      console.log("err",err.response)
      if (err?.response?.status === 403) {
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      return { error: err, message: err?.response?.data?.error || "" };
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
};
export const POST_Token_NoDecryp_noapi = async (URL, data) => {
  try {
    const Token = localStorage.getItem('cto');
    // console.log("cto", Token);

    return axios({
      method: 'POST',
      url: `${APILOGIN}${URL}`, // ใช้ process.env เพื่อเข้าถึง API URL
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.data;
    }).catch(err => {
      console.log(err?.response?.status);
      if (err?.response?.status === 403) {
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      return { error: err, message: err?.response?.data?.message || "" };
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
};
export const uploadFileFormData_Token_NoDecryp = async (URL, data) => {
  try {
    const Token = localStorage.getItem('cto');
    return axios({
      method: 'POST',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Content-Type': "multipart/form-data"
      },
    }).then((result) => {
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const PUT = async (URL, data) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    return axios({
      method: 'PUT',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const PUT_Token_NoDecryp = async (URL, data) => {
  try {
    const Token = localStorage.getItem('cto');
    // console.log("cto", Token);

    return axios({
      method: 'PUT',
      url: `${checkRole()}${URL}`, // ใช้ process.env เพื่อเข้าถึง API URL
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.data;
    }).catch(err => {
      console.log(err?.response?.status);
      if (err?.response?.status === 403) {
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      return { error: err, message: err?.response?.data?.message || "" };
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
};
export const PATCH = async (URL, data) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    return axios({
      method: 'PATCH',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const PATCH_Token_NoDecryp = async (URL, data) => {
  try {

    const Token = localStorage.getItem('cto');
    return axios({
      method: 'PATCH',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const PATCH_Token_NoDecryp_Online = async (URL, data) => {
  try {

    const Token = localStorage.getItem('cto');
    return axios({
      method: 'PATCH',
      url: `${API_Online}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
} 
export const PATCH_Token_NoDecryp_offline = async (URL, data) => {
  try {

    const Token = localStorage.getItem('cto');
    return axios({
      method: 'PATCH',
      url: `${API}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin + '/Care-Vista-C/login')
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
} 
export const DELETE = async (URL) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    return axios({
      method: 'DELETE',
      url: `${checkRole()}${URL}`,
      // data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const DELETE_DATA = async (URL, data) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;

    return axios({
      method: 'DELETE',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': 'application/json'
      },
    }).then((result) => {
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const POSTnoAUTH = async (URL, data) => {
  return axios({
    method: 'POST',
    url: `${checkRole()}${URL}`,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((result) => {
    return result.data

  }).catch(err => {
    console.log(err);
    return { error: err, message: err?.response?.data?.message || "" }
  });
}
export const POSTnoAUTH_Online = async (URL, data) => {
  return axios({
    method: 'POST',
    url: `${API_Online}${URL}`,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((result) => {
    return result.data

  }).catch(err => {
    console.log(err);
    return { error: err, message: err?.response?.data?.message || "" }
  });
}
export const GETnoAUTH = async (URL, data) => {
  const { Token } = await decryptData()
  return axios({
    method: 'GET',
    url: `${checkRole()}${URL}`,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((result) => {
    return result.data

  }).catch(err => {
    if (Token === null) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
    }
    console.log(err);
    return { error: err, message: err?.response?.data?.message || "" }
  });
}

export const uploadFileFormData = async (URL, data) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    return axios({
      method: 'POST',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Content-Type': "multipart/form-data"
      },
    }).then((result) => {
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}
export const UploadWithToken = async (URL, data) => {
  try {
    const result = await decryptData();
    if (!result || !result.Token) {
      console.log('กรุณา Login')
      window.location.replace(window.location.origin)
      return
    }
    const { Token } = result;
    return axios({
      method: 'POST',
      url: `${checkRole()}${URL}`,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + Token,
        'Content-Type': "multipart/form-data"
      },
    }).then((result) => {
      // console.log('getCookie', result.data)
      return result.data

    }).catch(err => {
      if (Token === null) {
        console.log('กรุณา Login')
        window.location.replace(window.location.origin)
      }
      console.log(err);
      // console.log(err.response.status ==401)
      return { error: err, message: err?.response?.data?.message || "" }
    });
  } catch (error) {
    console.error('Error in decrypting token:', error);
    return { error: true, message: error.message };
  }
}

export const POST_Login = async (URL, data) => {
  return axios({
    method: 'POST',
    url: `${APILOGIN}${URL}`,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((result) => {
    return result.data

  }).catch(err => {
    console.log(err);
    return { error: err, message: err?.response?.data?.message || "" }
  });
}
export const POST_Login_online = async (URL, data) => {
  return axios({
    method: 'POST',
    url: `${APILOGIN_Online}${URL}`,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((result) => {
    return result.data

  }).catch(err => {
    console.log(err);
    return { error: err, message: err?.response?.data?.message || "" }
  });
}
const checkRole = () => {
    let val = localStorage.getItem('role')
    if (val === "g") {
      return API_Online
    }
    else {
    return API
    }
}