
 # PubSub Pattern
<정리중>

 Publisher (pub/sub) -> Storage -> Broker -> Subscriber (client)
 - 한 구독은 하나의 주제에 연결,
 - 한 주제에 여러 구독 존재가능.
 - 메세지를 확인하지 않으면 대기상태, 여러번 전달.
 - 구독 없이 주제에 게시된 메세지는 구독자에게 전달되지 않음.
 - 구독한 토픽의 게시자가 메세지에 순서토큰을 지정하여 순서처리 가능.

## 토픽
 pubsubClient.createTopic(topic)생성 / 삭제 / 전체나열  주제에서 구독분리 (detach)
 구독생성 createSubscription
 내보내기 전송 구독 생성 ( 디폴트는 가져오기) 
 createPushSubscription ( pushConfig, pushEndpoint )

## 메세지 스케마
 publisher / topic_id
 data = {name:'aa',num:2} 데이터를 예시로
 publisher.getTopic(req:topic)
 publisher.publish ( topic, data)

메세지 일괄처리
 batchPublisher = pubsubClient.topic(topiic, batching).publish(data)

## 구독
 가져오기 -> 구독자 앱이 서버에 메시지 요청, (검색요청) (찾습니다~)
 내보내기 -> 서버가 구독자앱에 메시지 수신요청, 엔드포인트에 전송 (받아주세요~)

## 게시
pubsubClient 는 apiEndpoint 지정해서 생성
 메세지형식: 데이터
 순서키 : 구독자 등록순서 혹은 메세지 지정순서
 속성(메타데이터) - origin..
 pubsubClient.topic(topic).publish(msg)
 creates a client and cache it for further use/

## 수신
 ### 가져오기
 subClient -> 메세지를 받는 주체: subscriber -> worker 함수에 메세지 전달
 request -> subscriptionName -> request: topic/ message -> isProcessed? (Ack)
 [res] = await subClient.pull(req)
 worker(res)
 while(waiting) await new Promise (res => setTimeout(res,1000)) 데이터 수신 시간을 제한해야 하는경우
 if(isProcessed) ackReq : subscription/ id
 await subClient.Ack(ackReq) 수신을 알림

 ### 내보내기
 pubsub서비스가 푸시 엔드포인트로 메세지전송


배치
-일괄 처리란 최종 사용자의 개입 없이 또는 실행을 스케줄링할 수 있는 작업의 실행. 병렬적으로 자료를 처리하는 방식
