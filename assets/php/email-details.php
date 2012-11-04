<?php
	
	$yourName = $_GET["yourName"];
	$yourEmail = $_GET["yourEmail"];
	$to = $_GET["recipientsEmail"];
	
	$headers = "From: Codec\ Detect\r\n";
	$headers .= "Reply-To: " . $yourEmail . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	
	$subject = $yourName . "'s browser's supported codecs";
	
	$body = $_GET["body"];
	
	$mail_sent = @mail($to, $subject, $body, $headers);
	
	echo "success";
?>