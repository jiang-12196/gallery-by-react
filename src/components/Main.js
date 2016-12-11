require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// 获取图片相关的数据
let imageDatas = require('../data/inputDatas.json');

let yeomanImage = require('../images/3.png');

//获取图片地址
function genImageURL(imageDatasArr) {
  return  imageDatasArr.map(function (data) {
          return require('../images/'+data.fileName)
  });
}
imageDatas = genImageURL(imageDatas);


class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
