<?php
    if(isset($_GET["path"]) && is_dir($_GET["path"])) {
        $files = $folders = array();

        $content = scandir($_GET["path"]);

        for($x = 2; $x < count($content); ++$x) {
            $unknown = $_GET["path"] . $content[$x];

            if(is_file($unknown)) {
                $files[] = $unknown;
            } else if(is_dir($unknown)) {
                $folders[] = $unknown;
            }
        }

        for($y = 0; $y < count($folders); ++$y) {

            echo "<a class='list' id='" . pathinfo($folders[$y], PATHINFO_BASENAME) . "-is-not-element' onclick='select(this.id)' title='folder'>" . 
                "<img src='/3a-os/pictures/komponen-web/folder3.svg' width='100' height='100'><span>" . 
                pathinfo($folders[$y], PATHINFO_BASENAME) . "</span><input class='rename' type='text' onkeydown=\"typeName(event)\" " . 
                "onblur='refresh()'/></a>";
        }

        for($z = 0; $z < count($files); ++$z) {
            if(pathinfo($files[$z], PATHINFO_EXTENSION) === "jpg" || pathinfo($files[$z], PATHINFO_EXTENSION) === "jpeg" || 
                pathinfo($files[$z], PATHINFO_EXTENSION) === "gif" || pathinfo($files[$z], PATHINFO_EXTENSION) === "png") {
                echo "<a class='list' onclick='select(this.id)' title='file' id='" . 
                    htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME)) . "-is-not-element' class='" . 
                    pathinfo($files[$z], PATHINFO_EXTENSION) ."'>" . 
                    "<img src='/3a-os/pictures/komponen-web/picture.svg' width='100' height='100'><span>" . 
                    htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME)) . "</span><input class='rename' type='text' " . 
                    "onkeydown=\"typeName(event, '." .  pathinfo($files[$z], PATHINFO_EXTENSION) . 
                    "')\" onblur='refresh()'/></a>";
            } else if(pathinfo($files[$z], PATHINFO_EXTENSION) === "mp4" || pathinfo($files[$z], PATHINFO_EXTENSION) === "webm" || 
                pathinfo($files[$z], PATHINFO_EXTENSION) === "mkv") {
                echo "<a class='list' onclick='select(this.id)' title='file' id='" . 
                    htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME)) . "-is-not-element' class='" . 
                    pathinfo($files[$z], PATHINFO_EXTENSION) ."'>" . 
                    "<img src='/3a-os/pictures/komponen-web/video-file.svg' width='100' height='100'><span>" . 
                    htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME)) . "</span><input class='rename' type='text' " . 
                    "onkeydown=\"typeName(event, '." .  pathinfo($files[$z], PATHINFO_EXTENSION) . 
                    "')\" onblur='refresh()'/></a>";
            } else if(pathinfo($files[$z], PATHINFO_EXTENSION) === "ogg" || pathinfo($files[$z], PATHINFO_EXTENSION) === "mp3" || 
                pathinfo($files[$z], PATHINFO_EXTENSION) === "wav") {
                echo "<a class='list' onclick='select(this.id)' title='file' id='" . 
                    addslashes(htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME))) . "-is-not-element' class='" . 
                    pathinfo($files[$z], PATHINFO_EXTENSION) ."'>" . 
                    "<img src='/3a-os/pictures/komponen-web/audio-file.svg' width='100' height='100'><span>" . 
                    htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME)) . "</span><input class='rename' type='text' " . 
                    "onkeydown=\"typeName(event, '." .  pathinfo($files[$z], PATHINFO_EXTENSION) . 
                    "')\" onblur='refresh()'/></a>";
            } else {
                echo "<a class='list' onclick='select(this.id)' title='file' id='" . 
                    addslashes(htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME))) . "-is-not-element' class='" . 
                    pathinfo($files[$z], PATHINFO_EXTENSION) ."'>" . 
                    "<img src='/3a-os/pictures/komponen-web/text-files.svg' width='100' height='100'><span>" . 
                    htmlspecialchars(pathinfo($files[$z], PATHINFO_BASENAME)) . "</span><input class='rename' type='text' " . 
                    "onkeydown=\"typeName(event, '." .  pathinfo($files[$z], PATHINFO_EXTENSION) . 
                    "')\" onblur='refresh()'/></a>";
            }
        }
    } else {
        echo "<div>Nothing directory found!</div>";
    }
?>