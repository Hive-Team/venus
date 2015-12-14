var React = require('react');
var SKMap = require('../config/SKMap.js');
var Router = require('react-router-ie8');
var Api = require('../config/api.js');

var LeftIcon = React.createClass({

	render: function() {
		return (
			<a href='#/home'><img src="http://image.jsbn.com/logo.jpg@90q" className="logo" /></a>
		);
	}

});


var CurrentModuleIndicator = React.createClass({

	render: function() {
		return (
			<div className="total-bot">{'导航:' + this.props.currentMenu}</div>
		);
	}

});



var Header = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			isHome: true,
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
		var self = this
		var leftComponent = <LeftIcon />; // this.state.isHome ? <LeftIcon /> : <CurrentModuleIndicator currentMenu={self.state.menu.name}/>
		return (
			<div className='home'>
			<div className="header-mian-eav">
			    <div className="layout-center-box">
			        <span className="word">全国首家婚礼全流程优质服务商 丨 时尚 · 个性 · 品质 丨 省时 · 省心 · 省钱</span>
			        <span className="num">400-015-9999</span>
			    </div>
			</div>
			
				<div className="nav-main-box-eav layout-center-box">
					<div className="center-box-eav">
						{
							leftComponent
						}

						<div className="item-box J_Nav">
						{
							$.map(self.state.menu.submenu||[],function(v,k){
								return(
							<a href={v.link}  target={v.link.indexOf('http')>-1?'_blank':'_self'} key={k}>
								<div className={self.state.isHome ? "item": ('#'+self.getPathname()).indexOf(v.link)>-1 ?"item item-current sec-nav-ch":'item sec-nav-ch'}>
									<div className="ch">
										{v.name}
										<div className="en">{v.en||''}</div>
										<div className="arrow-5-js triangle"></div>
									</div>
								</div>
							</a>
									)
							})
						}
						</div>
					</div>
				</div>
				</div>
		);
	},
	componentDidMount: function() {
		require('../vendors/slider.js');
		// require('../vendors/mousewheel.js');
		var self = this;

		$('.J_Nav').on('click', 'a', function() {
			$(this).siblings().find('.item').removeClass('item-current')
			$(this).find('.item').addClass('item-current')
		})
		$(document.body).on('ModuleChanged', function(ev, pathName) {
			var isHome = (pathName === '#/home') ? true : false;
			window.Core.menu &&
				self.setState({
					isHome: isHome,
					menu: {
						name: window.Core.menu[pathName]['name'],
						submenu: $.map(window.Core.menu[pathName]['sub'] || [], function(v, k) {
							return {
								name: k,
								en: SKMap[k + 'en'],
								link: v
							}
						})
					}
				})
		});


		//当菜单拉去完成, 我们动态构造出菜单.
		//然后把全局菜单数据拉回来.
		// var buildMenuAndFetchData = function(payload) {
		// 	var path = (self.getPathname() === '/') ? '/home' : self.getPathname();
		// 	var menu = $.map(window.Core.menu['#' + path] && window.Core.menu['#' + path]['sub'] || [], function(v, k) {
		// 		return {
		// 			name: k,
		// 			en: SKMap[k + 'en'],
		// 			link: v
		// 		};
		// 	});
		// 	//从配置map里面获取到读取菜单的key
		// 	var isHome = (path === '/home') ? true : false;
		// 	var resourceLinks = window.Core.getResourcesLinks(path);
		// 	////console.log('home:' + JSON.stringify(resourceLinks,null,4));
		// 	//让ui做render
		// 	self.setState({
		// 		menu: menu,
		// 		resourceLinks: resourceLinks,
		// 		isHome: isHome
		// 	})
		// };


		// //保证Core的存在
		// window.Core && $.when(window.Core.promises['/']).done(buildMenuAndFetchData);
	}

});

module.exports = Header;