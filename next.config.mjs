/** @type {import('next').NextConfig} */
const nextConfig = {
  // ลบ experimental เก่าที่ Next 16 ไม่รู้จักออกให้หมด
  experimental: {},

  reactStrictMode: false,

  // ยังใช้ Webpack ได้ตามเดิม
  webpack: (config, { isServer }) => {
    // กัน lib ฝั่ง server หลุดมา bundle ฝั่ง client แล้วหา 'fs' ไม่เจอ
    if (!isServer) {
      config.resolve = {
        ...(config.resolve || {}),
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
          path: false,
          os: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
