<div align="center">
  <h1>Momentia (모멘티아)</h1>
  <img width="160" alt="momentia-logo" src="https://github.com/user-attachments/assets/be9da36c-77be-49f7-9172-ad51cb6430f3" />
</div>


## 배포 주소

https://momentia.site


## 목차
[0. 프로젝트 소개](#0-프로젝트-소개) <br/>
[1. 팀원 소개 (FE)](#1-팀원-소개-fe) <br/>
[2. 기술 스택](#2-기술-스택) <br/>
[3. 아키텍처 다이어그램](#3-아키텍처-다이어그램) <br/>
[4. User Flow](#4-user-flow) <br/>
[5. 발표 자료 및 화면 구성](#5-발표-자료-및-화면-구성) <br/>
[6. 폴더 구조](#6-폴더-구조)


## 0. 프로젝트 소개
> 개발 기간: 2024. 12. 5 ~

모멘티아(Momentia)는 '**무명 예술가를 위한 온라인 작품 전시 플랫폼**'입니다. <br />
순간을 뜻하는 'Moment'와 공간을 뜻하는 접미사 '-ia'를 결합하여 ‘예술가들의 순간을 위한 공간’이라는 의미를 지니고 있습니다.


## 1. 팀원 소개 (FE)

|              진다현              |              박상우              |
| :----------------------------: | :-----------------------------: |
| <img width="230" src="https://avatars.githubusercontent.com/u/154739298?s=400&u=ffcac1e1be1165a48832c6f33c04f9b617c70802&v=4" /> | <img width="230" src="https://avatars.githubusercontent.com/u/49917043?v=4"/> |
| [@dahyeo-n](https://github.com/dahyeo-n) | [@SangWoo9734](https://github.com/SangWoo9734) |
| 디자인 시스템, (작품)목록/(작품)업로드/컬렉션 페이지 구현, `README` 작성 | 로그인&회원가입/메인/(작품)상세/프로필 페이지 구현, 배포 |


## 2. 기술 스택
<div align="center">
  <img width="900" alt="Momentia FE Tech Stack Diagram" src="https://github.com/user-attachments/assets/081286b7-132b-45f6-8da1-0ffd095b25df" />
</div>

<br />

<details>
  <summary>&nbsp;사용 이유</summary>
  <br />

| 선택한 기술          | 사용 이유                                                                 |
|-------------------|-------------------------------------------------------------------------|
| `TypeScript`      | 정적 타입 지원으로 컴파일 단계에서 오류를 방지할 수 있고 코드의 가독성과 유지보수성을 향상시켜, 안정적인 개발 가능. 또한, 타입 정의를 통해 팀원 간의 협업 효율성을 높이고, IDE의 자동 완성 기능을 활용해 생산성 극대화 가능 |
| `Next.js`         | 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원해 SEO를 강화하고 초기 로딩 속도 개선 가능. 특히, App Router를 사용하여 파일 시스템 기반 Routing으로 유연하고 직관적인 Routing 구현 가능. 다양한 요구사항에 빠르게 대응할 수 있는 서버리스 API와 뛰어난 확장성 제공 |
| `Tailwind CSS`    | Styling의 제한이 있지만, 따로 CSS 파일을 작성할 필요 없이 컴포넌트 안에서 바로 스타일링이 가능하고 재사용 가능한 디자인 시스템을 구축할 수 있음. 커스터마이징이 용이해 빠르고 일관된 스타일링이 가능. 또한, JIT 모드를 활용하면 빌드 속도가 크게 향상된다 하여 선택. 장점이 많지만 Tailwind CSS를 사용하면서 역시 디자인의 자유도가 꽤 제한적이라 불편했음. 특히 커스텀 스타일링을 적용할 때, 기존 클래스를 덮어쓰거나 별도로 스타일을 추가하는 과정이 번거로웠음. Tailwind의 장점(빠른 개발 속도, 유지보수 용이성)을 유지하면서도, 보다 자유로운 커스텀 스타일링이 가능하도록 Tailwind의 theme 확장 또는 CSS-in-JS 도입 등 추가적인 개선 방안을 고려할 필요가 있음 |
| `TanStack Query`  | API 데이터를 관리할 때 매번 상태를 직접 만들어야 하는 게 번거로웠는데 TanStack Query를 도입하니 API 응답 데이터의 캐싱, 갱신, 무효화, retry 등이 자동화돼서 훨씬 간편. 비동기 데이터의 상태를 명확히 관리할 수 있으며 로딩, 오류, 성공 상태를 쉽게 처리할 수 있어 사용자 경험 향상 가능 |
| `Zustand`         | Redux는 설정할 게 많고 보일러플레이트 코드가 많아서 부담스러움. Zustand는 API가 간단하면서도 필요한 기능을 다 제공해줘서 선택. React의 Context API를 대체할 수 있는 성능과 상태 분리로, 구독 관리 효율성을 제공하며 코드의 가독성과 유지보수성을 향상시킴 |
| `pnpm`            | npm과 yarn을 쓰다가 pnpm으로 바꾸고 나서 패키지 설치 속도가 눈에 띄게 빨라짐. 하드 링크 방식 덕분에 디스크 공간도 절약할 수 있었고, 의존성 충돌 방지 기능으로 안정적인 개발 환경 구축 가능 |
| `Vercel` (1차 배포) | Next.js와의 연동이 좋아서 배포 과정이 매우 간단. CI/CD 파이프라인이 내장돼 있어서 GitHub에 Push하면 바로 배포 가능. 또한, 글로벌 CDN(Content Delivery Network)을 통해 전 세계 사용자에게 빠른 응답 속도를 제공하며, 커스텀 도메인 설정과 HTTPS 지원으로 보안성 강화의 이점이 있음 |

  <br />
</details>


## 3. 아키텍처 다이어그램
<div align="center">
  <h3 align="start">(1) Client-Server 간의 Data 흐름 & 상태 관리와 API 호출 관계</h3>
  <h5 align="start">* 1차 배포 Flow를 포함함</h4>
  <img width="900" alt="Momentia FE Architecture Diagram" src="https://github.com/user-attachments/assets/4d7df6bb-8674-4e86-86c4-f2871072fba4" />

  <h3 align="start">(2) 배포 Process</h3>
  <h5 align="start">* 2차 배포 Flow를 포함함</h4>
  <img width="900" alt="Deployment_Process_Architecture" src="https://github.com/user-attachments/assets/5693da94-c507-4d73-96fc-578726579e65" />
</div>


## 4. User Flow
![Momentia | User Flow](https://github.com/user-attachments/assets/0aed4e03-13a2-4c8d-925c-f885e9126d57)


## 5. 발표 자료 및 화면 구성
![서비스 아키텍처](https://github.com/user-attachments/assets/948ff9c9-9d53-445b-873a-32732fffe0ff)
![1차 데모데이 개발 기록 (1)](https://github.com/user-attachments/assets/63676082-2051-41ea-a0a4-762cf2942ef5)
![1차 데모데이 개발 기록 (2)](https://github.com/user-attachments/assets/6a6e0b8c-b442-4da2-b4ed-5e0a5bfaa6c3)
![1차 데모데이 개발 기록 (3)](https://github.com/user-attachments/assets/0c36ead3-ef98-415b-b947-6c7f7c0b9971)
![1차 데모데이 이후, 개선된 사항](https://github.com/user-attachments/assets/5ccd6b59-0249-4872-a203-302cc8c064ff)
![2차 데모데이 개발 기록 (1)](https://github.com/user-attachments/assets/08e11061-1c52-483c-95fe-85410dbbbba9)
![2차 데모데이 개발 기록 (2)](https://github.com/user-attachments/assets/72f32054-eb7f-42f9-9d13-f3ae5c1069d3)
![2차 데모데이 개발 기록 (3)](https://github.com/user-attachments/assets/c976c346-a9f4-4d06-9326-39451c4489ea)
![2차 데모데이 개발 기록 (4)](https://github.com/user-attachments/assets/02f5e85e-7a9f-4dc7-baeb-e622432ef193)
![기술적/협업 문제 해결 (1)](https://github.com/user-attachments/assets/b580f32d-c554-4fe2-bc67-a09432feea1c)
![기술적/협업 문제 해결 (2)](https://github.com/user-attachments/assets/9308bacc-ca5a-4df4-bba4-68f426bf5924)
![추후 운영/개발 계획](https://github.com/user-attachments/assets/5837565c-5bad-40b2-b3ea-f0c69c893f99)


## 6. 폴더 구조

*** 깔끔히 정리해서 추가할 예정 ***

```bash

```


<div align="right">

[목차로](#목차)

</div>
