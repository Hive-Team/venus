var React = require('react');
var PropTypes = React.PropTypes;
var Api = require('../config/api.js');
var ThumbItem = React.createClass({
  render: function() {
    return (
      <li style={this.props.isFirst?{display:'block'}: {display:'none'}} >
        <img src={this.props.coverUrl} />
      </li>
    );
  }

});

var DetailModual = React.createClass({
  getInitialState: function() {
    return {
      data:[]
    };
  },
  shouldComponentUpdate:function(nextProps, nextState){
    return nextState.data.detailPics.length >0;
  },
  componentWillMount: function() {
    var self = this;
    Api.httpGET(self.props.url.slice(2),{}).done(function(data){
      typeof data.data === 'object' && data.code === 200
       &&
       self.setState({
         data:data.data
       })
    })
  },

  componentDidUpdate: function(prevProps, prevState) {
    var self = this;
    $(function(){
      var closeFun = function () {
        $("#Float").fadeOut(400,function(){
          $("#Layer").fadeOut(100);
          $("body").css({overflow:"visible"});
        });
        $('#J_DetailModualContainer').html('');
      };


    	var nIndex = 0;
    	var nImg = $("#slideShow ul li").length - 1;
    	$("#leftHover").bind("click",function(){
    		nIndex = nIndex - 1;
    		if(nIndex < 0){
    			nIndex = nImg ;
    		}
    		$("#slideShow ul li").eq(nIndex).fadeIn().siblings().hide();
    		$("#dotBox li").eq(nIndex).addClass("sel").siblings().removeClass("sel");
    	});
    	$("#rightHover").bind("click",function(){
    		nIndex = nIndex + 1;
    		if(nIndex > nImg){
    			nIndex = 0 ;
    		}
    		$("#slideShow ul li").eq(nIndex).fadeIn().siblings().hide();
    		$("#dotBox li").eq(nIndex).addClass("sel").siblings().removeClass("sel");
    	});

    	$("#dotBox li").bind("mouseover",function(){
    		nIndex = $(this).index();
    		$("#slideShow ul li").eq(nIndex).fadeIn().siblings().hide();
    		$("#dotBox li").eq(nIndex).addClass("sel").siblings().removeClass("sel");
    	});
      $("#Close").bind("click", closeFun);
      $("#Layer").bind("click", closeFun);
    });
  },

  render: function() {
    var self = this;
    var liClass =
    (self.state.data.parameter&&self.state.data.parameter.split('|'))?'suibian':'';
    return (
      <div id="detail-modual">
        <div className="layer-hlyp" id="Layer" />
        <div className="float-window-hlyp" id="Float">
          <div className="close-ico" id="Close" />
          <div className="scrollbarall">

            <div className="scrollbar">
              <div className="track">
                <div className="thumb" />
              </div>
            </div>
            <div className="viewport">
              <div className="info-box-hlypxq clearfix overview">
                <div className="mgb30 clearfix">
                  <div className="slide-box" id="slideShow">
                    <ul className="img-box">
                        {
                          _.map(self.state.data.detailPics,function(value,key){
                            return (
                                <ThumbItem key={key} isFirst={ key === 0} coverUrl={value}/>
                            )
                          })
                        }
                    </ul>
                    <div className="switch-box-hlypxq">
                      <div className="hover-box l-hover" id="leftHover">
                        <span className="arrow-bg" />
                        <i className="arrow" />
                      </div>
                      <div
                        className="hover-box r-hover"
                        id="rightHover">
                        <span className="arrow-bg" />
                        <i className="arrow" />
                      </div>
                      <ol className="dot-box" id="dotBox">
                        {
                          _.map(self.state.data.detailPics,function(value,key){
                            if(key === 0){
                              return (
                                <li className="sel" key={key}>
                                  <i />
                                </li>
                              )
                            }else {
                              return (
                                <li key={key}>
                                  <i />
                                </li>
                              )
                            }
                          })

                        }

                      </ol>
                    </div>
                  </div>
                  <div className="standard-box">
                    <h1>{self.state.data.title}</h1>
                    <p>{self.state.data.brand}</p>
                    <h2>产品参数</h2>
                    <ul className="list-l">
                      {
                        _.map(self.state.data.parameter&&self.state.data.parameter.split('|').slice(0,4),function(value,key){
                          return <li key={key} className={liClass}>{value}</li>
                        })
                      }
                    </ul>
                    <ul className="list-r">
                      {
                        _.map(self.state.data.parameter&&self.state.data.parameter.split('|').slice(4),function(value,key){
                          return <li key={key} style={{width:'210px'}}>{value}</li>
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className='J_DetailText' dangerouslySetInnerHTML={{__html:self.state.data.detail}}>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

});

module.exports = DetailModual;
