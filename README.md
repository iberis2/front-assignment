# Todo list

이 프로젝트는 Next.js와 React를 기반으로 한 Todo 애플리케이션입니다. \
프로젝트는 TypeScript로 작성되었으며, 상태 관리를 위해 @tanstack/react-query를 사용하고 있습니다. \
json-server를 사용하여 간단한 백엔드 API 서버도 제공합니다.

## Table of Contents

- [요구사항 및 실행 방법](#요구사항_및_실행_방법)
- [스크립트](#스크립트)
- [사용 기술 스택](#사용_기술_스택)
- [구현 사항](#구현_사항)

## 요구사항 및 실행 방법

### 요구 사항

- Node.js (최소 버전: 16.0.0)
- Yarn (패키지 매니저)

### 설치 방법

```bash
# 저장소를 클론합니다
git clone <repository-url>
cd todo

# dependency 를 설치합니다.
yarn install
```

### 실행 방법

```bash
# jason server 실행
yarn run server

# 개발 모드 애플리케이션 실행
yarn run dev
```

## 스크립트

```json
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "format": "prettier --cache --write .",
  "lint": "next lint --cache",
  "tsc": "tsc -p tsconfig.json --noEmit",
  "prepare": "husky",
  "server": "json-server --watch ./src/data/dummy.json --port 8080"
```

## 사용 기술 스택

- Next js
- Typescript
- Tanstack Query
- Scss
- json server

## 구현 사항

| 구현 사항                          | 이미지                                                            | 설명                                                                                                          |
| ---------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 반응형 디자인                      | ![](https://ifh.cc/g/ggGmog.jpg) ![](https://ifh.cc/g/vFfqKY.png) | /todo-list, /todo-list/:id 페이지에 각 데스크탑, 모바일 버전의 반응형 디자인이 적용되어 있습니다.             |
| loading                            | ![](https://ifh.cc/g/OqvgA7.png)                                  | 할 일 추가, 수정, 삭제 시 pending 상태 동안 loading spinner 가 적용되어 있습니다.                             |
| error                              | ![](https://ifh.cc/g/lG0lDa.jpg)                                  | api 요청 실패 시 toast 가 적용되어 있습니다.                                                                  |
| 업데이트 취소에 대한 변동사항 체크 | ![](https://ifh.cc/g/k3Nnrk.png) ![](https://ifh.cc/g/ck2pO8.png) | 업데이트 취소 시, 변동사항이 없는 경우 바로 취소되며, 변동사항이 있는 경우 alert-dialog 를 통해 재확인 합니다 |

### Button 컴포넌트

- `success`, `info` , `error` , `default` , `disabled` 색상을 가집니다.
- `s`, `m`, `l` 사이즈를 가집니다.
- disabled 된 상태로 로딩 스피너 ui 를 가지는 `isLoading` 상태를 가집니다.

### Dialog 컴포넌트

- radix ui 를 참고하여 react portal 을 사용하여 컴파운드 컴포넌트 형태로 구현하였습니다.
