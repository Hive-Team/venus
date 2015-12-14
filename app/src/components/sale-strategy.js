var React = require('react');
var Router = require('react-router-ie8');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var SaleStrategy = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信
	getInitialState: function() {
		return {
			libao: [{
				contentUrl: 'http://image.jsbn.com/static/libao/libao_01.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/libao/libao_02.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/libao/libao_03.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/libao/libao_04.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/libao/libao_05.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/libao/libao_06.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/libao/libao_07.jpg'
			}],
			zuhe: [{
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_01.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_02.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_03.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_04.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_05.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_06.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_07.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_08.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_09.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_10.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_11.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_12.jpg'
				}, {
					contentUrl: 'http://image.jsbn.com/static/youhui/youhui_13.jpg'
				}

			],
			taoxi: [{
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_01.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_02.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_03.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_04.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_05.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_06.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_07.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_08.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_09.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_10.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_11.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_12.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_13.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_14.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_15.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_16.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_17.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_18.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_19.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_20.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_21.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_22.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/youhui/youhui_taoxi_01_23.jpg'
			}],
			hqxq: [{
				contentUrl: 'http://image.jsbn.com/static/xqti/hqdz/xqtj-01.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/xqti/hqdz/xqtj-02.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/xqti/hqdz/xqtj-03.jpg'
			}, {
				contentUrl: 'http://image.jsbn.com/static/xqti/hqdz/xqtj-04.jpg'
			}]
		}
	},
	componentDidMount: function() {
		var self = this;
		//以父级作为更新
		var changeMenu = function(payload) {
			var type = self.getQuery().type;
			var module = (type === 'libao') ? '#/hotel' : '#/home'
			$(document.body).trigger('ModuleChanged', [module]);
		};
		// var fetchData = function(){
		// 	//从配置map里面获取到读取菜单的key
		// 	var url = self.getPath();
		// 	return Api.httpGET(url,{});
		// };
		//
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu);
		// fetchData()
		// 	.done(function(payload){
		// 		(payload.code === 200) &&
		// 			self.setState({
		// 				payload:payload.data,
		// 			})
		//
		// 		////console.log(payload.data);
		// 	})
		$('#J_CommonHeader').hide();

	},
	render: function() {
		var imgDetail = this.state[this.getQuery().type] || [];

		return (
			<div className="samples-pringles-detail-view ypxq-eav">

				{
					$.map(imgDetail || [],function(v,i){
						return(
							<div key={i} className="box-img">
								<ImageListItem frameWidth={1920} url={v.contentUrl} />
							</div>
						);
					})
				}

			</div>


		);
	}
})

module.exports = SaleStrategy;