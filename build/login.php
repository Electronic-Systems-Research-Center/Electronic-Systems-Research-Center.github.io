<?php
include_once '../includes/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        echo "Both fields are required!";
    } else {
        // Check if the user exists
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Successful login
            session_start();
            $_SESSION['username'] = $user['username'];
            header("Location: dashboard.html"); // Redirect to the dashboard or home page
            exit();
        } else {
            // Invalid credentials
            echo "Invalid username or password!";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Login to Research Center">
  <link rel="icon" type="image/x-icon" href="../build/img/esrc logo 2.png">
  <title>Login - Research Center</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Roboto', 'Arial', 'sans-serif'],
          },
          colors: {
            primary: '#2563eb',
            light: '#e0f2fe',
            dark: '#1e3a8a',
          },
        },
      },
    };
  </script>

  <!-- Font -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

</head>
<body class="bg-gray-50 text-gray-800 font-sans">

  <!-- Login Page Container -->
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>
      <form action="../build/dashboard.html" method="POST" class="space-y-4">
        
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" name="email" 
                 class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                 placeholder="email@example.com">
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Enter your password">
        </div>

        <!-- Remember Me -->
        <div class="flex items-center">
          <input type="checkbox" id="remember" name="remember" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
          <label for="remember" class="ml-2 text-sm text-gray-600">Remember me</label>
        </div>

        <!-- Submit Button -->
        <button type="submit" 
                class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </form>

      <!-- Additional Links -->
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account? <a href="#" class="text-blue-600 hover:underline">Sign up</a>
      </p>
      <p class="mt-2 text-center text-sm text-gray-600">
        Forgot your password? <a href="#" class="text-blue-600 hover:underline">Reset it</a>
      </p>
    </div>
  </div>

</body>
</html>
