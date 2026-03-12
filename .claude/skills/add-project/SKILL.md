---
name: add-project
description: 포트폴리오 프로젝트 데이터를 추가하거나 수정합니다. raw 텍스트를 파싱해 portfolio-projects.json에 구조화된 데이터로 저장합니다.
---

포트폴리오 프로젝트 데이터를 추가하거나 수정합니다.

아래 형식의 raw 텍스트를 파싱해 `src/data/portfolio-projects.json`에 구조화된 데이터로 저장합니다.

## 데이터 스키마

```typescript
interface PortfolioProject {
  id: string; // 영문 kebab-case (프로젝트명 기반)
  title: string; // 프로젝트 이름
  type: "side" | "work"; // "side": 사이드 프로젝트, 개인 프로젝트 | "work"
  period: {
    start: string; // "YYYY.MM"
    end: string; // "YYYY.MM" | "present"
  };
  role: string; // 실제 담당 역할 범위를 구체적으로 (예: "기획 · 디자인 · 프론트엔드 개발")
  tags: string[]; // 기술 스택
  summary: string; // 카드에 표시할 한 줄 소개 (1문장, 30자 내외)
  overview: string; // 프로젝트 배경·동기·목표 (2~3문장)
  keyContributions: string[]; // 주요 기여 항목 (각 항목은 행동 + 결과/의미를 담은 1문장)
  takeaway: string; // 이 프로젝트가 드러내는 나의 역량·특성·관점 (1~2문장)
  color: string; // Tailwind gradient (예: "from-purple-500 to-pink-500")
  size: "large" | "medium" | "wide" | "tall"; // 벤토 그리드 카드 크기
  links: {
    demo?: string;
    code?: string;
  };
}
```

## 작업 순서

1. `src/data/portfolio-projects.json` 파일을 읽는다 (없으면 빈 배열 `[]`로 시작)
2. `$ARGUMENTS`의 raw 텍스트를 파싱해 스키마에 맞게 구조화한다
   - `id`: 프로젝트 제목을 영문으로 변환한 kebab-case
   - `type`: 사이드 프로젝트 → `"side"`, 회사 업무 → `"work"`
   - `role`: 실제 담당한 역할 전체를 나열 (단순 "개발"보다 구체적으로)
   - `color`: 프로젝트 분위기·도메인에 어울리는 Tailwind gradient 조합을 임의로 선정
   - `size`: 프로젝트 규모·중요도를 고려해 임의로 선정 (`large` > `wide`/`tall` > `medium`)
   - `summary`, `overview`, `keyContributions`, `takeaway`: 아래 **콘텐츠 작성 원칙** 참고
3. 동일 `id`가 존재하면 덮어쓰고, 없으면 배열에 추가
4. 파일을 저장한다
5. 추가/수정된 항목의 핵심 내용을 요약해서 보여준다

## 콘텐츠 작성 원칙

입력 텍스트를 그대로 옮기지 말고, 포트폴리오 독자(채용 담당자, 동료 개발자)에게 인상을 남길 수 있도록 **내용을 풍부하게 확장**한다. AI 가 작성한 것 같은 느낌을 최대한 줄이고 딱딱한 느낌을 없앤다. 문체는 "~했음", "~하였음" 형태로 통일한다 ("~했다", "~하였다" 사용 금지).

### Summary

- 카드에 노출되는 **한 줄 소개**로, 프로젝트의 핵심을 압축해서 담는다
- 30자 내외, 1문장, 반드시 "~ 한 프로젝트"로 끝낸다
- "왜 만들었나" 또는 "무엇을 해결했나"를 중심으로

### Overview

- 단순 기능 설명이 아닌, **왜 만들었는가**(문제 인식·동기)와 **무엇을 목표로 삼았는가**를 담는다
- 기존 솔루션의 한계나 불만족 지점을 구체적으로 서술하면 동기가 명확해진다
- 2~3문장 분량

### Key Contributions

- 각 항목은 **행동 + 결과/의미**로 구성한다 ("~했음" 형태로, "~함으로써 ~를 달성했음")
- 기술적 구현뿐 아니라 UX·기획·디자인 등 기여의 범위도 드러낸다
- 입력에 명시되지 않았더라도 맥락상 자연스럽게 유추되는 기여는 추가할 수 있다
- 항목 수는 3~5개 권장

### Takeaway

- 이 프로젝트가 **나라는 사람의 어떤 면**을 보여주는지 서술한다
- 단순 기술 습득 요약이 아닌, 사고방식·태도·관점·역량을 언급한다
- 1~2문장

## 입력

$ARGUMENTS
