var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var Map = React.createClass({
    mixins:[Router.State],
    componentDidMount: function() {
        var map = new BMap.Map("container");
        var longitude =parseFloat( this.getQuery().longitude);
        var latitude = parseFloat(this.getQuery().latitude);
        var point = new BMap.Point(longitude, latitude);
        map.centerAndZoom(point, 15);

        var marker = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker);
    },
    render: function() {
        return (
            <div className='map' id='container' style={{height:720+'px'}} />
        );
    }

});

module.exports = Map;
