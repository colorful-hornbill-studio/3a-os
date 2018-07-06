<!DOCTYPE html>
<html>
    <head lang="eng-us">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
            Upload File
        </title>
    </head>
    <body>
        <?php
            if(isset($_FILES["uploaded_file"]) && isset($_POST["upload_path"])) {
                $upload_state = true;
                $upload_dir = $_POST["upload_path"] . basename($_FILES["uploaded_file"]["name"]);

                if($_FILES["uploaded_file"]["size"] > 262144000) {
                    echo "<script>alert('Maaf file melebihi kapasitas upload maksimum!');</script>";
                    $upload_state = false;
                }

                if(file_exists($upload_dir)) {
                    echo "<script>alert('Maaf file telah tesedia!');</script>";
                    $upload_state = false;
                }

                if($upload_state) {
                    if(move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], $upload_dir)) {
                        echo "<script>alert('Upload berhasil, sebentar lagi Anda akan dialihkan ke halaman root');</script>";
                    }
                }            
            }

            echo "<script>history.go(-1);</script>";
        ?>
    </body>
</html>
