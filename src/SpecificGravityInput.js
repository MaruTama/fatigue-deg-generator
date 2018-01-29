// 参考
// https://github.com/tariqwest/material-ui-slider-label
import React from 'react';
import Slider from 'material-ui-slider-label/Slider';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  sliderStyle: {
    margin: '40px 20px 0px 20px', // 余白（上）（右）（下）（左）
    maxWidth: 400,
  },
  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: cyan500,
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '3px',
    right: '0px',
    fontSize: '10px',
  },
};

// 金属比重
const specific_gravity = {
  Li:0.534,
  Pb:11.35,
  Os:22.57
}

const SpecificGravityInput = ({ symbol, onChange}) => (
  <div>
    <Slider style={styles.sliderStyle}
      defaultValue={specific_gravity.Pb}
      min={specific_gravity.Li}
      max={specific_gravity.Os}
      onChange={onChange}
      label={
        <div style={styles.labelStyleOuter}>
          <div style={styles.labelStyleInner}>
            {symbol}
          </div>
        </div>
      }
    />
  </div>
);

export default SpecificGravityInput;
