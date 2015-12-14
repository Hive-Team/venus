var apiUrl = function(){
	$.ajaxSetup({
		headers:{
		'TICKET':window.store.get('TICKET') || '',
		'TOKEN':window.store.get('TOKEN')||''
		}
	});

	var config = {
		scheme:'http://',
		host:location.hostname,
		port:location.port,
		endpoint:'api'
	};
	return config.scheme+ config.host + ':'
		+ config.port + '/' + config.endpoint + '/';
}

var Api = {
	httpGET:function(url,params){
		return $.get(apiUrl()+url,params);
	},
	httpPOST:function(url,params){
		return $.post(apiUrl()+url,$.param(params));
	}
}



module.exports = Api;
