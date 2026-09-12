@echo off
chcp 65001 > nul
echo ========================================================
echo   ⚡ 鴨鴨高壓急急棒 (Super Duck Buzz Wire) 啟動中... ⚡
echo ========================================================
echo 本地伺服器網址: http://127.0.0.1:8788
start /b node server.mjs
timeout /t 1 > nul
start http://127.0.0.1:8788
echo 伺服器已於背景執行，請在瀏覽器享受遊戲！
pause
