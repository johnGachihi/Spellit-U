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

//to be removed
elseif(isset($_GET["lessonContent"]) && !isset($_GET["levelid"])){
    echo "Please insert levelid param";
}

elseif(isset($_GET['getNextLevel']) && isset($_GET['curLevel'])){
    $nextLevelId = $levelsModel->getNextId($_GET['curLevel']);
    
    if(isset($nextLevelId['_id'])) {
        $response['present'] = TRUE;
        $response['nextID'] = $nextLevelId['_id']->__toString();
    } else {
        $response['present'] = FALSE;
    }
    echo json_encode($response);
}

else echo "Resource not found";
?>