var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var Router = require('react-router-ie8');
var VideoDetail = React.createClass({
    mixins: [Router.State], //我们需要知道当前的path params 等等
    // getInitialState: function() {
    //     return {
    //         payload: {}
    //     };
    // },
    componentDidMount: function() {
        var self = this;
        var changeMenu = function(payload) {
            $(document.body).trigger('ModuleChanged', ['#/home']);
        };
        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(changeMenu);
        window.videojs($('.J_Video')[0], {
            autoplay: false,
            loop: true
        }, function() {});

        /*
                cyberplayer("J_VideoContainer")
                    .setup({
                        flashplayer: "../assets/baidu/player/cyberplayers.swf",
                        width: '1200',
                        height: 680,
                        backcolor: "#FFFFFF",
                        stretching: "uniform",
                        file: video || '',
                        image: cover || 'http://placehold.it/1200x680',
                        autoStart: true,
                        repeat: "none",
                        volume: 100,
                        controls: "over",
                        ak: "pANA02VPcarYYYHH",
                        sk: "TR8pkV3pQLM8pP29"
                    });
                    */
        // var fetchData = function() {
        //     var reg = /^\/.*\/(\d+)/;
        //     var url = self.getPath().split(reg)[1];
        //     return Api.httpGET('videos/' + url, {});
        // };
        // window.Core && window.Core.promises['/'] &&
        //     $.when(window.Core.promises['/'])
        //     .then(changeMenu)
        //     .then(fetchData)
        //     .done(function(payload) {
        //         self.setState({
        //             payload: [payload.data]
        //         }, function() {
        //             var payload = self.state.payload[0];
        //             payload &&
        //                 // $script('../assets/baidu/js/cyberplayer.min.js', function() {
        //                 // cyberplayer("J_VideoContainer")
        //                 // .setup({
        //                 //     flashplayer: "../assets/baidu/player/cyberplayers.swf",
        //                 //     width: '1200',
        //                 //     height: 680,
        //                 //     backcolor: "#FFFFFF",
        //                 //     stretching: "uniform",
        //                 //     file: payload.url || '',
        //                 //     image: payload.coverImage.imageUrl || 'http://placehold.it/1200x680',
        //                 //     autoStart: true,
        //                 //     repeat: "none",
        //                 //     volume: 100,
        //                 //     controls: "over",
        //                 //     ak: "pANA02VPcarYYYHH",
        //                 //     sk: "TR8pkV3pQLM8pP29"
        //                 // });
        //             // });

        //         })
        //     });


    },
    render: function() {
        var self = this;
        var name = self.getQuery().n;
        var description = self.getQuery().info;
        var address = self.getQuery().addr;
        var date = self.getQuery().d;
        var cover = self.getQuery().cover;
        var video = self.getQuery().video;
        return (
            <div className="main-body-eav">
                <div className="box-01-eav">
                    <div className="video-container" id="J_VideoContainer">
                <video className="video-js vjs-default-skin J_Video"  preload="auto" controls  width={1280} height={720} poster={cover} >
                  <source src={video} type='video/mp4'/>
                </video>
                    </div>
                    <div className="vidio-info">
                        <span>{name}</span>
                        <p>{description}</p>
                        <p>{date}</p>
                        <p>{address}</p>
                    </div>
                </div>
                <div className="space-40-eav" />
            </div>

        );
    }

});

module.exports = VideoDetail;