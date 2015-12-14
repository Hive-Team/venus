var React = require('react');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var SuitesList = require('./suites-list.js');
var SuitesActivity = require('./suites-activity.js');
var Suites = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信息
	//设置初始
	getInitialState: function() {
		return {
			resourceLinks: {},
			pageSize: 50,
			pageIndex: 1
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
			resourceLinks && self.setState({
				resourceLinks: resourceLinks
			})
		};

		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData)
	},

	render: function() {
		return (
			<div className="txbj-view layout-center-box">
				<div className="custom-banner responsive-box mgb30" style={{display:'none'}}>
					<div id="slider_top" className="slider-box-1-js responsive-box">
						<TopSlider resourceLinks={this.state.resourceLinks} tplKey='top#adv/10024' />
					</div>
				</div>
				<div className="container clearfix">
					<div className="column-mg30-18 mgr30">
						<SuitesList resourceLinks={this.state.resourceLinks}
									tplKey='list#suite'
									pageSize={this.state.pageSize}
									pageIndex={this.state.pageIndex} />
					</div>
					<div className="ad-box">
						<img src="http://image.jsbn.com/static/dior.jpg" className='mgb30' />
						<img src="http://image.jsbn.com/static/la_sposa2.jpg" />
					</div>
				</div>
				<div onClick={this.loadMore} style={{display:'none'}} id="J_MoreButton">
					<div className="more-btn"><span>点击查看更多</span></div>
				</div>
			</div>

		);
	}
})

module.exports = Suites;