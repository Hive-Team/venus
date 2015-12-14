var React = require('react');
var Router = require('react-router-ie8');
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var NotFound = React.createClass({
	mixins:[Router.State], //我们需要知道当前的path params 等等信
	getInitialState:function(){
		return {
			notfound:[
                {
                    contentUrl:'http://image.jsbn.com/static/404_01.jpg'
                },
                {
                    contentUrl:'http://image.jsbn.com/static/404_02.jpg'
                },
                {
                    contentUrl:'http://image.jsbn.com/static/404_03.jpg'
                }
            ]
		}
	},
	componentDidMount:function(){
		var self = this;
		//以父级作为更新
		var changeMenu = function(payload){
			$(document.body).trigger('ModuleChanged',['#/shot']);
		};

        window.Core&&window.Core.promises['/'] &&
		$.when(window.Core.promises['/'])
				.then(changeMenu)
	},
	render:function(){
		var imgDetail = this.state.notfound;

		return (
			<div className="samples-pringles-detail-view ypxq-eav">
				{
					$.map(imgDetail || [],function(v,i){
						return(
							<div key={i} className="box-img">
								<ImageListItem frameWidth={$(window).width()-20} url={v.contentUrl} />
							</div>
						);
					})
				}

			</div>


		);
	}
})

module.exports = NotFound;
