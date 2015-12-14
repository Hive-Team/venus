var React = require('react');
var Router = require('react-router-ie8');
var TopSlider = require('./top-slider.js');
var HomeMash = require('./home-mash.js');
var Api = require('../config/api.js');
var HomeRecommend = require('./home-recommend.js');
var SKMap = require('../config/SKMap.js');
var ImageListItem = require('./image-item.js');

var VideoMash = React.createClass({
	getInitialState: function() {
		return {
			items: []
		};
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var urls = [];
		nextProps.resourceLinks && nextProps.tplKey &&
			(nextProps.resourceLinks !== this.props.resourceLinks) &&
			$.each(nextProps.resourceLinks, function(k, v) {
				(nextProps.tplKey.indexOf(v.split('/')[0]) > -1 && k.indexOf(self.props.nameKey) > -1) &&
				urls.push({
					url: v.split('#')[1],
					title: k,
					p: []
				})
			});
		////console.log('urls:', JSON.stringify(urls, null, 4));
		var payloadCallback = function(item) {
			return function(payload) {
				if (payload.code === 200 && payload.data.length > 0) {
					item.p = payload.data;
					////console.log(JSON.stringify(urls, null, 4));
					self.setState({
						items: urls
					})
				}

			}
		};
		$.each(urls, function(k, v) {
			Api.httpGET(v.url, {
				pageIndex: 1,
				pageSize: 5
			}).done(payloadCallback(v))
		});



	},

	render: function() {
		var self = this;
		var index = 0;
		// console.log('items:', self.state.items);
		return (
			<div className="home-view layout-center-box">
			    <div className="box-l">
			        <ImageListItem
			        	klassName={"l-item"}
			        	url={self.state.items[0] && self.state.items[0].p[0]&& self.state.items[0].p[0].contentUrl || 'http://placehold.it/620x375'}
			        	frameWidth={620}
			        	frameHeight={375}
			        	detailUrl={self.state.items[0] && self.state.items[0].p[0]&& self.state.items[0].p[0].detailUrl}
			        />
			    </div>
			    <div className="box-r">
					{
						$.map(self.state.items[0] &&self.state.items[0].p.slice(1)||[],function(v,k){
							return (
								<ImageListItem
									klassName={"r-item"}
									url={v.contentUrl || "http://placehold.it/270x180"}
									frameWidth={270}
									frameHeight={180}
									detailUrl={v.detailUrl}
									key={index++}
									/>
							)
						})

					}
			    </div>
			</div>
		);
	}

});

var Home = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信息
	//设置初始参数. 首页菜单
	getInitialState: function() {
		return {
			homeMenu: [],
			resourceLinks: {}
		}
	},

	render: function() {
		// var videoMashListTop = [{

		// }, {}, {}, {}, {}];
		// var videoMashListBottom = [{

		// }, {}, {}, {}, {}];
		return (
			<div className='home-view'>
				<div className="bannar-all-box">
					<div id="slider_home" className="slider-box bannar"  style={{top: '0px'}}>
						<TopSlider resourceLinks={this.state.resourceLinks} frameWidth={1920} tplKey='top#adv'/>
					</div>
				</div>
				<div className="space-40-eav"></div>
				{
					/*
				<VideoMash  tplKey='mid#adv' resourceLinks={this.state.resourceLinks} nameKey={'热区广告上'}  />

				<VideoMash  tplKey='mid#adv' resourceLinks={this.state.resourceLinks} nameKey={'热区广告下'}/>
					*/
				}
				<div className="layout-center-box">
					<div className='bannar-box'>
						<img src='http://image.jsbn.com/static/home-01.jpg' />
					</div>
					<HomeMash tplKey='mid#adv' resourceLinks={this.state.resourceLinks}/>
					<HomeRecommend resourceLinks={this.state.resourceLinks} tplKey='list#adv'/>
				</div>
				<div className="bannar-all-box">
					<div className='bannar'>
						<img src='http://image.jsbn.com/static/home-02.jpg' />
					</div>
				</div>
				<div className="bannar-all-box">
					<div className='bannar'>
						<img src='http://image.jsbn.com/static/home-03.jpg' />
					</div>
				</div>
				<div className="bannar-all-box">
					<div className='bannar'>
						<img src='http://image.jsbn.com/static/home-04.jpg' />
					</div>
				</div>
			</div>
		);
	},

	componentDidMount: function() {
		var self = this;
		//当首页插入时隐藏顶部
		$('#J_CommonHeader').hide();


		var changeMenu = function(payload) {

			var path = (self.getPathname() === '/') ? '/home' : self.getPathname();
			$(document.body).trigger('ModuleChanged', ['#' + path]);
		};
		//加载首页用于控制滚动效果的脚本

		//当菜单拉去完成, 我们动态构造出菜单.
		//然后把全局菜单数据拉回来.
		var buildMenuAndFetchData = function(payload) {
			var homeMenu = $.map(window.Core.menu, function(v, k) {
				return {
					name: v.name,
					en: SKMap[v.name + 'en'],
					link: k
				};
			});
			//从配置map里面获取到读取菜单的key
			var path = (self.getPathname() === '/') ? '/home' : self.getPathname();
			var resourceLinks = window.Core.getResourcesLinks(path);
			////console.log('home:' + JSON.stringify(resourceLinks,null,4));
			//让ui做render
			self.setState({
				homeMenu: homeMenu,
				resourceLinks: resourceLinks
			})
		};


		//保证Core的存在
		window.Core && $.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(buildMenuAndFetchData)


	},
	componentWillUnmount: function() {
		$('#J_CommonHeader').show()
	}

});

module.exports = Home;
