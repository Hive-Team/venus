var React = require('react');
var HomeMenu = React.createClass({
	render:function(){
		return (
			<div className={this.props.klassName}>
				{
					this.props.menu.map(function(m,index){
						return (
							<a href={m.link} key={index}>{m.name}<div className="line-bottom transition-height"></div></a>
						)
					})

				}
				{
					this.props.klassName === 'responsive-box' &&
					(
						<div className="func">
							<a>时尚<div className="line-bottom transition-height"></div></a>
                            <i className="circle-point-js circle-point-black-1-js"></i>
							<a>个性<div className="line-bottom transition-height"></div></a>
                            <i className="circle-point-js circle-point-black-1-js"></i>
							<a>品质<div className="line-bottom transition-height"></div></a>
						</div>
					)
			}

		</div>

	)
}
});

module.exports=HomeMenu;
