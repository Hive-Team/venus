var React = require('react');
var Api = require('../config/api.js');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var CaseList = require('./cases-list.js');
var Cases = React.createClass({

	mixins: [Router.State], //我们需要知道当前的path params 等等信息
	//设置初始
	getInitialState: function() {
		return {
			resourceLinks: {},
			pageSize: 9,
			pageIndex: 1,
			currentCate: 1,
			currentStyle: '',
			currentHotel: '',
			currentPrice: {
				min: '',
				max: ''
			},
			categoryFilter: [],
			styleFilter: [],
			hotelFilter: [],
			priceFilter: []
		};
	},
	componentDidMount: function() {

		var self = this;
		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/scheme']);
		};
		var fetchData = function(payload) {
			//从配置map里面获取到读取菜单的key
			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme');
			resourceLinks && self.setState({
				resourceLinks: resourceLinks
			});
		};
		var fetchCategory = function(payload) {
			self.setState({
				categoryFilter: [{
					name: '实景案例',
					schemeType: 1,
					selected: true
				}],
				pageIndex: 1
			});
		};
		var fetchStyle = function(payload) {
			return Api.httpGET('scheme/styles', {});

		};
		var fetchHotel = function(payload) {
			return Api.httpGET('hotel/all', {});
		};
		var fetchPrice = function(payload) {
			self.setState({
				priceFilter: [{
					name: '6,000-9,000',
					minPrice: 6000,
					maxPrice: 9000

				}, {
					name: '9,000-12,000',
					minPrice: 9000,
					maxPrice: 12000

				}, {
					name: '12,000-15,000',
					minPrice: 12000,
					maxPrice: 15000

				}, {
					name: '15,000-20,000',
					minPrice: 15000,
					maxPrice: 20000

				}, {
					name: '20,000-25,000',
					minPrice: 20000,
					maxPrice: 25000

				}, {
					name: '25,000-30,000',
					minPrice: 25000,
					maxPrice: 30000

				}, {
					name: '30,000-40,000',
					minPrice: 30000,
					maxPrice: 40000

				}, {
					name: '40,000-50,000',
					minPrice: 40000,
					maxPrice: 50000

				}, {
					name: '50,000以上',
					minPrice: 50000,
					maxPrice: 9999999

				}]
			});
		};
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData)
			.then(fetchCategory)
			.then(fetchPrice);
		$.when(fetchStyle())
			.done(function(p) {
				self.setState({
					styleFilter: p.data
				});
			});
		$.when(fetchHotel())
			.done(function(p) {
				self.setState({
					hotelFilter: p.data
				});
			});

	},

	loadMore: function(event) {
		event.preventDefault();
		this.setState(function(prevState, currentProps) {
			return {
				pageIndex: prevState.pageIndex + 1
			};
		});
	},
	filterCategory: function(evt) {
		// 分类搜索条件
		//实景案例:1 研发成果:2 客照欣赏:3
		var self = this;
		if (evt.target.tagName === 'SPAN') {
			//tab 控制
			$(evt.target).addClass('card-sel');
			$(evt.target).siblings().removeClass('card-sel');
			self.setState({
				currentCate: $(evt.target).attr('data-scheme-type'),
				pageIndex: 1
			});
		}

	},
	filterFun: function(evt) {
		var self = this;

		if (evt.target.tagName === 'SPAN' && $(evt.target).hasClass('card') && $(evt.target).parent('div').attr('id') === 'J_CardStyle') {

			$('.J_FilterCtrl .card').removeClass('card-sel');
			$(evt.target).toggleClass('card-sel');
			($(evt.target).attr('data-style-id') !== self.state.currentStyle || self.state.currentStyle === '') && self.setState({
				currentStyle: $(evt.target).attr('data-style-id'),
				pageIndex: 1,
				currentPrice: {
					min: '',
					max: ''
				}
			});
		} else if (evt.target.tagName === 'SPAN' && $(evt.target).hasClass('card') && $(evt.target).parent('div').attr('id') === 'J_CardPrice') {

			$('.J_FilterCtrl .card').removeClass('card-sel');
			$(evt.target).toggleClass('card-sel');
			($(evt.target).attr('data-price-min') !== self.state.currentPrice.min || self.state.currentPrice.min === '') && self.setState({
				currentStyle: '',
				currentPrice: {
					min: $(evt.target).attr('data-price-min'),
					max: $(evt.target).attr('data-price-max')
				},
				pageIndex: 1
			});
		}
	},
	filterStyle: function(evt) {
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
	filterHotel: function(evt) {
		var self = this;
		if (evt.target.tagName === 'SPAN') {
			$(evt.target).toggleClass('card-sel');
			$(evt.target).siblings().removeClass('card-sel');
			self.setState({
				currentHotel: ($(evt.target).attr('data-hotel-id') === self.state.currentHotel) ? '' : $(evt.target).attr('data-hotel-id'),
				pageIndex: 1
			});
		}
	},
	filterPrice: function(evt) {
		var self = this;
		if (evt.target.tagName === 'SPAN') {
			$(evt.target).toggleClass('tab-sel');
			$(evt.target).siblings().removeClass('tab-sel');
			self.setState({
				currentPrice: ($(evt.target).attr('data-price-min') === self.state.currentPrice.min) ? {
					min: '',
					max: ''
				} : {
					min: $(evt.target).attr('data-price-min'),
					max: $(evt.target).attr('data-price-max')
				},
				pageIndex: 1
			});
		}
	},
	render: function() {
		return (
			<div className="sjal-view">
				<div className="layout-center-box">
					<div id="slider_top" className="slider-box bannar mgb30">
						<TopSlider resourceLinks={this.state.resourceLinks} tplKey='recommend#scheme' />
					</div>
					<div className="tab-title"  onClick={this.filterCategory} >
						{
							this.state.categoryFilter && this.state.categoryFilter.length>0 &&
							$.map(this.state.categoryFilter,function(v,k){
								return (<span key={k} className={v.selected?'tab tab-sel':'tab'} data-scheme-type={v.schemeType}>{v.name}</span>)
							})
						}
						<div className="line-bottom"></div>
					</div>
					<div className='J_FilterCtrl' onClick={this.filterStyle}>
						<div className="filter-box">
							<span className="title"><i className="ico-1-js ico-1-2-js"></i>风格</span>
							<div className="tab-box" id='J_CardStyle'>
								<span className='tab tab-sel' data-style-id=''>全部</span>
								{
									this.state.styleFilter && this.state.styleFilter.length>0 &&
									$.map(this.state.styleFilter,function(v,k){
										return (<span key={k} className="tab" data-style-id={v.styleId}>{v.styleName}</span>)
									})
								}
							</div>
						</div>
						<div className="filter-box" style={{display:'none'}}>
							<span className="title"><i className="ico-1-js ico-1-3-js"></i>酒店</span>
							<div className="tab-box">
								{
									this.state.hotelFilter && this.state.hotelFilter.length>0 &&
									$.map(this.state.hotelFilter,function(v,k){
										return (<span key={k} className="tab" data-hotel-id={v.hotelId}>{v.hotelName}</span>)
									})
								}
							</div>
						</div>
						<div className="filter-box" onClick={this.filterPrice}>
							<span className="title"><i className="ico-1-js ico-1-1-js"></i>价位</span>
							<div className="tab-box" id='J_CardPrice'>
								<span className='tab' data-price-min='' data-price-max=''>全部</span>
								{
									this.state.priceFilter && this.state.priceFilter.length>0 &&
									$.map(this.state.priceFilter,function(v,k){
										return (<span key={k} className="tab" data-price-min={v.minPrice} data-price-max={v.maxPrice}>{v.name}</span>)
									})
								}
							</div>
						</div>
					</div>
					<CaseList
						resourceLinks={this.state.resourceLinks}
						pageIndex={this.state.pageIndex}
						pageSize={this.state.pageSize}
						currentCate={this.state.currentCate}
						currentStyle = {this.state.currentStyle}
						currentHotel = {this.state.currentHotel}
						currentPrice = {this.state.currentPrice}
						tplKey='list#scheme' />
					<div onClick={this.loadMore} id="J_MoreButton">
						<div className="more-btn"><span>点击查看更多</span></div>
					</div>
				</div>
			</div>

		);
	}
})

module.exports = Cases;
