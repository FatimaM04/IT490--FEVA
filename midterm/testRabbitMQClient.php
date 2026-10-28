#!/usr/bin/php
<?php
file_put_contents("/tmp/php-debug.log","PHP START", FILE_APPEND);
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$msg = "";

$client = new rabbitMQClient("testRabbitMQ.ini","testServer");
if (isset($argv[1]))
{
  $msg = $argv[1];
}
else
{
  //$msg = "something went wrong, no message to send";
}

if (isset($_POST)){
if (!isset($_POST["username"])) return;
if (!isset($_POST["password"])) return;
if (!isset($_POST["type"])) return;

$username = $_POST["username"];
$password = $_POST["password"];

$type = $_POST['type'];

$msg= $type;

$request = array();

if ($type == "register"){
	$request['type'] = $type;
	$request['username'] = $username;
	$request['password'] = $password;
	$msg = "Trying to register " . $username;
}elseif ($type == "login"){
	$request['type'] = $type;
	$request['username'] = $username;
	$request['password'] = $password;
	$msg = "Trying to validate user " . $username;
}elseif ($type == "validate_session"){
	$request["token"] = $token;
}
$request['message'] = $msg;
$response = $client->send_request($request);
$response = $client->publish($request);
//$client->process_response($response);
//echo "client received response: ".PHP_EOL;
//^this was your last change
echo "\n\n";
} else {
echo "somethings horribly wrong here";
}
echo $argv[0]." END".PHP_EOL;

