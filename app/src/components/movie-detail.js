var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var Router = require('react-router-ie8');

var Item = React.createClass({
    render: function() {
        return (



            <div className="box-item-wdyxq">
                    <div className="cover-layer-wdyxq"><a href={this.props.detail} className='pos-box' target="_blank" /></div>
                    <img src={this.props.cover} className="img-item-wdyxq" />
                    <a href={this.props.detail} target='_blank'><div className="title-item-wdyxq">{this.props.title}</div></a>
                </div>

        )
    }
})

var MovieDetail = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等
    getInitialState: function() {
        return {
            payload: {},
            latest: [],
        };
    },
    componentDidMount: function() {
        var self = this;
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/movie']);
        };
        var fetchData = function() {
            var reg = /^\/.*\/(\d+)/;
            var url = self.getPath().split(reg)[1];
            return Api.httpGET('videos/' + url, {});
        };
        var latestFetch = function() {
            return Api.httpGET('videos', {
                sort: 'date',
                videoType: '4,5',
                pageSize: 6,
                pageIndex: 1
            });
        };
        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu)
            .then(fetchData)
            .done(function(payload) {
                self.setState({
                    payload: [payload.data]
                }, function() {
                    window.videojs($('.J_Video')[0], {
                        autoplay: false,
                        loop: true
                    }, function() {});
                })
            });

        latestFetch()
            .done(function(payload) {
                self.setState({
                    latest: payload.data
                })
            });

    },
    render: function() {
        var self = this;
        return (
            <div className="main-body-eav">
                <div className="box-video-wdyxq">
                        <video className="video-js vjs-default-skin J_Video" controls  preload="auto" width={800} height={450} poster={this.state.payload[0] && this.state.payload[0].coverImage.imageUrl} >
                          <source src={this.state.payload[0] && this.state.payload[0].url} type='video/mp4'/>
                        </video>
                    <div className="box-info-wdyxq">
                        <span className="title-vidio-wdyxq">{this.state.payload[0] && this.state.payload[0].name}</span>
                        <p className="title-info-wdyxq">世间所有的相遇，都是久别重逢，遇见你就是幸福的开始。</p>
                    </div>
                </div>
                <div className="box-v-new-wdyxq">
                    <div className="title-v-new-wdyxq clear-b-eav">最新微电影</div>
            {
                $.map(this.state.latest,function(v,k){
                    return <Item title={v.name} detail={'#/movie/'+v.videoId} cover={v.coverImage.imageUrl} key={k}/>
                })
            } 
                </div>
                <div className="ad-bot-wdy clearfix">
                </div>
            </div>



        );
    }

});

module.exports = MovieDetail;