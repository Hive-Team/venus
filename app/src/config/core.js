'use strict';
(function(win) {
	var Api = require('./api.js');

	function r(rawData, result) {
		$.each(rawData, function(index, item) {
			if (item.type === true && item.subModule[0] && item.subModule[0].type === false) {
				result[item.moduleName] = {};
				r(item.subModule, result[item.moduleName]);
			} else if (item.subModule[0] && item.subModule[0].type === true && item.type === true) {
				r(item.subModule, result);
			} else if (item.type == false) {
				if (item.menuLink && item.menuLink[0] &&
					item.menuLink[0].menuLinkUrl !== '') {
					result[item.moduleName] = item.blockCode + '#' +
						item.menuLink[0].menuLinkUrl;
				}
			}

		});
	}



	function Core() {
		var self = this;
		this.mode = (window.location.hostname.slice(0, 3) === 'www' || window.location.hostname.indexOf('jsbn.com') === 0 || window.location.hostname.indexOf('jsbn.love') !== -1) ? 'online' : 'dev'; //开发模式
		this.resource = {};
		this.gallery = null;
		this.menu = {

			'#/home': {
				'name': '全站首页',
				'sub': {
					'婚纱摄影': '#/shot',
					'婚宴预订': '#/hotel',
					'婚庆定制': '#/scheme',
					'婚纱礼服': '#/dress',
					'微电影': '#/movie',
					'婚戒钻石': 'http://www.chinad9.com',
					'婚礼用品': '#/supplies',
					'婚车租赁': '#/car'

				}
			},
			'#/shot': {
				'name': '婚纱摄影',
				'sub': {
					'全站首页': '#/home',
					'婚纱摄影首页': '#/shot',
					'样片欣赏': '#/samples',
					'客片欣赏': '#/pringles',
					'套系报价': '#/suite',
					'选摄影团队': '#/photographers',
					// '选造型师': '#/stylists',
					'婚纱纪实': '#/weddingmv',
					'婚照技巧': '#/weddingclass/1'

				}

			},
			'#/hotel': {
				'name': '婚宴预订',
				'sub': {
					'全站首页': '#/home',
					'婚宴预订首页': '#/hotel',
					'提交需求': '#/hotel-require',
					'大礼包': '#/sale-strategy?type=libao',
					'婚宴知识': '#/weddingclass/2'
				}
			},
			'#/scheme': {
				'name': '婚庆定制',
				'sub': {
					'全站首页': '#/home',
					'婚庆首页': '#/scheme',
					'实景案例': '#/cases',
					'婚礼跟拍': '#/weddingpat',
					'婚礼视频': '#/weddingvideo',
					'选策划师': '#/planners',
					'提交需求': '#/put-require', //'http://jsform.com/f/e7w5oq',
					'选婚礼人': '#/f4',
					'婚礼学堂': '#/weddingclass/3'
				}
			},
			'#/dress': {
				'name': '婚纱礼服首页',
				'sub': {
					'全站首页': '#/home',
					'婚纱礼服': '#/dress',
					'礼服知识': '#/weddingclass/4'
				}
			},
			'http://www.chinad9.com': {
				'name': '婚戒钻石'
			},
			'#/movie': {
				'name': '微电影首页',
				'sub': {
					'全站首页': '#/home',
					'微电影首页': '#/movie',
					'爱情MV': '#/loveMV',
					'爱情微电影': '#/loveMicro',
					'表演技巧': '#/weddingclass/5'
				}
			},
			'#/appliance': {
				'name': '婚礼用品',
				'sub': {
					'全站首页': '#/home',
					'婚礼用品首页': '#/supplies',
					'用品贴士': '#/weddingclass/7'
				}
			},
			'#/car': {
				'name': '婚车租赁',
				'sub': {
					'全站首页': '#/home',
					'婚车租赁首页': '#/car',
					'租车经验': '#/weddingclass/8'
				}
			}
		};
		this.getResourcesLinks = function(path, parent) {
			var r = {};

			if (path === '/photographers' || path === '/stylists') {
				r[path.slice(1)] = path.slice(1);
				return r;
			}
			//如果存在sub 就在sub里面找
			if (parent) {
				$.each(self.menu[parent]['sub'], function(k, v) {
					if (v === '#' + path) {
						r = self.resource[k];
						return false;
					}
				})
			} else {
				r = self.resource[self.menu['#' + path]['name']];
			}
			//否则

			return r;
		};

		this.User = {};
		this.promises = {
			'/': Api.httpGET('global/mainModule', {
					applicablePlatform: 'web'
				})
				.done(function(payload) {
					var parse = function(payload) {
						var pretty = {};
						payload.data && r(payload.data, pretty);
						self.resource = pretty;
						console.log('menu:', JSON.stringify(self.resource, null, 4))
					};
					(200 === payload.code) && parse(payload);
				})
		};
	}


	win.Core = new Core();

})(window);
