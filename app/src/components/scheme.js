var React = require('react');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var ImageListItem = require('./image-item.js');
var Api = require('../config/api.js');

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
		console.log('items:', self.state.items);
		return (
			<div className="nav-box">
			    <li className="big-box">
			        <ImageListItem
			        	klassName={"l-item"}
			        	url={self.state.items[0] && self.state.items[0].p[0]&& self.state.items[0].p[0].contentUrl || 'http://placehold.it/620x375'}
			        	frameWidth={620}
			        	frameHeight={375}
			        	detailUrl={self.state.items[0] && self.state.items[0].p[0]&& self.state.items[0].p[0].detailUrl}
                noplay='YES'
			        />
			    </li>
				{
					$.map(self.state.items[0] && self.state.items[0].p.slice(1)||[],function(v,k){
						return (
							<li key={k} className='small-box'>
								<ImageListItem
									url={v.contentUrl || "http://placehold.it/270x180"}
									frameWidth={270}
									frameHeight={180}
									detailUrl={v.detailUrl}
									key={index++}
									/>
							</li>
						)
					})
				}
			</div>
		);
	}

});


var SchemeList = React.createClass({
	getInitialState: function() {
		return {
			payload: [],
			baseUrl: "",
			totalPage: 0
		}
	},
	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		}
		$.each(nextProps.resourceLinks, function(k, v) {
			(nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
			dataPromise(v.split('#')[1], {
					pageSize: 6,
					pageIndex: 1
						// schemeType: nextProps.currentCate,
						// styleId: nextProps.currentStyle,
						// hotelId: nextProps.currentHotel,
						// maxPrice: nextProps.currentPrice.max,
						// minPrice: nextProps.currentPrice.min
				})
				.done(
					function(payload) {
						////console.log(JSON.stringify(payload,null,4));
						200 === payload.code && self.setState({
							payload: payload.data,
							baseUrl: v.split('#')[1],
							totalPage: parseInt(payload.totalCount)
						}, function() {
							// (parseInt(payload.totalCount) <= parseInt(nextProps.pageIndex) * parseInt(nextProps.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show()
						})
					}
				)
		})
	},
	render: function() {
		var self = this
		var baseUrl = this.state.baseUrl
		return (
			<ul className="cases-list">
				{
					$.map(self.state.payload,function(v,k){
						return (

							<li className="item-box" key={k}>
								<div className='img-box'>
									<ImageListItem
										sid={v.weddingCaseId+''}
										frameWidth={380}
										className={''}
										frameHeight={250}
										url={v.weddingCaseImage}
										detailUrl={v.detailUrl}
										errorUrl={'http://placehold.it/380x250'}
										detailBaseUrl={baseUrl}
										/>
									<a href={'#/'+baseUrl+'/'+v.weddingCaseId} className="layer-box">
										<div className="layer"></div>
										<div className="info">
											<h3>{v.schemeName}</h3>
											<div className="date">
												<span>({v.weddingDate})</span>
											</div>
										</div>
									</a>
								</div>
							</li>
						)
					})
				}
			</ul>
		);
	}

});


var Scheme = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信息
	//设置初始
	getInitialState: function() {
		return {
			resourceLinks: {}
		}
	},
	componentDidMount: function() {
		var self = this;

		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#' + self.getPathname()]);
		};
		var fetchData = function(payload) {
			//从配置map里面获取到读取菜单的key
			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme')
			resourceLinks && self.setState({
				resourceLinks: resourceLinks
			})
		};

		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData);
	},

	render: function() {
		return (
			<div className="hqdz-home-view">
				<div className='layout-center-box'>
					<div className='bannar-box'>
						<img src='//image.jsbn.com/static/hqdz.jpg' />
					</div>

					<div id="slider_top" className="slider-box bannar mgb30">
						<TopSlider resourceLinks={this.state.resourceLinks} tplKey='top#adv' />
					</div>

					<VideoMash  tplKey='mid#adv' resourceLinks={this.state.resourceLinks} nameKey={'热区广告'}/>
					<SchemeList tplKey='list#scheme' resourceLinks={this.state.resourceLinks} />

					<div className="tit-img-chs mgb30 mgt60"></div>
					<div><img src='http://image.jsbn.com/static/hqsy_group_01.jpg' /></div>

					<div className="tit-img-hys mgb30 mgt60"></div>
					<div><img src='http://image.jsbn.com/static/hqsy_group_02.jpg' /></div>

					<div className="tit-img-hlr mgb30 mgt60"></div>

					<div className="title-center">
						<h1>婚礼人</h1>
						<span>汇集最优秀婚礼人 供您选择</span>
					</div>
					<ul className="nav-f4-box">
						<li className="item-box">
							<div className="hzs"><span></span></div>
							<span className="hzs-word"></span>
						</li>
						<li className="item-box">
							<div className="zcr"><span></span></div>
							<span className="zcr-word"></span>
						</li>
						<li className="item-box">
							<div className="sys"><span></span></div>
							<span className="sys-word"></span>
						</li>
						<li className="item-box">
							<div className="sxs"><span></span></div>
							<span className="sxs-word"></span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
})

module.exports = Scheme;
