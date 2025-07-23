@echo off
echo Copying GOUL Shoppe assets from G drive...
echo.

if exist "G:\art\maga site shit fuck ai" (
    echo Found assets folder on G drive
    echo Copying files...
    
    if not exist "client\src\assets" mkdir "client\src\assets"
    
    copy "G:\art\maga site shit fuck ai\0520.gif" "client\src\assets\" /Y
    copy "G:\art\maga site shit fuck ai\0703.gif" "client\src\assets\" /Y
    copy "G:\art\maga site shit fuck ai\tag001.png" "client\src\assets\" /Y
    copy "G:\art\maga site shit fuck ai\bomb-has-been-planted-sound-effect-cs-go.mp3" "client\src\assets\" /Y
    
    if not exist "client\src\assets\fonts" mkdir "client\src\assets\fonts"
    copy "G:\art\maga site shit fuck ai\fonts\*.*" "client\src\assets\fonts\" /Y
    
    echo.
    echo Assets copied successfully!
    echo.
    echo Files copied:
    echo - 0520.gif (background)
    echo - 0703.gif (success animation)
    echo - tag001.png (logo)
    echo - bomb-has-been-planted-sound-effect-cs-go.mp3 (sound effect)
    echo - fonts/ (custom fonts)
    echo.
    echo TREMENDOUS! FANTASTIC! ASSETS COPIED SUCCESSFULLY!
) else (
    echo ERROR: Assets folder not found on G drive
    echo Please ensure the folder "G:\art\maga site shit fuck ai" exists
)

echo.
pause 