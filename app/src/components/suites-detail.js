var React = require('react');
var Router = require('react-router-ie8');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var SuitesRecommend = require('./suites-recommend.js');
var SuitesDetail = React.createClass({
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
				////console.log(JSON.stringify(payload,null,4));
				(payload.code === 200) &&
				self.setState({
					payload: payload.data
				}, function() {

				})
			})
	},

	componentDidUpdate: function(prevProps, prevState) {
		$("#slider_case_detail").Slider({
			type: "Horizontal"
		});
	},

	render: function() {
		var self = this;
		var detailData = self.state.payload.length > 0 && self.state.payload[0];
		// self.state.payload.length>0 && detailData.deposit='1000';
		var sliderData = detailData && detailData.slidesImages || [];
		var contentImages = detailData &&
			$.merge(
				$.merge(
					$.merge(
						$.merge(
							$.merge(
								detailData.detailImages,
								detailData.serviceImages
							),
							detailData.cosmeticImages
						),
						detailData.clothShootImages
					),
					detailData.baseSampleImages
				),
				detailData.processImages
			) || [];
		////console.log('contentImages:',JSON.stringify(contentImages,null,4));
		return (

			<div className="layout-center-box">
				<div className="container wedding-detail clearfix">
					<div className="base-info mgb30 clearfix" style={{display:'none'}}>
						<div className="slider-box-2-js" id="slider_case_detail">
							<div className="kpxq-img-box">
								<img className="big-img"/>
							</div>
							<div className="sel-box">
								<div className="btn-prev"><i className="arrow-2-js arrow-2-lef-js btn-lef"></i></div>
								<div className="btn-next"><i className="arrow-2-js arrow-2-rig-js btn-rig"></i></div>
								<div className="slider-box" style={{overflow:'hidden'}}>
									<ul className="item-box sel-url">
										{
											sliderData.map(function(v,i){
												return (
													<li className="item" key={i} data-big-img-url={v.imageUrl}>
														<ImageListItem
															sid={v.contentId}
															frameWidth={90}
															frameHeight={60}
															url={v.imageUrl}
															errorUrl={'http://placehold.it/90x60'} />
													</li>
												)
											})
										}
									</ul>
								</div>
							</div>
						</div>

						<div className="title">
							<h1>{detailData.productName}</h1>
							<span>摄影师档期有限，提前<b>支付定金</b>可确保<b>预约</b>到你喜欢的摄影师</span>
						</div>
						<div className="price"><em>¥</em><b>{parseFloat(detailData.price).toFixed(2)}</b><span>{'定金 ¥'+parseFloat(detailData.deposit||1000).toFixed(2)}</span></div>
						<p className="mgb-10">
							拍摄时间：<b>{detailData.shootTime+'天'}</b><br/>
							礼服造型：<b>{detailData.dressModeling}</b><br/>
							拍摄地点：<b>{detailData.shootAdress}</b><br/>
							拍摄样片：<b>{detailData.shootSampless+'张以上／精选'+detailData.recordNum + '张入册'}</b><br/>
							精修数量：<b>{detailData.truingNum +'张／余下80张底片刻盘'}</b>
						</p>
						<div className="func"><span className="btn-js btn-violet-2-js transition-bg">立即抢购</span><span className="collection"><i></i>点击收藏</span></div>
					</div>
					<div className="detail-box container mgt30 clearfix">
						<div className="photo-box mgb30 clearfix">
							{
								$.map(contentImages,function(v,k){
									return (
										<div key={k} className="bottom" style={{height:'auto'}}>
											<ImageListItem
												frameWidth={870}
												url={v.imageUrl}
												errorUrl={'http://placehold.it/870x450'} />
										</div>
									)

								})
							}
						</div>
						<div className="content mgb30 clearfix">
						</div>
					</div>
				</div>
			</div>

		);
	}

});
module.exports = SuitesDetail;