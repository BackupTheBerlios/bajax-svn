<?
if (trim($_GET[aum])!='' and trim($_GET[adois])!='')
	print ($_GET[aum]+$_GET[adois]);
else print("ERROR");
?>