var React = require('react');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');

var Works = React.createClass({

	render: function() {
		var self = this;
		// 为了线上展示需要 做了本地数据。 等后台数据接口正常，需要替换。
		// var works = [];
		// $.each(HeadData,function(key,value){
		// 	if (parseInt(value.personId) === parseInt(self.props.personId)) {
		// 		works = value.works;
		// 	}
		// })
		var personId = this.props.personId
		var works = this.props.list.slice(0, this.props.pageSize);
		if (works.length === 0) {
			works = ["http://placehold.it/450x300", 'http://placehold.it/450x300'];
		}
		return (
			<ul className="list-11-js clearfix">
				{
					works.map(function(v,i){

						return (
							<li key={i}
								className={i === 1?'column-9 mg0 J_ShowPhoto':"column-9 mgr10 J_ShowPhoto"}
								data-big-img-url={v.contentUrl}
								data-person-id={personId}
								data-works-id={v.contentId}>
								<ImageListItem
									frameWidth={450}
									url={v.contentUrl}
									errorUrl={'http://placehold.it/450x300'}
									 />
							</li>
						)
					})
				}

			</ul>
		);
	}
});


var HeadStylistsList = React.createClass({
	showPhotoSwipe: function(items) {
		var self = this;
		window.Core.gallery && window.Core.gallery.close();
		var pswpElement = document.querySelectorAll('.pswp')[0];
		$('#nav_fixed').hide();
		// define options (if needed)
		var options = {
			// history & focus options are disabled on CodePen
			history: false,
			focus: false,
			showAnimationDuration: 0,
			hideAnimationDuration: 0,
			tapToClose: true

		};
		var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
		gallery.goTo(0);
		window.Core.gallery = gallery;
	},
	buildItems: function(data) {
		var self = this;
		if (data.length === 0) return [];

		return $.map(data, function(v, k) {
			var reg = /_(\d{1,4})x(\d{1,4})\.\w+g$/i
			var found = v.imageUrl && v.imageUrl.match(reg);
			var width = -1;
			var height = -1;
			if (found && found.length === 3) {
				//如果图片带了高宽参数 就截取出来.放在data-x属性上.方便操作.
				width = parseInt(found[1]);
				height = parseInt(found[2]);
			}

			var item = {
				src: v.imageUrl || 'http://placehold.it/1200x800',
				w: width,
				h: height
			};
			return item;

		})
	},
	getInitialState: function() {
		return {
			payload: [],
			baseUrl: ''

		}
	},

	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		}
		$.each(nextProps.resourceLinks, function(k, v) {
			(nextProps.tplKey.indexOf(v) > -1) &&
			dataPromise(v, {
					pageSize: nextProps.pageSize,
					pageIndex: nextProps.pageIndex
				})
				.done(
					function(payload) {
						////console.log(JSON.stringify(payload,null,4));
						var dumpData = function(url) {
							var semiPhotographerData = $.map(payload.data, function(val) {
								//1:总监 2:资深
								return (val.levelId === 1) ? val : null;
							});
							self.setState({
								payload: semiPhotographerData.concat(self.state.payload),
								baseUrl: url
							}, function() {
								$('.J_ShowPhoto').delegate('a', 'click', function() {
									var personId = $(this).parent('.J_ShowPhoto').attr('data-person-id');
									var worksId = $(this).parent('.J_ShowPhoto').attr('data-works-id');
									Api.httpGET('photographers/' + personId + '/works/' + worksId, {
											pageIndex: 1,
											pageSize: 100
										})
										.done(function(payload) {
											var items = self.buildItems(payload.data.detailedImages);
											self.showPhotoSwipe(items);
										});
									return false;
								})

							})
						}

						200 === payload.code && payload.data && dumpData(v);
					}
				)
		})

	},
	render: function() {
		var self = this;
		return (
			<ul className="list-20-js">
			{
				this.state.payload.map(function(v,i){
					return (
						<li key={i} className="item-box mgb40">
						  <div className="info-box">
							<div className="avatar-box"><img src={(window.Core.mode==='dev')?v.photoUrl:v.photoUrl+'@200h_1e_1c_0i_1o_90q_1x' || 'http://placehold.it/170x170' }/></div>
							<span className="name">{v.personName}</span>
							<span className="job">{v.level+'级造型师'}</span>
						  </div>
						  <Works list={v.list} personId={v.personId} pageSize={self.props.worksPageSize} pageIndex={self.props.worksPageIndex} />
						</li>
					);
				})
			}
			</ul>



		);
	}
});

module.exports = HeadStylistsList;