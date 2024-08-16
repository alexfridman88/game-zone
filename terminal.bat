@echo off
setlocal

REM Read the container name from the .env file
for /f "tokens=2 delims==" %%a in ('findstr COMPOSE_PROJECT_NAME .env') do set CONTAINER_NAME=%%a

REM Use the container name in the docker exec command
powershell docker exec -it %CONTAINER_NAME% bash

endlocal
