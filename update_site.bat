@echo off
echo ==========================================
echo    Merry Christmas Wynji (V2) - Updater
echo ==========================================
echo.

echo 1. Building Modern Web App...
call npm run build
if %errorlevel% neq 0 (
    echo Error building project!
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Updating /docs folder...
rmdir /s /q docs
mkdir docs
xcopy "dist\*" "docs\" /E /Y

echo.
echo 3. Pushing to GitHub...
git add .
git commit -m "Update site content (V2)"
git push origin master

echo.
echo ==========================================
echo    Done! Your modern site will update in ~1 min.
echo ==========================================
pause
