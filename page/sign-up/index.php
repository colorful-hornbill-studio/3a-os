<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
            Sign Up Page
        </title>
        <link rel="stylesheet" type="text/css" href="/3a-os/style/style1.css" />
        <link rel="stylesheet" type="text/css" href="/3a-os/style/style6.css" />
    </head>
    <body onload="setSignUpPage()">
        <div id="form-sign-up">
            <img src="/3a-os/pictures/komponen-web/people.svg" id="people" />
            <button type="button" id="next-button">&lt;</button>
            <div id="fields">
                <input type="text" id="name" placeholder="Nama" onkeyup="check(this.value)" />
                <input type="email" id="email" placeholder="Email" onkeyup="check(this.value)" />
                <input type="text" id="username" placeholder="Username" onkeyup="check(this.value)" />
                <input type="password" id="password" placeholder="Password" onkeyup="check(this.value)" />
            </div>
            <button type="button" id="prev-button">&gt;</button>
            <a href="/3a-os/page/sign-in/index.php">Sudah punya akun, sign in!</a>
        </div>
        <script src="/3a-os/javascript/function1.js">
        </script>
        <script src="/3a-os/javascript/function6.js">
        </script>
    </body>
</html>
