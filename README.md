# DMoon
![image](https://user-images.githubusercontent.com/91652033/163070222-1000af39-2794-46ee-ad80-6b60081790cc.png)   
http://dmoon.ml/ test/test   
간단한 기능을 가진 일기장 웹 앱   
기본적인 일기장 구성에 추가로 친구 기능을 만들어 홈의 타임라인에서 친구의 일기장도 볼 수 있으며 반응을 남길 수도 있습니다.   


front-end : React, Redux, React-bootstrap, styled-components, axios   
back-end : nodejs, Express, mongoose   
DB : mongoDB   

## 환경설정
.env에 PORT와 MONGODB_URL 입력하기   
cd server   
npm install   
npm start   

cd client   
npm install   
npm start   

////////////
ubuntu에서 client - npm run build 할때 eslint 오류 발생.   
DISABLE_ESLINT_PLUGIN=true 내용이 담긴 .env파일이 있음에도 실패   
package.json에서   

    {
      "scripts": {
        "start": "DISABLE_ESLINT_PLUGIN=true react-scripts start",
        "build": "DISABLE_ESLINT_PLUGIN=true react-scripts build",
        "test": "DISABLE_ESLINT_PLUGIN=true react-scripts test"
      }
    }
