require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <div className="notice">欢迎来到我的页面，这里表达了我对柳岩的爱</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
