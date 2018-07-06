<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
            Redirect Page
        </title>
    </head>
    <body>
        <script>
            if(localStorage.getItem("user_info")) {
                location.assign("/3a-os/page/desktop/"); 
            } else {
                location.assign("/3a-os/page/sign-in/");
            }
        </script>
    </body>
</html>