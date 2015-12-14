var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var HomeRecommend = React.createClass({
	getInitialState: function() {
		return {
			payload: [{}, {}, {}]
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		// var resourceKey = '宣传广告'
		//循环resourceLinks 找到和tlpKey匹配的资源地址
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		}
		nextProps.resourceLinks && $.each(nextProps.resourceLinks, function(k, v) {
			(nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
			dataPromise(v.split('#')[1], {
					pageSize: 3,
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
		var self = this;
		var baseUrl = this.state.baseUrl
		return (
			<ul className="list-adv">
				{
					self.state.payload.map(function(v,i){
						return (
							<li className='item-box' key={i}>
							{
								/*

							  <a className="img-box" href={v.detailUrl || '#/'+baseUrl+'/'+v.contentId}><img src={v.contentUrl || 'http://placehold.it/380x250'}/></a>
								*/
							}
							  <ImageListItem 
					        	url={v.contentUrl || "http://placehold.it/380x250"} 
					        	frameWidth={380}
					        	frameHeight={250}
					        	detailUrl={v.detailUrl}
			        			/>
							  <div className="title-box">
							  	<span>{v.contentName}</span>
							  	<span className="en">{v.description}</span>
							  </div>
							</li>
						)
					})
				}
			</ul>
		)
	}
});
module.exports = HomeRecommend;