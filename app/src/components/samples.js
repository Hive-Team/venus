var React = require('react');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var SamplesList = require('./samples-list.js');
var Api = require('../config/api.js');
var Samples = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信息
	//设置初始
	getInitialState: function() {
		return {
			resourceLinks: {},
			pageSize: 6,
			pageIndex: 1,
			stylesList: [],
			address: [],
			currentStyle: '',
			currentAddress: ''
		}
	},
	loadMore: function(event) {
		event.preventDefault();
		this.setState(function(prevState, currentProps) {
			return {
				pageIndex: prevState.pageIndex + 1
			}
		});
	},
	componentDidMount: function() {
		var self = this;
		$('#slider_top').Slider();

		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/shot']);
		};
		var fetchData = function(payload) {
			//从配置map里面获取到读取菜单的key
			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
			self.setState({
				resourceLinks: resourceLinks
			});
		};

		var fetchStyle = function(payload) {
			return Api.httpGET('condition/styleAddress', {});
		};

		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData)
		$.when(fetchStyle()).done(function(payload) {
			payload.data && payload.data.style.length && self.setState({
				stylesList: payload.data.style,
				address: payload.data.address
			});
		})
	},
	toggleFun: function(evt) {
		var self = this;
		if (evt.target.tagName === 'SPAN' && $(evt.target).hasClass('card') && $(evt.target).parent('div').attr('id') === 'J_CardStyle') {

			$('.J_FilterCtrl .card').removeClass('tab-sel');
			$(evt.target).toggleClass('tab-sel');
			($(evt.target).attr('data-style-id') !== self.state.currentStyle || self.state.currentStyle === '') && self.setState({
				currentStyle: $(evt.target).attr('data-style-id'),
				pageIndex: 1,
				currentAddress: ''
			});
		} else if (evt.target.tagName === 'SPAN' && $(evt.target).hasClass('card') && $(evt.target).parent('div').attr('id') === 'J_CardAddress') {

			$('.J_FilterCtrl .card').removeClass('tab-sel');
			$(evt.target).toggleClass('tab-sel');
			($(evt.target).attr('data-address-id') !== self.state.currentAddress || self.state.currentAddress === '') && self.setState({
				currentAddress: $(evt.target).attr('data-address-id'),
				pageIndex: 1,
				currentStyle: ''
			});

		}
	},
	toggleFilter: function(evt) {
		var self = this;
		if (evt.target.tagName === 'SPAN') {
			$(evt.target).toggleClass('tab-sel');
			$(evt.target).siblings().removeClass('tab-sel');
			self.setState({
				currentStyle: ($(evt.target).attr('data-style-id') === self.state.currentStyle) ? '' : $(evt.target).attr('data-style-id'),
				pageIndex: 1
			});
		}

	},
	toggleAddressFilter: function(evt) {
		var self = this;
		if (evt.target.tagName === 'SPAN') {
			$(evt.target).toggleClass('tab-sel');
			$(evt.target).siblings().removeClass('tab-sel');
			self.setState({
				currentAddress: ($(evt.target).attr('data-address-id') === self.state.currentAddress) ? '' : $(evt.target).attr('data-address-id'),
				pageIndex: 1
			});
		}

	},
	render: function() {
		var stylesList = this.state.stylesList;
		var addressList = this.state.address;

		return (
			<div className='samples-view ypxs-view'>
				<div className="bannar-all-box">
				  <div id="slider_top" className="slider-box bannar">
				  	<TopSlider resourceLinks={this.state.resourceLinks} tplKey='top#adv' />
				  </div>
				</div>
				<div className="layout-center-box">
					<div className="filter-title">
						<span className="sel">分类查看</span>
					</div>
					<div className='J_FilterCtrl' onClick={this.toggleFun}>
						<div className="filter-box">
							<span className="title"><i className="ico-1-js ico-1-2-js" ></i><b>风格</b></span>
							<div className="tab-box" id='J_CardStyle'>

								<span className='tab tab-sel' data-style-id=''>全部</span>
								{
									$.map(stylesList,function(v,k){
										return	<span key={v.styleId} data-style-id={v.styleId} className="tab">{v.styleName}</span>
									})
								}

							</div>
						</div>
						<div className="filter-box" onClick={this.toggleFun}>
							<span className="title"><i className="ico-1-js ico-1-3-js" ></i><b>场景</b></span>
							<div className="tab-box" id='J_CardAddress'>

								<span className='tab' data-address-id=''>全部</span>
								{
									$.map(addressList,function(v,k){
										return	<span key={v.addressId} data-address-id={v.addressId} className="tab">{v.addressName}</span>
									})
								}

							</div>
						</div>
					</div>
					<SamplesList resourceLinks={this.state.resourceLinks}
								 pageIndex={this.state.pageIndex}
								 pageSize={this.state.pageSize}
								 tplKey='list#samples'
								 currentStyle={this.state.currentStyle}
								 currentAddress={this.state.currentAddress}
						/>
					<div onClick={this.loadMore} id="J_MoreButton">
						<div className="more-btn"><span>点击查看更多</span></div>
					</div>
			  </div>
		    </div>
		);
	}
});
module.exports = Samples;
