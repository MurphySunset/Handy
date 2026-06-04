@echo off
setlocal
cd /d %~dp0\..
set "PATH=%USERPROFILE%\.cargo\bin;%ProgramFiles%\CMake\bin;%ProgramFiles%\LLVM\bin;%PATH%"
set "LIBCLANG_PATH=%ProgramFiles%\LLVM\bin"
if not exist "src-tauri\resources\models\silero_vad_v4.onnx" (
  echo Downloading silero_vad_v4.onnx...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "New-Item -ItemType Directory -Force -Path 'src-tauri/resources/models' | Out-Null; Invoke-WebRequest -UseBasicParsing 'https://blob.handy.computer/silero_vad_v4.onnx' -OutFile 'src-tauri/resources/models/silero_vad_v4.onnx'"
)
bunx tauri build --bundles nsis
