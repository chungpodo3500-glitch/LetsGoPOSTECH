# POSTECHIAN APK 만들기

마누스 로그인/서버(tRPC, OAuth, DB)는 모두 제거했고, 열람·검색·디렉터리·십자말풀이 등 모든 사이트 기능은 앱 안에 포함됩니다 (오프라인 동작).

## 방법 A — 내 PC에서
1. Node.js 20+, JDK 21, Android SDK 설치 후 `ANDROID_HOME` 설정
2. `bash build-apk.sh`
3. 결과물: `out/POSTECHIAN.apk`

## 방법 B — GitHub Actions (설치 불필요)
이 폴더를 GitHub 저장소에 올리고 Actions 탭에서 "Build APK"를 실행하면 `POSTECHIAN-apk` 아티팩트로 APK를 받을 수 있습니다.
