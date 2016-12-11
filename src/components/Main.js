require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// 获取图片相关的数据
let imageDatas = require('../data/inputDatas.json');

let yeomanImage = require('../images/3.png');

//获取图片地址
function genImageURL(imageDatasArr) {
  return  imageDatasArr.map(function (data) {
          data['imgURL'] =  require('../images/'+data.fileName);
          return data;
  });
}
imageDatas = genImageURL(imageDatas);

var ImgFigure = React.createClass ({
  render : function () {
    return(
      <figure className="img-figure">
        <img src={this.props.data.imgURL}
              alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
});


class AppComponent extends React.Component {
  render() {
    let controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach(function (value) {
      imgFigures.push(<ImgFigure data={value}/>)
      }
    )
    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
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
