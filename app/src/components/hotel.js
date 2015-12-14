var React = require('react');
var HotelList = require('./hotel-list.js');
var TopSlider = require('./top-slider.js');
var Router = require('react-router-ie8');
var SKMap = require('../config/SKMap.js');


var Filter = React.createClass({

	render: function() {
		var self = this;
		return (
			<div className="filter-box">
				<span className="title"><i className="ico-1-js ico-1-2-js"></i>{this.props.title}</span>
				<div className="tab-box">
					{
						this.props.conditions && this.props.conditions.length>0 &&
						$.map(this.props.conditions,function(v,k){
							return (
								<span key={k} className="tab" data-key={(self.props.sorterKey.length && typeof self.props.sorterKey ==='object')? self.props.sorterKey.join(',') : self.props.sorterKey}
									  data-value={(self.props.valueKey.length&& typeof self.props.valueKey === 'object')? (v[self.props.valueKey[0]]+','+v[self.props.valueKey[1]] ): (v[self.props.valueKey])}>{v[self.props.name]}</span>)
						})
					}
				</div>
			</div>
		);
	}

});



var Hotel = React.createClass({
	mixins: [Router.State], //我们需要知道当前的path params 等等信
	componentDidMount: function() {
		var self = this;
		//以父级作为更新
		var changeMenu = function(payload) {
			$(document.body).trigger('ModuleChanged', ['#/hotel']);
		};
		var fetchData = function(payload) {
			//从配置map里面获取到读取菜单的key
			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/hotel');
			self.setState({
				resourceLinks: resourceLinks
			})
		};

		var fetchAreasData = function() {
			return Api.httpGET('hotel/provinces/4/districts', {});
		}
		window.Core && window.Core.promises['/'] &&
			$.when(window.Core.promises['/'])
			.then(changeMenu)
			.then(fetchData);
		// $('#J_FilterHotelSubmit').on('click',function(){
		// 	if($.trim($('#J_FilterHotelText').val()) === ''){
		// 		self.setState({
		// 			pageSize:10,
		// 			pageIndex:1,
		// 			sorter:{}
		// 		});
		// 		return;
		// 	}
		// 	var sorter = {};
		// 	($(this).attr('data-filter') !== 'none')?sorter[$(this).attr('data-filter')] = $.trim($('#J_FilterHotelText').val()):sorter={};
		//
		// 	self.setState({
		// 		pageSize:10,
		// 		pageIndex:1,
		// 		sorter:sorter
		// 	})
		// });
		// $('.J_FilterSel').on('click','span',function(){
		// 	$(this).addClass('item-sel').siblings().removeClass('item-sel');
		// 	$('#J_FilterHotelSubmit').attr('data-filter',$(this).attr('data-filter'));
		// });


		//点击任意条件区域, 应该有选择和反选.
		var sorter = {};
		$('.tab-box').on('click', 'span', function() {
			$(this).siblings().removeClass('tab-sel');
			$(this).toggleClass('tab-sel');
			var that = this;
			if ($(this).hasClass('tab-sel')) {
				$.each($(this).attr('data-key').split(','), function(k, v) {
					sorter[v] = $(that).attr('data-value').split(',')[k];
				})

			} else {
				$.each($(this).attr('data-key').split(','), function(k, v) {
					delete sorter[v]
				})
			}
			self.setState({
				sorter: sorter,
        		pageIndex:1
			})
		});
    var filter = {};
		$('.J_SorterButton').on('click', function() {
		  filter = {};
			var $sorterArrow = $(this).find('.J_SorterArrow');
			filter['short'] = $sorterArrow.attr('data-filter');
			if ($sorterArrow.hasClass('ascending')) {
				$sorterArrow.removeClass('ascending');
				$sorterArrow.addClass('descending');
				filter['order'] = 'desc';
			} else if ($sorterArrow.hasClass('descending')) {
				$sorterArrow.removeClass('descending');
				$sorterArrow.addClass('ascending');
				filter['order'] = 'asc';

			}else {
        $sorterArrow.addClass('ascending');
				filter['order'] = 'asc';
			}
			self.setState({
				pageSize: 10,
				pageIndex: 1,
				filter: filter
			})
		});
		var extraFilter = {}
		$('.J_ExtraFilter').on('click', function() {

			extraFilter[$(this).attr('data-filter')] = $(this).is(':checked') ? 1 : 0;
			self.setState({
				pageSize: 10,
				pageIndex: 1,
				extraFilter: extraFilter
			});



		});

    /* */
    $('.hotel-page').on('click','.J_FindByName',function(){
      var searchName = $.trim($('.J_SearchName').val());
      if (searchName !== '') {
        sorter['hotelName'] = searchName;
        self.setState({
          pageIndex: 1,
          sorter: sorter
        });
      }else {
        delete sorter['hotelName'];
      }

      return false;
    })

		// var $select_box = $('#select_box');
		// var $item_boxs = $('.item-box', $select_box);
		// var $win_mask = $('#win_mask');
		// var $win_btn = $('#win_btn');
		// var $win_sub = $('#win_sub');
		// var $btn_close = $('#btn_close');
		// $('#nav_fixed').hide();

		// $('.item-box', $select_box).each(function() {
		// 	$(this).bind('click', function() {
		// 		$('.option-box', $(this)).css({
		// 			display: 'block',
		// 			opacity: 1
		// 		});
		// 		$('.select', $(this)).css({
		// 			borderRadius: '3px 3px 0 0'
		// 		});
		// 	}).bind('mouseleave', function() {
		// 		$('.option-box', $(this)).css({
		// 			display: 'none',
		// 			opacity: 0
		// 		});
		// 		$('.select', $(this)).css({
		// 			borderRadius: '3px'
		// 		});
		// 	});
		// });

		// $item_boxs.each(function(i, e) {
		// 	$('.item', $(e)).bind('click', function() {
		// 		$('.text', $(e)).text($(this).text());
		// 	});
		// });

		// $win_mask.height($(window).height()).width($(window).width());

		// $win_btn.bind('click', function() {
		// 	$win_mask.css({
		// 		display: 'block'
		// 	});
		// 	$win_sub.css({
		// 		display: 'block'
		// 	});
		// });

		// $win_mask.bind('click', function() {
		// 	$(this).css({
		// 		display: 'none'
		// 	});
		// 	$win_sub.css({
		// 		display: 'none'
		// 	});
		// });

		// $btn_close.bind('click', function() {
		// 	$win_mask.css({
		// 		display: 'none'
		// 	});
		// 	$win_sub.css({
		// 		display: 'none'
		// 	});
		// });


		// //塞选
		// var $screening_btn_box = $('#screening_btn_box');
		// var $hotel_screening_fixed = $('#hotel_screening_fixed');
		// var $seled_box = $('#seled_box');
		// var $hotel_screening_container = $('#hotel_screening_container');
		// var sorter = {};
		// $screening_btn_box.on('click', 'span', function() {
		// 	var ind = $(this).index() - 1;
		// 	////console.log(ind);

		// 	$('span', $screening_btn_box).removeClass('item-sel');
		// 	$(this).addClass('item-sel');

		// 	if (ind < 0) {
		// 		$('.screeng-item-box', $hotel_screening_fixed).removeClass('screeng-item-current-box');
		// 		$('.screeng-item-box li', $hotel_screening_fixed).removeClass('current');
		// 		$('.item', $seled_box).removeClass('item-current');
		// 		sorter = {};
		// 		self.setState({
		// 			sorter: sorter,
		// 			pageIndex: 1,
		// 			pageSize: 10
		// 		})
		// 		return;
		// 	}
		// 	$('.screeng-item-box', $hotel_screening_fixed).removeClass('screeng-item-current-box');
		// 	ind >= 0 && $($('.screeng-item-box', $hotel_screening_fixed)[ind]).addClass('screeng-item-current-box');
		// });

		// $('.screeng-item-box', $hotel_screening_fixed).each(function(i, e) {
		// 	var ind = i;
		// 	var e = $(e);

		// 	e.on('click', 'li', function() {
		// 		var item = $($('.item', $seled_box)[ind])
		// 		item.attr('data-sortkey', $(this).attr('data-sortkey'));
		// 		$('li', e).removeClass('current');
		// 		$(this).addClass('current');
		// 		var keys = $(this).attr('data-sortkey').split(',');
		// 		var values = $(this).attr('data-sortvalue').split(',');

		// 		$.each(keys, function(i, v) {
		// 			sorter[v] = values[i]
		// 		})
		// 		self.setState({
		// 			sorter: sorter,
		// 			pageIndex: 1,
		// 			pageSize: 10
		// 		})

		// 		$('b', item).text($(this).text());
		// 		item.addClass('item-current');
		// 	});

		// 	e.on('click', '.btn-close', function() {
		// 		e.removeClass('screeng-item-current-box');
		// 	});
		// });

		// $seled_box.on('click', '.item', function() {
		// 	var ind = $(this).index();

		// 	$(this).removeClass('item-current');
		// 	var keys = $(this).attr('data-sortkey').split(',');
		// 	$.each(keys, function(i, v) {
		// 		delete sorter[v];
		// 	});
		// 	self.setState({
		// 			sorter: sorter,
		// 			pageIndex: 1,
		// 			pageSize: 10
		// 		})
		// 		////console.log(JSON.stringify(sorter, null, 4));
		// 	$('li', $($('.screeng-item-box', $hotel_screening_fixed))).removeClass('current');
		// });

		// $(window).on('scroll mousewheel', function() {
		// 	$(this).scrollTop() >= $hotel_screening_container.offset().top && $hotel_screening_fixed.addClass('hotel-screening-1-fixed') || $hotel_screening_fixed.removeClass('hotel-screening-1-fixed');

		// });


	},
	componentWillUnmount: function() {
		$('#nav_fixed').show()
	},
	getInitialState: function() {
		return {
			resourceLinks: [],
			pageSize: 10,
			pageIndex: 1,
			sorter: {},
			filter: {},
			extraFilter: {},
			seatsCount: [{
				'maxTable': '10',
				'minTable': '0',
				'name': '10桌以下'
			}, {
				'minTable': '10',
				'maxTable': '20',
				'name': '10-20桌'
			}, {
				'minTable': '20',
				'maxTable': '30',
				'name': '20-30桌以下'
			}, {
				'minTable': '30',
				'maxTable': '999',
				'name': '30桌以上'
			}],
			prices: [{
				'minPrice': '0',
				'maxPrice': '2000',
				'name': '2000元以下'
			}, {
				'minPrice': '2000',
				'maxPrice': '3000',
				'name': '2000-3000元'
			}, {
				'minPrice': '3000',
				'maxPrice': '4000',
				'name': '3000-4000元'
			}, {
				'minPrice': '4000',
				'maxPrice': '99999',
				'name': '4000元以上'
			}],
			areas: [

				{
					"id": 90,
					"name": "渝中区",
					"pid": ""
				}, {
					"id": 91,
					"name": "大渡口区",
					"pid": ""
				}, {
					"id": 92,
					"name": "江北区",
					"pid": ""
				}, {
					"id": 93,
					"name": "沙坪坝区",
					"pid": ""
				}, {
					"id": 94,
					"name": "南岸区",
					"pid": ""
				}, {
					"id": 95,
					"name": "九龙坡区",
					"pid": ""
				}, {
					"id": 96,
					"name": "北碚区",
					"pid": ""
				}, {
					"id": 99,
					"name": "渝北区",
					"pid": ""
				}, {
					"id": 100,
					"name": "巴南区",
					"pid": ""
				}, {
					"id": 101,
					"name": "北部新区",
					"pid": ""
				},
        {
					"id": 114,
					"name": "重庆近郊",
					"pid": ""
				}
			]
		};
	},
	loadMore: function(event) {
		event.preventDefault();
		this.setState(function(prevState, currentProps) {
			return {
				pageIndex: prevState.pageIndex + 1
			}
		});
	},
	render: function() {
		return (
			<div className='hyyd-view'>
				<div className="layout-center-box">
					<div id="slider_top" className="slider-box bannar">
						<TopSlider
							tplKey='top#adv'
							resourceLinks={this.state.resourceLinks}
							pageIndex={1}
							pageSize={10} />
					</div>
				</div>
				<div className="layout-center-box" style={{minHeight:440+'px'}}>
					<Filter title={'区域'} name={'name'} valueKey={'id'} conditions={this.state.areas} sorterKey={'cityId'} />
					<Filter title={'桌数'} name={'name'} valueKey={['minTable','maxTable']} conditions={this.state.seatsCount} sorterKey={['minTable','maxTable']} />
					<Filter title={'价格'} name={'name'} valueKey={['minPrice','maxPrice']} conditions={this.state.prices}  sorterKey={['minPrice','maxPrice']}/>


					<div className="screening-2-jsbn">

						<div className="line-1">

						</div>

						<span className="item">默认排序</span>

						<span className="item J_SorterButton">
							<span>价格</span>
							<span
								className="arrow-box ascending J_SorterArrow"
								data-filter='price'>

								<i className="arrow-up"></i>
								<i className="arrow-down"></i>
							</span>
						</span>

						<span className="item J_SorterButton">
							<span>桌数</span>
							<span
								className="arrow-box descending J_SorterArrow"
								data-filter='table'>

								<i className="arrow-up"></i>
								<i className="arrow-down"></i>
							</span>
						</span>

						<label className="item"><input
							type="checkbox"
							className='J_ExtraFilter'
							data-filter='isGift'/>礼包</label>

						<label className="item"><input
							type="checkbox"
							className='J_ExtraFilter'
							data-filter='isDisaccount' />优惠</label>

						<div className="search-box">
							<div className="search">
								<i className="ico-6-js"></i>
								<input type="text" className="txt J_SearchName" placeholder="请输入酒店名称" />
							</div>
               <span className="sub-1-js">
                   <input type="submit" className="subt J_FindByName" defaltValue="查找酒店" />
               </span>
						</div>
						<div className="info-box">
							<span style={{marginTop:'0px'}} className="result" id='J_TotalCount'>共找到婚宴酒店<b>0</b>个</span>
						</div>

					</div>


					<HotelList
						resourceLinks={this.state.resourceLinks}
						tplKey='list#hotel'
						pageSize={this.state.pageSize}
						pageIndex={this.state.pageIndex}
						sorter={this.state.sorter}
						filter={this.state.filter}
						extraFilter={this.state.extraFilter}
						/>

					<div>
						<div onClick={this.loadMore} id="J_MoreButton">
							<div className="more-btn"><span>点击查看更多</span></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = Hotel;
