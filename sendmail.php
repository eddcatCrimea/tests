<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true); 

$mail->setFrom('from@example.com', 'Экскурсовод Крыма');
$mail->addAddress('eddcat@yandex.ru', 'Яндекс');    
$mail->Subject = "Заказ экскурсии или отзыв";

$hand = "Отзыв";
if($_POST['hand'] == "left") {
$hand = "Заказ экскурсии"
};


//Тело письма

//Заголовок
$body = "<h1> Письмо с сайта экскурсовод </h1>";

//Проверка, что поля заполнены
if(trim(!empty?($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

if(trim(!empty?($_POST['email']))){
  $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty?($_POST['hand']))){
  $body.='<p><strong>Отзыв или заказ:</strong> '.$_POST['hand'].'</p>';
}
if(trim(!empty?($_POST['age']))){
  $body.='<p><strong>Маршрут:</strong> '.$_POST['age'].'</p>';
}
if(trim(!empty?($_POST['message']))){
  $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

//Прикрепление файла
if (!empty($_FILES['image']['tmp_name'])){
  //путь загрузки файла
  $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
  //загружаем файл
  if(copy($_FILES['image']['tmp_name'], $filePath)){
    $fileAttach = $filePath;
    $body.='<p><strong>Прикрепленное фото:</strong>';
    $mail->addAttachment($fileAttach);
  }
}

$mail->Body = $body;

//Отправув письма
if(!$mail->send()){
  $message = 'Ощибка';
} else {
  $message = 'Письмо отправлено!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>