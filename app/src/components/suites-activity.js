var React = require('react');
var Api = require('../config/api.js');
var SuitesActivity = React.createClass({
	getInitialState: function() {
		return {
			payload: []
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var resourceKey = '婚纱套系活动';
		var dataPromise = function() {
			var url = nextProps.resourceLinks[resourceKey].split('#')[1];
			////console.log(url);
			return Api.httpGET(url, {
				pageSize: 7,
				pageIndex: 1
			});
		};
		nextProps.resourceLinks[resourceKey] &&
			dataPromise()
			.done(function(payload) {
				////console.log(JSON.stringify(payload,null,4));
				200 === payload.code && self.setState({
					payload: payload.data
				})
			})

	},
	render: function() {
		return (
			<ul className="list-8-js">
				{
					this.state.payload.map(function(v,i){
						return (

						  <li className="transition-border mgb20" key={i}>
							<h2><a href="">[人气活动]</a>&nbsp;{v.activityName}</h2>
							<a href="" className="img-box"><img src={v.imageUrl || 'http://placehold.it/300x220'}/></a>
							<p>{v.activityDesc}</p>
							<div className="func clearfix">
							  <span className="price">
								  {v.price}
							  </span>
							  <a href="" className="btn-js btn-violet-1-js transition-bg">去看看</a>
							</div>
							<div className="act-info clearfix"><font className="status">本次活动已经结束</font><font className="num">已有156人参与</font></div>
						  </li>

						)

					})
				}

			</ul>



		);
	}
})

module.exports = SuitesActivity;