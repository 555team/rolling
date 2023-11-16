<div align="center"> 
  <img width="50%" alt="스크린샷 2023-11-16 오후 3 57 36" src="https://github.com/codeit-1st-team5/rolling/assets/72639353/d85314c1-eddc-4430-843a-f0bcd4d7db4c">
</div>

<div align="center">
<br />  
추억과 메시지를 디지털 롤링 페이퍼로 손쉽게 공유하고 저장할 수 있는 웹, 모바일 서비스 입니다.

> ✨✨여러분의 소중한 순간들을 가장 특별한 방식으로 기록하고 나누세요!✨✨

</div>

<br />

## 📝 목차

- [프로젝트 소개](#📩-프로젝트-소개)
- [Team](#👥-team)
- [역할](#🔎-역할)
- [Quickstart Guide](#➡-quickstart-guide)
- [메인 기능](#📚-메인-기능)
- [UI](#🎨-ui)
- [Link](#🔗-link)

<br />

## 📩 프로젝트 소개

> 프로젝트 이름: 누구나 쉽게 만드는 온라인 롤링 페이퍼, Rolling <br />
> 프로젝트 지속 기간: 2023.11.01 - 2023.11.16 <br />
> 개발 언어: Javascript & HTML & CSS <br />
> 팀: sprint 1-5팀 <br />

 <br />

Rolling은 인터넷 상에서 자유롭게 롤링페이퍼를 만들고, 편지를 쓰고자 만들어진 웹사이트입니다. Rolling에서는 일반 롤링페이퍼에서 더 나아가 자신의 이모티콘을 등록하고, 링크나 카카오톡 공유 기능을 통해 누구에게나 페이퍼를 공유할 수 있습니다.

Rolling is a website designed to create memory books and write letters freely on the Internet. In Rolling, you can go beyond regular memory books and register your own emoticons, and share the paper with anyone through the link or Kakao Talk sharing function.

<br />

## 👥 Team

|                                                                      [김진우](https://github.com/woody)                                                                      |                                                                      [이슬](https://github.com/olseul)                                                                       |                                                                        [홍재원](https://github.com/Hongjw030)                                                                        |                                                                        [강현지](https://github.com/kanglocal)                                                                        |                                                                         [이태희](https://github.com/lte1807)                                                                         |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img alt="스크린샷 2023-11-16 오후 4 12 44" src="https://github.com/codeit-1st-team5/rolling/assets/72639353/fceb6f15-e478-415d-97d9-0598b0757baf" width="150" height="160"> | <img alt="스크린샷 2023-11-16 오후 4 19 00" src="https://github.com/codeit-1st-team5/rolling/assets/72639353/7f57075f-18c2-46f7-b523-8c68ceb7fec9" width="150" height="160"> | <img alt="스크린샷 2023-11-16 오후 4 44 49" src="https://github.com/codeit-1st-team5/rolling/assets/72639353/55944667-53b7-400b-b1fd-fc5320253af6" width="150" height="160"> | <img alt="스크린샷 2023-11-16 오후 5 42 14" src="https://github.com/codeit-1st-team5/rolling/assets/72639353/c955af71-e474-4a24-bc4b-924444317249" width="150" height="160"> | <img alt="스크린샷 2023-11-16 오후 4 27 21" src="https://github.com/codeit-1st-team5/rolling/assets/72639353/93acd345-7762-4087-8da6-a768c7a680cd" width="150" height="160"> |

<br />

## 🔎 역할

> 김진우 🚀 - post/{id} 페이지, 무한 스크롤, 수정하기 페이지, 롤링페이퍼 삭제, 메세지 삭제, useRequest hook <br />
> 이슬 😺 - 카드 캐러셸, 터치스크롤, 롤링페이퍼 카드 기능 구현 디자인, 롤링페이퍼 인기순 최신순으로 정렬 <br />
> 홍재원 🍀 - 카카오톡 공유 및 링크 복사 기능, 버튼, 모달 구현, nav 바, 텍스트 에디터 구현 <br />
> 강현지 🐳 - 랜딩 페이지, /post 페이지, /post/{id}/message 페이지, Header Service의 일부 컴포넌트 <br />
> 이태희 🍇 - 이모지 버튼 및 팝오버, 이모지 추가하기, Header-service 바 구현 <br />

<br />

## 💻 Front-End

| <img width= 50 src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557331/noticon/d5hqar2idkoefh6fjtpu.png"> | <img width= 50 src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568851518/noticon/lwj3hr9v1yoheimtwc1w.png"> |
| :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
|                                                            React                                                             |                                                      Styled-Components                                                       |

<br />

## ➡ Quickstart Guide

#### requirement

- axios: ^1.6.0
- dompurify: ^3.0.6
- dotenv: ^16.3.1
- emoji-picker-react: ^4.5.15
- moment: ^2.29.4
- "react: ^18.2.0
- react-dom: ^18.2.0
- react-quill: ^2.0.0
- react-router-dom: ^6.18.0
- react-select: ^5.8.0
- react-toastify: ^9.1.3
- styled-components: ^6.1.0
- swiper: ^6.8.4
- web-vitals: ^2.1.4

#### installation

```
$ git clone https://github.com/codeit-1st-team5/rolling.git
$cd rolling

$ npm install
$ npm start run
```

<br />

## 🎨 UI

- LandingPage.
  ![landing](https://github.com/codeit-1st-team5/rolling/assets/89698149/a36a97fd-e485-4273-a5e6-6be41e8d73a1)

- background color selection
  ![postColor](https://github.com/codeit-1st-team5/rolling/assets/89698149/3a24f499-36a7-4021-8ea4-3b2135755eed)

- background image selection
  ![postPicture](https://github.com/codeit-1st-team5/rolling/assets/89698149/f331ae88-652e-42f8-a447-e835eb775afc)

- ListPage
  ![list](https://github.com/codeit-1st-team5/rolling/assets/89698149/9171b0f4-504c-401f-a35f-f495c00a47eb)

- CardsList
  ![cards](https://github.com/codeit-1st-team5/rolling/assets/89698149/e14a76c0-a7bd-4d86-b406-0e276f1c8ba8)

- Modal
  ![modal](https://github.com/codeit-1st-team5/rolling/assets/89698149/46597e64-4005-456c-8646-0b70c6a9a120)

- CreateMessage
  ![message](https://github.com/codeit-1st-team5/rolling/assets/89698149/f068dbfb-6f83-4c75-a7c8-86e171700be6)

<br />

## 📚 메인 기능

- 사용자들이 온라인에서 롤링 페이퍼를 만들고, 공유할 수 있도록 다양한 기능을 제공합니다.

- 주요 기능으로는 롤링 페이퍼 생성 및 수정하고 메시지를 보내고 리액션을 남길 수 있습니다.

- 반응형 웹 디자인을 지원하며, 사용자가 롤링 페이퍼에 직접 메시지를 추가하고 친구나 지인들과의 공유 기능이 있습니다.

<br />

## 🔗 Link

[Rolling](https://rolling-codeit-1st-team5.netlify.app/) : 누구나 쉽게 만드는 롤링페이퍼
