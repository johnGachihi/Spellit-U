<?php

require __DIR__ . "/../../../vendor/autoload.php";
require_once __DIR__.'/../../models/PhoneticsModel.php';

use PHPUnit\Framework\TestCase;

class PhoneticsModel_Test extends TestCase {

    public function test_getPhonetics() {
        $phoneticsModel = new PhoneticsModel();

        print_r($phoneticsModel->getPhonetics(explode("_", "a_b_c")));
    }
}

?>