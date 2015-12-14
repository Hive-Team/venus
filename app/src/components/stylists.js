var React = require('react');
var Router = require('react-router-ie8');
var StylistsList = require('./stylists-list.js');
var HeadStylistsList = require('./head-stylists-list.js');
var Stylists = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信
	componentDidMount: function() {
		var self = this;
		var changeMenu = function() {
			$(document.body).trigger('ModuleChanged', ['#/shot']);
		};
		var fetchData = function(payload) {
			//从配置map里面获取到读取菜单的key
			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
			////console.log(JSON.stringify(resourceLinks,null,4))
			resourceLinks && self.setState({
				resourceLinks: resourceLinks
			})
		};
		$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData);
	},
	getInitialState: function() {
		return {
			resourceLinks: {},
			pageSize: 100,
			pageIndex: 1
		};
	},
	componentWillUnmount: function() {
		window.Core.gallery && window.Core.gallery.close();
		window.Core.gallery = null;
		$('#nav_fixed').show();
	},
	render: function() {
		return (
			<div className="main responsive-box clearfix">
			  <div className="director-photography-box">
				  <HeadStylistsList
					  resourceLinks={['stylist']}
					   tplKey='stylists'
					   pageIndex={this.state.pageIndex}
					   pageSize={this.state.pageSize}
					   worksPageIndex={'1'} worksPageSize={'2'} />
			   </div>

			  <StylistsList
				  resourceLinks={['stylist']}
				   tplKey='stylists'
				   pageIndex={this.state.pageIndex}
				   pageSize={this.state.pageSize}
				   worksPageIndex={'1'} worksPageSize={'4'}

				   />
			</div>

		);
	}
})
module.exports = Stylists;