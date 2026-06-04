# Handy fork - setup de test Windows

## Emplacement

- Repo: `C:\Users\Baptiste\Documents\Projects\Handy-custom-transcription-endpoint`
- Exécutable debug déjà compilé: `src-tauri\target\debug\handy.exe`

## Ce qui a été préparé

- clone de la branche `custom-transcription-endpoint`
- `bun install`
- installation de `rustup`
- installation de **Visual Studio Build Tools 2022**
- installation de **LLVM**
- installation de **CMake**
- téléchargement du modèle VAD `src-tauri/resources/models/silero_vad_v4.onnx`
- build debug validé

## Scripts utiles

- dev: `scripts\dev-win.cmd`
- build debug: `scripts\build-win-debug.cmd`

## Pour lancer l'app

- soit double-cliquer sur `src-tauri\target\debug\handy.exe`
- soit lancer `scripts\dev-win.cmd` pour le mode dev

## Pour tester l'endpoint custom

Dans Handy :

1. Ouvrir **Settings**
2. Aller dans **Advanced**
3. Renseigner **Point de terminaison personnalisé**
   - Endpoint URL OpenRouter: `https://openrouter.ai/api/v1/audio/transcriptions`
   - Model OpenRouter: `mistralai/voxtral-mini-transcribe`
   - API key: ta clé OpenRouter

Le fork envoie un `multipart/form-data` avec :

- `file`
- `model`
- `response_format=json`
- `language` si la langue n'est pas sur `auto`

Si une API key est renseignée, le fork ajoute l'en-tête `Authorization: Bearer ...`.

## Ajustement local effectué

Pour éviter d'installer le Vulkan SDK juste pour le test, la dépendance Windows a été ajustée dans `src-tauri/Cargo.toml` :

- `whisper-vulkan` -> `whisper-cpp`

Si tu veux revenir au comportement GPU/Vulkan du fork d'origine, il faudra :

1. rétablir `whisper-vulkan`
2. installer le Vulkan SDK
