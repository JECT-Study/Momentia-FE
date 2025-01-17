<div align="center">
  <h1>Momentia (모멘티아)</h1>
  <img width="160" alt="momentia-logo" src="https://github.com/user-attachments/assets/be9da36c-77be-49f7-9172-ad51cb6430f3" />
</div>


## 배포 주소

https://momentia-fe-62do.vercel.app (향후 변경 예정)


## 목차
[0. 프로젝트 소개](#0-프로젝트-소개) <br/>
[1. 팀원 소개 (FE)](#1-팀원-소개-fe) <br/>
[2. 기술 스택](#2-기술-스택) <br/>
[3. 아키텍처 다이어그램](#3-아키텍처-다이어그램) <br/>
[4. User Flow](#4-user-flow) <br/>
[5. 화면 구성](#5-화면-구성) <br/>
[6. 폴더 구조](#6-폴더-구조)


## 0. 프로젝트 소개
> 개발 기간: 2024. 12. 5 ~

모멘티아(Momentia)는 '**무명 예술가를 위한 작품 전시 온라인 플랫폼**'입니다. <br />
순간을 뜻하는 'Moment'와 공간을 뜻하는 접미사 '-ia'를 결합하여 ‘예술가들의 순간을 위한 공간’이라는 의미를 지니고 있습니다.


## 1. 팀원 소개 (FE)

|              진다현              |              박상우              |
| :----------------------------: | :----------------------------: |
| <img width="230" src="https://avatars.githubusercontent.com/u/154739298?s=400&u=ffcac1e1be1165a48832c6f33c04f9b617c70802&v=4" /> | <img width="230" src="https://avatars.githubusercontent.com/u/49917043?v=4"/> |
| [@dahyeo-n](https://github.com/dahyeo-n) | [@SangWoo9734](https://github.com/SangWoo9734) |
| 디자인 시스템, 작품 목록 페이지, `README` 작성 | 로그인/회원가입 페이지, 메인 페이지 |


## 2. 기술 스택
<div align="center">
  <img width="900" alt="Momentia FE Tech Stack Diagram" src="https://github.com/user-attachments/assets/081286b7-132b-45f6-8da1-0ffd095b25df" />
</div>

<br />

<details>
  <summary>&nbsp;사용 이유</summary>
  <br />

| 선택한 기술         | 사용 이유                                                                 |
|------------------|-------------------------------------------------------------------------|
| `TypeScript`     | 정적 타입 지원으로 컴파일 단계에서 오류를 방지할 수 있으며, 코드의 가독성과 유지보수성을 향상시켜 대규모 프로젝트에서 안정적인 개발이 가능. 또한, 타입 정의를 통해 팀원 간의 협업 효율성을 높이고, IDE의 자동 완성 기능을 활용해 생산성을 극대화 가능 |
| `Next.js`        | 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원해 SEO를 강화하고 초기 로딩 속도를 개선 가능. 특히, App Router를 사용하여 파일 시스템 기반 라우팅으로 유연하고 직관적인 Routing 구현 가능. 다양한 요구사항에 빠르게 대응할 수 있는 서버리스 API와 뛰어난 확장성 제공 |
| `Tailwind CSS`   | 유틸리티 클래스 기반으로 불필요한 CSS 파일 작성을 줄이고, 재사용 가능한 디자인 시스템을 구축할 수 있음. CSS-in-JS와 달리 런타임 오버헤드가 없으며, 커스터마이징이 용이해 빠르고 일관된 스타일링이 가능. 또한, JIT 모드를 활용하면 빌드 속도가 크게 향상됨 |
| `TanStack Query` | API 응답 데이터의 캐싱, 갱신, 무효화, retry 등의 기능을 간편하게 구현할 수 있어 서버 상태 관리가 효율적. React와의 긴밀한 통합으로 비동기 데이터의 상태를 명확히 관리할 수 있으며, 로딩, 오류, 성공 상태를 쉽게 처리할 수 있어 사용자 경험 향상 가능 |
| `Zustand`        | Redux보다 경량화된 상태 관리 라이브러리로, 보일러플레이트 코드가 적고 간단한 API로 사용이 편리. React의 Context API를 대체할 수 있는 성능과 상태 분리로, 구독 관리 효율성을 제공하며 코드의 가독성과 유지보수성을 향상시킴 |
| `pnpm`           | 패키지 설치 속도가 빠르고, 디스크 공간을 절약할 수 있는 효율적인 하드 링크 방식으로 패키지 관리. 모노레포 프로젝트에 최적화되어 있으며, 의존성 충돌 방지 기능으로 안정적인 환경 구축 가능 |
| `MySQL`          | 데이터 구조가 명확한 관계형 데이터베이스로, 트랜잭션 지원과 데이터 무결성 보장 기능이 강력. 대규모 데이터 처리를 위한 확장성이 뛰어나며, 풍부한 커뮤니티와 문서로 안정적인 유지보수 가능 |
| `Redis`          | 데이터 조회 속도가 매우 빠른 인메모리 데이터베이스로, 실시간 데이터 처리 및 세션 관리에 최적화되어 있음. 특히, Pub/Sub 기능을 활용해 실시간 알림이나 채팅과 같은 이벤트 기반의 시스템 구축이 가능하며, TTL(Time To Live)을 통해 만료 데이터를 효율적으로 관리 가능. 비정형 데이터 처리와 키-값 저장 방식으로 단순성과 성능을 동시에 제공하며, MySQL과 함께 사용 시 캐싱 계층으로 활용해 데이터베이스 부하를 줄이고 성능을 최적화할 수 있음 |
| `Vercel`         | Next.js와의 높은 호환성 덕분에 프로젝트를 손쉽게 배포할 수 있으며, CI/CD 파이프라인이 내장되어 있어 빠른 개발과 배포 가능. 또한, 글로벌 CDN(Content Delivery Network)을 통해 전 세계 사용자에게 빠른 응답 속도를 제공하며, 커스텀 도메인 설정과 HTTPS 지원으로 보안성 강화 |

  <br />
</details>


## 3. 아키텍처 다이어그램
<div align="center">
  <img width="900" alt="Momentia FE Architecture Diagram" src="https://github.com/user-attachments/assets/373545b2-dcb8-448a-9683-17286f429a85" />
</div>


## 4. User Flow
![Momentia | User Flow](https://github.com/user-attachments/assets/0aed4e03-13a2-4c8d-925c-f885e9126d57)


## 5. 화면 구성



## 6. 폴더 구조

*** 깔끔히 정리해서 추가할 예정 ***

```bash

```


<div align="right">

[목차로](#목차)

</div>
