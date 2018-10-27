<?php

require_once __DIR__.'/../models/LevelsModel.php';

$levelsModel = new LevelsModel();

if(isset($_GET["levelids"])){
    echo json_encode($levelsModel->getAllLevelIDsByLevelNumberAsArray());
}

elseif(isset($_GET["levelid"]) && isset($_GET["lessonContent"])){
    $levelId = $_GET["levelid"];
    echo json_encode($levelsModel->getLevelContent($levelId));
}

elseif(isset($_GET["lessonContent"]) && !isset($_GET["levelid"])){
    echo "Please insert levelid param";
}

else echo "Resource not found";
?>