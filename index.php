<?php

/*
 * PHP SimpleXML
 * Loading a XML from a file, adding new elements and editing elements
 */
//prevent form redirect
if(isset($_SERVER['HTTP_REFERER'])){
    header("Location: " . $_SERVER['HTTP_REFERER']);    
} else {
    echo "An Error";
}

//get details from form
$Type = $_POST["Type"];
$colour = $_POST["colour"];
$hireTime = $_POST["hireTime"];
$price = $_POST["price"];


//check for file
if (file_exists('bikes.xml')) {
    //loads the xml and returns a simplexml object 
    $xml = simplexml_load_file('bikes.xml');
    $newChild = $xml->addChild('bikes');
    $newChild->addChild('Type', $author);
    $newChild->addChild('colour', $title);
    $newChild->addChild('hireTime', $genre);
    $newChild->addChild('price', $price);

    //transforming the object in xml format
    $output = $xml->asXML();
    
} else {
    exit('Failed to open bikes.xml.');
}
//save changes to xml file
 file_put_contents('bikes.xml', $xml->asXML());
?>