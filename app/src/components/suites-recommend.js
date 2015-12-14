var React = require('react');
var PropTypes = React.PropTypes;

var SuitesRecommend = React.createClass({

    render: function() {
        return (
            <li className="mgb20">
              <div className="pos-box">
                <a className="img-box"><img src="http://placehold.it/300x240"/></a>
                <span className="price transition-opacity">¥2899.00(定金300)</span>
                <p className="transition-opacity-margin">
                  拍摄时间：<b>1天</b><br/>
                  礼服造型：<b>自选4款高档婚纱</b><br/>
                  拍摄地点：<b>室内＋中央公园</b><br/>
                  拍摄样片：<b>90张以上</b><br/>
                  精修数量：<b>50张</b>
                </p>
                <div className="mask-bg transition-height"></div>
              </div>
              <div className="title"><h2>金色百年特惠轻舞飞扬套系</h2></div>
            </li>
        );
    }

});

module.exports = SuitesRecommend;
