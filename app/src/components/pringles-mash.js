var React = require('react');
// var resourceKey = '客片欣赏';
var Api = require('../config/api.js');
var PringlesMash = React.createClass({
	getInitialState: function() {
		return {
			payload: [{}, {}, {}, {}, {}, {}, {}],
			baseUrl: '#/'
		}
	},
	componentWillReceiveProps: function(nextProps) {
		var self = this;
		var dataPromise = function(url, params) {
			////console.log('dataPromise',url);
			return Api.httpGET(url, params);
		}
		$.each(nextProps.resourceLinks, function(k, v) {
				(nextProps.tplKey.indexOf(v.split('/')[0]) > -1) &&
				dataPromise(v.split('#')[1], {
						pageSize: 8,
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
			// var key = config.resourceKey;
			// var dataPromise = function(){
			// 	var url = nextProps.resourceLinks[resourceKey].split('#')[1];
			// 	////console.log(url);
			// 	return  Api.httpGET(url,{
			// 		pageSize:7,
			// 		pageIndex:1
			// 	});
			// };
			// nextProps.resourceLinks[resourceKey]&&
			// dataPromise()
			// 	.done(function(payload){
			// 		////console.log(JSON.stringify(payload,null,4));
			// 		200 === payload.code && self.setState({
			// 			payload:payload.data
			// 		})
			// 	})

	},
	render: function() {
		var baseUrl = this.state.baseUrl;
		return (

			<ul className="list-6-js list-6-photoxs-js clearfix" style={{display:'none'}} >
                <li className="column-mg20-6 mgr20 mgb20">
                    <div className="photoxs-box-1">
                        <a href='#/pringles'>
                            <div className="more clearfix"><span>欣赏更多</span></div>
                            <div className="h2">客片欣赏</div>
                        </a>
                    </div>
                </li>
				{
					this.state.payload.map(function(v,i){
						return (
							<li key={i} className="column-mg20-6 mgr20 mgb20">
                              <a className="pos-box" href={'#/'+baseUrl+'/'+v.contentId} >
                                  <div className="img-box"><img src={v.contentUrl} /></div>
                                  <div className="info transition-opacity-margin">
                                      <div className="names flower-border">
                                          <h3>
                                              <b>{v.actorNameMale}</b>
                                              <i className="ico-heart ico-heart-big"></i>
                                              <b>{v.actorNameFemale}</b>
                                          </h3>
                                      </div>
                                      <i className="circl">+</i><span className="time">{v.createDate}</span>
                                  </div>
                                  <h2 className="transition-opacity">{v.contentName}</h2>
                                  <div className="mask-bg transition-height"></div>
                              </a>
							</li>

						)

					})
				}
			</ul>
		);
	}
})

module.exports = PringlesMash;