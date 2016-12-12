/**
 * Created by jianghan on 2016/12/12.
 */

import React from 'react';
require('styles/ImgFigure.css');
require('normalize.css/normalize.css');


class ImgFigure extends React.Component {

  render  () {
    console.log(this.props.inverse);
    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }

    if(this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(
        function (value) {
          styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
        }.bind(this)
      );
    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? '-is-inverse':'';

    return(
      <figure className={ imgFigureClassName } style={ styleObj }  >
        <img src={this.props.data.imgURL}
             alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" >
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export  { ImgFigure };
