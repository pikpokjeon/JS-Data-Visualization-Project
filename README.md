# Data Visualization Projects 
- Demo Pages <br />
<a href="https://pikpokjeon.github.io/JS-Data-Visualization-Project/Algorithms/binarySearch.html">1. Binary Search</a> <br />
<a href="https://pikpokjeon.github.io/JS-Data-Visualization-Project/Charts/index.html">2. Line Charts</a>

### I am aiming at ... 
- developing this listed projects without any help of foreign JS libraries
- containing at least one with custom interactive animation 
- using interactive and dynamic data given by users 
- Creating a chart web-component system

### HOW TO RUN 
- git clone this repo
- make sure there's at least a dozen of html and js files in the project folder you found it interesting
To start Chart project
```
npm run parcel
```
To start Binary search
- Just drag and drop the html file to your choice of browser!

## Project List

### 1. Algorithms 
### (1) Binary search
#### Last update (17,Apr) : TODO > Add searching failure case, adjust and maintain its width

![demonstration-webpages](https://github.com/pikpokjeon/JS-Data-Visualization-Project/blob/main/bs.gif)

### 2. Chart 
### (1) Line chart
##### Last update (24,Apr): TODO > make width responsive

![demonstration-webpages](https://github.com/pikpokjeon/JS-Data-Visualization-Project/blob/main/linechart.gif)

## Pub/sub 서비스 ? 
- 메시지 전송자(Publisher)가 메시지 수신자(Subscriber)와 분리되는 메시징 서비스
```
상에서 하로 진행, 한가지 주제에 일대다 다대일 다대다 관계 성립가능.
1. Publisher (pub/sub 서비스 주제 생성) publish message to topic to make subscribtion
2. Message (페이로드/컨텐츠설명하는 속성) 
3. Topic -> MessageStorage (메시지는 구독자가 메시지를 소비할 때까지 구독에 보관)
4. Subscription (개별 구독으로 이동)
5. Message
6. Subscriber (수신된 메세지에 승인) subscribe Subscription(published message)
(확인된 메세지는 삭제)
```
#### 주요 개념
```
메시지: 서비스를 통해 이동하는 데이터.
주제: 메시지 피드를 나타내는, 이름이 지정된 항목.
구독: 특정 주제의 메시지 수신을 받고자 하는, 이름이 지정된 항목.
게시자(publisher): 특정 주제에 대한 메시지를 만들어 메시징 서비스로 전송(게시)합니다.
구독자(subscribe): 지정한 구독에 대한 메시지를 수신합니다.
```
#### SVG 라이브러리 구조
- Topic 메세지(상태)를 관리하는 스토어 (MessageStorage)
- svg 요소와 사용자 입력데이터에 대한 주제
- 새로운 메세지를 생성하는 메서드 (Publisher) 주체
- 발행된 메세지가 가공되 이동하는 파이프라인 ->  Subscriber로 이동
- Subscriber가 메세지를 수신하면, 승인 (update)를 진행