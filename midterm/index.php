<!DOCTYPE html>
<html>
<head>
    <title>FEVA</title>
<script>
let token;
let ttl = (86400 * 1000) * 7;
const now = new Date();

const tokenData = {
	value : token,
	expiry : now.getTime() + ttl
};

localStorage.setItem("token",JSON.stringify(tokenData));

    </script>
</head>
<body>
    <section>
            <main>
                <h1>FEVA testing login page</h1>
                    <form name="login" action="testRabbitMQClient.php" method="post">
                        <div id="loginBox">
                            <label for="username">Username</label>
                            <input type="text" placeholder="User" name="username" id="username" required>


                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" required>
			    <input type="hidden" name="type" value="login">
			
			    <input type="submit" id="submit" value="Login" name='submit'>
			</div>
			</form>
			<div id="textResponse">awaiting response</div>
			<div id ="register">
				<a href="register.php">Click here to register</a>
			</div>
			<div id="randomRedirect">
			     <a href="about.php">I'm not here to log in</a>
			</div>
            </main>
        </section>
</body>
</html>
