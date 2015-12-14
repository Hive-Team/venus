// 包含页头. 页尾
var React = require('react');
var Router = require('react-router-ie8');
var RouteHandler = Router.RouteHandler;
var Header = require('./header.js');
var Footer = require('./footer.js');
var MyCenter = require('./my-center.js');

require('../config/core.js'); //单例
var Main = React.createClass({
	getInitialState: function() {
		return {
			isAuthed: false
		};
	},
	render: function() {
		return (
			<div className='adaptation-1200 root-view' id='adaptation'>
				<Header />
				<RouteHandler />
				<Footer />
                <div id='J_DetailModualContainer' />
				{this.state.isAuthed && (<MyCenter />)}
				<div className="main-rig-func-box" id="main_rig_func_box">
                    <div className="disgin-box disgin-box-top transition-opacity">
                        <i className="rect-js rect-4-js"></i>
                    </div>
                    <div className="func-box transition-height clearfix" id="func_box">
                        <div className="pos-box">
                            <div className="hover-box hover-first-box clearfix">
                                <div className="pos-box">
                                    <span>统筹师</span>
                                    <i className="ico-16-js ico-16-1-js"></i>
                                </div>
                            </div>
                            <div className="hover-box clearfix">
                                <div className="pos-box">
                                    <span>咨询电话</span>
                                    <i className="ico-16-js ico-16-2-js"></i>
                                </div>
                            </div>
                            <div className="hover-box clearfix">
                                <div className="pos-box">
                                    <span>扫二维码</span>
                                    <i className="ico-16-js ico-16-3-js"></i>
                                </div>
                            </div>
                            <div className="hover-box clearfix" id="pop_chat">
                                <div className="pos-box">
                                    <span>在线咨询</span>
                                    <i className="ico-16-js ico-16-4-js"></i>
                                </div>
                            </div>
                            <div className="hover-box clearfix" id='back_top'>
                                <div className="pos-box">
                                    <span>回到顶部</span>
                                    <i className="ico-16-js ico-16-5-js"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="disgin-box transition-opacity" style={{display:"none"}}>
                        <i className="rect-js rect-1-js"></i>
                        <i className="rect-js rect-2-js"></i>
                        <i className="rect-js rect-3-js clearfix"></i>
                    </div>
				          </div>
                <div className="phone-window-pop-box transition-width" id="phone_window">
                    <span>400 - 015 - 9999</span>
                </div>
                <div className="qr-code-box transition-width" id="qr_code_box"><img src="http://image.jsbn.com/static/QR_Codes.jpg@1e_80w_80h_1c_0i_1o_90Q_1x" ></img></div>
		</div>
		);
	},
	componentWillUnmount: function() {
		$(document.body).off('Auth');
		$(document.body).off('UnAuth');
	},
    componentWillMount: function() {
        window.Core && window.Core.promises['/'] &&
        $.when(window.Core.promises['/'])
            .then(function(data){
                console.log('loaded');
            });
    },
	componentDidMount: function() {
		var self = this;
        var $adaptation = $('#adaptation');
        require('../vendors/scroll.js');
		// require('../vendors/nav.js');

		var logMenu = function(payload) {
			////console.log('AppMenu:' + JSON.stringify(window.Core.resource,null,4));
		};

		var registerAuthEvent = function() {
			$(document.body).on('Auth', function(ev, notify) {
				////console.log('Authed');
				self.setState({
					isAuthed: true
				})
			});
			$(document.body).on('UnAuth', function(ev, notify) {
				////console.log('UnAuthed');
				self.setState({
					isAuthed: false
				})
			});
		}

        function adaptation(){
            if($(window).width() <= 1600) $adaptation.attr('class','adaptation-1200 root-view');
            else $adaptation.attr('class','adaptation-1680 root-view');

            $(window).bind('resize',function(){
                if($(window).width() <= 1600) $adaptation.attr('class','adaptation-1200 root-view');
                else $adaptation.attr('class','adaptation-1680 root-view');
            });
        }

		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
                .then(adaptation)
                .then(logMenu)
                .then(registerAuthEvent);



	}
})

module.exports = Main;
