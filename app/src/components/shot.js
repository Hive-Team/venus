var React = require('react');
var Router = require('react-router-ie8');
// var RouteHandler = Router.RouteHandler;
// var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var SamplesMash = require('./samples-mash.js');
var PringlesMash = require('./pringles-mash.js');
var ImageListItem = require('./image-item.js');
var Api = require('../config/api.js');
var Shot = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信息
	//设置初始
	getInitialState: function() {
		return {
			payload: [],
			pageSize: 10,
			pageIndex: 1,
			tplKey: 'top#adv',
			baseUrl: '',
			resourceLinks: {}
		};
	},
	componentDidMount: function() {
		var self = this;

		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#' + self.getPathname()]);
		};
		var fetchData = function(payload) {
			//从配置map里面获取到读取菜单的key
			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
			self.setState({
				resourceLinks: resourceLinks
			});
			$.each(resourceLinks, function(k, v) {
				(self.state.tplKey.indexOf(v.split('/')[0]) > -1) &&
				Api.httpGET(v.split('#')[1], {
					pageSize: self.state.pageSize,
					pageIndex: self.state.pageIndex
				})
					.done(
					function(payload) {
						////console.log(JSON.stringify(payload, null, 4));
						200 === payload.code && payload.data && self.setState({
							payload: payload.data,
							baseUrl: v.split('#')[1]
						}, function() {
							$('#slider_hssy_f').length > 0 && $('#slider_hssy_f').Slider();
							$('#slider_hssy').length > 0 && $('#slider_hssy').Slider();
						})
					}
				)
			});
		};

		window.Core && window.Core.promises['/'] &&
		$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData);

	},
	render: function() {

		var advData = this.state.payload || [];
		var totalCountNumber = advData.length < 9 ? '0' + advData.length : '' + advData.length;
		return (
			<div className="hssy-home-view">
				<div className="custom-banner custom-container-banner container">
					<div className="num-box" style={{display:'none'}}>
						<div className="pos-box"><span id="img_index">1</span><em>/</em><b>{totalCountNumber}</b></div>
					</div>
					<div className="custom-banner-intr-bg"><div className="pos-box"><i className="rect-1-js"></i></div></div>
					<div className="blur-box" id="blur-box" style={{display:'none'}}>
						<div className="pos-box">
							<div id="slider_hssy_f" className="slider-box bannar">
								<ul className="slider item-box">
									{
										advData.length>0 && $.map(advData,function(v,k){
											return (
												<li className="item transition-opacity-1" key={k}>
													<ImageListItem
														frameWidth={1920}
														frameHeight={690}
														url={v.contentUrl}
														errorUrl={'http://placehold.it/1920x690'} />

												</li>
											)
										})
									}
								</ul>
							</div>
						</div>
					</div>
					<div className='bannar-all-box'>
						<div id="slider_hssy" className="slider-box bannar">
							<ul className="slider item-box">
								{
									advData.length>0&& $.map(advData,function(v,k){
										return (
											<li className="item transition-opacity-1" key={k}>
												<ImageListItem
													detailUrl={v.detailUrl}
													frameWidth={1920}
													frameHeight={690}
													url={v.contentUrl}
													errorUrl={'http://placehold.it/1920x690'} />

											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
				<div className='layout-center-box'>
					<div className="nav-box mgt30">
						<img src="http://image.jsbn.com/static/hssy-home02.jpg" />
						<a href={"http://"+window.location.hostname+"/#/suite/10025/20060"} className="suite-link"></a>
						<a href={"http://"+window.location.hostname+"/#/samples"} className="samples-link"></a>
						<a href={"http://"+window.location.hostname+"/#/pringles"} className="pringles-link"></a>
						<a href={"http://"+window.location.hostname+"/#/weddingmv"} className="suite-home-link"></a>
						<a href={"http://"+window.location.hostname+"/#/suite"} className="weddingmv-link"></a>
					</div>
					<div className='adv-1 shot-adv mgb30'>
						<div className='pos-box'>
							<img src='//image.jsbn.com/static/hssy.jpg' />
						</div>
					</div>
					<a href="#/samples" className='title-sample'></a>
					<SamplesMash resourceLinks={this.state.resourceLinks} tplKey='list#samples'/>
					<div className="container-ad-1 mgb30" style={{display:'none'}} >
						<a href=""><img src="assets/images/test/ad_1.png" /></a>
					</div>
					<PringlesMash resourceLinks={this.state.resourceLinks} tplKey='list#pringles' />
					<div className="title-box">
						<div className="line"></div>
						<div className="title">
							<h1>选摄影师</h1>
							<h2>THE PHOTOGRAHPER</h2>
						</div>
					</div>
					<div className="container-ad-1 mgb50">
						<a>
							<img src={(window.Core.mode === 'dev')?'http://image.jsbn.com/static/photographer-1.jpg':'http://image.jsbn.com/static/photographer-1.jpg'+'@1200w_1e_1c_0i_1o_90q_1x'}/>
						</a>
					</div>
					<div className="title-box">
						<div className="line"></div>
						<div className="title">
							<h1>选化妆师</h1>
							<h2>THE PHOTOGRAHPER</h2>
						</div>
					</div>
					<div className="container-ad-1 mgb50">
						<a>
							<img src={(window.Core.mode === 'dev')?'http://image.jsbn.com/static/satisfashion-1.jpg':'http://image.jsbn.com/static/satisfashion-1.jpg'+'@1200w_1e_1c_0i_1o_90q_1x'}/>
						</a>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = Shot;
