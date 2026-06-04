$repo = Resolve-Path (Join-Path $PSScriptRoot '..')
$release = Join-Path $repo 'src-tauri\target\release'
$out = Join-Path $repo 'dist-local'
$stage = Join-Path $out 'Handy-OpenRouter-windows-x64-portable'
$zip = Join-Path $out 'Handy-OpenRouter-windows-x64-portable.zip'

Remove-Item $stage, $zip -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $stage | Out-Null

Copy-Item (Join-Path $release 'handy.exe') (Join-Path $stage 'Handy OpenRouter.exe')
Copy-Item (Join-Path $release 'DirectML.dll') $stage -ErrorAction SilentlyContinue
Copy-Item (Join-Path $release 'resources') $stage -Recurse

@'
Handy OpenRouter - Windows x64 portable

Lancer "Handy OpenRouter.exe".
Configurer dans Settings > Advanced > Transcription :
- Endpoint: https://openrouter.ai/api/v1/audio/transcriptions
- Model: mistralai/voxtral-mini-transcribe
- API key: votre clé OpenRouter

Notes:
- Ne contient aucune clé API.
- Les vérifications de mise à jour sont désactivées par défaut.
- WebView2 Runtime doit être installé sur Windows.
- Version non signée : Windows SmartScreen peut afficher un avertissement "éditeur inconnu".
'@ | Set-Content -Encoding UTF8 (Join-Path $stage 'README.txt')

Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip -Force
Get-Item $zip | Select-Object FullName, Length | Format-List
