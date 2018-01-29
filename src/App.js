import React, { Component } from 'react';
import logo from './stone-pile.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ButtonComps from './ButtonComps';
import SpecificGravityInput from './SpecificGravityInput';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import PropTypes from 'prop-types'


// http://4dev.tech/2017/12/how-to-load-a-json-file-in-reactjs/
// jsonの読込み
import data from './data/metalSpecificGravity.json';
// https://stackoverflow.com/questions/39512356/how-to-map-a-json-array-to-a-list-in-reactjs?rq=1
// JSONをリストに変換する
var metals = data.map(function (metal) {
    return {name: metal.name, symbol: metal.symbol, specific_gravity: metal.specific_gravity};
});

// ロゴはpackages/react-scripts/template/src/App.cssで回転のanimationが入っているので停止する
// http://game-icons.net/delapouite/originals/stone-pile.html
const logo_style = {
  'animation-play-state': 'paused'
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" style={logo_style}/>
          <h1 className="App-title">金属疲労ジェネレーター</h1>
        </header>
          <p>疲れたときに「身体が鉛のように重い」という人がいます。そして、金属の比重には大小あります。</p>
          <p>そこで、鉛を別の金属に置き換えることで、<strong>人間の</strong>疲労度をスケーラブルに表現できるようになりました。</p>
        <TweetTextField/>
      </div>
    );
  }
}

export default App;

// 金属比重
const specific_gravity = {
  Pb:11.35,
  Os:22.57
}
const styles = {
  fatigueDegStyle: {
    'text-align': 'left',
    margin: '40px 20px 5px 20px'
  },
  textFieldStyle: {
    // 何故か左に固定出来ない
    'text-align': 'left',
    maxWidth: '90%',
    margin: '10px 20px 10px 20px'
  },
  radioButtonGroup: {
    maxWidth: 400,
    margin: '0px 20px 0px 20px'
  },
  radioButton: {
    marginBottom: 5,
  }
};

var createReactClass = require('create-react-class');
// データの受け渡し方法
// React.jsでPropやStateを使ってComponent間のやりとりをする
// https://qiita.com/koba04/items/43200b6fd6e6f43f0d8d
// 疲労度(金属比重)を入力するスライダーと金属名等を表示するテキスト(子)
var FatigueDeg = createReactClass({
  propTypes: {
    // TextFieldに金属名を表示するための処理をI/Fとして定義
    onChange: PropTypes.func.isRequired
  },
  stateTypes: {
    // 型の指定
    // https://stackoverflow.com/questions/44573199/cannot-read-property-string-of-undefined-react-proptypes-layoutproptypes-j
    name: PropTypes.string.isRequired
  },
  // コールバックの形式
  // function(event: object, key: number, payload: any) => void
  _onChange(object,num) {
    // 親(TweetTextField)に処理を委譲する
    // console.log(num);
    // 比重から金属名を入れる
    for (var i = 0; i < 68; i++) {
        if (metals[i].specific_gravity >= num){
          this.setState({name: metals[i].name});
          this.setState({symbol: metals[i].symbol});
          this.setState({value: metals[i].specific_gravity});
          this.setState({percent: (metals[i].specific_gravity/specific_gravity.Os*100).toFixed(1)})
          break;
        }
    }
    this.props.onChange(this.state.name);
  },
  // 初期値
  getInitialState() {
    return {
      name   : "鉛",
      symbol : String("Pb"),
      value  : specific_gravity.Pb,
      percent: (specific_gravity.Pb/specific_gravity.Os*100).toFixed(1)
    };
  },
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <p style={styles.fatigueDegStyle}>
            金属名：{this.state.name}<br />
            比重 , 密度：{this.state.value}（g・cm^-3）<br />
            (人の)疲労割合：{this.state.percent}%
          </p>
        </div>
        <div>
          <SpecificGravityInput onChange={this._onChange} symbol={this.state.symbol}/>
        </div>
      </MuiThemeProvider>
    );
  }
});

// 文言を変えるラジオボタン(子)
var SentenceRadioButtons = createReactClass({
  propTypes: {
    // TextFieldに金属名を表示するための処理をI/Fとして定義
    onChange: PropTypes.func.isRequired
  },
  stateTypes: {
    // 型の指定
    value: PropTypes.string.isRequired
  },
  // 初期値
  getInitialState() {
    return {
      value: "light"
    };
  },
  // コールバックの形式
  // function(event: object, value: object) => void
  _onChange (event,value) {
    // this.props.store.updateValue(event.target.name,  event.target.value);
    this.setState({value: value});
    // 親(TweetTextField)に処理を委譲する
    this.props.onChange(this.state.value);
  },
  render: function() {
      return (
        <MuiThemeProvider>
          <RadioButtonGroup name="shipSpeed" defaultSelected="light" style={styles.radioButtonGroup} onChange={this._onChange}>
            {/* 入れ替わるので反対になる */}
            <RadioButton
            value="heavy"
            label="◯◯のように身体が軽い"
            style={styles.radioButton}
            />
            <RadioButton
              value="light"
              label="◯◯のように身体が重い"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </MuiThemeProvider>
      )
  }
});

// tweetするテキストを表示する(親)
var TweetTextField = createReactClass({
  getInitialState: function() {
        return {
            matalName: '鉛',
            sentence : '重い',
            tweetText: '鉛のように身体が重い',
            link     : "https://twitter.com/intent/tweet?text=鉛のように身体が重い%0a&url=https://marutama.github.io/fatigue-deg-generator/&hashtags=金属疲労ジェネレーター,鉛"
        };
    },
    _handleTextFieldChange: function(e) {
        this.setState({
            tweetText: e.target.value
        });
    },
    // 子(FatigueDeg)からコールバックされる
    onChange4FatigueDeg: function(name) {
      // console.log(name);
      this.setState({
          matalName: name
      });
      this.setTweet(name, this.state.sentence);
    },
    // 子(SentenceRadioButtons)からコールバックされる
    onChange4SentenceRadioButtons: function(value) {
      var tmp;
      // console.log(value);
      if(value === "heavy") {
        tmp = "重い"
      };
      if(value === "light") {
        tmp = "軽い"
      };
      console.log(tmp);
      this.setState({
          sentence: tmp
      });
      // setStateすると反映されるのがワンテンポ遅い？なので直接tmpで渡す
      this.setTweet(this.state.matalName, tmp);
    },
    setTweet: function(matalName,sentence) {
      var text = matalName + "のように身体が" + sentence;
      console.log(text);
      this.setState({
          tweetText: text,
          link     : "https://twitter.com/intent/tweet?text=" + text + "%0a&url=https://marutama.github.io/fatigue-deg-generator/&hashtags=金属疲労ジェネレーター," + matalName
      });
    },
    render: function() {
        return (
            <MuiThemeProvider>
                {/* comp化したら何故か動かんかった(泣 */}
                <TextField style={styles.textFieldStyle}
                  multiLine={true}
                  rows={2}
                  fullWidth={true}
                  value={this.state.tweetText}
                  onChange={this._handleTextFieldChange} />
                <SentenceRadioButtons onChange={this.onChange4SentenceRadioButtons}/>
                <FatigueDeg onChange={this.onChange4FatigueDeg}/>
                <ButtonComps link={this.state.link}/>
            </MuiThemeProvider>
        )
    }
});
