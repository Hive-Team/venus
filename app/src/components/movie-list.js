var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var TopSlider = require('./top-slider.js');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');

var Item = React.createClass({
    render: function() {
        return (
            <li className="item-box">
                <div className="img-box">
                    <a href={this.props.detail} className='layer-box' />
                    <img src={this.props.cover} className="img-video-wdy" />
                </div>
                <div className='title-box'>
                    <a href={this.props.detail}><span>{this.props.title}</span></a>
                </div>
            </li>
        )
    }
})

var MovieList = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
        return {
            payload: [],
            latest: [],
            hotest: [],
            loveMV: [],
            loveMicro: []
        };
    },
    componentDidMount: function() {
        var self = this;
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/movie']);
        };
        var loveMVFetch = function() {
            return Api.httpGET('videos', {
                sort: 'date',
                videoType: '4',
                pageSize: 7,
                pageIndex: 1
            });
        };
        var loveMicroFetch = function() {
            return Api.httpGET('videos', {
                sort: 'date',
                videoType: '5',
                pageSize: 7,
                pageIndex: 1
            });
        };
        var latestFetch = function() {
            return Api.httpGET('videos', {
                sort: 'date',
                videoType: '4,5',
                pageSize: 4,
                pageIndex: 1
            });
        }
        var hotestFetch = function() {
            return Api.httpGET('videos', {
                sort: 'hits',
                videoType: '4,5',
                pageSize: 4,
                pageIndex: 1
            });
        }

        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(loveMVFetch)
            .done(function(payload) {
                var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/movie');
                self.setState({
                    resourceLinks: resourceLinks,
                    loveMV: payload.data
                })
            })
        loveMicroFetch()
            .done(function(payload) {
                self.setState({
                    loveMicro: payload.data
                })
            });
        latestFetch()
            .done(function(payload) {
                self.setState({
                    latest: payload.data
                })
            });
        hotestFetch()
            .done(function(payload) {
                self.setState({
                    hotest: payload.data
                })
            });


    },
    render: function() {
        var self = this;
        return (
            <div className="wdy-view">
                <div className='layout-center-box'>
                    <div id="slider_top" className="slider-box bannar">
                        <TopSlider
                            tplKey='top#adv'
                            resourceLinks={this.state.resourceLinks}
                            pageIndex={1}
                            pageSize={1} />
                    </div>
                    <div className="banner">
                        <img src="//image.jsbn.com/static/wdy.jpg" />
                    </div>
                    <div className="title-01"></div>
                    <div className="line-e1-eav"></div>
                    <div className="list-box">
                        <div className="title">最新微电影</div>
                        <ul className='list-recommend'>
                            {
                                $.map(this.state.latest,function(v,k){
                                    return <Item title={v.name} detail={'#'+self.getPathname() +'/'+v.videoId} cover={v.coverImage.imageUrl} key={k}/>
                                })
                            }
                        </ul>
                    </div>
                    <div className="list-box">
                        <div className="title">最热微电影</div>
                        <ul className='list-recommend'>
                            {
                                $.map(this.state.hotest,function(v,k){
                                    return <Item title={v.name} detail={'#'+self.getPathname()+'/'+v.videoId} cover={v.coverImage.imageUrl } key={k}/>
                                })
                            }
                        </ul>
                    </div>

                    <div className="title-02"></div>
                    <div className="line-e1-eav"></div>
                    <div className="list-box">
                        <ul className='list-recommend'>
                            {
                                $.map(this.state.loveMV,function(v,k){
                                    return <Item title={v.name} detail={'#'+self.getPathname()+'/'+v.videoId} cover={v.coverImage.imageUrl} key={k}/>
                                })
                            }
                            <li href="#/loveMV" className={'item-box'}>
                                <div className="more-nav">
                                    <p className="more-ch-wdy">欣赏更多</p>
                                    <span>more</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="title-03"></div>
                    <div className="line-e1-eav"></div>
                    <div className="list-box">
                        <ul className='list-recommend'>
                            {
                                $.map(this.state.loveMicro,function(v,k){
                                    return <Item title={v.name} detail={'#'+self.getPathname()+'/'+v.videoId} cover={v.coverImage.imageUrl} key={k}/>
                                })
                            }
                            <li href="#/loveMicro" className={'item-box'}>
                                <div className="more-nav">
                                    <p className="more-ch-wdy">欣赏更多</p>
                                    <span>more</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = MovieList;
