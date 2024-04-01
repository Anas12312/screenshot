F4:: ; Press F3 key to trigger the hotkey
Run PowerShell.exe -WindowStyle hidden -ExecutionPolicy Bypass Invoke-RestMethod -Uri "http://localhost:3000/ss" -Method Get
return

^!x:: ; Press Ctrl + Alt + X to exit the script
ExitApp
return