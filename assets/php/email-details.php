<?php
	
	$yourName = $_GET["yourName"];
	$yourEmail = $_GET["yourEmail"];
	$to = $_GET["recipientsEmail"];
	
	$headers = "From: " . $yourEmail . "\r\n";
	$headers .= "Reply-To: " . $yourEmail . "\r\n";
	$headers .= "X-Mailer: PHP/" . phpversion(). "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	
	$subject = $yourName . "'s browser's supported codecs";
	
	$body = "<html>";
	$body .= "<p>" . $yourName . " has visited <a href='http://codecdetect.com' target='_blank'>Codec Detect</a> and shared with you the information obtained.</p>";
	$body .= $_GET["body"];
	$body .= "<br/>";
	$body .= "<small><a href='http://codecdetect.com' target='_blank'>Codec Detect</a> has been built by <a href='http://jansensan.net' target='_blank'>Mat Janson Blanchet</a></small>";
	$body .= "</html>";
	
	$mail_sent = @mail($to, $subject, $body, $headers);
	
	echo "success";
?>