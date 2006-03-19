/*
BAJAX 


Copyright (c) 2006, Tiago Bastos da Silva
All rights reserved.

Redistribution sand use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of the <ORGANIZATION> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var bajax = {
	bajax_debug_mode : false,//Debug flag
	bajax_request_type : "GET", //Métodos: GET ou POST
	uri : "std.php", //Selecione a url a qual você deseja chamar (bajax.uri = 'myurl')
	
	/*
	Método para debug
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
	Faz a chamada e executa a funções
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