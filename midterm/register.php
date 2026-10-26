<!DOCTYPE html>
<html>
<head>
	<title>Registration</title>
	<script src="testRabbitMQClient.php">
		const button = document.getElementById("register").addListenerEvent("click",sendRegister(document.getElementById("username").value,document.getElementById("password").value));
	</script>
</head>
<body>
    <main>
	<h1>First time? Create your FEVA account here!</h1>
	<form name="registration" method="post">
	    <div id="registerBox">
		<label for="username">Username</label>
		<input type="text" placeholder="Jane" id="username" required>


		<label for="password">Password</label>
		<input type="password" id="password" required>

		<input type="submit" id="register" value="register">
	    </div>
	</form>
    </main>	
</body>
</html>
