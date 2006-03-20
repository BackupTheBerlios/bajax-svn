<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>BAJAX DEMO</title>
  <meta name="GENERATOR" content="Quanta Plus" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="KEYWORDS" content="bajax ajax javascript" />
  <style type="text/css">
  </style>
  <script language="javascript" type="text/javascript" src="bajax.js"></script>
  <script language="javascript" type="text/javascript">
	//Receber o retorno
	function exemplo(x){
		alert('RESULT: '+x);
	}
	function sum() {
		var myargs = new Array();
		myargs['aum'] = document.getElementById('aum').value;
		myargs['adois'] = document.getElementById('adois').value;	
		bajax.execute('test_do.php','soma',exemplo,myargs);
	}
  </script>
</head>
<body>

<div id="principal">
    SUM  <input id="aum" maxlength="6" size="5" name="aum" type="text" />
+   <input id="adois" maxlength="6" size="5" name="adois" type="text" />

<input id="somar" name="Somar" type="submit" value="do it" onclick="sum()" />
    </div>
</body>
</html>
