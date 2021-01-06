<?php 


include('../../scoreboard/conn.php');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    die('WRONG METHOD');
}
// INSERT
extract($_POST);
// turns an array into component parts e.g keys in array become vars
$data = json_encode($_POST);
$db_table = 'bidding_calculator';
$q = "INSERT INTO $db_table (contractorName, email, industry, data) VALUES ('$contractorName', '$email', '$industry', '$data')";

if (!mysqli_query($conn,$q)){
    
    echo "Error: " . $q . "<br>" . mysqli_error($conn);
} 
mysqli_close($conn);
header("Location: /biddingCalculator/bidding_calculator");