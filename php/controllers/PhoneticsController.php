<?php

require_once __DIR__.'/../models/PhoneticsModel.php';

$phoneticsModel = new PhoneticsModel();

if(isset($_GET["getcontent"])) {
    $response = generatePhoneticByTextOutput($_GET["getcontent"]);
    echo json_encode($response);
}

function generatePhoneticByTextOutput($joinedTexts = "") {
    $texts = explode("_", $joinedTexts);
    global $phoneticsModel;
    return $phoneticsModel->getPhonetics($texts);
}