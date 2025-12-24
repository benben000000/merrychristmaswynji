@echo off
echo ==========================================
echo    Merry Christmas Wynji - Site Updater
echo ==========================================
echo.

echo 1. Rebuilding the game for web...
python -m pygbag --build christmas_wynji
if %errorlevel% neq 0 (
    echo Error building project!
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Updating /docs folder...
rmdir /s /q docs
mkdir docs
xcopy "christmas_wynji\build\web\*" "docs\" /E /Y

echo.
echo 3. Pushing to GitHub...
git add .
git commit -m "Update site content"
git push origin master

echo.
echo ==========================================
echo    Done! Your site will update in ~1 min.
echo ==========================================
pause
