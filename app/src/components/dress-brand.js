var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var Router = require('react-router-ie8');
var ImageListItem = require('./image-item.js');
var DressBrand = React.createClass({
    mixins:[Router.State], //我们需要知道当前的path params 等等
    getInitialState: function() {
        return {
            payload: []
        };
    },
    componentDidMount: function() {
        var self = this;
        //请求婚纱列表数据。
        var fetchData = function() {
            var reg = /^\/.*\/(\d+)/
            var url = self.getPath().split(reg)[1];
            return Api.httpGET('dress/brand/' + url, {});
        }
        window.Core && window.Core.promises['/'] &&
            $.when(window.Core.promises['/'])
            .then(fetchData)
            .done(function(payload) {
                ////console.log('dressbrand:',JSON.stringify(payload.data,null,4));
                self.setState({
                    payload: payload.data
                })
            })
    },
    render: function() {
        return (
            <div className="hslf-xq-view">
                <div className="layout-center-box">
                    <div className="list-recommend">
                        {
                            $.map(this.state.payload,function(v,k){
                            return (
                                <div className="item-box" key={k}>
                                    <div key={k} className='img-box'>
                                        <div className="pic-box">
                                            <ImageListItem url={v.imageUrl} detailUrl={v.imageUrl} lightbox={'dresses'} frameHeight={550} />
                                        </div>
                                    </div>
                                    <div className='title-box'><span>{v.weddingDressName}</span></div>
                                </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        );
    }

});

module.exports = DressBrand;