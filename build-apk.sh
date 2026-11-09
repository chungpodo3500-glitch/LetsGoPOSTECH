#!/usr/bin/env bash
# POSTECHIAN APK 빌드 스크립트
# 필요: Node.js 20+, JDK 21, Android SDK (ANDROID_HOME 설정), 인터넷 연결
set -euo pipefail
cd "$(dirname "$0")"

npm install
npm run build                      # 정적 사이트 -> dist/public
[ -d android ] || npx cap add android
npx cap sync android               # 웹 자산을 안드로이드 프로젝트로 복사

# 디버그 서명 APK (바로 설치 가능)
( cd android && ./gradlew assembleDebug )

mkdir -p out
cp android/app/build/outputs/apk/debug/app-debug.apk out/POSTECHIAN.apk
echo "완료: $(pwd)/out/POSTECHIAN.apk"
