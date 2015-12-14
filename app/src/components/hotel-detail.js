var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var Link = Router.Link;
var ImageListItem = require('./image-item.js');
var Api = require('../config/api.js');
var HotelDetail = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等
    getInitialState: function() {
        return {
            payload: [],
            recommend: []
        }
    },
    componentDidMount: function() {

        var self = this;
        //以父级作为更新
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/hotel']);
        };
        var fetchData = function() {
            //从配置map里面获取到读取菜单的key
            var url = self.getPath();
            return Api.httpGET(url, {});
        };
        var fetchRecommend = function(params) {
            var r = /^\/(.*)\/(\d+)$/;
            var url = self.getPath().split(r)[1];
            return Api.httpGET(url, params);

        };
        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu);
        fetchData()
            .done(function(payload) {
                ////console.log('hotel-detail:', JSON.stringify(payload, null, 4));
                (payload.code === 200) &&
                self.setState({
                    payload: payload.data
                }, function() {
                    self.state.payload.length > 0 && fetchRecommend({
                        pageSize: 6,
                        pageIndex: 1,
                        minPrice: self.state.payload[0].lowestConsumption
                    }).done(function(p) {
                        ////console.log('r:', JSON.stringify(p.data, null, 4));
                        self.setState({
                            recommend: p.data
                        })
                    });
                    self.state.payload.length &&
                        $('#J_SendHotelRequest').on('click', function() {
                            if (window.store.get('USER') && window.store.get('USER') !== '') {

                                Api.httpPOST('hotel/submit', {
                                    'hotelId': self.state.payload[0].hotelId,
                                    'phone': window.store.get('USER')
                                }).done(function(payload) {
                                    ////console.log('submit:', JSON.stringify(payload, null, 4));
                                })
                            } else {
                                $("#login_btn").trigger('click')
                            }


                        })



                })
            });
        var $hotel_menu_list = $('#hotel_menu_list');

        $hotel_menu_list.on('click', 'li', function() {
            if ($(this).hasClass('list-item-1-current-js')) {
                $(this).removeClass('list-item-1-current-js');
                return;
            }

            $(this).addClass('list-item-1-current-js').siblings().removeClass('list-item-1-current-js');
        });
    },
    componentDidUpdate: function(prevProps, prevState) {
        $("#slider_case_detail").Slider({
            type: "Horizontal"
        });
    },
    render: function() {
        var self = this;
        var detailData = this.state.payload.length > 0 ? this.state.payload[0] : {
            'address': '',
            'banquetHallList': [],
            'capacityPerTable': '0',
            'cityId': '-1',
            'detailedIntroduction': '',
            'highestConsumption': '',
            'lowestConsumption': '',
            'hotelId': '',
            'hotelLabelList': '',
            'hotelMealPackList': [],
            'hotelName': '',
            'imageUrlList': [],
            'latitude': '',
            'longitude': '',
            'typeName': ''

        }
        var r = /^\/(.*)\/(\d+)$/;
        var baseUrl = self.getPath().split(r)[1];
        return (
            <div className="hyyd-detail-view">
                <div className="layout-center-box">
                    <div className="hotel-detail-box">
                        <div className="img-info">
                            <div className="slider-box-4-js">
                                {
                                    detailData.imageUrlList.length>0 && $.map(detailData.imageUrlList,function(v,i){
                                        if (i===0) {
                                            return (
                                                <a
                                                    className="slider-hover-box"
                                                    href={v}
                                                    data-lightbox="roadtrip"
                                                    key={i}>
                                                    <div className="big-img-box mgb30">
                                                        <img src={v} />
                                                    </div>
                                                    <div className="slider-tip-box">
                                                        <span>点击看大图</span>
                                                    </div>
                                                </a>
                                            )
                                        }else {
                                            return (
                                                <a
                                                    href={v}
                                                    data-lightbox="roadtrip"
                                                    key={i}>
                                                </a>
                                            )
                                        }

                                    })
                                }
                            </div>
                        </div>
                        <div className="base-info">
                            <h1 className="mgb10">
                                {detailData.hotelName}
                            </h1>
                            <div className="p mgb30 clearfix">
                                <p>规格类型<b>
                                    {detailData.typeName}
                                </b></p>
                                <p>价格<span>¥<b>{detailData.lowestConsumption}</b>-<b>{detailData.highestConsumption}</b>/桌</span></p>
                                <p>场厅数量<span><b>
                                    {detailData.banquetHallList.length}
                                </b>个专用宴会厅</span></p>
                                <p>最大容客数<span><b>
                                    {detailData.capacityPerTable}
                                </b>桌</span></p>
                                <p id="J_AddressButton" >所在地址:<span>
                                <a href={'#/map?longitude='+detailData.longitude+'&latitude='+detailData.latitude}>
                                    <b>
                                        {detailData.address}
                                    </b>
                                </a>
                                <i className="ico-8-js" />
                            </span></p>
                            </div>

                            <div id='J_InfoContainer' className="score-info mgb40 clearfix">
                                <div className="star-box">
                                    <div className="star">
                                        <span>服务质量</span>
                                        <div>
                                            <i className="ico-star-3-js ico-star-3-gray-js" />
                                            <i
                                                className="ico-star-3-js ico-star-3-pink-js"
                                                style={{width: 45}} />
                                        </div>
                                    </div>
                                    <div className="star">
                                        <span>菜品质量</span>
                                        <div>
                                            <i className="ico-star-3-js ico-star-3-gray-js" />
                                            <i className="ico-star-3-js ico-star-3-pink-js" />
                                        </div>
                                    </div>
                                    <div className="star">
                                        <span>装修档次</span>
                                        <div>
                                            <i className="ico-star-3-js ico-star-3-gray-js" />
                                            <i className="ico-star-3-js ico-star-3-pink-js" />
                                        </div>
                                    </div>
                                </div>
                                <div className="etc">
                                    <div className="item">
                                        <em>大礼包</em>
                                        <i className="arrow-5-js arrow-5-rig-2-js" style={{display:'none'}} />
                                        <a href="#/sale-strategy?type=libao" target="_blank">通过金色百年预定婚宴，领取12999大礼包</a>
                                    </div>
                                    <div className="item">
                                        <em>组合优惠</em>
                                        <i className="arrow-5-js arrow-5-rig-2-js" style={{display:'none'}} />
                                        <a href="#/sale-strategy?type=zuhe" target="_blank">消费项目越多，优惠力度越大</a>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="func clearfix"
                                style={{display:'none'}}>
                                <span className="viewing-field"><i className="ico-9-js ico-9-1-js" />预约查看场地</span>
                            </div>
                            <div className="input-phone-number" style={{display:'none'}}>
                                <i className="arrow-5-js arrow-5-up-3-js" />
                                <span>输入手机号金色拜年统筹师会带你看场地</span>
                                <div className="input-text-box">
                                    <input
                                        defaultValue={
                                        window.store.get('USER') || ''
                                    }
                                        type="text" />
                                </div>
                            <span className="sub-1-js"><input
                                className="sub-input"
                                id='J_SendHotelRequest'
                                type="button"/>发送</span>
                            </div>

                        </div>
                    </div>
                    <div className="leftInner">
                        <div className="hotel-detail-info clearfix">
                            <h2 className="mgb10">酒店介绍</h2>
                            <div className="hotel-info-box mgb30">
                                <div className="img-box">
                                    <ImageListItem
                                        frameWidth={320}
                                        url={detailData.coverImageUrl || 'http://placehold.it/320x240'}/>
                                </div>
                                <div className="p">
                                    <p>
                                        {
                                            detailData.detailedIntroduction
                                        }
                                    </p>
                                </div>
                            </div>
                            <h2 className="mgb20">
                                {detailData.banquetHallList.length>0?'宴会厅介绍':''}
                            </h2>
                            <ul className="list-recommend">
                                {
                                    detailData.banquetHallList.length>0 && $.map(detailData.banquetHallList,function(v,i){
                                        return (
                                            <li
                                                key={i}
                                                className={
                                                (i%2 === 1)?'item-box mgb20 mg0' :'item-box mgb20 mgr20'
                                            }>
                                                <div className="title-box">
                                                    <h2>{v.banquetHallName}</h2>
                                                </div>
                                                <div className="img-box">
                                                    <ImageListItem
                                                        frameHeight={310}
                                                        url={v.image_url}
                                                        detailUrl={'#'+self.getPath()+'/'+v.banquetHallId+'?hotelName='+detailData.hotelName + '&address='+detailData.address+'&longitude=' + detailData.longitude+'&latitude='+detailData.latitude} />
                                                </div>
                                                <div className="info-box">
                                                    <ul className="clearfix">
                                                        <li style={{width:90+'px'}}>桌数：<span>{(v.capacity || '--')}桌</span></li>
                                                        <li style={{width:90+'px'}}>柱子：<span>
                                                        {(v.pillarNumber==='0')?'无':'有' || '--'}
                                                    </span></li>
                                                        <li style={{width:120+'px'}}>面积：<span>{(v.area||'--')}平方米</span></li>
                                                        <li style={{width:90+'px'}}>形状：<span>
                                                        {v.shape || '--'}
                                                    </span></li>
                                                        <li style={{width:90+'px'}}>层高：<span>{v.height || '--'}米</span></li>
                                                        <li style={{width:120+'px'}}>低消：<span>¥{ parseFloat(v.leastConsumption).toFixed(2)}／桌</span></li>
                                                    </ul>
                                                    <a
                                                        className="btn-js btn-grayline-pink-1-js transition-bg"
                                                        href={'#'+self.getPath()+'/'+v.banquetHallId+'?hotelName='+detailData.hotelName + '&address='+detailData.address+'&longitude=' + detailData.longitude+'&latitude='+detailData.latitude}>查看详情</a>
                                                </div>
                                            </li>
                                        )
                                    })
                                }


                            </ul>

                            <h2 id='test'>{detailData.hotelMealPackList.length>0?'婚宴套系菜单':''}</h2>
                            <div className="package-menu">
                                <ul className="hotel-menu-list" id="hotel_menu_list">
                                    {
                                        $.map(detailData.hotelMealPackList,function(v,i){
                                            return (
                                                <li className={i === 0 && "list-item-1-js list-item-1-current-js" || "list-item-1-js"} key={i}>
                                                    <div className="item-box">
                                                        <h3 className="transition">
                                                        <span>
                                                            {v.mealPackName}
                                                        </span>
                                                        </h3>
                                                        <i className="arrow-rig" />
                                                    <span className="pirce">
                                                        <strong>￥</strong>
                                                        <b>
                                                            {v.mealPackPrice}
                                                        </b>
                                                        <strong>／桌</strong>
                                                    </span>
                                                        <i className="arrow-lef" />
                                                        <a className="more transition">详情</a>
                                                    </div>
                                                    <div className="cont-menu transition">
                                                        <dl>
                                                            <dt>
                                                                {v.aliasName}
                                                            </dt>
                                                            {
                                                                $.map(v.mealPackDishList,function(vx,ix){
                                                                    return                                             (
                                                                        <dd key={ix}>
                                                                            {vx}
                                                                        </dd>
                                                                    )
                                                                })
                                                            }
                                                        </dl>
                                                    </div>
                                                </li>

                                            )
                                        })
                                    }
                                </ul>
                            </div>


                        </div>
                    </div>

                    <div className="recommend-adv-box">
                        <div className="hotel-recommend-adv-box clearfix">
                            <div className="title-rcmd">
                                <h1>推荐酒店</h1>
                                <div className="line-middle">
                                </div>
                            </div>
                            <div className="sel-card-jsbn">
                                <span className="item">同价位</span>
                            </div>
                            <ul className="list-adv">
                                {
                                    self.state.recommend.length>0 &&
                                    $.map(self.state.recommend,function(v,k){

                                        return (
                                            <li className="item-box" key={k}>
                                                <ImageListItem
                                                    url={v.imageUrl}
                                                    frameWidth={168}
                                                    detailUrl={'#/'+baseUrl+'/'+v.hotelId}
                                                    newWin={1}
                                                    />
                                                <div className="title-box">
                                                <span>
                                                    {v.hotelName}
                                                </span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

});
module.exports = HotelDetail;