var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var DetailRent = require('./detail-modual-rent.js');
var TopSlider = require('./top-slider.js');

/*
 搜索条件控件
 */
var Filter = React.createClass({
  propTypes: {
    condition: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    icon: PropTypes.string
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.data.length > 0;
  },
  componentWillMount: function() {
    var self = this;
    //价格前端写死
    if (this.props.condition === 'prices') {
      self.setState({
        data: [{
          id: '0-999',
          name: '1000以下'
        }, {
          id: '1000-2000',
          name: '1000-2000'
        }, {
          id: '2000-3000',
          name: '2000-3000'
        }, {
          id: '3000-999999',
          name: '3000以上'
        }]
      });
      return;
    }
    Api.httpGET('car/' + self.props.condition, {}).done(function(data) {
      (typeof data.data === 'object' && data.code === 200) &&
      self.setState({
        data: data.data
      });
    })
  },
  render: function() {
    var self = this;
    return (
        <div className='sltCondition'>
          <span className={'typeName '+this.props.icon}>{this.props.displayName}</span>
          <div className="inner clearfix">
            <a href={'car/'+self.props.condition}><span style={{fontSize:'14px'}}>全部</span></a>
            {
              _.map(this.state.data,function(value,key){
                return (
                    <a href={'car/'+self.props.condition+'/'+value.id} key={key}><span style={{fontSize:'14px'}}>{value.name}</span></a>
                )
              })
            }
          </div>
        </div>
    );
  }

});

/**
 车辆信息列表item
 **/

var CarInfoItem = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    coverUrl: PropTypes.string,
    retailPrice: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      title: '加载中...'
    };
  },
  render: function() {
    var self = this;
    return (
        <li className="item-box">
          <a className='img-box' href={'#/'+self.props.baseurl+'/'+self.props.weddingCarRentalId}>
            <img src={this.props.coverUrl} />
          </a>
          <div className='brd'>
            <div className="htile">
              <span>{this.props.title}</span>
              <div className="tab">
                <span>颜色：</span>
                <a href="javascript:void(0)" className="red" />
                <a href="javascript:void(0)" className="blue" />
                <a href="javascript:void(0)" className="white" />
              </div>
            </div>
            <p className="pname"><span className='spa1'>{this.props.retailPrice}</span><span className='spa2'>市场价：<em>{this.props.marketPrice}</em></span></p>
            <div className="alink"><a href="#">加为头车</a><a href="#" style={{float:'right'}}>加为跟车</a></div>
          </div>
          {[/*<div className="alink"> <a href="#">加为头车</a> <a href="#" style={{float: 'right'}}>加为跟车</a></div>*/]}
        </li>
    );
  }
});



/**
 租车模块
 **/
var RentPage = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      moduleId: '',
      url: '',
      resourceLinks: ''
    };
  },
  mixins: [Router.State],
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.data.length >= 0;
  },
  componentWillMount: function() {
    console.log('will mount');
    var self = this;
    var changeMenu = function(payload) {
      $(document.body).trigger('ModuleChanged', ['#/car']);
    };
    var fetchModuleId = function(data) {
      var tplKey = 'list#car';
      var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/car');
      _.each(resourceLinks, function(value, key) {
        if (value.indexOf(tplKey) > -1) {
          var url = value.split('#')[1];
          var moduleId = value.split('/')[1];


          Api.httpGET(url, {
            pageSize: 999,
            pageIndex: 1
          }).done(function(data) {
            typeof data.data === 'object' && data.code === 200 &&
            self.setState({
              data: data.data,
              moduleId: moduleId,
              url: url,
              resourceLinks: resourceLinks
            }, function() {
              console.log('set moduleId');
            })
          });
        }
      })
    };
    // 获取数据
    //怎么解决获取moduleId的问题？
    // 第一次获取到以后放到state里面
    window.Core && window.Core.promises['/'] &&
    $.when(window.Core.promises['/'])
        .then(changeMenu)
        .then(fetchModuleId)

  },
  componentDidMount: function() {
    var self = this;
    $(function() {

      $('.J_ItemBox').on('click', 'a.imgs', function() {
        console.log($(this).attr('href'));
        React.render(<DetailRent url={$(this).attr('href')}/>, $('#J_DetailModualContainer')[0]);
        $('#J_DetailModualContainer').show();

        // var Top = $("#Layer").offset();
        var sHeight = $(window).height() - 40 + "px";
        $("#Layer").fadeIn(100, function() {
          $("#Float").css("height", sHeight);
          $("#Float").fadeIn(400);
          $("body").css({
            overflow: "hidden"
          });
          window.setTimeout(function(){
            $(".scrollbarall").tinyscrollbar();
          },1000)
        });
        return false;
      });

    });


    var filterMap = {
      'models': 'carModelsId',
      'levels': 'carLevelId',
      'brands': 'carBrandId',
      'prices': ['priceStart', 'priceEnd'],
    };
    $('.J_FilterBox').on('click', 'a', function() {
      $('.J_FilterBox a').removeClass('action');
      $(this).addClass('action');
      var type = $(this).attr('href').split('/')[1];
      var filterKey = filterMap[type];
      var filterParams = {
        pageIndex: 1,
        pageSize: 100
      };
      if (typeof filterKey === 'string') {
        filterParams[filterKey] = $(this).attr('href').split('/')[2];
      } else {
        filterParams[filterKey[0]] = $(this).attr('href').split('/')[2] && $(this).attr('href').split('/')[2].split('-')[0];
        filterParams[filterKey[1]] = $(this).attr('href').split('/')[2] && $(this).attr('href').split('/')[2].split('-')[1];
      }

      Api.httpGET(self.state.url, filterParams).done(function(data) {
        typeof data.data === 'object' && data.code === 200 &&
        self.setState({
          data: data.data
        })
      })
      return false;
    })


    $('.J_IsTeam:checkbox').on('click',function(){
      if ($(this).is(':checked')) {
        //车队
        var filterParams = {
          pageIndex:1,
          carNature:2
        }
      }else {
        var filterParams = {
          pageIndex:1,
          carNature:1
        }
      }
      Api.httpGET(self.state.url, filterParams).done(function(data) {
        typeof data.data === 'object' && data.code === 200 &&
        self.setState({
          data: data.data
        })
      })
    })
  },

  render: function() {
    var self = this;
    return (
        <div className="zuche-view" style={{position: 'relative'}}>
          <div className="custom-banner">
            <div id="slider_top" className="slider-box bannar">
              {[/*<ul className="slider">
               <li className="item transition-opacity-1 item-current" style={{position: 'absolute', left: 0, top: 0}}>
               <a href="http://www.jsbn.com/#/sale-strategy?type=libao" style={{textAlign: 'center'}}
               className="img-box " data-width={1200} data-height={680} target="_self">
               <img src="http://placehold.it/1920x400" />
               </a>
               </li>
               </ul>*/]}
              <TopSlider
                  tplKey='top#adv'
                  resourceLinks={self.state.resourceLinks}
                  pageIndex={1}
                  pageSize={10}
                  frameWidth={1920}/>
            </div>
          </div>
          <div className="layout-center-box">
            {/* [<img className="serviceImg" src="images/serviceImg.png" /> ]*/}
            <div className="select-carType clearfix">
              {[/* <div className="slt-title"><span>婚庆用车分类</span> <a href="#">查看我的婚车选配&gt;&gt;</a> </div> */]}
              <div className="slt-infoBox clearfix J_FilterBox">
                {
                  _.map([
                    {
                      condition:'levels',
                      displayName:'婚车档次',
                      icon:'bg1'
                    },
                    {
                      condition:'models',
                      displayName:'婚车车型',
                      icon:'bg2'
                    },
                    {
                      condition:'brands',
                      displayName:'婚车品牌',
                      icon:'bg3'
                    },
                    {
                      condition:'prices',
                      displayName:'婚车价格',
                      icon:'bg4'
                    }
                  ],function(value,key){
                    return <Filter key={key} displayName={value.displayName} condition={value.condition} icon={value.icon}/>
                  })
                }
              </div>
            </div>
            <p className="result"><span>只看车队</span><input type="checkbox" name="FirstCar" className="cbox J_IsTeam" /><i>丨</i>{['找到相关车辆 ',<em>{self.state.data.length}</em>,' 辆']}</p>
            <ul className="list-recommend">
              {
                _.map(self.state.data,function(value,key){
                  return <CarInfoItem
                      key={key}
                      title={value.title}
                      coverUrl={value.coverUrl}
                      weddingCarRentalId={value.weddingCarRentalId}
                      baseurl={self.state.url}
                      retailPrice={String.fromCharCode(165)+parseFloat(value.rentalPrice||'0').toFixed(2) + ''}
                      marketPrice={String.fromCharCode(165)+parseFloat(value.marketRentalPrice || '0').toFixed(2) + ''}
                      />
                })
              }
            </ul>
          </div>
        </div>

    );
  }

});

module.exports = RentPage;
