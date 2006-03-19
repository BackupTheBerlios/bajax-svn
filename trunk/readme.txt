README
Bajax é um objeto ajax para ser usado independente de linguagem serverside.

Criada por Tiago Bastos:
	http://geekando.blogspot.com
	comechao @  g m a i l DOT c o m

Usando código baseado no trabalho de Thomas Lackner e ModernMethod (SAJAX).
	Copyright:
	Contributed and copyighted by Thomas Lackner and ModernMethod
	(http://www.modernmethod.com/sajax/).
	
#DOC:
	#Funções:

	execute(requestPage,requestName,outputFunction,*Arguments)//*pode ser um array vazio
	include(ElmentId,requestPage)
	insertHTML(id,hmtl)
	getHTML(id)

	#Variá¡veis:
	
	bajax_debug_mode : false,//Selecione p/ debug
	bajax_request_type : "GET", //MÃ©todos: GET ou POST
		
	#Chamadas a página com ou sem argumentos
	Fazer a chamada, Argumentos:
	EXEMPLO usando GET
 		No arquivo JS:		
			//Array dos argumentos
			var myargs = new Array()
			myargs['aum'] = "1";
			myargs['adois'] = "2";
			
			//Receber o retorno
			function exemplo(x){
				alert(x);
			}
			bajax.uri = 'soma.php';
			bajax.execute('soma',exemplo,myargs);
			bajax.execute('subtracao',exemplo,myargs);

		A url sairia assim no 1º caso: soma.php?rname=soma&aum=1&adois=2
	#include
		bajax.include('listagem','myarq.jsp');
	Incluiria o arquivo myarq.jsp em um elemento (DOM) na página
	#insertHTML
		bajax.insertHTML('teste','<b>Hello World</b>')
	Insere HTML no elemento com id=teste
	#getHTML
		bajax.insertHTML('teste')
	Pega o conteúdo dentro do elemento com id=teste