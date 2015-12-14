var React = require('react');
var PropTypes = React.PropTypes;

var ImageListItem = require('./image-item.js');
var StaticActivies = React.createClass({
    componentDidMount: function() {
        var self = this;

        var changeMenu = function(payload){
            $(document.body).trigger('ModuleChanged',['#/shot']);
        };
        window.Core&&window.Core.promises['/'] &&
        $.when(window.Core.promises['/'])
                .then(changeMenu)
    },
    render: function() {
        var contentImages = [
            'http://image.jsbn.com/static/activities/01.jpg',
            'http://image.jsbn.com/static/activities/02.jpg',
            'http://image.jsbn.com/static/activities/03.jpg',
            'http://image.jsbn.com/static/activities/04.jpg',
            'http://image.jsbn.com/static/activities/05.jpg',
            'http://image.jsbn.com/static/activities/06.jpg',
            'http://image.jsbn.com/static/activities/07.jpg',
            'http://image.jsbn.com/static/activities/08.jpg',
            'http://image.jsbn.com/static/activities/09.jpg',
            'http://image.jsbn.com/static/activities/10.jpg',
            'http://image.jsbn.com/static/activities/11.jpg',
            'http://image.jsbn.com/static/activities/12.jpg',
            'http://image.jsbn.com/static/activities/13.jpg',
            'http://image.jsbn.com/static/activities/14.jpg',
            'http://image.jsbn.com/static/activities/15.jpg',
            'http://image.jsbn.com/static/activities/16.jpg',
            'http://image.jsbn.com/static/activities/17.jpg',
            'http://image.jsbn.com/static/activities/18.jpg',
            'http://image.jsbn.com/static/activities/19.jpg',
            'http://image.jsbn.com/static/activities/20.jpg'
        ]
        return (
            <div className="container mgt30 clearfix" style={{overflow:'hidden',height:7280+'px',position:'relative'}} >
                <div className="photo-box clearfix" style={{width:1920+'px',position:'absolute',height:100+'%',left:50+'%',marginLeft:-960+'px'}}>
                {
                    $.map(contentImages,function(v,k){
                        return (
                            <div key={k} className="bottom" style={{height:'auto'}}>
                                <ImageListItem
                                frameWidth={1920}
                                url={v}
                                style={{float:'left',width:100+'%'}}
                                errorUrl={'http://placehold.it/1920x450'} />
                            </div>
                            )
                        })
                    }
                </div>
            </div>
            );
    }

});

module.exports = StaticActivies;
