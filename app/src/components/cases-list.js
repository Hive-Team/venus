var React = require('react');
var resourceKey = '案例列表';
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');


var CaseList = React.createClass({
	getInitialState: function() {
		return {
			payload: [],
			baseUrl: "",
			totalPage: 0
		};
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var dataPromise = function(url, params) {
			return Api.httpGET(url, params);
		};

    //constuct params; if blank do not include
    var p = {
      pageSize: nextProps.pageSize,
      pageIndex: nextProps.pageIndex
    };
    if (nextProps.currentCate&&nextProps.currentCate !== '') {
      p['schemeType'] = nextProps.currentCate;
    }
    if (nextProps.currentStyle&&nextProps.currentStyle !== '') {
      p['styleId'] = nextProps.currentStyle;
    }
    if (nextProps.currentHotel&&nextProps.currentHotel !== '') {
      p['hotelId'] = nextProps.currentHotel;
    }
    if (nextProps.currentPrice.max&&nextProps.currentPrice.max !== '') {
      p['maxPrice'] = nextProps.currentPrice.max;
    }
    if (nextProps.currentPrice.min&&nextProps.currentPrice.min !== '') {
      p['minPrice'] = nextProps.currentPrice.min;
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
							(parseInt(payload.totalCount) <= parseInt(nextProps.pageIndex) * parseInt(nextProps.pageSize)) ? $('#J_MoreButton').hide(): $('#J_MoreButton').show();
						});

						console.log(payload);
					}
				)
		})
	},
	render: function() {
		var baseUrl = this.state.baseUrl;
		return (
			<div className="case-list-view">
				<div className="screening-results" style={{display:'none'}}><span className="find"><span>找到案例</span><b>{this.state.totalPage}</b><span>套</span></span></div>
				<ul className="cases-list">
					{
						this.state.payload.map(function(v,i){
							return (
								<li className="item-box" key={i}>
									<div className='img-box'>
										<ImageListItem
											sid={v.weddingCaseId+''}
											frameWidth={380}
											frameHeight={250}
											url={v.weddingCaseImage}
											detailUrl={v.detailUrl}
											errorUrl={'http://placehold.it/380x250'}
											detailBaseUrl={baseUrl}
											/>
										<a className="layer-box" href={'#/'+baseUrl+'/'+v.weddingCaseId}>
											<div className="layer"></div>
											<div className="info">
												<h3>{v.schemeName}</h3>
												<div className="date">
													<b>{v.price || ''}</b>
													<span>({v.weddingDate})</span>
												</div>
											</div>
										</a>
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

module.exports = CaseList;
