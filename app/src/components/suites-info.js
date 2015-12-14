var React = require('react');
var PropTypes = React.PropTypes;

var SuitesInfo = React.createClass({
    getInitialState: function() {
        return {
            items: []
        };
    },
    render: function() {
        var infoData = this.props.info && this.props.info.split && this.props.info.split('|') || [];

        return (
            <div className="info">
                <div className="overview">
                {
                    infoData.length > 0 && $.map(infoData,function(v,k){
                        return (<p key={k}><b>{v}</b></p>)
                    })
                }
                </div>
            </div>
        );
    }

});

module.exports = SuitesInfo;