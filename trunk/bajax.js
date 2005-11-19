//OBJ BAJAX
var bajax = {
	bajax_debug_mode : false,//Debug flag
	bajax_request_type : "GET", //M?todos: GET ou POST
	uri : "std.php", //Selecione a url a qual voc? deseja chamar (bajax.uri = 'myurl')
	
	/*
	M?todo para debug
	Debug method
	*/
	debug: function (text) {
		if (this.bajax_debug_mode)
			alert("DEBUG: " + text)
	},
	/*
	Criar Objeto XMLHttpRequest
	Criate XMLHttpRequest object
	*/
	init: function () {
		this.debug("bajax_init_object() called..")
		
		var A;
		try {
			A=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				A=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (oc) {
				A=null;
			}
		}
		if(!A && typeof XMLHttpRequest != "undefined")
			A = new XMLHttpRequest();
		if (!A)
			this.debug("Could not create connection object.");
		return A;
	},
	/*
	Simula o include de limguagens como o PHP
	Simulate include function ( like PHP )
	*/
	include: function(nome,url){
		uri = url;
		this.uri = url;
		A = this.init();
		A.open("GET",url,true);
		A.onreadystatechange=function() {
			if (A.readyState==4){
				retorno=unescape(A.responseText.replace(/\+/g," "));
				document.getElementById(nome).innerHTML =retorno;
			}
		}
		A.send(null);	
	},
	/*
	Faz a chamada e executa a fun??es
	Make a call to execute the function
	*/
	execute: function (page ,func_name, func_js ,args) {
		var i, x, n;
		var post_data;
		uri  = page;
		this.uri = page;
		bajax_request_type = this.bajax_request_type;

		if (bajax_request_type == "GET") {
			if (uri.indexOf("?") == -1) 
				uri = uri + "?rname=" + escape(func_name);
			else
				uri = uri + "&rname=" + escape(func_name);
			for (var key in args){ 
				uri = uri + "&"+key+"=" + escape(args[key]);
			}	
			uri = uri + "&rtime=" + new Date().getTime();
			post_data = null;
		} else {
			post_data = "rname=" + escape(func_name);
			for (var key in args){ 
				post_data  = post_data + "&"+key+"=" + escape(args[key]);
			}					
		}
		
		x = this.init();
		x.open(bajax_request_type, uri, true);
		if (bajax_request_type == "POST") {
			x.setRequestHeader("Method", "POST " + uri + " HTTP/1.1");
			x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		x.onreadystatechange = function() {
			if (x.readyState != 4) 
				return;
			bajax.debug("received " + x.responseText);
			var data;
			data = x.responseText;
			func_js(data);
		}
		x.send(post_data);
		this.debug(func_name + " uri = " + uri + "/post = " + post_data);
		this.debug(func_name + " waiting..");
		delete x;
	},
	/*
	Aliases para document.getElementById(id).innerHTML
	Aliases for document.getElementById(id).innerHTML
	*/
	insertHTML : function(id,content){
		document.getElementById(id).innerHTML = content;
	},
	getHTML : function(id){
		return document.getElementById(id).innerHTML;
	}	
}