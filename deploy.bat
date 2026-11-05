@echo off
echo ===================================================
echo   Deploying 7-Day Fat Loss PWA to Vercel
echo ===================================================
echo.
cd /d "d:\fatloss-pwa"
echo Running Vercel deployment...
echo Silakan ikuti petunjuk di layar (tekan Enter untuk konfirmasi default).
echo.
npx vercel --prod
pause
