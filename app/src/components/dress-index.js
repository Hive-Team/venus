var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var TopSlider = require('./top-slider.js');
var ImageListItem = require('./image-item.js');
var Router = require('react-router-ie8');

var DressCover = React.createClass({

    getInitialState: function() {
        return {
            payload: []
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        nextProps.covers && self.setState({
            payload: nextProps.covers
        })
    },
    render: function() {
        return (
            <div className="dress-brand">
                <div className='center-box'>
                    <ul className='tab-box'>
                        {
                            this.state.payload.length>0 && $.map(this.state.payload,function(v,k){
                                return (
                                    <li className="item" key={k} data-img={v.imageUrl} data-desc={v.description} data-id={v.weddingDressBrandId}>{v.weddingDressBrandName.length>10?(v.weddingDressBrandName.slice(0,8)+'...'):v.weddingDressBrandName}</li>
                                )
                            })
                        }


                    </ul>
                    <div className="J_Pic show-box">
                        <a href={'#/dress/'+(this.state.payload[0] && this.state.payload[0].weddingDressBrandId)} className="pos-box">
                            <img src={this.state.payload[0]&&this.state.payload[0].imageUrl} />
                        </a>
                        <div className="abstract J_Desc">{this.state.payload[0]&&this.state.payload[0].description}</div>
                    </div>
                </div>
            </div>
        );
    }

});

var VideoMash = React.createClass({
    getInitialState: function() {
        return {
            items: []
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var self = this;
        var urls = [];
        nextProps.resourceLinks && nextProps.tplKey &&
            (nextProps.resourceLinks !== this.props.resourceLinks) &&
            $.each(nextProps.resourceLinks, function(k, v) {
                (nextProps.tplKey.indexOf(v.split('/')[0]) > -1 && k.indexOf(self.props.nameKey) > -1) &&
                urls.push({
                    url: v.split('#')[1],
                    title: k,
                    p: []
                })
            });
        ////console.log('urls:', JSON.stringify(urls, null, 4));
        var payloadCallback = function(item) {
            return function(payload) {
                if (payload.code === 200 && payload.data.length > 0) {
                    item.p = payload.data;
                    ////console.log(JSON.stringify(urls, null, 4));
                    self.setState({
                        items: urls
                    })
                }

            }
        };
        $.each(urls, function(k, v) {
            Api.httpGET(v.url, {
                pageIndex: 1,
                pageSize: 5
            }).done(payloadCallback(v))
        });



    },
    render: function() {
        var self = this;
        var index = 0;
        console.log('items:', self.state.items);
        return (

            <div className="movie-box-eav responsive-box">
                <div className="box-l">
                    <ImageListItem
                        klassName={"l-item"}
                        url={self.state.items[0] && self.state.items[0].p[0]&& self.state.items[0].p[0].contentUrl || 'http://placehold.it/620x375'}
                        frameWidth={620}
                        frameHeight={375}
                        detailUrl={self.state.items[0] && self.state.items[0].p[0]&& self.state.items[0].p[0].detailUrl}
                    />
                </div>
                <div className="box-r">
                {
                    $.map(self.state.items[0] &&self.state.items[0].p.slice(1)||[],function(v,k){
                        return (
                    <ImageListItem
                        klassName={"r-item"}
                        url={v.contentUrl || "http://placehold.it/270x180"}
                        frameWidth={270}
                        frameHeight={180}
                        detailUrl={v.detailUrl}
                        key={index++}
                    />
                            )
                    })

                }
                </div>
            </div>
        );
    }

});
var DressIndex = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等信
    getInitialState: function() {
        return {
            brands: [],
            category: [{
                name: '国际婚纱',
                en: 'International Brand',
                weddingdressId: 1,
                payload: []
            }, {
                name: '新娘礼服',
                en: 'Brand for Bride',
                weddingdressId: 2,
                payload: []
            },{
                name:'男士礼服',
                en:'Brand for Bridegroom',
                weddingdressId:3,
                payload:[]
            }]
        };
    },
    componentDidMount: function() {
        //以父级作为更新
        var self = this;
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/dress']);
        };
        var cate = self.state.category;
        var payloadCallback = function(v) {
            Api.httpGET('dress/brands', {
                weddingDressType: v.weddingdressId
            }).done(function(payload) {
                v.payload = payload.data;
                ////console.log('cate:', JSON.stringify(cate, null, 4));
                self.setState({
                    category: cate
                })
            })
        };
        var fetchData = function() {
            var resourceLinks = window.Core.getResourcesLinks(self.getPathname());
            self.setState({
                resourceLinks: resourceLinks
            });
            $.each(cate, function(i, v) {
                payloadCallback(v);
            });

        };

        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(fetchData);


        $('.J_CateMenu').on('click', 'li', function() {
            $(this).closest('.J_CateMenu').find('img').attr('src', $(this).attr('data-img'))
            $(this).closest('.J_CateMenu').find('a').attr('href', '#/dress/' + $(this).attr('data-id'))
            $(this).closest('.J_CateMenu').find('div.J_Desc').html($(this).attr('data-desc'))
            $(this).addClass('light').siblings().removeClass('light');

        })

    },
    render: function() {
        var titleMap = {};
        titleMap['国际婚纱'] = 'tit-img-wmxn';
        titleMap['新娘礼服'] = 'tit-img-dyqz';
        titleMap['男士礼服'] = 'tit-img-lmxn';

        return (
            <div className='hslf-view'>
                <div className='layout-center-box'>
                    <div className='slider-box bannar'>
                        <TopSlider
                            tplKey='top#adv'
                            resourceLinks={this.state.resourceLinks}
                            pageIndex={1}
                            pageSize={1}
                            frameWidth={1920}/>
                    </div>

                    <div>
                        <img src='//image.jsbn.com/static/hslf.jpg' />
                    </div>


                    <div className="title-box"><h1>国际婚纱</h1><span>International Brand</span></div>
                    {

                        $.map(this.state.category,function(v,k){
                            return (
                                <div key={k}>
                                    <div className={titleMap[v.name]+' mgb30 mgt60' }>
                                    </div>
                                    <DressCover covers={v.payload || []} />
                                </div>
                            )
                        })

                    }
                    <div className="bottom-hslf" />
                </div>
            </div>
        );
    }

});

module.exports = DressIndex;
