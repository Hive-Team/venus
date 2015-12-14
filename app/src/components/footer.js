var React  = require('react');
var Footer = React.createClass({
	render:function(){
		return (
			<div className="footer-view" id="footer">
				<div className="nav-map"><a href="#/aboutUs">关于金色百年</a><a href="#/aboutUs">联系我们</a></div>
				<div className="er-wei-ma"><span>关注金色百年</span><img src="http://image.jsbn.com/static/QR_Codes.jpg@1e_80w_80h_1c_0i_1o_90Q_1x" /></div>
				<div className="nav-map nav-map-1"><a>渝ICP备15007161号-1</a><a href="">版权说明</a><a href="">服务条款</a></div>
			</div>
		);
	},
	componentDidMount: function() {

	}
})

module.exports = Footer;
