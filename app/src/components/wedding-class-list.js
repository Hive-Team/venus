var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var WeddingClassList = React.createClass({
    getInitialState: function() {
        return {
            payload: [],
            baseUrl: '',
            totalPage: 0
        }
    },

    componentWillReceiveProps: function(nextProps) {
        var self = this;

        self.setState({
            payload:nextProps.data,
            baseUrl:nextProps.baseUrl
        })
    },

    render: function() {
        var self = this;
        var baseUrl = self.state.baseUrl;

        return (
            <ul className="list-recommend">
                {
                    $.map(self.state.payload || [] , function(v,i){
                        return(
                            <li key={i} className='item-box'>
                                <img className='img-box' src={v.coverImg} />
                                <div className="inroduce">
                                    <h2><a href={"#" + baseUrl + '/' + v.weddingClassroomId}>{v.title}</a><span className='stime'>{v.publishTime}</span></h2>
                                    <p>{v.description}<a href={"#" + baseUrl + '/' + v.weddingClassroomId}>详情>></a></p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
})

module.exports = WeddingClassList;