var React = require('react');
var Api = require('../config/api.js');
var Router = require('react-router-ie8');
var ImageListItem = require('./image-item.js');
var TopSlider = require('./top-slider.js');
var ManInfo = React.createClass({

	render: function() {
		return (
			<div className="figure">
				<div className="avatar-box">
				<ImageListItem url={this.props.avatar} frameWidth={120} />
					<span></span>
				</div>
				<h2 className = "transition-color">
					策划师
					<b className = "transition-color"> {this.props.name} </b>
					<span style={{display:'none'}}> {'￥'+this.props.price} </span>
				</h2>
				<p>{this.props.description ||  '' }</p>
				<span className = "btn-js btn-grayline-pink-1-js transition-bg" style={{display:'none'}}> 选择他 </span>
			 </div>
		);
	}

});
var Works = React.createClass({

	render: function() {
		return (
			<ul className="r-box-movie">
				{
					this.props.list.length>0&& $.map(this.props.list,function(v,k){
						return (
							<li className="item-box" key={k}>
								<a className="img-box" data-lightbox={'p'+k} href={v.imageUrl}>
									<div className="hover-box">
										<div className="pos-box">
											<div className="info transition-bottom">
												<h2 className="transition-font-size"></h2>
											</div>
											<div className="mask-bg transition-opacity" />
										</div>
									</div>
									<img src={v.imageUrl} />
								</a>
								{
									$.map(v.detailImages,function(vv,kk){
										return  (
											<a href={vv} key={kk} data-lightbox={'p'+k} />
										)
									})
								}
							</li>
						)
					})
				}

			</ul>
		);
	}
});



var Planners = React.createClass({
	mixins : [Router.State],
	getInitialState: function() {
		return {
			payload: [],
			resourceLinks: {}
		};
	},
	componentDidMount: function() {
		var self = this;
		var fetchData = function() {
			return Api.httpGET('planner', {
				pageSize: 100,
				pageIndex: 1
			});
		};
		//以父级作为更新
		$.when(window.Core.promises['/'])
			.then(function() {
				$(document.body).trigger('ModuleChanged', ['#/scheme']);
				var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme');
				self.setState({
					resourceLinks: resourceLinks
				})
			})
			.then(fetchData)
			.done(function(payload) {
				self.setState({
					payload: payload.data
				})
			})


	},
	render: function() {
		var listData = this.state.payload || [];
		return (
			<div className="xchs-view">
				<div className="layout-center-box">
					<div id="slider_top" className="slider-box bannar mgb30">
						<TopSlider
							tplKey='top#adv'
							resourceLinks={this.state.resourceLinks}
							pageIndex={1}
							pageSize={10} />
					</div>
					<ul className="list-recommend">
						{
							$.map(listData,function(v,k){
								return (
									<li key={k} className='item-box' style={{minHeight:'130px'}}>
										<ManInfo  avatar={v.photoUrl} name={v.plannerName} description={v.description} price={v.price} />
										<Works list={v.list}/>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
})

module.exports = Planners;