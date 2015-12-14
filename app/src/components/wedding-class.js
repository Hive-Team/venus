var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var TopSlider = require('./top-slider.js');
var Router = require('react-router-ie8');
var WeddingClassList = require('./wedding-class-list.js');

var WeddingClass = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等信息
    //设置初始
    getInitialState: function() {
        return {
            pageSize: 10,
            pageIndex: 1,
            baseUrl: '',
            payload: '',
            moduleTypeId: '',
            sliderB: false,
            loadDisplay: true,
            weddingClassArr: ['#/shot','#/hotel','#/scheme','#/dress','#/movie','','#/appliance','#/car']
        }
    },

    componentDidMount: function() {
        var self = this;
        var ind = self.getParams().moduleTypeId;

        $(".kt-tab a").click(function() {
            $(this).addClass("action").siblings("a").removeClass("action");
        }).eq(
            ind <= 5 ? ind - 1 : ind - 2
        ).addClass('action').siblings('a').removeClass('action');

        self.fetchData();
    },

    ktSelCard: function(num) {
        var self = this;

        self.fetchData(num);
    },

    fetchData: function(id) {
        var self = this;
        var weddingArr = self.state.weddingClassArr;
        var parent;
        var num;

        if (id) {
            num = id;
            self.setState({
                sliderB: true
            });
            parent = weddingArr[id - 1];
        } else {
            num = self.getParams().moduleTypeId;
            parent = weddingArr[self.getParams().moduleTypeId - 1];
        }

        Api.httpGET('wenddingroom', {
                pageIndex: 1,
                pageSize: self.state.pageSize,
                moduleTypeId: num
            })
            .done(function(payload) {
                self.setState({
                    pageIndex: 1,
                    payload: payload.data.data,
                    baseUrl: self.getPathname(),
                    moduleTypeId: num,
                    loadDisplay: payload.data.totalCount <= self.state.pageIndex * self.state.pageSize ? false : true
                });
            })

        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', [parent]);
        };

        var fetchData = function(payload) {
            //从配置map里面获取到读取菜单的key
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname().substr(0, self.getPathname().length - 1) + num, weddingArr[num - 1]);

            self.setState({
                resourceLinks: resourceLinks
            })
        };

        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(fetchData);
    },

    moreData: function() {
        var self = this;

        Api.httpGET('wenddingroom', {
                pageIndex: self.state.pageIndex + 1,
                pageSize: self.state.pageSize,
                moduleTypeId: self.state.moduleTypeId
            })
            .done(function(payload) {
                self.setState({
                    pageIndex: self.state.pageIndex + 1,
                    payload: self.state.payload.concat(payload.data.data),
                    loadDisplay: payload.data.totalCount <= (self.state.pageIndex + 1) * self.state.pageSize ? false : true
                });
            })
    },

    render: function() {
        var self = this;

        return (
            <div className="ketang-view">
                <div className="ad-vedio">
                    <div className="bannar-all-box">
                        <div id="slider_top" className="slider-box bannar">
                            <TopSlider resourceLinks={this.state.resourceLinks} frameWidth={1920} tplKey='top#adv' sliderB={self.state.sliderB} />
                        </div>
                    </div>
                </div>
                <div className='layout-center-box'>
                    <div className='responsive-box'>
                        <div className="ktmain">
                            <div className="kt-tab">
                                <a className="action" onClick={function(){self.ktSelCard(1)}}>婚照技巧</a>
                                <a onClick={function(){self.ktSelCard(2)}}>婚宴知识</a>
                                <a onClick={function(){self.ktSelCard(3)}}>婚礼学堂</a>
                                <a onClick={function(){self.ktSelCard(4)}}>礼服知识</a>
                                <a onClick={function(){self.ktSelCard(5)}}>表演技巧</a>
                                <a onClick={function(){self.ktSelCard(7)}}>用品贴士</a>
                                <a onClick={function(){self.ktSelCard(8)}}>租车经验</a>
                            </div>
                            {
                                //<div className="kt-tab" style={{display:'none'}}>
                                //    <a className="action" href='#/weddingclass/1' onClick={function(){self.ktSelCard(1)}}>婚照技巧</a>
                                //    <a href='#/weddingclass/2' onClick={function(){self.ktSelCard(2)}}>婚宴知识</a>
                                //    <a href='#/weddingclass/3' onClick={function(){self.ktSelCard(3)}}>婚礼学堂</a>
                                //    <a href='#/weddingclass/4' onClick={function(){self.ktSelCard(4)}}>礼服知识</a>
                                //    <a href='#/weddingclass/5' onClick={function(){self.ktSelCard(5)}}>表演技巧</a>
                                //</div>
                            }
                            <div id="ktlist_box">
                                <WeddingClassList baseUrl={self.getPathname()} data={self.state.payload} />
                            </div>
                        </div>
                        <div onClick={this.moreData} id="J_MoreButton" style={{display:(self.state.loadDisplay == false) && 'none' || 'block'}}>
                            <div className="more-btn"><span>点击查看更多</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})

module.exports = WeddingClass;
