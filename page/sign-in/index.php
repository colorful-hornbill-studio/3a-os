<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
            Sign In Page
        </title>
        <link rel="stylesheet" type="text/css" href="/3a-os/style/style1.css" />
        <link rel="stylesheet" type="text/css" href="/3a-os/style/style5.css" />
    </head>
    <body onload="setSignInPage()">
        <div id="form-sign-in">
            <img src="/3a-os/pictures/komponen-web/people.svg" id="people" />
            <button type="button" id="next-button">&lt;</button>
            <div id="fields">
                <input type="text" id="username" placeholder="Username" onkeyup="check(this.value)" />
                <input type="password" id="password" placeholder="Password" onkeyup="check(this.value)" />
            </div>
            <button type="button" id="prev-button">&gt;</button>
            <a href="/3a-os/page/sign-up/index.php">Belum punya akun, daftar!</a>
        </div>
        <script src="/3a-os/javascript/function1.js">
        </script>
        <script src="/3a-os/javascript/function5.js">
        </script>
    </body>
</html>
