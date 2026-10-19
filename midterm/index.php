<!DOCTYPE html>
<html>
<head>
    <title>FEVA</title>
<script src="/config/rabbitmq.js">
console.log("something");
connectRabbitMQ();
const button = document.getElementById("submit").addListenerEvent("click",sendMessage("username",document.getElementById("email").value));
    </script>
</head>
<body>
    <section>
            <main>
                <h1>FEVA testing login page</h1>
                    <form name="login" method="post">
                        <div id="loginBox">
                            <label for="email">Email</label>
                            <input type="text" placeholder="example@email.com" name="email" id="email" required>


                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" required>


			    <input type="submit" value="Login">
			</div>
			</form>
			<div id="textResponse">awaiting response</div>
            </main>
        </section>
</body>
</html>
