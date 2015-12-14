var React = require('react');
var PropTypes = React.PropTypes;

var MyCenter = React.createClass({

    render: function() {
        return (

                <div className="user-process-management container">
                  <div className="responsive-box">
                    <div className="mask-bg"></div>
                    <div className="overall-division-box">
                      <a className="avatar-box"><img src="images/test/item_2.png"/></a>
                      <div className="info">
                        <b className="name">林梦瑶</b><br/>
                        <span className="mine">我的统筹师</span><br/>
                        <span className="phone">13030000000</span>
                      </div>
                      <div className="addr-box"><i></i><span className="btn"><b>重庆</b><i className="arrow-3-js arrow-3-white-bottom-1-js"></i></span></div>
                      <i className="ico-11-js"></i>
                    </div>
                    <ul className="list-21-js">
                      <li className="item-box item-current-box">
                        <div className="info-box">
                          <h3>出外景</h3>
                          <p>
                            <span>2015-02-03</span><br/>
                            <span>中央公园</span><br/>
                            <span>02366738334</span><br/>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚纱摄影</span></div>
                      </li>
                      <li className="item-box">
                        <div className="info-box">
                          <h3>尚未完成</h3>
                          <p>
                            <span>建议在婚期<br/>的半年前完成</span>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚宴预订</span></div>
                      </li>
                      <li className="item-box">
                        <div className="info-box">
                          <h3>尚未完成</h3>
                          <p>
                            <span>建议在婚期<br/>的半年前完成</span>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚礼策划</span></div>
                      </li>
                      <li className="item-box">
                        <div className="info-box">
                          <h3>尚未完成</h3>
                          <p>
                            <span>建议在婚期<br/>的半年前完成</span>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚礼钻戒</span></div>
                      </li>
                      <li className="item-box">
                        <div className="info-box">
                          <h3>尚未完成</h3>
                          <p>
                            <span>建议在婚期<br/>的半年前完成</span>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚纱礼服</span></div>
                      </li>
                      <li className="item-box">
                        <div className="info-box">
                          <h3>尚未完成</h3>
                          <p>
                            <span>建议在婚期<br/>的半年前完成</span>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚庆用品</span></div>
                      </li>
                      <li className="item-box item-current-box">
                        <div className="info-box">
                          <h3>已预定</h3>
                          <p>
                            <span>定金400元</span><br/>
                            <span>4月21日已支付</span>
                          </p>
                        </div>
                        <div className="title-box transition-bg"><span>婚庆用车</span></div>
                      </li>
                    </ul>
                    <div className="btn-box">
                      <span className="btn-1 transition-bg"><i className="ico-13-js"></i>婚礼进程</span>
                      <span className="btn-1 transition-bg"><i className="ico-14-js"></i>个人中心</span>
                    </div>
                    <span className="btn-close ico-12-js"></span>
                  </div>
                </div>
        );
    }

});

module.exports = MyCenter;
