var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router-ie8');
var Api = require('../config/api.js');

var ImageListItem = require('./image-item.js');
var TeamItem = React.createClass({
  propTypes:{
    teamName:PropTypes.string.isRequired,
    photographerName:PropTypes.string.isRequired,
    stylistName:PropTypes.string.isRequired,
    photographerAvatar:PropTypes.string.isRequired,
    stylistAvatar:PropTypes.string.isRequired,
    works:PropTypes.array,
    teamId:PropTypes.number,


  },
  render: function() {
    var self = this;
    return (
        <li className="team-item-box clearfix">
          <div className="left-box">
            <div className="team-box">
              <div className="figure">
                <img src={this.props.photographerAvatar} />
                <h2>{this.props.photographerName}</h2>
              </div>
              <div className="figure">
                <img src={this.props.stylistAvatar} />
                <h2>{this.props.stylistName}</h2>
              </div>

            </div>
            <h1>{this.props.teamName}</h1>
          </div>
          <div className="right-box clearfix">
            {
              _.map(self.props.works,function(value,key){
                return (

                    <div className='item-box'>
                      <span className='img-box'>
                        <ImageListItem key={key}
                                       frameWidth={450}
                                       url={value.contentUrl}
                                       errorUrl={'http://placehold.it/450x300'}
                                       newWin={1}
                                       detailUrl={'#/team/'+self.props.teamId+'/works/'+value.contentId}
                            />
                      </span>
                    </div>
                )
              })
            }

          </div>
        </li>
    );
  }

});


var Photographers = React.createClass({
  mixins: [Router.State],
  getInitialState: function() {
    return {
      data:[],
      data2:[]
    };
  },
  shouldComponentUpdate:function(nextProps, nextState){
    return nextState.data.length>0 || nextState.data2.length>0;
  },
  componentWillMount: function() {
      var self = this;
  		var changeMenu = function(payload) {
  			$(document.body).trigger('ModuleChanged', ['#/shot']);
  		};
  		var fetchData = function(payload) {
  			//从配置map里面获取到读取菜单的key
  			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
  			resourceLinks && self.setState({
  				resourceLinks: resourceLinks
  			});
  		};

  		window.Core && window.Core.promises['/'] &&
  			$.when(window.Core.promises['/'])
  			.then(changeMenu)
  			.then(fetchData);


      Api.httpGET('team',{teamLevel:1}).done(function(data){
        typeof data.data === 'object' && data.code === 200
          &&
        self.setState({
          data:data.data
        })
      });
      Api.httpGET('team',{teamLevel:2}).done(function(data){
        typeof data.data === 'object' && data.code === 200
          &&
        self.setState({
          data2:data.data
        })
      })
  },
  render: function() {
    var self = this;
    return (
        <div className='xsys-view'>
          <div className="layout-center-box">
            <h2 className='mgt50' style={{fontSize:'22px'}}>总监级摄影团队</h2>
            <ul className="list-team">
              {
                _.map(self.state.data,function(value,key){
                  return (
                      <TeamItem key={key}
                                photographerName={value.photographerDetail.personName}
                                photographerAvatar={value.photographerDetail.head}
                                stylistName = {value.stylistDetail.personName}
                                stylistAvatar = {value.stylistDetail.head}
                                teamName = {value.teamName}
                                works = {value.workList.slice(0,2)}
                                teamId={value.teamId}
                          />
                  )
                })
              }

            </ul>
            <h2 className='mgt50' style={{fontSize:'22px'}}>资深摄影团队</h2>
            <ul className="list-team">
              {
                _.map(self.state.data2,function(value,key){
                  return (
                      <TeamItem key={key}
                                photographerName={value.photographerDetail.personName}
                                photographerAvatar={value.photographerDetail.head}
                                stylistName = {value.stylistDetail.personName}
                                stylistAvatar = {value.stylistDetail.head}
                                teamName = {value.teamName}
                                works = {value.workList.slice(0,2)}
                                teamId={value.teamId}
                          />
                  )
                })
              }

            </ul>
          </div>
        </div>
    );
  }

});

module.exports = Photographers;






// var React = require('react');
// var Router = require('react-router-ie8');
// var SKMap = require('../config/SKMap.js');
// var TopSlider = require('./top-slider.js');
// var PhotographersList = require('./photographers-list.js');
// var SemiPhotographersList = require('./semiphotographers-list.js');
// var Photographers = React.createClass({
// 	mixins: [Router.State], //我们需要知道当前的path params 等等信息
// 	//设置初始
// 	getInitialState: function() {
// 		return {
// 			resourceLinks: {},
// 			pageSize: 100,
// 			pageIndex: 1
// 		};
// 	},
// 	componentWillUnmount: function() {
// 		window.Core.gallery && window.Core.gallery.close();
// 		window.Core.gallery = null;
// 		$('#nav_fixed').show();
// 	},
// 	componentDidMount: function() {
// 		var self = this;
// 		// require('../vendors/kalendae.standalone.js');
// 		//以父级作为更新
// 		var changeMenu = function(payload) {
// 			$(document.body).trigger('ModuleChanged', ['#/shot']);
// 		};
// 		var fetchData = function(payload) {
// 			//从配置map里面获取到读取菜单的key
// 			var resourceLinks = window.Core.getResourcesLinks(self.getPathname(), '#/shot');
// 			resourceLinks && self.setState({
// 				resourceLinks: resourceLinks
// 			});
// 		};
//
// 		window.Core && window.Core.promises['/'] &&
// 			$.when(window.Core.promises['/'])
// 			.then(changeMenu)
// 			.then(fetchData);
// 	},
// 	render: function() {
// 		return (
// 			<div className="main responsive-box clearfix">
// 			  <div className="director-photography-box">
// 				  <PhotographersList
// 					  resourceLinks={['photographers']}
// 					   tplKey='photographers'
// 					   pageIndex={this.state.pageIndex}
// 					   pageSize={this.state.pageSize}
// 					   worksPageIndex={'1'} worksPageSize={'2'} />
// 			  </div>
//
// 			  <SemiPhotographersList
// 				  resourceLinks={['photographers']}
// 				   tplKey='photographers'
// 				   pageIndex={this.state.pageIndex}
// 				   pageSize={this.state.pageSize}
// 				   worksPageIndex={'1'} worksPageSize={'4'}
// 				  />
// 			</div>
// 		);
// 	}
// })
//
// module.exports = Photographers;
