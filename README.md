# 서울 빵집 지도 (설치형 웹앱)

폰 홈 화면에 앱처럼 설치해서 쓰는 서울 빵집 지도입니다. 인터넷이 없어도 열립니다.

## 올리는 방법 (GitHub Pages, 무료)
1. github.com 에서 새 저장소(repository)를 만듭니다. 이름은 `bakery-map` 처럼 아무거나. Public 으로.
2. 이 폴더의 파일을 전부 저장소에 올립니다. (웹에서 "Add file → Upload files" 로 폴더째 끌어다 놓아도 됩니다.)
3. 저장소 Settings → Pages → Build and deployment 에서 Branch 를 `main`, 폴더를 `/ (root)` 로 고르고 Save.
4. 1~2분 뒤 `https://<아이디>.github.io/bakery-map/` 주소가 생깁니다.

## 폰에 설치
- 카톡으로 주소를 보내서 열면 "브라우저로 열기 → 설치" 안내가 뜹니다. (카톡 내장 브라우저에서는 설치가 안 되기 때문)
- 안드로이드: Chrome 으로 주소를 열고 메뉴(⋮) → "앱 설치" 또는 "홈 화면에 추가".
- 아이폰: Safari 로 열고 공유 버튼 → "홈 화면에 추가".

## 빵집 목록 고치기
`bakeries.json` 만 고쳐서 올리면 됩니다. 앱은 인터넷이 될 때 새 목록을 자동으로 받습니다.
(설정 → "지금 새로고침" 으로 바로 받을 수도 있습니다.)

## 패치 노트
`changelog.json` 맨 앞에 `{"v":"YYYY-MM-DD","title":"...","notes":["..."]}` 를 넣으면, 앱을 여는 사람에게 "새 소식" 카드로 보이고 설정 → 업데이트 내역에 쌓입니다. 설정의 "최근 패치 노트 복사" 버튼이 카톡용 글을 만들어 줍니다.

## 사진
빵집 사진은 `photos/<빵집 id>/파일명.jpg` 로 올리고 `bakeries.json` 해당 항목에 `"photos":["photos/<id>/파일명.jpg"]` 를 적으면 상세 화면에 보입니다. 직접 찍은 사진만 올립니다.

## 파일
- `index.html` 앱 본체 (지도·목록·검색·즐겨찾기·추가)
- `bakeries.json` 기본 빵집 목록
- `changelog.json` 패치 노트
- `sw.js` 오프라인 저장용
- `manifest.webmanifest`, `icons/` 설치용 이름·아이콘
