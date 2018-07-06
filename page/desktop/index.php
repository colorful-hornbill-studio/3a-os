<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>
			Desktop
		</title>
		<link rel="stylesheet" type="text/css" href="/3a-os/style/style1.css" />
		<link rel="stylesheet" type="text/css" href="/3a-os/style/style3.css" />
	</head>
	<body onload="setDesktopPage()">
		<div id="menu" onmouseover="showMenu()" onmouseleave="hideMenu()">
			<div id="left-menu">
				<div id="log-out-button" class="menu-button" title="log out" onclick="logOut()">
					<img src="/3a-os/pictures/komponen-web/arrows.svg" width="25" height="25" alt="log out" />
				</div>
			</div>
			<div id="right-menu">
					<?php
						$options = "";
						$applications = array_diff(scandir("../../applications/"), array(".", "..", "index.php"));

						foreach($applications as $list) {
							$options .= "<button type='button' class='apps-name' title='" . $list . "' onclick='callApplication(this.title)'>" . 
								str_replace("-", " ", $list) . "</button>";
						}

						echo $options;
					?>
			</div>
		</div>
		<div id="calendar" onmouseover="showCalendar()" onmouseleave="hideCalendar()">
			<div id="current-date">
			</div>
			<table>
				<tr>
					<th>Su</th>
					<th>Mo</th>
					<th>Tu</th>
					<th>We</th>
					<th>Th</th>
					<th>Fr</th>
					<th>Sa</th>
				</tr>
				<tr class="calendar-rows">
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
				<tr class="calendar-rows">
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
				<tr class="calendar-rows">
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
				<tr class="calendar-rows">
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
				<tr class="calendar-rows">
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
				<tr class="calendar-rows">
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
					<td>
					</td>
				</tr>
			</table>
		</div>
		<div id="nav">
			<button type="button" id="start-button" onmouseover="showMenu()" onmouseleave="hideMenu()">Menu</button><!--
			--><div id="date-and-time" onmouseover="showCalendar()" onmouseleave="hideCalendar()">
				<div id="time">
				</div>
				<div id="date">
				</div>
			</div>
		</div>
		<script src="/3a-os/javascript/function1.js">
		</script>
		<script src="/3a-os/javascript/function3.js">
		</script>
	</body>
</html>
