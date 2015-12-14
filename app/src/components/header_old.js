//包含页头. 页尾
var React = require('react');
var Api = require('../config/api.js')
var ServerCode = require('../config/serverCode.js');
var Header = React.createClass({
	getInitialState: function() {
		return {
			menu: {
				name: '',
				submenu: [{
					name: '',
					link: ''
				}]
			}
		}
	},
	render: function() {
		return (
			<div id="J_CommonHeader">
		      <div className="nav-parent container" id="nav_parent">
			   	 <div className="responsive-box" onClick={this.indicateActive}>
			   	   <div className="group"><a href='#/shot' className="nav-item nav-item-1">婚纱摄影</a><a href='#/movie' className="nav-item">微电影</a></div>
			   	   <div className="group"><a href='#/scheme' className="nav-item nav-item-1">婚庆定制</a><a href='#/hotel' className="nav-item">婚宴预订</a></div>
			   	   <div className="group"><a href='#/dress' className="nav-item nav-item-1">婚纱礼服</a><a href='#/d9' className="nav-item">婚戒钻石</a></div>
			   	   <div className="group"><a href='#/appliance' className="nav-item nav-item-1">婚礼用品</a><a href='#/rent' className="nav-item">婚车租赁</a></div>
			   	 </div>
		      </div>
		      <div className="header container" id="header">
		   	 <div className="responsive-box">
		   	   <i className="arrow-down arrow-4-js arrow-4-down-1-js" id="arrow_down"></i>
		   	   <span className="nav">导航：<b>{this.state.menu.name}</b><i id="arrow_up_down" className="arrow-4-js arrow-4-down-1-js"></i></span>
		   	   <a href='#/' className="logo-1"></a>
		   <div className="func">
			   <span className="login-btn J_Guest" id="login_btn" style={{display:'none'}}>登录</span>
			   <span className="reg-btn J_Guest" id="reg_btn" style={{display:'none'}}>注册</span>
			   <span className="reg-btn J_User" id="J_UserNick" style={{display:'none'}}></span>
			   <span className="reg-btn J_User" id="J_LogoutBtn" style={{display:'none'}}>注销</span>

			   <span className="telephone"><i className="ico-phone"> </i>400 - 015 - 9999</span></div>
		   	 </div>
		   	 <div className="mask-bg"></div>
		   	 <div className="sign-drawer-box container" id="sign_drawer_box" >
		   	   <div className="pos-box container">
		   			   <div className="responsive-box">
		   				   <div className="login-box">
		   					 <div className="from-control-box-1-js">
		   					   <label><span className="title">用户名</span><input className="from-control-1-js" type="text" placeholder="请输入用户名" ref='loginUserName' /></label>
		   					 </div>
		   					 <div className="from-control-box-1-js">
		   					   <label><span className="title">密码</span><input className="from-control-1-js" type="password" placeholder="请输入密码" ref='loginPassword' /></label>
		   					 </div>
		   					 <input className="btn-js btn-gray-blue-js" type="submit" value="登录" onClick={this.login} />
		   					 <div className="btn transition-bg" id="btn_off">
								 <span>收起</span>
								 <i className="arrow-4-js arrow-4-down-2-js transition-border"></i>
								 <i className="arrow-4-js arrow-4-up-2-js transition-border"></i>
		   					 </div>
		   				   </div>
		   			 </div>
		   		 <div className="mask-bg"></div>
		   	   </div>
		   	 </div>
		   	 <div className="sign-drawer-box container" id="sign_drawer_box_1" >
		   	   <div className="pos-box container">
		   			 <div className="responsive-box">
		   			   <div className="login-box">
		   				 <div className="from-control-box-1-js">
		   				   <label><span className="title">用户名</span><input  className="from-control-1-js" type="text" placeholder="请输入用户名" ref='registerUserName' /></label>
		   				 </div>
		   				 <div className="from-control-box-1-js">
		   				   <label><span className="title">密码</span><input  className="from-control-1-js" type="password" placeholder="请输入密码" ref='registerPassword' /></label>
		   				 </div>
		   				 <div className="from-control-box-1-js">
		   				   <label><span className="title">确认密码</span><input  className="from-control-1-js" type="password" placeholder="确认密码" ref='registerConfirmPassword' /></label>
		   				 </div>
		   				 <input className="btn-js btn-gray-blue-js" type="submit" value="注册新用户" onClick={this.register} />
		   				 <div className="btn transition-bg" id="btn_off_1"><span>收起</span><i className="arrow-4-js arrow-4-down-2-js transition-border"></i><i className="arrow-4-js arrow-4-up-2-js transition-border"></i></div>
		   			   </div>
		   			 </div>
		   		 <div className="mask-bg"></div>
		   	   </div>
		   	 </div>
		      </div>
		      <div className="nav-main container" id="nav_main">
			   	 <div className="responsive-box" onClick={this.indicateActive}>
			   	   {
					   this.state.menu.submenu.map(function(v,i){
						   return (
							   <a className="nav-item" href={v.link} key={i}>
								   {v.name}
							   </a>
						   )
					   })
				   }
			   	 </div>
		      </div>
		      <div className="nav-fixed container" id="nav_fixed">
			   	 <div className="responsive-box">
			   	   <a href='#/home' className="logo-2"></a>
			   	   <div className="nav-box" onClick={this.indicateActive}>
					   {
						   this.state.menu.submenu.map(function(v,i){
							   return (
								   <a className="nav-item" href={v.link} key={i}>
									   {v.name}
								   </a>
							   )
						   })
					   }
			   	   </div>
			   	 </div>
		   	 	 <div className="mask-bg"></div>
		      </div>
		    </div>
		);
	},
	indicateActive: function(evt) {
		if (evt.target.tagName === 'A') {
			$(evt.currentTarget).find('a').removeClass('current')
			$(evt.target).addClass('current');

		}
	},
	login: function(event) {
		event.preventDefault();
		var username = this.refs.loginUserName.getDOMNode().value;
		var password = this.refs.loginPassword.getDOMNode().value;
		Api.httpPOST('users/login', {
			'USERNAME': username,
			'PASSWORD': password,
			'PLATFORM': 0
		}).done(function(payload, text, obj) {
			$('#btn_off').trigger('click');
			//登陆成功
			$('.J_Guest').hide();
			$('.J_User').show();
			$('#J_UserNick').html('已登录');
			window.store.set('TICKET', obj.getResponseHeader('TICKET'));
			window.store.set('TOKEN', obj.getResponseHeader('TOKEN'));
			window.store.set('USER', username);
			$.ajaxSetup({
				headers: {
					'TICKET': window.store.get('TICKET') || '',
					'TOKEN': window.store.get('TOKEN') || ''
				}
			});
		})

	},
	register: function(event) {
		event.preventDefault();
		var p = /1\d{10}/ig;
		var username = this.refs.registerUserName.getDOMNode().value;
		var password = this.refs.registerPassword.getDOMNode().value;
		var confirmPassword = this.refs.registerConfirmPassword.getDOMNode().value;
		if (password !== confirmPassword) {
			$(this.refs.registerPassword.getDOMNode()).css('borderColor', 'red');
			$(this.refs.registerConfirmPassword.getDOMNode()).css('borderColor', 'red');
			return;
		}
		if ($.trim(password) === '' || password.length < 6 || password.length > 20) {
			$(this.refs.registerPassword.getDOMNode()).css('borderColor', 'red');
			return;
		}
		if ($.trim(confirmPassword) === '') {
			$(this.refs.registerConfirmPassword.getDOMNode()).css('borderColor', 'red');
			return;
		}
		if (!p.test(username)) {
			$(this.refs.registerUserName.getDOMNode()).css('borderColor', 'red');
			return;
		}
		Api.httpPOST('webUsers/new', {
			'USERNAME': username,
			'PASSWORD': password,
			'CONFIRM_PASSWORD': confirmPassword,
			'PLATFORM': 0,
			'CITYID': 364
		}).done(function(data, text, obj) {
			$("#btn_off_1").trigger('click');
			Api.httpPOST('users/login', {
				'USERNAME': username,
				'PASSWORD': password,
				'PLATFORM': 0
			}).done(function(payload, text, obj) {
				//登陆成功
				$('.J_Guest').hide();
				$('.J_User').show();
				$('#J_UserNick').html('已登录');
				window.store.set('TICKET', obj.getResponseHeader('TICKET'));
				window.store.set('TOKEN', obj.getResponseHeader('TOKEN'));
				window.store.set('USER', username);
				$.ajaxSetup({
					headers: {
						'TICKET': window.store.get('TICKET') || '',
						'TOKEN': window.store.get('TOKEN') || ''
					}
				});
			})
		})
	},
	logout: function(event) {
		event.preventDefault();

	},
	componentDidMount: function() {
		require('../vendors/slider.js');
		require('../vendors/mousewheel.js');
		if (window.store.get('USER') && window.store.get('USER') !== '') {
			$('.J_User').hide();
			$('.J_Guest').hide();
			$('#J_UserNick').html('已登录');
		} else {
			$('.J_Guest').hide();
			$('.J_User').hide();
			$('#J_UserNick').html('');
		}

		$('#J_LogoutBtn').on('click', function() {
				window.store.set('USER', null);
				window.store.set('TICKET', null);
				window.store.set('TOKEN', null);
				$('.J_Guest').show();
				$('.J_User').hide();
				$('#J_UserNick').html('');
				$.ajaxSetup({
					headers: {
						'TICKET': window.store.get('TICKET') || '',
						'TOKEN': window.store.get('TOKEN') || ''
					}
				})
			})
			// 监听菜单更新事件
		var self = this;
		$(document.body).on('ModuleChanged', function(ev, pathName) {
			window.Core.menu &&
				self.setState({
					menu: {
						name: window.Core.menu[pathName]['name'],
						submenu: $.map(window.Core.menu[pathName]['sub'] || [], function(v, k) {
							return {
								name: k,
								link: v
							}
						})
					}
				})
		});
	},
	componentWillUnmount: function() {
		$(document.body).off('ModuleChanged');
	}
})

module.exports = Header;