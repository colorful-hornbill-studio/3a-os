<?php
	require "connect.php";
	
	function clear($value) {
		$value = htmlspecialchars($value);
		$value = stripslashes($value);
		$value = trim($value);

		return $value;
	}

	if($_POST["name"] !== "" && $_POST["email"] !== "" && $_POST["username"] !== "" && $_POST["password"] !== "") {
		$name = clear($_POST["name"]);
		$email = clear($_POST["email"]);
		$username = clear($_POST["username"]);
		$password = clear($_POST["password"]);

		$valid = true;

		if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$query = $conn -> prepare("SELECT * FROM `daftar_admin` WHERE `email` = ?;");
			$query -> bind_param("s", $email);

			if($query -> execute()) {
				$query -> store_result();

				if($query -> num_rows() > 0) {
					$valid = false;
					echo "<div>Email telah ada!</div>";
				}
			} else {
				echo "<div>Error: " . $query -> error() . "</div>";
			}

			$query -> close();
		} else {
			$valid = false;
			echo "<div>Email tidak valid!</div>";
		} 

		$query = $conn -> prepare("SELECT * FROM `daftar_admin` WHERE `username` = ?;");
		$query -> bind_param("s", $username);

		if($query -> execute()) {
			$query -> store_result();

			if($query -> num_rows() > 0) {
				$valid = false;
				echo "<div>Username telah ada!</div>";
			}
		} else {
			echo "<div>Error: " . $query -> error() . "</div>";
		}

		$query -> close();

		$query = $conn -> prepare("SELECT * FROM `daftar_admin` WHERE `password` = ?;");
		$query -> bind_param("s", $password);

		if($query -> execute()) {
			$query -> store_result();

			if($query -> num_rows() > 0) {
				$valid = false;
				echo "<div>Password telah ada!</div>";
			}
		} else {
			echo "<div>Error: " . $query -> error() . "</div>";
		}

		$query -> close();

		if($valid) {
			$query = "SELECT `id` FROM `daftar_admin` ORDER BY `id` DESC LIMIT 1;";
			$execute = $conn -> query($query);
	
			if(mysqli_num_rows($execute) > 0) {
				$row = mysqli_fetch_assoc($execute);
				++$row["id"];
			} else {
				$row = [
					"id" => 1
				];
			}

			$query = $conn -> prepare("INSERT INTO `daftar_admin` VALUES('', ?, ?, ?, ?, '" . $row["id"] . "/');");
			$query -> bind_param("ssss", $name, $email, $username, $password);

			if($query -> execute()) {
				$path = "../applications/window-manager/" . $row["id"];
				mkdir($path);

				echo "{\"id\": " . $row["id"] . ", \"nama\": \"" . $name . "\", \"email\": \"" . $email . "\", \"username\": \"" . $username . 
					"\", \"storage_path\": \"" . $row["id"] . "/\"}";
			} else {
				echo "<div>Error: " . $query -> error() . "</div>";
			}

			$query -> close();
		}

		$conn -> close();
	}
?>