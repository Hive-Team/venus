var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var Router = require('react-router-ie8');

var WeddingClassDetail = React.createClass({
    mixins:[Router.State], //我们需要知道当前的path params 等等信息
    //设置初始
    getInitialState:function(){
        return {
            resourceLinks:{},
            pageSize:6,
            pageIndex:1,
            stylesList:[],
            baseUrl:'',
            currentStyle:'',
            payload:null
        }
    },
    loadMore:function(event){
        event.preventDefault();
        this.setState(function(prevState,currentProps){
            return {pageIndex:prevState.pageIndex+1}
        });
    },
    componentDidMount:function(){
        var self = this;

        $(".kt-tab a").click(function(){
            $(this).addClass("action").siblings("a").removeClass("action");
        });

        Api.httpGET('wenddingroom/' + self.getParams().weddingClassroomId)
            .done(function(payload){
                self.setState({
                    payload:payload.data,
                    baseUrl:self.getPathname()
                });

                $('#kt_content').html(payload.data.content);
            })
    },

    render: function() {
        var self = this;
        var data = self.state.payload;;

        if(!self.state.payload) return(<div></div>);

        return (
            <div className="ktmain-detail-view layout-center-box">
                <div className="ktmain-info">
                    <div className="content" id='kt_content'>
                    </div>
                </div>
            </div>
        );
    }
})

module.exports = WeddingClassDetail;