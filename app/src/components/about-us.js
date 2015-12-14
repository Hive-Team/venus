var React = require('react');
var PropTypes = React.PropTypes;

var AboutUs = React.createClass({

  render: function() {
    return (
      <div className="with-us-box container" id='AboutUs'>
        <div className="responsive-box mgb50 clearfix">
          <div className="left-box mgr40">
            <h1>金色百年</h1>
            <div className="line-1" />
            <div className="intr"><span>时尚</span><b>·</b><span>个性</span><b>·</b><span>品质</span></div>
          </div>
          <div className="right-box">
            <a className="img-box" href="http://www.jsbn.com">
              <img src="http://image.jsbn.com/static/top.jpg" />
            </a>
          </div>
        </div>
        <div className="with-us-box responsive-box clearfix">
          <div className="title-8-js"><h1>金色百年</h1></div>
          <ul className="list-1-js list-1-2-js mgb50 clearfix">
            <li className="column-mg20-8 mgr30">
              <a className="img-box" href="http://www.jsbn.com">
                <img src="http://image.jsbn.com/static/left.png" />
              </a>
              <div className="title">
                <span>GOLDEN WEDDING</span>
                <span className="en">公司简介</span>
              </div>
              <p>
金色百年婚礼服务集团是以全新的服务理念、优化的业务模式，为婚礼提供全流程高品质服务的专业性集团公司。其前身为重庆金色百年婚礼策划有限公司，是重庆极具知名度和美誉度的婚庆品牌，每年为上千对新人策划并执行了浪漫、幸福、完美的婚礼庆典。
              </p>
            </li>
            <li className="column-mg20-8 mgr30">
              <a className="img-box" href="http://www.jsbn.com">
                <img src="http://image.jsbn.com/static/mid.png" />
              </a>
              <div className="title">
                <span>GOLDEN WEDDING</span>
                <span className="en">服务范围</span>
              </div>
              <p>
                  我们在见证每一对新人幸福的同时，也感到无比的甜蜜和骄傲，但同时也深感歉意，因为在新人完整的婚礼筹备过程中，我们只能提供到有限的帮助和服务。大部分新人在整个婚礼过程中，都会涉及到婚纱摄影、婚戒钻石、婚宴预订、婚庆定制、婚纱礼服、婚礼用品、婚礼租车、婚礼微电影等服务与商品的购买，由于目前婚礼产业链上各商家的分散且行业服务水平整体不高，让新人本该愉悦、浪漫、幸福的婚礼旅程，时常会感到纠结、困惑、疲惫。
      我们下决心要为新人提供更多更优质的服务，让婚礼变得更加时尚、浪漫、充满个性，让新人在整个婚礼旅程中感受到轻松、愉悦、幸福，在提供高品质服务的同时，还要做到消费透明和高性价比。为此，我们云集业内各专业人士组成多个专业团队，在经营模式、服务流程、资源整合等方面，积极开拓创新。
              </p>
            </li>
            <li className="column-mg20-8 last">
              <a className="img-box" href="http://www.jsbn.com">
                <img src="http://image.jsbn.com/static/right.png" />
              </a>
              <div className="title">
                <span>GOLDEN WEDDING</span>
                <span className="en">服务团队</span>
              </div>
              <p>
                  经一年的筹备，金色百年婚礼服务集团诞生了，我们的使命就是为婚礼提供全流程优质服务，让婚礼更加时尚、个性、高品质，也让新人更加轻松、愉悦、幸福。
  为保证服务品质,我们目前暂时先开通婚纱摄影、婚庆定制线下服务和部分线上服务，其它服务项目及在线功能，将在9-10月逐步开通，敬请期待。谢谢！
              </p>
            </li>
          </ul>
          <div className="title-8-js mgb20" id='ContactUs'>
            <h1>联系我们</h1>
          </div>
          <div className="map-box mgb50">
            <a className="img-box" href="http://www.jsbn.com">
              <img src="http://image.jsbn.com/static/map.jpg" />
            </a>
          </div>
          <div className="phone-addr-box mgb30">
            <p>
              联系电话: 400-015-9999
            </p>
            <p>
              体验馆：重庆市渝北区龙山街道龙华大道66号北城国际中心
            </p>
            <p>
              摄影基地：重庆市九龙坡区九滨路9号“九龙滨江”商业广场
            </p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AboutUs;