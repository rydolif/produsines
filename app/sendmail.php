<?php
	$SITE_TITLE = 'Message';
	$SITE_DESCR = '';

	if ( isset($_POST) ) {
		$name = htmlspecialchars(trim($_POST['name']));
		$phone = htmlspecialchars(trim($_POST['phone']));
		$content = htmlspecialchars(trim($_POST['content']));
		$sity = htmlspecialchars(trim($_POST['sity']));

		$baseone = htmlspecialchars(trim($_POST['baseone']));
		$basethree = htmlspecialchars(trim($_POST['basethree']));
		$basefour = htmlspecialchars(trim($_POST['basefour']));

		$inputone = htmlspecialchars(trim($_POST['inputone']));
		$inputtwo = htmlspecialchars(trim($_POST['inputtwo']));
		$inputthree = htmlspecialchars(trim($_POST['inputthree']));
		$inputfour = htmlspecialchars(trim($_POST['inputfour']));

		$subject = $_POST['subject'] ? htmlspecialchars(trim($_POST['subject'])) : '';
		$to = 'rudolifrudolif@gmail.com';

		$headers = "From: $SITE_TITLE \r\n";
		$headers .= "Reply-To: ". $email . "\r\n";
		$headers .= 'MIME-Version: 1.0' . "\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		$data = '<h1>'.$subject."</h1>";

		if ( $name != '' ) {
			$data .= 'Имя: '.$name."<br>";
		}
		if ( $phone != '' ) {
			$data .= 'Телефон: '.$phone."<br>";
		}
		if ( $content != '' ) {
			$data .= 'Задача: '.$content."<br>";
		}
		if ( $sity != '' ) {
			$data .= 'Город: '.$sity."<br>";
		}


		if ( $baseone != '' ) {
			$data .= 'Численность населения вашего города: '.$baseone."<br>";
		}
		if ( $basethree != '' ) {
			$data .= 'Кого вы планируете обучать: '.$basethree."<br>";
		}
		if ( $basefour != '' ) {
			$data .= 'Кого вы планируете обучать: '.$basefour."<br>";
		}


		if ( $inputone != '' ) {
			$data .= 'Кого вы планируете обучать: '.$inputone."<br>";
		}
		if ( $inputtwo != '' ) {
			$data .= 'Кого вы планируете обучать: '.$inputtwo."<br>";
		}
		if ( $inputthree != '' ) {
			$data .= 'Кого вы планируете обучать: '.$inputthree."<br>";
		}
		if ( $inputfour != '' ) {
			$data .= 'Кого вы планируете обучать: '.$inputfour."<br>";
		}

		$message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
				".$data."
				<br>\n
				<hr>\n
				<br>\n
				<small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
		$send = mail($to, $subject, $message, $headers);

		if ( $send ) {
			echo '';
		} else {
				echo '<div class="error">Ошибка отправки формы</div>';
		}

	}
	else {
			echo '<div class="error">Ошибка, данные формы не переданы.</div>';
	}
	die();
?>