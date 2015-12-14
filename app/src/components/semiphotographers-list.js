var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var WorksList = React.createClass({
    render: function() {
        var works = this.props.works.splice(0, this.props.worksPageSize);
        var personId = this.props.personId;
        var self = this;
        if (0 === works.length) {
            works = [{}, {}, {}, {}]
        }

        return (
            <ul className="list-11-js">
                {
                    works.map(function(val,key){
                     return  <li key={key}
                         className={key===3?'column-4 mg0 J_ShowPhoto ':"column-4 mgr10 J_ShowPhoto"}
                         data-big-img-url={val.contentUrl}
                         data-index={key}
                         data-works-id={val.contentId}
                         data-person-id={personId}
                         >
                              <ImageListItem
                                  frameWidth={200}
                                  url={val.contentUrl}
                                  newWin={1}
                                  detailUrl={'#/photographers/'+personId+'/works/'+val.contentId}
                                  errorUrl={'http://placehold.it/200x280'}
                                   />
                          </li>
                    })
                }
            </ul>
        );
    }

});

var SemiPhotographersList = React.createClass({
    getInitialState: function() {
        return {
            payload: [],
            baseUrl: ''
        };
    },

    componentWillUnmount: function() {
        window.Core.gallery && window.Core.gallery.close();
        window.Core.gallery = null;
    },
    // showPhotoSwipe:function(items){
    //     var self  = this;
    //     window.Core.gallery && window.Core.gallery.close();
    //     var pswpElement = document.querySelectorAll('.pswp')[0];
    //     $('#nav_fixed').hide();
    //     // define options (if needed)
    //     var options = {
    //              // history & focus options are disabled on CodePen
    //         history: false,
    //         focus: false,
    //         showAnimationDuration: 0,
    //         hideAnimationDuration: 0,
    //         tapToClose:true

    //     };
    //     var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    //     gallery.init();
    //     gallery.goTo(0);
    //     window.Core.gallery = gallery;
    // },
    // buildItems:function(data){
    //     var self = this;
    //     if(data.length===0) return [] ;

    //     return $.map(data,function(v,k){
    //         var reg = /_(\d{1,4})x(\d{1,4})\.\w+g$/i
    //         var found = v.imageUrl && v.imageUrl.match(reg);
    //         var width =  -1;
    //         var height = -1;
    //         if(found&&found.length === 3){
    //             //如果图片带了高宽参数 就截取出来.放在data-x属性上.方便操作.
    //             width = parseInt(found[1]);
    //             height = parseInt(found[2]);
    //         }

    //         var item = {
    //             src:v.imageUrl || 'http://placehold.it/1200x800',
    //             w:width,
    //             h:height
    //         };
    //         return item;

    //     })
    // },

    componentWillReceiveProps: function(nextProps) {
        var self = this;
        var dataPromise = function(url, params) {
            ////console.log('semi:', url);
            return Api.httpGET(url, params);
        }
        $.each(nextProps.resourceLinks, function(k, v) {
            (nextProps.tplKey.indexOf(v) > -1) &&
            dataPromise(v, {
                    pageSize: nextProps.pageSize,
                    pageIndex: nextProps.pageIndex
                })
                .done(
                    function(payload) {
                        var dumpData = function(url) {
                            var semiPhotographerData = $.map(payload.data, function(val) {
                                //1:总监 2:资深
                                return (val.levelId === 2) ? val : null;
                            });
                            self.setState({
                                payload: semiPhotographerData.concat(self.state.payload),
                                baseUrl: url
                            }, function() {
                                //                        $('.J_ShowPhoto').delegate('a','click',function(){
                                //                            var personId = $(this).parent('.J_ShowPhoto').attr('data-person-id');
                                // var worksId = $(this).parent('.J_ShowPhoto').attr('data-works-id');
                                // Api.httpGET('photographers/'+personId+'/works/'+worksId,{pageIndex:1,pageSize:100})
                                //  .done(function(payload){
                                //      var items = self.buildItems(payload.data.detailedImages);
                                //      self.showPhotoSwipe(items);
                                //  })
                                //                            return false;
                                //                        })
                            })
                        };

                        200 === payload.code && payload.data && dumpData(v);
                    }
                )
        })

    },
    render: function() {
        var self = this;
        var people = this.state.payload;
        var worksPerPage = this.props.worksPageSize;
        return (
            <div>
                {
                    people.length>0 &&<div className="dividing-line-box clearfix"> <div className="line-zj"></div> <div className="line-1-js"></div> <div className="line-gj"></div> </div>
                }

                <ul className="list-3-js list-3-1-js mgb30 clearfix">
                    {


                        people.map(function(v,k){
                            return (
                                <li key={k}>
                                    <a className="figure">
                                        <div className="avatar-box"><img src={(window.Core.mode==='dev')?v.photoUrl:v.photoUrl+'@120h_1e_1c_0i_1o_90q_1x' || 'http://placehold.it/120x120' }/><span style={{display:'none'}}>关注<b>（0）</b></span></div>
                                        <h2 className="transition-color">{v.personName}</h2>
                                        <p>职位：<b>{v.level+'摄影师'}</b></p>
                                        <div className="score">
                                            <span>新人评价</span>
                                            <div className="box">
                                                <i className="ico-heart ico-heart-small"></i>
                                                <i className="ico-heart ico-heart-small"></i>
                                                <i className="ico-heart ico-heart-small"></i>
                                                <i className="ico-heart ico-heart-small"></i>
                                                <i className="ico-heart ico-heart-small"></i>
                                            </div>
                                        </div>
                                        <span className="btn-js btn-grayline-pink-1-js transition-bg" style={{display:'none'}} >查看他的档期</span>
                                    </a>
                                    <WorksList works={v.list} personId={v.personId} worksPageSize={worksPerPage} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

});

module.exports = SemiPhotographersList;