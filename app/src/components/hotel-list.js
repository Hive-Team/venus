var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var FeatureLabel = React.createClass({
    render: function() {
        var f = this.props.features && this.props.features.split(',') || [];
        f = f.length > 8 ? f.slice(0, 8) : f;
        return (
            <div className="label-box clearfix">
                {
                    $.map(f,function(label,k){
                        return (
                            <label key={k}>
                                {label.length>6? label.slice(0,5)+'...':label}
                            </label>
                        )
                    })
                }
            </div>
        );
    }
});
var HallList = React.createClass({
    render: function() {
        var baseUrl = this.props.baseUrl;
        var halls = this.props.halls.length > 2 ? this.props.halls.slice(0, 2) : this.props.halls;
        return (
            <dl>
                <dt>
                    <span>宴会厅</span>
                    <span>桌数</span>
                    <span>层高</span>
                    <span>柱数</span>
                </dt>
                {
                    (halls.length === 0) &&
                    <dd>
                        <span>--</span>
                        <span>--</span>
                        <span>--</span>
                        <span>--</span>
                    </dd>
                }
                {
                    $.map(halls,function(h,hk){
                        return (
                            <dd key={hk}>
                                <a href={baseUrl+'/'+h.banquetHallId}>
                                    <span>
                                        {h.banquetHallName}
                                    </span>
                                    <span><b>
                                        {h.capacity}
                                    </b><em>桌</em></span>
                                    <span><n>
                                        {h.height}
                                    </n>米</span>
                                    <span>
                                        {parseInt(h.pillarNumber)>0?'有':'无' }
                                    </span>
                                </a>
                            </dd>
                        )
                    })


                }
            </dl>
        );
    }
});
var HotelList = React.createClass({
    getInitialState: function() {
        return {
            payload: [],
            totalPage: 0

        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        var dataPromise = function(url, params) {
            return Api.httpGET(url, params);
        }
        var p = {};
        p['pageSize'] = nextProps.pageSize;
        p['pageIndex'] = nextProps.pageIndex;
        $.each(nextProps.sorter, function(k, v) {
            p[k] = v;
        });
        $.each(nextProps.filter, function(k, v) {
            p[k] = v;
        });
        $.each(nextProps.extraFilter, function(k, v) {
            p[k] = v;
        });


        nextProps.resourceLinks && $.each(nextProps.resourceLinks, function(k, v) {

            (nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
            dataPromise(v.split('#')[1], p)
                .done(
                    function(payload) {
                        ////console.log(JSON.stringify(payload, null, 4));
                        200 === payload.code && self.setState({
                            payload: (parseInt(nextProps.pageIndex) === 1) ? payload.data : self.state.payload.concat(payload.data),
                            baseUrl: v.split('#')[1],
                            totalPage: parseInt(payload.totalCount)
                        }, function() {
                            (parseInt(payload.totalCount) <= parseInt(nextProps.pageIndex) * parseInt(nextProps.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show()
                            $('#J_TotalCount').find('b').html(payload.totalCount);
                        })
                    }
                )
        })
    },
    render: function() {
        var onePage = this.state.payload || [{}, {}];
        var baseUrl = this.state.baseUrl;
        return (

            <ul className="list-recommend">
                {
                    $.map(onePage,function(v,k){
                        return (

                            <li key={k} className="item-box clearfix">
                                <div className="info-box">
                                    <div className="content-box">
                                        <ImageListItem
                                            detailBaseUrl={baseUrl}
                                            sid={v.hotelId}
                                            frameWidth={320}
                                            url={v.imageUrl}
                                            newWin={1}
                                            />
                                        <div className="info">
                                            <div className="title clearfix">
                                              <a href={'#/'+baseUrl+'/'+v.hotelId} target='_blank'>
                                                <h2>
                                                    {v.hotelName}
                                                </h2>
                                                </a>
                                                {!!v.isGift && (
                                                    <label className="label-pink">礼</label>
                                                )}
                                                {!!v.isDiscount && (
                                                    <label className="label-blue">惠</label>
                                                )}
                                            </div>
                                            <div className="price-box"><span>￥</span><span className="big">{v.lowestConsumption}</span><span>-</span><span className="big">{v.highestConsumption}</span></div>
                                            <div className="score-box clearfix">
                                                <div className="star-box">
                                                    <i className="ico-star-2-js ico-star-2-gray-js">
                                                    </i>
                                                    <i
                                                        className="ico-star-2-js ico-star-2-pink-js"
                                                        style={{width:72+'px'}}>
                                                    </i>
                                                </div>
                                                <span className="score">4.9</span>
                                                <span className="hotel-type">
                                                    <b>
                                                        {v.typeName}
                                                    </b>｜<b>
                                                    {v.address.length>20?v.address.slice(0,18)+'...':v.address}
                                                </b>
                                            </span>
                                            <span className="desk-num">可容纳<b>{v.capacityPerTable}</b>桌</span>
                                        </div>
                                        <HallList
                                            halls={v.banquetHallList}
                                            baseUrl={'#/'+baseUrl+'/'+v.hotelId} />
                                        <a href={'#/'+baseUrl+'/'+v.hotelId} target="_blank" className="viewing-banquet transition-bg">查看更多宴会厅</a>
                                    </div>
                                </div>
                            </div>
                            <div className="reply-box">
                                <div className="content-box">
                                    <FeatureLabel features={v.featureLable} />
                                    <div
                                        className="user-box clearfix"
                                        style={{display:'none'}}>
                                        <a className="avatar-box">
                                            <img src="http://placehold.it/60x60"/>
                                        </a>
                                        <div className="reply-content">
                                            “<p>
                                            To Be or Not To Be
                                        </p>”
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="share-box"
                            style={{display:'none'}}>
                            <div className="share"><i className="ico-10-js ico-10-1-js">
                            </i>分享</div>
                            <div className="collection"><i className="ico-10-js ico-10-2-js">
                            </i>收藏</div>
                        </div>
                    </li>
                )
            })

        }
    </ul>

        );
    }

});

module.exports = HotelList;
