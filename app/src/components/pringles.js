var React = require('react');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var PringlesList = require('./pringles-list.js');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
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
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
            var url;

            $.each(resourceLinks,function(k,v){
                if(v.split('#')[0] === 'list')
                    url = v.split('#')[1]
            });

            //console.log(self.state.quarterly_name);
            self.fechData(url,{
                pageIndex:self.state.pageIndex,
                pageSize:self.state.pageSize,
                seasonId:q[0].seasonId
            }).done(function(payload){
                //console.log(payload.data);
                self.setState({
                    baseUrl:url,
                    payload:payload.data,
                })
            });
        }

        var season = function(){
            self.fechData('condition/season',{})
                .done(function(payload){
                    //console.log(payload.data);
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
                //console.log(payload.data);
                self.setState({
                    payload:payload.data
                })
            });
    },

    render: function() {
        var self = this;
        var payload = self.state.payload;
        return (
            <div className='layout-center-box'>
                <div className="title-center">
                    <h1>客片分季欣赏</h1>
                </div>

                <div className="tab-box-fj" id='slider_quarterly'>
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
                <ul className="list-recommend">
                    {
                        $.map(payload,function(v,i){
                            return(
                                <li className="item-box" key={i}>
                                    <div className='img-box'>
                                        <ImageListItem detailBaseUrl={self.state.baseUrl}
                                                       sid={v.contentId}
                                                       frameWidth={400}
                                                       frameHeight={600}
                                                       url={v.contentUrl}
                                                       errorUrl={'http://placehold.it/400x600'} />
                                        <a href={"#/"+self.state.baseUrl +'/'+ v.contentId} target='_blank' className="layer-box"></a>
                                        <h2 className="layer-title">{v.contentName}</h2>
                                        <div className="hover-title">
                                            <b>{v.actorNameMale}</b>
                                            <i className="ico-heart ico-heart-big"></i>
                                            <b>{v.actorNameFemale}</b>
                                            <span className="time">{v.createDate.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

})




var Pringles = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等信息
    //设置初始
    getInitialState: function() {
        return {
            resourceLinks: {},
            pageSize: 9,
            pageIndex: 1,
            stylesList: [],
            address: [],
            currentStyle: ''
        }
    },
    loadMore: function(event) {
        event.preventDefault();
        this.setState(function(prevState, currentProps) {
            return {
                pageIndex: prevState.pageIndex + 1
            }
        });
    },
    componentDidMount: function() {
        var self = this;
        $('#slider_top').Slider();

        //以父级作为更新
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/shot']);
        };
        var fetchData = function(payload) {
            //从配置map里面获取到读取菜单的key
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
            self.setState({
                resourceLinks: resourceLinks
            })
        };

        var fetchStyle = function(payload) {
            return Api.httpGET('condition/styleAddress', {});
        }

        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(fetchData)
        $.when(fetchStyle()).done(function(payload) {
            payload.data && payload.data.style.length && self.setState({
                stylesList: payload.data.style,
                address: payload.data.address
            });
        })
    },
    toggleFilter: function(evt) {
        var self = this;
        if (evt.target.tagName === 'SPAN') {
            $(evt.target).toggleClass('card-sel');
            $(evt.target).siblings().removeClass('card-sel');
            self.setState({
                currentStyle: ($(evt.target).attr('data-style-id') === self.state.currentStyle) ? '' : $(evt.target).attr('data-style-id'),
                pageIndex: 1
            });

            console.log(($(evt.target).attr('data-style-id') === self.state.currentStyle))
        }

    },
    toggleAddressFilter: function(evt) {
        var self = this;
        if (evt.target.tagName === 'SPAN') {
            $(evt.target).toggleClass('card-sel');
            $(evt.target).siblings().removeClass('card-sel');
            self.setState({
                currentAddress: ($(evt.target).attr('data-address-id') === self.state.currentAddress) ? '' : $(evt.target).attr('data-address-id'),
                pageIndex: 1
            });
        }

    },
    render: function() {
        var stylesList = this.state.stylesList;
        var addressList = this.state.address;

        return (
            <div className='kpxs-view'>
                <div className="layout-center-box" style={{height:'514px'}}>
                  <div id="slider_top" className="slider-box" style={{height:'514px'}}>
                      <TopSlider resourceLinks={this.state.resourceLinks} tplKey='top#adv' />
                    <div className="info" style={{display:'none'}}>
                      <div className="pos-box">
                        <h2><span className="boy">TEST</span><i className="ico-heart ico-heart-normal"></i><span className="gril">呵呵</span></h2>
                        <span className="time">2012-12-12</span>
                        <span className="hit">点击量：<b className="num">测试123</b></span>
                      </div>
                      <div className="mask-bg"></div>
                    </div>
                  </div>
                </div>
{
/*

<div className="responsive-box clearfix">
                    <div className="sel-card-1-js clearfix">
                        <span className="card card-sel">分类查看</span>
                        <div className="line-bottom"></div>
                    </div>
                    <div className="sel-card-2-js clearfix">
                        <span className="title"><i className="ico-1-js ico-1-2-js" ></i><b>风格</b></span>
                        <div className="card-box column-mg20-20" onClick={this.toggleFilter}>
                            {
                                $.map(stylesList,function(v,k){
                                    return  <span key={v.styleId} data-style-id={v.styleId} className="card">{v.styleName}</span>
                                })
                            }

                        </div>
                    </div>
                    <div className="sel-card-2-js clearfix">
                        <span className="title"><i className="ico-1-js ico-1-3-js" ></i><b>地点</b></span>
                        <div className="card-box column-mg20-20" onClick={this.toggleAddressFilter}>
                            {
                                $.map(addressList,function(v,k){
                                    return  <span key={v.addressId} data-style-id={v.addressId} className="card">{v.addressName}</span>
                                })
                            }

                        </div>
                    </div>
                </div>

*/

}

                <div className="layout-center-box">
                    <PringlesList resourceLinks={this.state.resourceLinks}
                                  pageSize={this.state.pageSize}
                                  pageIndex={this.state.pageIndex}
                                  tplKey='recommend#pringles'
                        />
                </div>
                <div onClick={this.loadMore} id="J_MoreButton">
                    <div className="more-btn"><span>点击查看更多</span></div>
                </div>
                <div className='space-100-eav mgb30'></div>
                <div className='main-body-eav'>
                    <Episode />
                </div>

            </div>
        );
    }
})

module.exports = Pringles;
