<!DOCTYPE html>
<html>
<head>
    <meta name='viewport' content='width=device-width' >
    <style>body{margin: 0}</style>
</head>
<body>
<?
$ad=['qq'=>[32548,32549,32550],'sina'=>[32540,32541,32552,32553]];
$tp=['qq'=>'bd','sina'=>'sogou'];
$un=['bd'=>'<script type="text/javascript" src="http://i.hao61.net/d.js?cid=$$$"></script>','sogou'=>'你好$$$'];
if ($ids=$ad[$_GET['qid']]) {
	$id=$ids[array_rand($ids)];
	$html=$un[$tp[$_GET['qid']]];
	$html= str_replace('$$$', $id, $html);
	echo $html;
	}
?>
</body>
</html>
