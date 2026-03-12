@echo off
title Servidor Dashboard PCBA (Portable PHP)

:: Use pushd to map UNC path to a drive letter if needed
pushd "%~dp0"

set PHP_BIN=php_portable\php.exe

echo ========================================
echo   SERVIDOR DASHBOARD PCBA
echo ========================================
echo.

:: Detect nested PHP path
if not exist "%PHP_BIN%" (
    for /d %%D in ("php_portable\php-*") do (
        if exist "%%D\php.exe" (
            set PHP_BIN=%%D\php.exe
            goto START_SERVER
        )
    )
    
    echo [ERROR] No se encontro php.exe en la carpeta "php_portable".
    echo Asegurate de haber descomprimido el ZIP dentro de: %CD%\php_portable
    echo.
    dir /b /s "php_portable\php.exe"
    popd
    pause
    exit /b
)

:START_SERVER
echo Servidor iniciado en: http://localhost:8080
echo.
echo No cierres esta ventana mientras uses el Dashboard.
echo (Esta ventana mapea la red a una unidad temporal).
echo.

:: Start browser
start http://localhost:8080

:: Run PHP server
"%PHP_BIN%" -S 0.0.0.0:8080
echo.
echo Servidor detenido.
popd
pause
