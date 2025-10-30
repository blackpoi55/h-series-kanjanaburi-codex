'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { ClientJS } from 'clientjs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const VisitorInfoButton = () => {
  const getVisitorInfo = async () => {
    const ipData = await fetch('https://ipapi.co/json').then(res => res.json());
    const client = new ClientJS();

    const battery = await (async () => {
      try {
        const b = await navigator.getBattery();
        return {
          charging: b.charging,
          level: `${Math.round(b.level * 100)}%`,
        };
      } catch {
        return { charging: 'ไม่รองรับ', level: 'ไม่รองรับ' };
      }
    })();

    const webgl = (() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return {
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        };
      } catch {
        return { renderer: 'ไม่รองรับ', vendor: 'ไม่รองรับ' };
      }
    })();

    const fp = await FingerprintJS.load();
    const fingerprint = await fp.get();

    const info = {
      ip: ipData.ip,
      location: {
        country: ipData.country_name,
        region: ipData.region,
        city: ipData.city,
        latitude: ipData.latitude,
        longitude: ipData.longitude,
        org: ipData.org,
        asn: ipData.asn,
      },
      browser: client.getBrowser() + ' ' + client.getBrowserVersion(),
      os: client.getOS(),
      device: client.getDevice(),
      screen: client.getScreenPrint(),
      fingerprint: fingerprint.visitorId,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookiesEnabled: navigator.cookieEnabled,
      cpuThreads: navigator.hardwareConcurrency,
      ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'unknown',
      battery,
      gpu: webgl,
      incognito: fingerprint.incognito || 'unknown',
    };

    const html = Object.entries(info).map(([k, v]) => {
      if (typeof v === 'object') {
        return `<b>${k}:</b><br>${Object.entries(v).map(([kk, vv]) => `${kk}: ${vv}`).join('<br>')}`;
      }
      return `<b>${k}:</b> ${v}`;
    }).join('<br><br>');

    Swal.fire({
      title: '📋 ข้อมูลผู้เข้าชม',
      html,
      icon: 'info',
      width: 600,
      confirmButtonText: 'ปิด',
      customClass: { htmlContainer: 'text-left text-sm' },
    });

    await fetch('/api/log-visitor', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <button onClick={getVisitorInfo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
      ดึงข้อมูลผู้เข้าชม (จัดเต็ม)
    </button>
  );
};

export default VisitorInfoButton;