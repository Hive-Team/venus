var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var TopSlider = require('./top-slider.js');
var resourceLink = 'videos';

var Item = React.createClass({
	render: function() {
		return (
			<div className="item-box">
				<span className='img-box'>
					<div className="cover-layer-wdy"><a href={'#/video-detail?video='+this.props.v.url +'&cover='+this.props.v.coverImage.imageUrl} className='pos-box' /></div>
				<img src={this.props.v.coverImage.imageUrl} className="img-video-wdy" />
				<a className='layer-box' href={'#/video-detail?video='+this.props.v.url +'&cover='+this.props.v.coverImage.imageUrl}><div className="title-video-wdy">{this.props.v.contentName}</div></a>
				</span>
			</div>
		)
	}
});

var WeddingMV = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			payload: []
		};
	},
	componentDidMount: function() {
		var self = this;
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/shot']);
		};
		var dataFetch = function() {
			return Api.httpGET(resourceLink, {
				videoType: 1
			});
		};


		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(dataFetch)
			.done(function(payload) {
				console.log('movie-list:', JSON.stringify(payload.data, null, 4));
				var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
				self.setState({
					resourceLinks: resourceLinks,
					payload: payload.data
				}, function() {})
			})


	},
	render: function() {
		return (
			<div className="hsjs-view">
				<div id="slider_top" className="slider-box layout-center-box mgb30">
					<TopSlider
						tplKey='top#adv'
						resourceLinks={this.state.resourceLinks}
						pageIndex={1}
						pageSize={1} />
				</div>
				<div className="layout-center-box">
					<div className="title">最新MV</div>
					<div className="line-e1-eav" />

					<ul className='list-recommend'>
						{
							$.map(this.state.payload,function(v,k){
								return (
									<Item v={v} key={k} />

								)
							})
						}
					</ul>
				</div>
				<div className="space-50-eav clear-b-eav" />
				<div className="line-eb-eav clear-b-eav" />
			</div>
		);
	}

});

module.exports = WeddingMV;