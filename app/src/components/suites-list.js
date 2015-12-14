var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var SuitesInfo = require('./suites-info.js');
var SuitesList = React.createClass({
	// mixins: [IntlMixin],
	getInitialState: function() {
		return {
			payload: [],
			baseUrl: '',
			totalPage: 0
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var self = this;
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		}
		$.each(nextProps.resourceLinks, function(k, v) {
			(nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
			dataPromise(v.split('#')[1], {
					pageSize: nextProps.pageSize,
					pageIndex: nextProps.pageIndex
				})
				.done(
					function(payload) {
						////console.log(JSON.stringify(payload,null,4));
						200 === payload.code && payload.data && self.setState({
							payload: payload.data.concat(self.state.payload),
							baseUrl: v.split('#')[1],
							totalPage: parseInt(payload.totalCount)
						}, function() {
							(parseInt(payload.totalCount) <= parseInt(nextProps.pageIndex) * parseInt(nextProps.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show()


						})
					}
				)
		})

	},
	componentDidUpdate: function() {
		$('.scrollbarall').length > 0 && $(".scrollbarall").each(function(index, element) {
			var e = $(this);
			e.tinyscrollbar();
			e.find('.scrollbar').css({
				opacity: 0
			});

			e.bind('mouseenter', function() {
				$('.scrollbar', e).animate({
					opacity: 1
				}, 300);
			});

			e.bind('mouseleave', function() {
				$('.scrollbar', e).animate({
					opacity: 0
				}, 300);
			});
		});
	},
	render: function() {
		var baseUrl = this.state.baseUrl;
		var listData = this.state.payload.length > 0 && this.state.payload;

		return (
			<div className='list-recommend'>
				<div className="title-box">
					<h1>婚纱摄影套系</h1>
					<h2>摄影师档期有限，提前 <b>支付定金</b> 可确保 <b>预约</b> 到你喜欢的摄影师！</h2>
					<span className="find">找到 <b>9</b> 个套系</span>
				</div>
				{
					listData.length&&$.map(listData,function(v,i){
						return (
							<li className="item-box" key={i}>
								<ImageListItem
									detailBaseUrl={baseUrl}
									sid={v.productId}
									frameHeight={320}
									url={v.imageUrl}
									errorUrl={'http://placehold.it/550x320'} />
								<div className='r-box'>
									<div className="price">
										<em>¥</em><b>{parseFloat(v.price).toFixed(2)}</b>
										<span style={{display:'none'}}>{'定金 ¥'+parseFloat(v.deposit).toFixed(2)}</span>
									</div>
									<div className='scrollbarall cur-scroll'>
										<div className="scrollbar">
											<div className="track">
												<div className="thumb">
													<div className="end"></div>
												</div>
											</div>
										</div>
										<div className='viewport'>
											<SuitesInfo info={v.shootAdress} />
										</div>
									</div>
									<div className="func transition-border"></div>
								</div>
							</li>
						)
					})
				}
			</div>
		);
	}
})

module.exports = SuitesList;