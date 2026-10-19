<?php


if (!isset($_POST))
{
	$msg = "NO POST MESSAGE SET, POLITELY FUCK OFF";
	echo json_encode($msg);
	exit(0);
}
$request = $_POST;
$response = " ".$request["email"]." ".$request["password"];
switch ($request["type"])
{
	case "login":
		$response = "login, yeah we can do that".$request["type"];
		break;
}
echo json_encode($response);
exit(0);

?>
