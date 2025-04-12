# React + TypeScript + Vite

1. Cài đặt PM2
   sudo npm install -g pm2

2. Build dự án
   sudo npm run build

3. Cài đặt một server tĩnh (serve)
   sudo npm install --legacy-peer-deps -g serve

4. Chạy dự án với PM2
   sudo pm2 start serve --name "tapmed-project" -- -s dist -l 3001
