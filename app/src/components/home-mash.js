var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var ImageListItem = require('./image-item.js');
var SKMap = require('../config/SKMap.js')
var React = require('react');

var NavTitle = React.createClass({
    getInitialState: function() {
        return {
            href1: '',
            href2: '',
            titleClassName: 'nav-title'
        };
    },
    componentDidMount: function() {
        if (this.props.title.indexOf('摄影') > 0) {
            this.setState({
                titleClassName: this.state.titleClassName + ' photography-img-home',
                href1: '#/shot',
                href2: '#/movie'
            })
        } else if (this.props.title.indexOf('婚庆') > 0) {
            this.setState({
                titleClassName: this.state.titleClassName + ' banquet-img-home',
                href1: '#/hotel',
                href2: '#/scheme'
            })

        } else if (this.props.title.indexOf('礼服') > 0) {
            this.setState({
                titleClassName: this.state.titleClassName + ' dress-img-home',
                href1: '#/dress',
                href2: 'http://www.chinad9.com'
            })
        } else {

        }
    },
    render: function() {
        var self = this;
        return (
            <div className={self.state.titleClassName+' cover-box-home'}>
                <div className="cover"></div>
                <div className="and"></div>
                <a href={self.state.href1}><div className="word-01"></div></a>
                <a href={self.state.href2}><div className="word-02"></div></a>
            </div>
        );
    }

});

var HomeMash = React.createClass({
            getInitialState: function() {
                return {
                    items: []
                };
            },

            componentWillReceiveProps: function(nextProps) {
                var self = this;
                var urls = [];
                nextProps.resourceLinks && nextProps.tplKey &&
                    (nextProps.resourceLinks !== this.props.resourceLinks) &&
                    $.each(nextProps.resourceLinks, function(k, v) {
                        (nextProps.tplKey.indexOf(v.split('/')[0]) > -1 && k.indexOf('热区广告') === -1) &&
                        urls.push({
                            url: v.split('#')[1],
                            title: k,
                            p: []
                        })
                    });
                ////console.log('urls:', JSON.stringify(urls, null, 4));
                var payloadCallback = function(item) {
                    return function(payload) {
                        if (payload.code === 200 && payload.data.length > 0) {
                            item.p = payload.data;
                            ////console.log(JSON.stringify(urls, null, 4));
                            self.setState({
                                items: urls
                            })
                        }

                    }
                };
                $.each(urls, function(k, v) {
                    Api.httpGET(v.url, {
                        pageIndex: 1,
                        pageSize: 3
                    }).done(payloadCallback(v))
                });

            },
            render: function() {
                    var self = this;
                    var items = this.state.items || [{}, {}, {}];
                    return (
                            <div className='home-mash clearfix'>
                {
                    $.map(items,function(v,k){
  
                        return (
                            <ul key={k} className="list-recommend">
                                <li className="item-box">
                                    <NavTitle title={v.title} />
                                  {
                                    /*
                                    <h1>
                                      <a href={v&&v.title.split('&')[0] && SKMap[v.title.split('&')[0]]}>{v&&v.title.split('&')[0]}</a>
                                      <p>&amp;</p>
                                      <a href={v&&v.title.split('&')[1] && SKMap[v.title.split('&')[1]]}>{v&&v.title.split('&')[1]}</a>
                                    </h1>

                                    */
                                  }

                                    <span className='first-img-box'>
                                        <ImageListItem className={'first-img-box'} url = { v.p[0] && v.p[0].contentUrl || 'http://placehold.it/380x270' } frameWidth = { 380 } detailUrl = { v.p[0] && v.p[0].detailUrl} />
                                    </span>
                                   <div className = "title-box" >
                                        <span>{v.p[0]&&v.p[0].contentName.split('#')[0] || 'NO DESCRIPTION'}</span> 
                                        <span className = "en">{ v.p[0] && v.p[0].contentName.split('#')[1] || 'NO DESCRIPTION'} </span>
                                   </div> 
                                </li> 
                                <li className = "item-box">
                                    <ImageListItem url = { v.p[1] && v.p[1].contentUrl || 'http://placehold.it/380x570' } frameWidth = { 380 } detailUrl = { v.p[1] && v.p[1].detailUrl } />
                                    <div className = "title-box" >
                                        <span>{v.p[1]&&v.p[1].contentName.split('#')[0] || 'DESCRIPTION'}</span >
                                        <span className = "en">{v.p[1] && v.p[1].contentName.split('#')[1] || 'DESCRIPTION' } </span>
                                    </div >
                                </li>
                                <li className="item-box">
                                     <ImageListItem url = {v.p[2] && v.p[2].contentUrl || 'http://placehold.it/380x570'} frameWidth = { 380 } detailUrl = { v.p[2] && v.p[2].detailUrl } />
                                     <div className = "title-box">
                                        <span>{v.p[2]&&v.p[2].contentName.split('#')[0] || 'NO DESCRIPTION'}</span>
                                        <span className = "en"> { v.p[2] && v.p[2].contentName.split('#')[1] || 'NO DESCRIPTION' } </span>
                                    </div>
                                </li> 
                            </ul>
    )
})

} </div>


);
}

});

module.exports = HomeMash;