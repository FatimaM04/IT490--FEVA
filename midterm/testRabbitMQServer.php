#!/usr/bin/php
	<?php
	require_once('path.inc');
	require_once('get_host_info.inc');
	require_once('rabbitMQLib.inc');

$server = new rabbitMQServer("testRabbitMQ.ini","testServer");
	function doLogin($username,$password)
	{
	    //global $server;
	    //if ($server){
	//	$server->process_response('responseProcessor');
		echo "am i here".PHP_EOL;
	    return true;
		//return false if not valid
	   // }
	}

	function doValidate($sessionId)
	{
		//lookup sessionId in database
		console.log("validated o7");
		return true;
		//return false if sessionId is wrong/null or its been too long
	}

	function requestProcessor($request)
	{
	  echo "received request".PHP_EOL;
	  var_dump($request);
	  if(!isset($request['type']))
	  {
	    return "so cooked";
	  }
	  switch ($request['type'])
	  {
	    case "login":
		    echo "1 tried to login".PHP_EOL;
		    return doLogin($request['username'],$request['password']);
	    case "validate_session":
	      return doValidate($request['sessionId']);
	  }
	  return array("returnCode" => '0', 'message'=>"Server received request and processed");
}


echo "testRabbitMQServer BEGIN".PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END".PHP_EOL;
exit();
?>

