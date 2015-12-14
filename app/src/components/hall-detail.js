var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var ImageListItem = require('./image-item.js');
var Api = require('../config/api.js');
var HallDetail = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等
    getInitialState: function() {
        return {
            payload: [],
            baseSchemeUrl: '',
            schemePayload: [],
            recommend: []
        }
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
            $(document.body).trigger('ModuleChanged', ['#/hotel']);
            //我们为了能查到案例 需要案例的moduleId 重复下在cases下的操作

            var resourceLinks = window.Core.getResourcesLinks('/cases', '#/scheme');
            var tplKey = 'list#scheme';
            $.each(resourceLinks, function(k, v) {
                if (tplKey.indexOf(v.split('/')[0] > -1)) {
                    self.setState({
                        baseSchemeUrl: v.split('#')[1]
                    })
                }
            })
        };
        var fetchRecommend = function(params) {
            var r = /^\/(\w+\/\d+)\/.*$/;
            var url = self.getPath().split(r)[1];
            return Api.httpGET(url, params);

        };
        var fetchData = function() {
            //从配置map里面获取到读取菜单的key
            var url = self.getPath();

            return Api.httpGET(url, {});
        };
        var fetchScheme = function(schemeList) {
            //对案例数量进行筛选。
            var list = schemeList.length > 5 ? schemeList.slice(0, 5) : schemeList;
            $.each(list, function(k, v) {
                Api.httpGET(self.state.baseSchemeUrl + '/' + v).done(function(payload) {
                    self.setState({
                        schemePayload: self.state.schemePayload.concat(payload.data)
                    });
                    ////console.log('scheme in banquet', JSON.stringify(self.state.schemePayload, null, 4));
                })
            });
            return 1;
        }

        window.Core && window.Core.promises['/'] &&
        $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(fetchData)
            .done(function(payload) {
                ////console.log('hall-detail:', JSON.stringify(payload, null, 4));
                (payload.code === 200) &&
                self.setState({
                    payload: payload.data
                }, function() {
                    payload.data.length &&
                    payload.data.length > 0 &&
                    fetchScheme(payload.data[0].schemeList) &&
                    fetchRecommend({
                        pageSize: 6,
                        pageIndex: 1,
                        minPrice: payload.data[0].leastConsumption
                    }).done(function(p) {
                        self.setState({
                            recommend: p.data
                        })
                    });

                    self.state.payload.length &&
                    $('#J_BanquetRequestButton').on('click', function() {
                        if (window.store.get('USER') && window.store.get('USER') !== '') {

                            Api.httpPOST('hotel/submit', {
                                'banquetHallId': self.state.payload[0].banquetHallId,
                                'phone': window.store.get('USER')
                            }).done(function(payload) {
                                ////console.log('bsubmit:', JSON.stringify(payload, null, 4));
                            })
                        } else {
                            $("#login_btn").trigger('click')
                        }


                    })

                })


            })

    },

    render: function() {
        var self = this;
        var hotelName = self.getQuery().hotelName || '';
        var address = self.getQuery().address || '';
        var longitude = self.getQuery().longitude;
        var latitude = self.getQuery().latitude;

        var detailData = this.state.payload.length > 0 ? this.state.payload[0] : {
            detailImgList: [],
            banquetHallName: "",
            pillarNumber: 0,
            capacity: 0,
            area: 0,
            shape: ''
        };
        var r = /^\/(\w+\/\d+)\/.*$/;
        var baseUrl = self.getPath().split(r)[1];
        return (
            <div className="hyyd-detail-view">
                <div className='layout-center-box'>
                    <div className="hotel-detail-box mgb30 clearfix">
                        <div className="img-info clearfix">
                            <div className="slider-box-4-js">
                                {
                                    detailData.detailImgList.length>0 && $.map(detailData.detailImgList,function(v,i){
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
                            <h1 className="mgb10">{hotelName +' '+ detailData.banquetHallName}</h1>
                            <div className="p mgb30 clearfix">
                                <p>最大桌数<b>{detailData.capacity}</b></p>
                                <p>柱子<span><b>{parseInt(detailData.pillarNumber)>0?'有':'无' || '无'}</b></span></p>
                                <p>可用面积<span><b>{detailData.area}</b>平方米</span></p>
                                <p>形状<span><b>{detailData.shape}</b></span></p>
                                <p>层高<span><b>{detailData.height}</b>米</span></p>
                                <p>低消<span><b>¥{parseFloat(detailData.leastConsumption).toFixed(2)}</b>/桌</span></p>
                                {
                                    address && (<p>所在地址:<span>
                        <a href={'#/map?longitude='+longitude+'&latitude='+latitude}>
                            <b>
                                {address}
                            </b>
                        </a><i className="ico-8-js"></i></span></p>)
                                }
                            </div>
                            <div className="score-info mgb40 clearfix" style={{display:'none'}}>
                                <div className="star-box">
                                    <div className="star"><span>服务质量</span><div><i className="ico-star-3-js ico-star-3-gray-js"></i><i className="ico-star-3-js ico-star-3-pink-js" style={{width:45+'px'}}></i></div></div>
                                    <div className="star"><span>菜品质量</span><div><i className="ico-star-3-js ico-star-3-gray-js"></i><i className="ico-star-3-js ico-star-3-pink-js"></i></div></div>
                                    <div className="star"><span>装修档次</span><div><i className="ico-star-3-js ico-star-3-gray-js"></i><i className="ico-star-3-js ico-star-3-pink-js"></i></div></div>
                                </div>
                                <div className="etc">
                                    <div className="item"><em>礼包<i className="arrow-5-js arrow-5-rig-2-js"></i></em>婚庆喜包最高10000万</div>
                                    <div className="item"><em>特惠<i className="arrow-5-js arrow-5-rig-2-js"></i></em>提前3个月预订送酒水</div>
                                    <div className="item"><em>折上折<i className="arrow-5-js arrow-5-rig-2-js"></i></em>购全程服务再打88折</div>
                                </div>
                            </div>
                            <div className="func clearfix" style={{display:'none'}}>
                                <span className="viewing-field"><i className="ico-9-js ico-9-1-js"></i>预约查看场地</span>
                            </div>
                            <div className="input-phone-number" style={{display:'none'}}>
                                <i className="arrow-5-js arrow-5-up-3-js" />
                                <span>输入手机号金色拜年统筹师会带你看场地</span>
                                <div className="input-text-box">
                                    <input id='J_BanquetText'
                                           defaultValue={
                                        window.store.get('USER') || ''
                                    } type="text" />
                                </div><span className="sub-1-js"><input className="sub-input" id='J_BanquetRequestButton' type="button"/>发送</span>
                            </div>
                        </div>
                    </div>
                    <div className="leftInner">
                        <div className="hotel-detail-info banquet-detail-info clearfix">
                            <h2 className="mgb10">本厅平面图</h2>
                            <div className="banquet-img-box mgb30">
                                <img src={detailData.planeGraphUrl}/>
                            </div>
                            {
                                self.state.schemePayload.length>0&&(<h2 className="mgb10">本厅婚礼实例</h2>)
                            }

                            {
                                self.state.schemePayload.length>0&&
                                ( <div className="Case-box mgb20">
                                        <ImageListItem
                                            frameWidth={720}
                                            sid={self.state.schemePayload[0] &&self.state.schemePayload[0].weddingCaseId +''}
                                            url={self.state.schemePayload[0] && self.state.schemePayload[0].coverImageUrl || 'http://placehold.it/720x480'}
                                            detailBaseUrl={self.state.baseSchemeUrl}
                                            />
                                        <div className="info-box">
                                            <h3>{self.state.schemePayload[0] && self.state.schemePayload[0].schemeName}</h3>
                                            <p>{self.state.schemePayload[0] && self.state.schemePayload[0].schemeDesc.slice(0,140)}</p>
                                            <div className="theme-box clearfix">
                                                <span className="theme">主题：<b>{self.state.schemePayload[0] && self.state.schemePayload[0].schemeTheme.slice(0,8)}</b></span>
                        <span className="theme">风格：
                            {
                                self.state.schemePayload[0]&&self.state.schemePayload[0].schemeStyles.length>0 &&
                                $.map(self.state.schemePayload[0].schemeStyles,function(v,k){
                                    return <b key={k}>{v.styleName}</b>
                                })
                            }
                        </span>
                                                <span className="theme">色系：<b>{self.state.schemePayload[0]&& self.state.schemePayload[0].schemeColor}</b></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <ul className="list-2-js list-case clearfix">
                                {
                                    self.state.schemePayload&&
                                    self.state.schemePayload.length>1&&
                                    $.map(self.state.schemePayload.slice(1),function(v,k){
                                        return (
                                            <li className="item-box column-mg20-17 mg0" key={k}>
                                                <a className="hover-box transition-opacity" href={'#/'+self.state.baseSchemeUrl + '/' + v.weddingCaseId}>
                                                    <div className="pos-box">
                                                        <h3>{v.schemeName}</h3>
                                                        <div className="etc-info"><b>{parseInt(v.sceneCost)!==0?'￥'+parseFloat(v.sceneCost).toFixed(2):''}</b><span>（{v.weddingDate}）</span></div>
                                                        <div className="btn-box"></div>
                                                        <div classNameL="mask-bg"></div>
                                                    </div>
                                                </a>
                                                <ImageListItem
                                                    frameWidth={465}
                                                    url={v.coverImageUrl || 'http://placehold.it/465x310'}
                                                    sid={v.weddingCaseId + ''}
                                                    detailBaseUrl={self.state.baseSchemeUrl}
                                                    />
                                            </li>
                                        )
                                    })

                                }


                            </ul>
                        </div>
                    </div>
                    <div className="recommend-adv-box">
                        <div className="title-rcmd">
                            <h1>推荐酒店</h1><div className="line-middle"></div>
                        </div>
                        <div className="sel-card-jsbn mgb20">
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



        );
    }

});

module.exports = HallDetail;