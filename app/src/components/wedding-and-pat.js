var React = require('react');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var ImageListItem = require('./image-item.js');
var Api = require('../config/api.js');
var CaseList = require('./cases-list.js');

var Episode = React.createClass({

    mixins: [Router.State], //我们需要知道当前的path params 等等信息

    getInitialState : function(){
        return{
            payload:[],
            quarterly:[],
            pageIndex:1,
            pageSize:50,
            quarterly_name:'',
            baseUrl:''
        }
    },

    fechData : function(url,params){
        return Api.httpGET(url,params);
    },

    componentWillMount : function(){
        var self = this;

        var getData = function(q){
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme');
            var url;

            $.each(resourceLinks,function(k,v){
                if(v.split('#')[0] === 'list')
                    url = v.split('#')[1]
            });

            //console.log(self.state.quarterly_name);
            self.fechData(url,{
                pageIndex:self.state.pageIndex,
                pageSize:self.state.pageSize,
                seasonId:q[0].seasonId,
            }).done(function(payload){
                //console.log(payload.data);
                self.setState({
                    baseUrl:url,
                    payload:payload.data,
                })
            });
        }

        var season = function(){
            self.fechData('scheme/season',{})
                .done(function(payload){
                    self.setState({
                        quarterly:payload.data,
                        quarterly_name:payload.data[0].seasonName
                    },function(){
                        var slider = $('#slider_quarterly');
                        slider.Slider({type:'Horizontal',margin:40,focusShift:false});
                    });

                    getData(payload.data);
                });
        }

        window.Core && window.Core.promises['/'] &&
        $.when(window.Core.promises['/'])
            .then(season);
    },

    componentDidMount : function(){
    },

    componentDidUpdate : function(){
        var self = this;
    },

    clickFunc : function(obj,name){
        var self = this;
        var params = {
            pageIndex:self.state.pageIndex,
            pageSize:self.state.pageSize,
            seasonId:obj.seasonId
        }

        name != '' && (self.state.quarterly_name = name);
        for(var i in obj) params[i] = obj[i];
        self.fechData(self.state.baseUrl,params)
            .done(function(payload){
                self.setState({
                    payload:payload.data
                })
            });
    },

    render: function() {
        var self = this;
        var payload = self.state.payload;
        return (
            <div>
                <div className="title-center"><h1>婚礼跟拍分季欣赏</h1></div>

                <div className="tab-box" id='slider_quarterly'>
                    <div className='overflow-box slider-box'>
                        <ul className="item-box">
                            {
                                $.map(self.state.quarterly,function(v,i){
                                    return(
                                        <li key={i} onMouseDown={self.clickFunc.bind(self,{seasonId:v.seasonId},v.seasonName)} className='item'>
                                            <div className='pos-box'>
                                                <div className='click-box'></div>
                                                <div className="pic"><img src={v.coverUrl} /></div>
                                                <p><span>{v.weddingDate}</span><br/><span>{v.seasonName}</span></p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="arrow-lef btn-prev"></div>
                    <div className="arrow-rig btn-next"></div>
                </div>
                <div className="title-fj"><h2>{'《' + self.state.quarterly_name + '》'}</h2></div>
                <ul className="cases-list">
                    {
                        $.map(payload,function(v,i){
                            return(
                                <li key={i} className="item-box">
                                    <div className='img-box'>
                                        <a href={"#/"+self.state.baseUrl + v.weddingCaseId} className="img-box" target='_blank'>
                                            <img src={ v.weddingCaseImage} />
                                        </a>
                                        <a className='layer-box' href={"#/"+self.state.baseUrl +'/'+ v.weddingCaseId} className="hover-box transition-opacity" target='_blank'>
                                            <div className="layer"></div>
                                            <div className="info">
                                                <h3>{v.schemeName}</h3>
                                                <div className="date">
                                                    <b></b><span><span>(</span><span>{v.weddingDate}</span><span>)</span></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

});

var WeddingAndPat = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等信息
    //设置初始
    getInitialState: function() {
        return {
            resourceLinks: {},
            pageSize: 9,
            pageIndex: 1,
            currentCate: '',
            currentStyle: '',
            currentHotel: '',
            currentPrice: {
                min: '',
                max: ''
            },
            categoryFilter: [],
            styleFilter: [],
            hotelFilter: [],
            priceFilter: []
        }
    },

    componentDidMount: function() {
        var self = this;

        //以父级作为更新
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/scheme']);
        };
        var fetchData = function(payload) {
            //从配置map里面获取到读取菜单的key
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme')
            resourceLinks && self.setState({
                resourceLinks: resourceLinks
            })
            //console.log('resource:', resourceLinks)
        };

        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(fetchData);
    },

    moreData: function() {
        var self = this;

        self.setState({
            pageIndex: self.state.pageIndex + 1
        });
    },

    render: function() {
        return (
            <div className="hlgp-view">
                <div className="layout-center-box">
                    <div id="slider_top" className="slider-box bannar">
                        <TopSlider resourceLinks={this.state.resourceLinks} tplKey='top#adv' />
                    </div>
                    <CaseList
                        resourceLinks={this.state.resourceLinks}
                        pageIndex={this.state.pageIndex}
                        pageSize={this.state.pageSize}
                        currentCate={this.state.currentCate}
                        currentStyle = {this.state.currentStyle}
                        currentHotel = {this.state.currentHotel}
                        currentPrice = {this.state.currentPrice}
                        tplKey='recommend#scheme' />

                    <div onClick={this.loadMore} id="J_MoreButton">
                        <div className="more-btn"><span>点击查看更多</span></div>
                    </div>
                    <Episode />
                </div>
            </div>
        );
    }
});

module.exports = WeddingAndPat;
