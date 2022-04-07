# dmoon

## 환경설정


DB : 몽고DB
.env 파일 내려받기

cd server
npm install
npm start


cd client
npm install
npm start

/////
ubuntu에서 npm run build 할때 eslint 오류 나는거 -
.env파일이 있음에도 실패 - DISABLE_ESLINT_PLUGIN=true가 필요. 

package.json에서

{
  "scripts": {
    "start": "DISABLE_ESLINT_PLUGIN=true react-scripts start",
    "build": "DISABLE_ESLINT_PLUGIN=true react-scripts build",
    "test": "DISABLE_ESLINT_PLUGIN=true react-scripts test"
  }
}
