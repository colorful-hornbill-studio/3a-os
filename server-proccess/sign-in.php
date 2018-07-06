<?php
	require "connect.php";
		
	function clear($value) {
		$value = htmlspecialchars($value);
		$value = stripslashes($value);
		$value = trim($value);

		return $value;
	}

	if($_POST["username"] !== "" && $_POST["password"] !== "") {
		$username = clear($_POST["username"]);
		$password = clear($_POST["password"]);

		$query = $conn -> prepare("SELECT * FROM `daftar_admin` WHERE `username` = ?;");
		$query -> bind_param("s", $username);

		if($query -> execute()) {
			$query -> store_result();

			if($query -> num_rows() > 0) {
				$query -> close();

				$query = $conn -> prepare("SELECT `id`, `nama`, `email`, `storage_path` FROM `daftar_admin` WHERE `username` = ? AND " . 
					"`password` = ?;");
				$query -> bind_param("ss", $username, $password);

				if($query -> execute()) {
					$query -> store_result();

					if($query -> num_rows() > 0) {
						$query -> bind_result($id, $nama, $email, $storage_path);
						$row = $query -> fetch();

						echo "{\"id\": " . $id . ", \"nama\": \"" . $nama . "\", \"email\": \"" . $email . 
							"\", \"username\": \"" . $username . "\", \"storage_path\": \"" . $storage_path . "\"}";
					} else {
						echo "<div>Password tidak sesuai!</div>";
					}
				} else {
					echo "<div>Error: " . $query -> error() . "</div>";
				}
			} else {
				echo "<div>Username tidak terdaftar, harap sign up terlebih dahulu!</div>";
			}
		} else {
			echo "<div>Error: " . $query -> error() . "</div>";
		}

		$query -> close();

		$conn -> close();
	}
?>