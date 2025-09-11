@echo off
:: React Course Setup Script for Windows
:: This script installs dependencies for all demo projects

echo 🚀 Setting up React Course demo projects...
echo This will install dependencies for all demo projects.
echo.

:: Function to install dependencies
:install_deps
if exist "%~1\package.json" (
    echo 📦 Installing dependencies in %~1...
    cd "%~1"
    call npm install
    cd ..\..\..
    echo ✅ Completed %~1
    echo.
) else (
    echo ⚠️  No package.json found in %~1, skipping...
)
goto :eof

echo Installing dependencies for all demo projects...
echo.

call :install_deps "lesson1-setup\demo\cra-demo"
call :install_deps "lesson1-setup\demo\vite-demo"
call :install_deps "lesson2-components\demo"
call :install_deps "lesson3-data\demo"
call :install_deps "lesson4-routing-auth\demo"
call :install_deps "lesson5-fullstack\demo"

echo 🎉 All demo projects are ready!
echo.
echo To run a specific demo:
echo   1. Navigate to the demo folder: cd lesson1-setup\demo\vite-demo
echo   2. Start the development server: npm run dev
echo.
echo For lesson3-data demo, also run the backend server:
echo   npm run server (in a separate terminal)
echo.
echo Happy coding! 🚀
pause