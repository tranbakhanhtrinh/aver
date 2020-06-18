<?php
require("PDO/src/PDO.class.php");
error_reporting(0);
include 'connection.php';
include_once("PHPMailer-master/PHPMailerAutoload.php");


$fullname = trim($_POST['fullname']);
$phone = trim($_POST['phone']);
$email = trim($_POST['email']);
$company = trim($_POST['company']);


$utm_source = isset($_COOKIE["utm_source"]) ? trim($_COOKIE["utm_source"]) :'';
$utm_medium = isset($_COOKIE["utm_medium"]) ? trim($_COOKIE["utm_medium"]) : '';
$utm_campaign = isset($_COOKIE["utm_campaign"]) ? trim($_COOKIE["utm_campaign"]) :'';
$utm_term = isset($_COOKIE["utm_term"]) ? trim($_COOKIE["utm_term"]) :'';
$utm_content = isset($_COOKIE["utm_content"]) ? trim($_COOKIE["utm_content"]) :'';

if ($fullname != "" && $phone != "") {
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    $date_create = date('Y-m-d h:i:s');
    if (checkphone($phone) == 1) {
        echo json_encode(array(
            'result' => '0'
        ));
        die();
    } 
    else {

        insertregister($fullname,$phone,$email,$company,$utm_source,$utm_medium,$utm_campaign,$utm_term,$utm_content,$date_create);
        /*
        $mail = new PHPMailer;
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'no-reply@urekamedia.com';                 // SMTP username
        $mail->Password = 'Urekaads@123';                           // SMTP password
        $mail->SMTPSecure = 'TLS';                           // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;						
        $mail->setFrom('no-reply@urekamedia.com', 'Betahome');															
        $mail->addAddress('betahome.vn@gmail.com');
        // $mail->addAddress('khanhtrinh.tran@urekamedia.vn');							

                                            
        $mail->WordWrap = 50; 
        $mail->isHTML(true); 
        $mail->Subject = 'Betahome';
        $mail->Body    = "
            
            Thông tin khách hàng: <br/>
            Tên: $fullname <br/>
            Số điện thoại: $phone <br/>
            Email: $email <br/>
            
                
            #UTM Tracking# <br/>
            utm_source = $utm_source <br/>
            utm_medium = $utm_medium <br/>
            utm_campaign = $utm_campaign <br/>
            
        ";			
        $mail->AltBody = 'Betahome';							
        $mail->send();
        */

        echo json_encode(array(
            'result' => '1'                    
        ));
        die();


    }
} else {
    die("404");
}

?>