const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/database");
const { sendMessage } = require("../config/rabbitmq");

// LOGIN USER
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if fields are empty
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user in MySQL
        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Check password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send login message to RabbitMQ
        try {
            await sendMessage({
                type: "USER_LOGGED_IN",
                userId: user.id
            });
        } catch (error) {
            console.error("RabbitMQ error:", error);
        }

        // Login successful
        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};