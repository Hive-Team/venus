var React = require('react');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');
var TopSlider = require('./top-slider.js');
var ImageListItem = require('./image-item.js');
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
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme');
            var url='videos';

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
            self.fechData('videos/season',{})
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
            seasonId:obj.seasonId,
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
                <div className="title-center"><h1>婚礼视频分季欣赏</h1></div>

                <div className="tab-box" id='slider_quarterly'>
                    <div className='overflow-box'>
                        <ul className="item-box" style={{width:'100%'}}>
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
                <div className="title-fj"><h2>{'《'+ self.state.quarterly_name + '》'}</h2></div>
                <ul className="movie-list">
                    {
                        $.map(payload,function(v,k){
                            return(
                                <li className="item-box" key={k}>
                                    <div className="img-box">
                                        <ImageListItem
                                            frameWidth={380}
                                            frameHeight={250}
                                            url={ v.coverImage && v.coverImage.imageUrl}
                                            />
                                        <a href={"#/video-detail"+'?video='+ v.url} className="layer-box">
                                            <div className="layer"></div>
                                            <div className="info">
                                                <h3>{v.name}</h3>
                                                <i className="ico-play"></i>
                                                <div className="date">
                                                    <span>({v.createDate.split(' ')[0]})</span>
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

})


var VideoCase = React.createClass({

    render: function() {
        return (
            <ul className="movie-list">
                {
                    $.map(this.props.videos || [],function(v,k){
                        return (
                            <li className="item-box" key={k}>
                                <div className='img-box'>
                                    <ImageListItem
                                        frameWidth={380}
                                        frameHeight={250}
                                        url={v.coverImage.imageUrl}
                                        />
                                    <a className="layer-box" href={'#/video-detail?video='+v.url+'&cover='+v.coverImage.imageUrl}>
                                        <div className="layer"></div>
                                        <div className="info">
                                            <h3>{v.name}</h3>
                                            <i className="ico-play"></i>
                                            <span className="date">
                                                <span>({v.createDate.split(' ')[0]})</span>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        )
                    })
                }

            </ul>
        );
    }

});

var WeddingVideo = React.createClass({
  mixins: [Router.State], //我们需要知道当前的path params 等等信息
  //设置初始
  getInitialState: function() {
    return {
      resourceLinks: {},
      payload: [],
      pageSize: 100,
      pageIndex: 1,
      totalCount: 0

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
    };

    var pageData = function(payload) {
      return Api.httpGET('videos', {
        videoType: 3,
        pageIndex: self.state.pageIndex,
        pageSize: self.state.pageSize,
        sort:'hits'
      })
    }

    window.Core && window.Core.promises['/'] &&
    $.when(window.Core.promises['/'])
    .then(changeMenu)
    .then(fetchData)
    .then(pageData)
    .done(function(payload) {
            console.log(payload.data);
      self.setState({
        payload: ((self.state.pageIndex === 1) ? payload.data : self.state.payload.concat(payload.data)),
        totalCount: payload.totalCount
      }, function() {
        (parseInt(self.state.totalCount) <= parseInt(self.state.pageIndex) * parseInt(self.state.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show()
      })
    })
  },

  moreData: function() {
    var self = this;
    self.setState({
      pageIndex: self.state.pageIndex + 1
    }, function() {
      pageData().done(function(payload) {
        self.setState({
          payload: ((self.state.pageIndex === 1) ? payload.data : self.state.payload.concat(payload.data)),
          totalCount: payload.totalCount
        }, function() {
          (parseInt(self.state.totalCount) <= parseInt(self.state.pageIndex) * parseInt(self.state.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show()
        })
      })
    });
  },

    render: function() {
        return (
            <div className="hlsp-view">
                <div className="layout-center-box">
                    <div id="slider_top" className="slider-box bannar mgb30">
                        <TopSlider resourceLinks={this.state.resourceLinks} tplKey='top#adv' />
                    </div>
                    <VideoCase videos={this.state.payload} />
                    <div onClick={this.loadMore} id="J_MoreButton">
                        <div className="more-btn"><span>点击查看更多</span></div>
                    </div>
                    <Episode />
                </div>
            </div>
        );
    }
});

module.exports = WeddingVideo;
