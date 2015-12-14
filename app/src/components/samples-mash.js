var React = require('react');
// var resourceKey = '样片欣赏';
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var SamplesMash = React.createClass({
	getInitialState: function() {
		return {
			payload: [{}, {}, {}, {}, {}, {}, {}, {}],
			baseUrl: '#/'
		}
	},
	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		}
		$.each(nextProps.resourceLinks, function(k, v) {
			(nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
			dataPromise(v.split('#')[1], {
					pageSize: 9,
					pageIndex: 1
				})
				.done(
					function(payload) {
						////console.log(JSON.stringify(payload,null,4));
						200 === payload.code && self.setState({
							payload: payload.data,
							baseUrl: v.split('#')[1]
						})
					}
				)
		})

	},
	render: function() {
		var baseUrl = this.state.baseUrl;
		return (

			<ul className="list-recommend">
              
				{
					this.state.payload.map(function(v,i){


						return (
							<li key={i} className="item-box">
								<div className='img-box'>
									<ImageListItem
										className={'a-img'}
										detailBaseUrl={baseUrl}
										sid={v.contentId}
										frameHeight={550}
										url={v.contentUrl}
										newWin={1}
										errorUrl={'http://placehold.it/380x550'} />
									<div className="layer-box"></div>
									<h2 className="layer-title">{v.contentName}</h2>
								</div>
							</li>

						)

					})
				}
			</ul>
		);
	}
})

module.exports = SamplesMash;