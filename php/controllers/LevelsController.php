<?php

require_once __DIR__.'/../models/LevelsModel.php';

$levelsModel = new LevelsModel();

if(isset($_GET["levelids"])){
    echo json_encode($levelsModel->getAllLevelIDsByLevelNumberAsArray());
}

?>