import React, { useState } from 'react';
import info from '../../../images/info2.png';
// import exclusiveIcon from '../../../images/mtx.png';
import './Theme.scss';

enum SELECTED_THEME {
  GRAY = 'gray',
  WHITE = 'white',
  YELLOW = 'yellow',
  RED = 'red',
  BLUE = 'blue',
  PINK = 'pink',
  TURQUOISE = 'turquoise',
  NEON = 'neon',
}

export const Theme = (): JSX.Element => {
  const [selected, setSelected] = useState<SELECTED_THEME>(SELECTED_THEME.GRAY);

  return (
    <div>
      <div className="theme-item">
        <div className="theme-item-head">
          <span className="theme-title">Standard Themes</span>
          <img className="theme-icon" src={info} alt="info" />
        </div>
        <div className="theme-item-content">
          <div
            className={`theme-tag gray-theme ${selected === SELECTED_THEME.GRAY && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.GRAY)}
          />
          <div
            className={`theme-tag white-theme ${selected === SELECTED_THEME.WHITE && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.WHITE)}
          />
          <div
            className={`theme-tag yellow-theme ${selected === SELECTED_THEME.YELLOW && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.YELLOW)}
          />
          <div
            className={`theme-tag red-theme ${selected === SELECTED_THEME.RED && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.RED)}
          />
          <div
            className={`theme-tag blue-theme ${selected === SELECTED_THEME.BLUE && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.BLUE)}
          />
          <div
            className={`theme-tag pink-theme ${selected === SELECTED_THEME.PINK && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.PINK)}
          />
          <div
            className={`theme-tag turquoise-theme ${selected === SELECTED_THEME.TURQUOISE && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.TURQUOISE)}
          />
        </div>
      </div>
      <div className="theme-item">
        <div className="theme-item-head">
          <span className="theme-title">Exclusive Themes</span>
          <img className="theme-icon" src={info} alt="info" />
        </div>
        <div className="theme-item-content">
          {/* <div
            className={`theme-tag ${selected === SELECTED_THEME.NEON && 'theme-selected'}`}
            onClick={() => setSelected(SELECTED_THEME.NEON)}
          >
            <img className="exclusive-icon" src={exclusiveIcon} alt="" />
          </div> */}
          No exclusive theme found.
        </div>
      </div>
    </div>
  );
};