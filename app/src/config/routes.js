var React = require('react');
var Main = require('../components/main.js'); //根页面
var Home = require('../components/home.js'); //首页列表
var Shot = require('../components/shot.js'); //婚纱摄影
var Scheme = require('../components/scheme.js'); //婚礼策划
var Hotel = require('../components/hotel.js'); //婚宴酒店
var HotelDetail = require('../components/hotel-detail.js'); //婚宴酒店
var HallDetail = require('../components/hall-detail.js');
//
var Samples = require('../components/samples.js'); //样片欣赏
var SamplesDetail = require('../components/samples-detail.js'); //样片详情
//
var Pringles = require('../components/pringles.js'); //客片欣赏
var PringlesDetail = require('../components/pringles-detail.js'); //客片详情
var PhotoDetail = require('../components/photo-detail.js');
//
var Suites = require('../components/suites.js'); //套系
var SuitesDetail = require('../components/suites-detail.js'); //套系详情
//
var Photographers = require('../components/photographers.js');
var Stylists = require('../components/stylists.js');
//
var DressIndex = require('../components/dress-index.js');
var DressBrand = require('../components/dress-brand.js');
var MovieIndex = require('../components/movie-list.js');
var MovieDetail = require('../components/movie-detail.js');
var Cases = require('../components/cases.js');
var CaseDetail = require('../components/case-detail.js');
var Planners = require('../components/planners.js');
var F4 = require('../components/f4.js');
var WeddingMV = require('../components/wedding-mv.js');
var Map = require('../components/map.js');
var Planner = require('../components/planners.js');
var SaleStrategy = require('../components/sale-strategy.js');
var AboutUs = require('../components/about-us.js');
var NotFound = require('../components/not-found.js');
var StaticActivies = require('../components/static-activities.js');
var VideoDetail = require('../components/video-detail.js');
var WeddingClass = require('../components/wedding-class.js');
var WeddingClassDetail = require('../components/wedding-class-detail.js');
var WeddingAndPat = require('../components/wedding-and-pat.js');
var GatherRequire = require('../components/gather-require.js');
var WeddingVideo = require('../components/wedding-video.js');
var LoveMV = require('../components/love-mv.js');
var LoveMicro = require('../components/love-micro.js');
var PutRequire = require('../components/put-require.js');
var HotelRequire = require('../components/hotel-require.js');
var WeddingSupply= require('../components/wedding-supply.js');
var Rent = require('../components/rent.js');
var Router = require('react-router-ie8');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;

var routes = (
	<Route handler={Main} path='/' name='app'>
		<Route name='home' path='home' handler={Home} />
		<Route name='shot' path='shot' handler={Shot} />
		<Route name='samples' path='samples' handler={Samples} />
		<Route name='samples-detail' path='samples/:moduleId/:contentId' handler={SamplesDetail} />
		<Route name='pringles' path='pringles' handler={Pringles} />
		<Route name='pringles-detail' path='pringles/:moduleId/:contentId' handler={PringlesDetail} />
		<Route name='scheme' path='scheme' handler={Scheme} />
		<Route name='cases' path='cases' handler={Cases} />
		<Route name='hotel' path='hotel' handler={Hotel} />
		<Route name='hotel-detail' path='hotel/:moduleId/:contentId' handler={HotelDetail} />
		<Route name='banquet-detail' path='hotel/:moduleId/:contentId/:banquetId' handler={HallDetail} />
		<Route name='case-detail' path='scheme/:moduleId/:contentId' handler={CaseDetail} />
		<Route name='suite' path='suite' handler={Suites} />
		<Route name='suites-detail' path='suite/:moduleId/:contentId' handler={SuitesDetail} />
		<Route name='photographers' path='photographers' handler={Photographers} />
		<Route name='photographers-works' path='team/:personId/works/:worksId' handler={PhotoDetail} />
		<Route name='wedding-supply' path='supplies' handler={WeddingSupply} />
		<Route name='rent-car' path='car' handler={Rent} />
		<Route name='stylists' path='stylists' handler={Stylists} />
		<Route name='promote' path='promote' handler={StaticActivies} />
		<Route name='map' path='map' handler={Map} />
		<Route name='sale-strategy' path='sale-strategy' handler={SaleStrategy} />
		<Route name='dress-index' path='dress' handler={DressIndex} />
		<Route name='dress-brand' path='dress/:brandId' handler={DressBrand} />
		<Route name='movie-index' path='movie' handler={MovieIndex} />
		<Route name='movie-detail' path='movie/:movieId' handler={MovieDetail} />
		<Route name='wedding-class' path='weddingclass/:moduleTypeId' handler={WeddingClass} />
		<Route name='wedding-class-detail' path='weddingclass/:moduleTypeId/:weddingClassroomId' handler={WeddingClassDetail} />

		<Route name='f4' path='f4' handler={F4} />
		<Route name='video' path='video-detail' handler={VideoDetail} />
		<Route name='planners' path='planners' handler={Planners} />
		<Route name='weddingmv' path='weddingmv' handler={WeddingMV} />
		<Route name='aboutUs' path='aboutUs' handler={AboutUs} />

		<Route name='weddingvideo' path='weddingvideo' handler={WeddingVideo} />
		<Route name='lovemv' path='lovemv' handler={LoveMV} />
		<Route name='lovemicro' path='lovemicro' handler={LoveMicro} />

		<Route name='weddingpat' path='weddingpat' handler={WeddingAndPat} />
		<Route name='gather' path='gather' handler={GatherRequire} />
		<Route name='put-require' path='put-require' handler={PutRequire} />
		<Route name='hotel-require' path='hotel-require' handler={HotelRequire} />

		<DefaultRoute handler={Home} />
	<NotFoundRoute handler={NotFound}/>
	</Route>
);
module.exports = routes;
