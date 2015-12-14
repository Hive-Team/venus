var React = require('react');
var Router = require('react-router-ie8');
var TopSlider = require('./top-slider.js');
var ImageListItem = require('./image-item.js');
var Api = require('../config/api.js');
var DetailModual = require('./detail-modual.js');
var AdSlider = React.createClass({
  getInitialState: function() {
    return {
      inited:false
    };
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.items !== this.props.items && this.props.items) {
      $('#slider_adv').Slider();
    }
  },

  render: function() {
    var self = this;
    return (
      <div className="bannar-all-box mgb30">
        <div id="slider_adv" className="slider-box bannar">
          <ul className="slider">
            {
              _.map(self.props.items || [],function(v,i){
                return (
                  <li className="item transition-opacity-1" key={i}>
                    <ImageListItem
                      sid={v.contentId}
                      frameWidth={self.props.frameWidth||1200}
                      frameHeight={680}
                      url={v.contentUrl || v.weddingCaseImage}
                      detailUrl={v.detailUrl}
                      errorUrl={'http://placehold.it/1200x680'}
                      />
                  </li>

                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }

});


var Filter = React.createClass({
  render: function() {
    var typeList = this.props.types || [];
    return (
      <div className='J_FilterCtrl'>
        <div className="filter-title">
          <span className="sel">分类</span>
        </div>
        <div className="filter-box">
          <span className="title"><i className="ico-1-js ico-1-2-js"></i><b>分类</b></span>
          <div className="tab-box" id='J_CardType'>
            <span className='tab tab-sel' data-type-id='0'>全部</span>
            {
              $.map(typeList,function(v,k){
                return <span key={v.id} data-type-id={v.id} className="tab">{v.name}</span>
              })
            }
          </div>
        </div>
      </div>
    )
  }
});


var SupplyListItem = React.createClass({

  render: function() {
    return (
        <li className='item-box'>
          <div className='img-box'>
            <ImageListItem errorUrl={'//placehold.it/276x276'} frameWidth={276} frameHeight={276} url={this.props.item.coverUrl} detailBaseUrl={this.props.baseUrl} sid={''+this.props.item.weddingSuppliesId} newWin={1}/>
          </div>
          <div className="content-box">
            <a className="title"><p>{this.props.item.title + ' ' + this.props.item.description || ' ' + this.props.item.suppliesNumber || '0'+'个'}</p></a>
            <div className="price-box">
              <b className="in-price"><em>￥</em></b>
              <b className='in-price'>{parseFloat(this.props.item.sellingPrice || '0').toFixed(2)}</b>
              <span>￥</span>
              <span className="tm-price">{parseFloat(this.props.item.marketPrice || '0').toFixed(2)}</span>
            </div>
          </div>
        </li>
    )
  }

});
var SupplyList = React.createClass({

  render: function() {
    var self = this;
    var items = this.props.items && this.props.items.data || [];
    var totalCount =this.props.items && this.props.items.totalCount || 0;
    return (
      <div>
        <div className="screening-results">
          <span className="find">找到相关用品<b>{totalCount}</b> 个</span>
        </div>
        <ul className="list-recommend">
          {
            $.map(items,function(v,k){
              return <SupplyListItem item={v} key={k} baseUrl={self.props.baseUrl}/>
            })
          }
        </ul>
      </div>
    )
  }

});



var WeddingSupply = React.createClass({

  mixins: [Router.State], //我们需要知道当前的path params 等等信息
  getInitialState: function() {
    return {

    };
  },

  componentDidMount: function() {
    var self = this;

    $(function(){

      $('.J_Item').on('click','a.img-box',function () {
        console.log($(this).attr('href'));
        React.render(<DetailModual url={$(this).attr('href')} />,$('#J_DetailModualContainer')[0]);
        $('#J_DetailModualContainer').show();

        // var Top = $("#Layer").offset();
        var sHeight = $(window).height() - 40 + "px";
        $("#Layer").fadeIn(100,function(){
          $("#Float").css("height",sHeight);
          $("#Float").fadeIn(400);
          $("body").css({overflow:"hidden"});

          window.setTimeout(function(){
            $(".scrollbarall").tinyscrollbar();
          },1000)

        });
        return false;
      });

    });



    var filter = {
      pageSize:100,
      pageIndex:1
    };
    // create a pool
    // and fill it with the key&value wihich value is a promise
    // and iterate the pool and evaluate the promise, and set the state. done
    var dataPool = {
    };
    var changeMenu = function(payload) {
      $(document.body).trigger('ModuleChanged', ['#/appliance']);
    };

    var fetchData = function(payload) {
      //从配置map里面获取到读取菜单的key
      var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/appliance');
      // 这个页面有顶部广告和用品列表。

      _.each(resourceLinks,function(v,k){
        var poolKey = v.split('/')[0] || '';
        var url = v.split('#')[1] || '';
        dataPool[poolKey] ={
          promise:Api.httpGET(url,{pageSize:100, pageIndex:1 }),
          url:url
        };
      });
      _.each(dataPool,function(v,k){
          (function(key){
            v.promise.done(function(payload){
              var state = {};
              state[key] = {};
              state[key].payload = payload;
              state[key].url = v.url;
              self.setState(state);
            });
          })(k);
      })
    };
  var fetchTypes = function(payload){
    Api.httpGET('supplies/types',{}).done(function(payload){
      self.setState({
        types:payload.data || []
      });
    });
  };

  // 绑定搜索
  $('.J_FilterCtrl').on('click',function(evt){
    if (evt.target.tagName === 'SPAN' && $(evt.target).hasClass('card') && $(evt.target).parent('div').attr('id') === 'J_CardType') {
    $('.J_FilterCtrl .card').removeClass('card-sel');
    $(evt.target).toggleClass('card-sel');
    if($(evt.target).attr('data-type-id') !== filter.weddingSuppliesTypeId || filter.weddingSuppliesTypeId === ''){
      filter.weddingSuppliesTypeId = $(evt.target).attr('data-type-id');
      if (filter.weddingSuppliesTypeId === '0') {
        delete filter.weddingSuppliesTypeId;
      }
      Api.httpGET(dataPool['list#supplies'].url,filter)
        .done(function(payload){
          self.setState({
            'list#supplies':{
              payload:payload,
              url:dataPool['list#supplies'].url
            }
          })
        })
    }
}
  });
    window.Core && window.Core.promises['/'] &&
      $.when(window.Core.promises['/'])
      .then(changeMenu)
      .then(fetchTypes)
      .then(fetchData);
  },

  render: function() {
    var self = this;
    return (
      <div className='hlyp-view'>
        <AdSlider items={self.state && self.state['top#adv']&& self.state['top#adv'].payload && self.state['top#adv'].payload.data} frameWidth={1920} />
        <div className='layout-center-box'>
          <div className="main-body-eav">
            <Filter types={self.state && self.state['types']} />
            <SupplyList items={self.state && self.state['list#supplies']&& self.state['list#supplies'].payload}  baseUrl={self.state && self.state['list#supplies'] && self.state['list#supplies'].url}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = WeddingSupply;
