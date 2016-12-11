require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from "react-dom";

// 获取图片相关的数据
let imageDatas = require('../data/inputDatas.json');

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

    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }

    return(
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imgURL}
              alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
});

let getRangeRandom = function (low, high) {
  return  Math.ceil(Math.random()*(high-low)+low);
};


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.Constant = {
      conterPos: {
        left:0,
        right:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    };
    this.state = {
      imgsArrangArr:[]
    }
  }

  //组件加载以后，为每张图片计算位置
  componentDidMount(){
    // 首先拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 拿到一个imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rerrange(0);
  }

  //布局所有
  rerrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeleftSecX =hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2),
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    //居中图片
    imgsArrangeCenterArr[0].pos = centerPos;

    topImgSpliceIndex = Math.ceil(Math.random(1) * (
      imgsArrangeArr.length - topImgNum
      ));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum)

    //布局上侧图片
    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index].pos = {
        top:getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
      }
    });

    //布局两侧的图片
    for (let i = 0,j = imgsArrangeArr.length, k = j/2; i<j; i++ ) {
      let hPosRangeLORX = null;
      if (i < k) {
        hPosRangeLORX = hPosRangeleftSecX
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }
      imgsArrangeArr[i].pos = {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      };
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0 , imgsArrangeArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0 , imgsArrangeCenterArr[0]);
    console.log(imgsArrangeArr);

    this.setState({
      imgsArrangArr:imgsArrangeArr
    })
  }

  render() {

    let controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach(function (value,index) {
      if (!this.state.imgsArrangArr[index]) {
        this.state.imgsArrangArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        };
      }
      imgFigures.push(<ImgFigure data={value}
                    ref={"imgFigure"+index} arrange={this.state.imgsArrangArr[index]}/>)
      }.bind(this)
    );
    return (
      <section className="stage" ref="stage">
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
