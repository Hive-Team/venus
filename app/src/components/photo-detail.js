var React = require('react');
var Router = require('react-router-ie8');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var PhotoDetail = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信
	getInitialState: function() {
		return {
			payload: []
		}
	},
	componentDidMount: function() {
		var self = this;
		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/shot']);
		};
		var fetchData = function() {
			//从配置map里面获取到读取菜单的key

			var url = self.getPath();
			return Api.httpGET(url, {});
		};
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu);
		fetchData()
			.done(function(payload) {
				(payload.code === 200) &&
				self.setState({
					payload: payload.data,
				})

				////console.log(payload.data);
			})
		$('#J_CommonHeader').hide();

	},
	render: function() {
		var imgDetail = this.state.payload.detailedImages || [];
		imgDetail = imgDetail.length ? imgDetail.reverse() : imgDetail;
		return (
			<div className="samples-pringles-detail-view ypxq-eav">
				{
					$.map(imgDetail || [],function(v,i){
						return(
							<div key={i} className="box-img">
								<ImageListItem frameWidth={$(window).width()} url={v.imageUrl} />
							</div>
						);
					})
				}
			</div>


		);
	}

});

module.exports = PhotoDetail;