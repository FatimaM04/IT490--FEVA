#!/usr/bin/php
<?php
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

if ($_POST){

$username = $_POST["username"];

$type = $_POST['type'];

$msg= $type;

$request = array();

if ($type = "register"){
	$request['type'] = $type;
	$request['username'] = $username;
	$request['password'] = $password;
	$msg = "Trying to register " . $username;
}
if ($type = "login"){
	$request['type'] = $type;
	$request['email'] = $username;
	$request['password'] = $password;
	$request['sessionId'] = $token;
	$msg = "Trying to validate user " . $username;
}

$request['message'] = $msg;
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";
} else {
echo "somethings horribly wrong here";
}
echo $argv[0]." END".PHP_EOL;

