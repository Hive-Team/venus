var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var Router = require('react-router-ie8');
var TopSlider = require('./top-slider.js');
var ManInfo = React.createClass({
	render: function() {
		return (
			<a className="figure">
				<div className="avatar-box">
					<img src={this.props.avatar} />
					<span></span>
				</div>
				<h2 style={{overflow:'visible',height:'auto'}} className="transition-color">{this.props.whichMan}<b className="transition-color">{this.props.name}</b>
					<br/><span>{'￥'+ this.props.price}</span>
				</h2>
				<div className="score">
          <span style={{fontSize:'14px'}}>
            {this.props.description.slice(0,150)}
          </span>
				</div>
				<span style={{display:'none'}} className="btn-js btn-grayline-pink-1-js transition-bg">选择他</span>
			</a>
		);
	}
});
var VideoWork = React.createClass({

	render: function() {
		return (
			<li className='item-box'>
				<div className="img-box">
					<img src={this.props.cover} />
					<div className="info">
						<h2 className="transition-font-size"></h2>
						<p>
							时间：
							<span>{this.props.date}</span>
							<br />
							地点：
							<span>{this.props.address}</span>
							<br />
							成本：<span>{'￥'+this.props.price}</span>
						</p>
						<a href={'#/video-detail?cover='+this.props.cover+'&video='+this.props.video+'&n='+this.props.name+'&addr='+this.props.address+'&d='+this.props.date +'&info='+this.props.description} target='_blank'><span className="play">点击观看</span></a>
					</div>
					<div className="layer" />
				</div>
			</li>
		);
	}

});



var PicWork = React.createClass({

	render: function() {
		var self = this;
		return (
			<li className='item-box'>
				<a className="img-box" data-lightbox={'pic-'+this.props.row+'_'+this.props.line} href={this.props.cover}>
					<img src={this.props.cover} />
					<div className="layer"></div>
				</a>
				{
					$.map(this.props.details,function(v,k){
						return (
							<a data-lightbox={'pic-'+self.props.row+'_'+self.props.line} href={v} key={k}/>
						)
					})
				}

			</li>

		);
	}
});
var Host = React.createClass({
	render: function() {
		var self = this;
		return (
			<li className='item-box'>
				<ManInfo whichMan={'主持人'} name={this.props.name} price={this.props.price} info={this.props.info} avatar={this.props.avatar} description={this.props.description}/>
				<ul className="r-box-movie">
					{
						$.map(this.props.works||[],function(v,k){
							return (
								<VideoWork key={k} cover={v.imageUrl} line={k} row={self.props.row} video={v.videoUrl} name={v.videoWorkName} date={v.shootingTime} address={v.shootingAdress} description={v.description} price={v.costPrice}/>
							)
						})
					}
				</ul>
			</li>
		)
	}
})
var Photographer = React.createClass({

	render: function() {
		var self = this;
		return (
			<li className='item-box'>
				<ManInfo whichMan={'摄影师'} name={this.props.name} price={this.props.price} info={this.props.info} avatar={this.props.avatar} description={this.props.description}/>
				<ul className="r-box-photo">
				{
					$.map(this.props.works||[],function(v,k){
						return (
							<PicWork key={k} cover={v.imageUrl} details={v.detailImages} row={self.props.row} line={k}/>
						)
					})
				}
				</ul>
			</li>
		);
	}
})
var Dresser = React.createClass({

	render: function() {
		var self = this;
		return (
			<li className='item-box'>
				<ManInfo whichMan={'化妆师'} name={this.props.name} price={this.props.price} info={this.props.info} avatar={this.props.avatar} description={this.props.description}/>
				<ul className="r-box-photo">
				{
					$.map(this.props.works||[],function(v,k){
						return (
							<PicWork key={k} cover={v.imageUrl} details={v.detailImages} row={self.props.row} line={k}/>
						)
					})
				}
				</ul>
			</li>
		)
	}
})



var Camera = React.createClass({

	render: function() {
		var self = this;
		return (
			<li className='item-box'>
				<ManInfo whichMan={'摄像师'} name={this.props.name} price={this.props.price} info={this.props.info} avatar={this.props.avatar} description={this.props.description}/>
				<ul className="r-box-movie">
				{
					$.map(this.props.works||[],function(v,k){
						return <VideoWork key={k} cover={v.imageUrl} row={self.props.row} line={k} video={v.videoUrl} name={v.videoWorkName} date={v.shootingTime} address={v.shootingAdress} description={v.description} price={v.costPrice}/>
					})
				}
				</ul>
			</li>
		)
	}
})
var Tab = React.createClass({
	render: function() {
		return (
			<div className="tab-title" id="J_TabSelector">
				<span className={this.props.current === 'host'? "sel":''} data-url='host'>主持人</span>
				<span className={this.props.current === 'dresser'? "sel":''} data-url='dresser'>化妆师</span>
				<span className={this.props.current === 'photographer'? "sel":''} data-url='photographer'>摄影师</span>
				<span className={this.props.current === 'camera'? "sel":''} data-url='camera'>摄像师</span>
				<div className="line-bottom" />
			</div>
		)
	}
});
var Filter = React.createClass({

	render: function() {
		return (
			<div className="filter-box" id='J_Filter'>
				<span className="title"><i className="ico-1-js ico-1-1-js"></i>价位</span>
				<div className="tab-box column-mg20-20">
					<span className="tab tab-sel" data-filter='0-1499'>1500 以下</span>
					<span className="tab" data-filter='1500-2000'>1500-2000</span>
					<span className="tab" data-filter='2000-2500'>2000-2500</span>
					<span className="tab" data-filter='2500-99999'>2500 以上</span>
				</div>
			</div>
		);
	}

});

var F4 = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			whichMan: 'host',
			payload: [],
			totalCount: 0,
			resourceLinks: {}
		};
	},
	componentDidMount: function() {
		var self = this;
		$('#slider_top').Slider();
		var tab = self.getQuery().tab || 'host';
		var filter = {
			pageIndex: 1,
			pageSize: 100
		};
		//以父级作为更新
		$.when(window.Core.promises['/']).then(function() {
			$(document.body).trigger('ModuleChanged', ['#/scheme']);
		});
		var fetchData = function(url, filter) {



			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/scheme');
			console.log('resourceLinks:', resourceLinks);
			self.setState({
				resourceLinks: resourceLinks
			});
			return Api.httpGET('f4/' + url, filter);
		}
		var fetchInitData = function() {
			return fetchData(tab, filter);
		}
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(fetchInitData)
			.done(function(payload) {
				////console.log(tab, ': ', JSON.stringify(payload.data, null, 4));
				self.setState({
					whichMan: tab,
					payload: payload.data,
					totalCount: payload.totalCount
				})
			})
		$('#J_Filter').on('click', 'span', function() {
			var that = this;
			$('#J_Filter .tab').removeClass('tab-sel');
			$(this).addClass('tab-sel');
			if ($(this).attr('data-filter') === '-1') {
				filter = {
					pageIndex: 1,
					pageSize: 100
				}
			} else {
				var range = $(this).attr('data-filter').split('-');
				filter = {
					minPrice: range[0],
					maxPrice: range[1],
					pageIndex: 1,
					pageSize: 100
				}
			}
			fetchData(self.state.whichMan, filter)
				.done(function(payload) {
					////console.log(self.state.whichMan, ': ', JSON.stringify(payload.data, null, 4));
					self.setState({
						payload: payload.data,
						totalCount: payload.totalCount
					})
				})

		})

		$('#J_TabSelector').on('click', 'span', function() {
			var that = this;
			$(this)
				.siblings()
				.removeClass('sel');
			$(this).addClass('sel');
			// do the get
			fetchData($(this).attr('data-url'), filter)
				.done(function(payload) {
					////console.log($(that).attr('data-url'), ':', JSON.stringify(payload.data, null, 4));
					self.setState({
						whichMan: $(that).attr('data-url'),
						payload: payload.data,
						totalCount: payload.totalCount
					})
				})
		})

	},
	render: function() {
		var self = this;
		return (
			<div className="f4-view">
				<div className='layout-center-box'>
					<div className="custom-banner responsive-box  mgb20">
						<div id="slider_top" className="slider-box bannar">
							<TopSlider
								tplKey='top#adv'
								resourceLinks={this.state.resourceLinks}
								pageIndex={1}
								pageSize={10} />
						</div>
					</div>
					<Tab current={this.state.whichMan} />
					<Filter />

					<div className="screening-results clearfix">
						<span className='column-mg20-20' style={{color:'#e83c76',fontSize:'14px',fontWeight:'bold'}}>* 温馨提示：如遇节假日或者黄道吉日，预订价格或有波动，请以实际线下合同为准。 </span>
						<span className="find">找到<b>{self.state.totalCount}</b>个</span>
					</div>
					<ul className={(this.state.whichMan === 'host' || this.state.whichMan==='camera')? "movie-list":"photo-list"}>
						{
							this.state.payload.length >0 &&
							$.map(this.state.payload,function(v,k){
								if (self.state.whichMan === 'host'){
									return (<Host key={k} row={k} name={v.personName}
												  price={v.skillPrice}
												  avatar={v.photoUrl}
												  personId={v.personId}
												  description={v.description}
												  info={v.serviceInfo} works={v.hoster.slice(0,2)} />)
								}else if(self.state.whichMan === 'dresser'){
									return <Dresser key={k} row={k} name={v.personName}
													price={v.skillPrice}
													avatar={v.photoUrl}
													personId={v.personId}
													description={v.description}
													info={v.serviceInfo} works={v.dresser.slice(0,3)} />
								}else if(self.state.whichMan === 'photographer'){
									return <Photographer key={k} row={k} name={v.personName}
														 price={v.skillPrice}
														 avatar={v.photoUrl}
														 personId={v.personId}
														 description={v.description}
														 info={v.serviceInfo} works={v.photographer.slice(0,3)} />
								}else{
									return <Camera  key={k} row={k} name={v.personName}
													price={v.skillPrice}
													avatar={v.photoUrl}
													personId={v.personId}
													description={v.description}
													info={v.serviceInfo} works={v.cameraman.slice(0,2)} />
								}
							})
						}
					</ul>
				</div>
			</div>
		);
	}
})

module.exports = F4;
