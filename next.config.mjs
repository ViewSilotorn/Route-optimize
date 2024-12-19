/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://192.168.3.233:8080/api/:path*', // ปรับให้ตรงกับ URL ของ API ที่คุณใช้
        },
      ];
    },
  };

  export default nextConfig;
  