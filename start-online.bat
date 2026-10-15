@echo off
chcp 65001 > nul
echo =======================================================
echo   ĐANG TẠO ĐƯỜNG LINK ONLINE QUA CLOUDFLARE TUNNEL...
echo =======================================================
echo.
echo Lưu ý: Hãy để cửa sổ này mở để giữ link hoạt động.
echo Nhấn Ctrl + C khi muốn dừng chia sẻ.
echo.
.\cloudflared.exe tunnel --url http://localhost:5173
pause
