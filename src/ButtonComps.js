import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};
const ButtonComps = ({onClick, link}) => (
  <div>
    {/*
      https://qiita.com/coconeko/items/dcd3a004578e02f63da5
      twitterのツイートボタンを作るためのリンクshareとintent/tweet
    */}
    <a href={link} onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow" class="twitter-link">
      <RaisedButton label="Tweet" style={style} primary={true}/>
    </a>
  </div>
);

export default ButtonComps;
