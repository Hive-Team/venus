var React = require('react');
var Api = require('../config/api.js');
var Router = require('react-router-ie8');
var PropTypes = React.PropTypes;
var ImageListItem = require('./image-item.js');

var PriceTag = React.createClass({
	render: function() {
		var detailData = this.state.payload.length > 0 && this.state.payload[0];
		var imageListData = detailData.imageList || [];
		var serviceListData = detailData.serviceList || [];

		return (
			<div>
              <div className="title-9-js mgb20">
                <h1>价格</h1>
              </div>
              <div className="theme-content mgb40 clearfix">
                <div className="all-price"><span className="pink-1-js">￥</span><b className="pink-1-js">{parseFloat(detailData.totalPrice).toFixed(2)}</b></div>
                <div className='price-box'>
                  <p className="price-detail first">
                    <span>场景布置费用:</span><em>￥</em><b>{parseFloat(detailData.sceneCost).toFixed(2)}</b>
                  </p>
                  <p className="price-detail">
                    <span>婚礼人费用:</span><em>￥</em><b>{parseFloat(detailData.hdpcCost).toFixed(2)}</b>
                  </p>
                </div>
              </div>
            </div>


		)
	}
});



var CaseDetail = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信
	getInitialState: function() {
		return {
			payload: []
		};
	},
	componentDidUpdate: function(prevProps, prevState) {
		$("#slider_case_detail").Slider({
			type: "Horizontal"
		});
	},
	componentDidMount: function() {
		var self = this;

		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/scheme']);
		};
		//开始发起详情请求.
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
				////console.log('case-detail:',payload);
				(payload.code === 200 && payload.data) &&
				self.setState({
					payload: payload.data
				})
			})

	},
	render: function() {
		var detailData = this.state.payload.length > 0 && this.state.payload[0];
		var imageListData = detailData.imageList || [];
		var serviceListData = detailData.serviceList || [];

		var f4Map = {
			'': '',
			1: '主持人',
			2: '化妆师',
			3: '摄影师',
			4: '摄像师',
      5: '双机摄影',
      6: '双机摄像',

		};
		var f4String = '';
		var standardWeddingString = detailData.standardWedding || '';
		$.each(standardWeddingString.split(','), function(k, v) {
			f4String += (' ' + f4Map[v]);
		});

		return (
            <div className="alxq-view">
                <div className="layout-center-box mgb30" id="slider_case_detail">
                    <div className='photo-show-box'>
                        <div className="title-4-js mgb30" style={{display:'none'}}><h1>婚礼案例</h1><div className="line-middle" /></div>
                        <div className="big-img-box">
                            <div className="btn-collection" style={{display:'none'}}>
                                <div className="pos-box">
                                    <i>S</i><span className="text">设为我的样本</span>
                                    <div className="mask-bg" />
                                </div>
                            </div>
                            <div className="kpxq-img-box">
                                <div className="lef-hover-box btn-prev" style={{display:'none'}}><div className="pos-box"><i className="ico-15-js ico-15-lef-js"></i></div></div>
                                <div className="rig-hover-box btn-next" style={{display:'none'}}><div className="pos-box"><i className="ico-15-js ico-15-rig-js"></i></div></div>
                                <img className="big-img" src="http://placehold.it/1200x800" />
                            </div>
                        </div>
                        <div className="gray-box gray-box-2 container">

                            <div className="small-img-box">
                                <ul className="item-box-2 clearfix">
                                    {
                                        imageListData.length && $.map(imageListData,function(v,i){
                                            return (
                                                <li className="item transition-margin"
                                                    key={i}
                                                    data-big-img-url={window.Core.mode === 'dev'?v.contentUrl:v.contentUrl+'@800h_1e_1c_0i_1o_90q_1x'}>
                                                    <ImageListItem
                                                        sid={v.contentId}
                                                        frameWidth={150}
                                                        frameHeight={100}
                                                        url={v.contentUrl}
                                                        errorUrl={'http://placehold.it/150x100'} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tilte-box">
                        <h1>{detailData.schemeTheme}</h1>
                    </div>
                    <div className="case-detail-box responsive-box clearfix">
                        <div className="left-box">
                            <div className="intr-box">
                                <p>
                                    {
                                        detailData.schemeDesc
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="right-box">
                            <div className="line-left" />
                            <div className="info-title" >
                                <h1>主题属性</h1><a className="btn-more transition-bg" style={{visibility:'hidden'}}>查看相近风格婚礼</a>
                            </div>
                            <div className="theme-content mgb40 clearfix">
                                <div className="type-box"><span>主题:</span><p>{detailData.schemeTheme}</p></div>
                                <div className="type-box"><span>风格:</span><p>{_.map(detailData.schemeStyles,function(v,k){
                                    return v.styleName + ' '
                                })}</p></div>
                                <div className="type-box"><span>色系:</span><p>{detailData.schemeColor||'默认色系'}</p><i className="violet-bg-1-js" /><i className="golden-bg-1-js" /></div>
                            </div>
                            <div className="info-title">
                                <h1>场地信息</h1>
                            </div>
                            <div className="theme-content mgb40 clearfix">
                                <p className="addr-info mgb20">
                                    {
                                        '于'+detailData.weddingDate+ ( (detailData.hotelName && detailData.hotelName !== '' && detailData.banquetHallName && detailData.banquetHallName !== '') ?'在'+detailData.hotelName +detailData.banquetHallName + '举办.':'在金色百年举办')
                                    }
                                </p>
                                <div className="label-box clearfix" style={{display:'none'}}>
                                    {
                                        serviceListData.length>0 && $.map(serviceListData,function(v,k){
                                            return <span key={k} className={!v.isUsed && 'unprovide' } >{v.serviceName}</span>
                                        })
                                    }
                                </div>
                            </div>
                            {
                                parseInt(detailData.totalPrice) !== 0 &&
                                (
                                    <div>
                                        <div className="info-title">
                                            <h1>价格</h1>
                                        </div>
                                        <div className="theme-content">
                                            <div className="all-price">
                                                <span className='in-pirce'>
                                                    <span className="words pink-1-js">折后价:</span>
                                                    <span className="pink-1-js">￥</span><b className="pink-1-js">{parseFloat(detailData.totalPrice).toFixed(2)}</b>
                                                </span>
                                                <span className='del-pirce'>
                                                    <span>原价: ￥</span><b>{parseFloat(detailData.originalPrice).toFixed(2)}</b>
                                                </span>
                                            </div>
                                            <div className='price-box'>
                                                <p className="price-detail first">
                                                    <span>场景布置费用:</span><em>￥</em><b>{parseFloat(detailData.sceneCost).toFixed(2)}</b>
                                                </p>
                                                <p className="price-detail">
                                                    <span>{($.trim(f4String) === '')?'婚礼人费用：':'婚礼人(' + f4String +') 费用：'}</span><em>￥</em><b>{parseFloat(detailData.hdpcCost).toFixed(2)}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});
module.exports = CaseDetail;
