var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var TopSlider = require('./top-slider.js');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var React = require('react');

var GatherRequire = React.createClass({
	componentDidMount: function() {
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/scheme']);
		};
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
	},
	render: function() {
		return (<iframe height = "2206"
			allowTransparency = "true"
			frameBorder = "0"
			scrolling = "no"
			style = {{"width":'100%','border':'none'}}
			src = "http://jsform.com/web/formembed/562753e10cf2b7156d082c97"> 
			</iframe>);
	}
});

module.exports = GatherRequire;