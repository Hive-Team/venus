var React = require('react');

var PutRequire = React.createClass({
	componentDidMount: function() {
		var self = this;
		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/scheme']);
		};
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu);
	},
	render: function() {
		return (
			<div className='layout-center-box'>
				<div className="top-box-hqdz"><img src="./assets/img/eavlee/hqdz/top.jpg" /></div>
				<div className="mid-box-hqdz"><img src="./assets/img/eavlee/hqdz/mid.jpg" /></div>
				<div className="bot-box-hqdz">
					<a target='_blank' href="http://jsform.com/f/e7w5oq" className="lef-img"><img src="./assets/img/eavlee/hqdz/tjxq.png" /></a>
					<a target='_blank' href="#/planners"><img src="./assets/img/eavlee/hqdz/xchs.png" /></a>
					<a target='_blank' href="#/f4" className="rit-img"><img src="./assets/img/eavlee/hqdz/xhlr.png" /></a>
				</div>
			</div>
		);
	}

});

module.exports = PutRequire;