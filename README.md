# 作成したサイト  
[金属疲労ジェネレーター](https://marutama.github.io/fatigue-deg-generator/)

# Note
```:sh
# テンプレートの作成
npm install -g create-react-app
create-react-app fatigue-deg-generator
cd fatigue-deg-generator/
npm install material-ui
#json読込みのため
npm i json-loader --save
#型の指定のため
npm i prop-types --save
npm i create-react-class --save-dev
#material designのslider
npm install https://github.com/tariqwest/material-ui-slider-label.git
# 起動
npm start

#ビルドする
npm run build
#デプロイ
npm run deploy
```
