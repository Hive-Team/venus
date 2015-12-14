var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var SamplesList = React.createClass({
	getInitialState: function() {
		return {
			payload: [],
			baseUrl: '',
			totalPage: 0
		};
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		};

    var p = {
      pageSize: nextProps.pageSize,
      pageIndex: nextProps.pageIndex
    };
    if (nextProps.currentStyle&&nextProps.currentStyle !== '') {
      p['styleId'] = nextProps.currentStyle;
    }
    if (nextProps.currentAddress&&nextProps.currentAddress !== '') {
      p['addressId'] = nextProps.currentAddress;
    }
		$.each(nextProps.resourceLinks, function(k, v) {
			(nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
			dataPromise(v.split('#')[1], p)
				.done(
					function(payload) {
						////console.log(JSON.stringify(payload,null,4));
						200 === payload.code && self.setState({
							payload: ((nextProps.pageIndex === 1) ? payload.data : self.state.payload.concat(payload.data)),
							baseUrl: v.split('#')[1],
							totalPage: parseInt(payload.totalCount)
						}, function() {
							(parseInt(payload.totalCount) <= parseInt(nextProps.pageIndex) * parseInt(nextProps.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show()
						})
					}
				)
		})

	},
	render: function() {
		var baseUrl = this.state.baseUrl;
		return (
			<div className="samples-list">
				<div className="screening-results">
					<span className="find"><span>找到样片</span><b>{this.state.totalPage}</b><span>套</span></span>
				</div>
				<ul className="list-recommend">
					  {
						  this.state.payload.map(function(v,i){
							  return (
								  <li className="item-box" key={i}>
									  <div className='img-box'>
										  <ImageListItem
											  detailBaseUrl={baseUrl}
											  className={''}
											  newWin={1}
											  sid={v.contentId}
											  frameWidth={400}
											  frameHeight={600}
											  url={v.contentUrl}
											  errorUrl={'http://placehold.it/400x600'} />
										  <div className="layer-box"></div>
										  <h2 className="layer-title">{v.contentName}</h2>
									  </div>
								  </li>

							  )

						  })
					  }
				</ul>
			</div>

		);
	}
})

module.exports = SamplesList;
