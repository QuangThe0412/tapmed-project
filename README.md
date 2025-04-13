# React + TypeScript + Vite

0. Cài đặt
   sudo npm install --legacy-peer-deps

1. Cài đặt PM2
   sudo npm install -g pm2

2. Build dự án
   sudo npm run build

3. Cài đặt một server tĩnh (serve)
   sudo npm install -g serve

4. Chạy dự án với PM2
   sudo pm2 start npx --name "tapmed-project" -- serve -s dist -l 3001
