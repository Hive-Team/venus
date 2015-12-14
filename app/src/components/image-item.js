var React = require('react');
var PropTypes = React.PropTypes;
var ImageListItem = React.createClass({
    propTypes: {
        detailBaseUrl: PropTypes.string,
        url: PropTypes.string,
        frameWidth: PropTypes.number,
        frameHeight: PropTypes.number,
        sid: PropTypes.string,
        errorUrl: PropTypes.string,
        detailUrl: PropTypes.string,
        newWin: PropTypes.number,
        noplay:PropTypes.string,
        className:PropTypes.string

    },

    componentDidUpdate: function(prevProps, prevState) {
        var self = this;
        $.each($('.J_Video'),function(k,v){
          if ($(v).attr('data-loaded') !== 'loaded') {
            var w = window.videojs(v,{loop:true});
            if (self.props.noplay === 'YES') {
              w.pause();
            }else {
                w.play();
                w.muted(true);
            }
          }
          $(v).attr('data-loaded','loaded');
        })

    },
    componentDidMount: function() {

        // console.log(
        //   'c1:',commponent.props.noplay
        // );
        // $.each($('.J_Video'), (function(flag){
        // return   function(k, v) {
        //     console.log('c2:',flag);
        //       ($(v).attr('data-loaded') !== 'load') &&
        //       window.videojs(v, {
        //           autoplay: false,
        //           loop: true
        //       }, function() {
        //           var self = this;
        //           $(self).attr('data-loaded', 'loaded');
        //           window.setTimeout(function() {
        //               if (flag === 'YES') {
        //                   self.pause();
        //               } else {
        //                   self.play()
        //                   self.muted(true)
        //               }
        //           }, 300);
        //       });
        //
        //   }
        // })(commponent.props.noplay));
    },
    render: function() {
        // url with width and height
        // someurl_100x1200.*g
        var reg = /_(\d{1,4})x(\d{1,4})\.\w+g$/i;
        // 在线上环境, 就依靠oss服务裁剪图片. 要加水印也可以. 默认不加.
        var scaleW = (this.props.frameWidth) ? this.props.frameWidth + 'w_' : '' // (this.props.frameWidth) ? Math.floor(this.props.frameWidth / 16) * 16 + 'w_' : '';
        var scaleH = (this.props.frameHeight) ? this.props.frameHeight + 'h_' : '' //(this.props.frameHeight) ? Math.floor(this.props.frameHeight / 16) * 16 + 'h_' : '';
        var url = (window.Core.mode === 'dev') ? this.props.url : this.props.url + '@' + scaleW + scaleH + '90Q';

        var found = this.props.url && this.props.url.match(reg);
        var className = this.props.className;
        var width = -1;
        var height = -1;
        if (found && found.length === 3) {
            //如果图片带了高宽参数 就截取出来.放在data-x属性上.方便操作.
            width = parseInt(found[1]);
            height = parseInt(found[2]);
        }

        var detailUrl = (this.props.detailBaseUrl) ? '#/' + this.props.detailBaseUrl + '/' + this.props.sid : ((this.props.detailUrl && this.props.detailUrl !== '') ? this.props.detailUrl : 'javascript:void(0)');
        var newWin = this.props.newWin;
        var lightbox = this.props.lightbox || '';
        var klassName = this.props.klassName || '';
        var videoDetail = this.props.videoDetail || '#/movie';
        if (detailUrl.indexOf('mp4') !== -1) {
            return (
                <a href={videoDetail} className={klassName}>
                <video className="video-js vjs-default-skin J_Video"  preload="auto" width={this.props.frameWidth || width} height={this.props.frameHeight ||height} poster={url} >
                  <source src={detailUrl} type='video/mp4'/>
                </video>
                </a>
            )
        }

        if (lightbox !== '') {
            return (
                <a href={detailUrl}
                   style={{textAlign:'center'}}
                   className={'img-box '+klassName}
                   ref='RImageItem'
                   data-lightbox={lightbox}
                   data-width={width}
                   data-height={height}
                   target={newWin === 1 && '_blank' || '_self'}>
                    <img style={this.props.style} src={url}
                         onerror={this.props.errorUrl}/>
                </a>
            )
        } else if(className != null){
            return (
                <a href={detailUrl}
                   style={{textAlign:'center'}}
                   className={className}
                   ref='RImageItem'
                   data-width={width}
                   data-height={height}
                   target={newWin === 1 && '_blank' || '_self'}>
                    <img style={this.props.style} src={url}
                         onerror={this.props.errorUrl}/>
                </a>
            )
        } else {
            return (
                <a href={detailUrl}
                    style={{textAlign:'center'}}
                    className={'img-box '+klassName}
                    ref='RImageItem'
                    data-width={width}
                    data-height={height}
                    target={newWin === 1 && '_blank' || '_self'}>
                    <img style={this.props.style} src={url}
                     onerror={this.props.errorUrl}/>
                 </a>
            )
        }



    }

});

module.exports = ImageListItem;
