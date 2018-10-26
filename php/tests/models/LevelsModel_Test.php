<?php

// namespace Spellit\Tests;

require __DIR__ . "/../../../vendor/autoload.php";
require_once __DIR__.'/../../models/LevelsModel.php';

use PHPUnit\Framework\TestCase;
// use Spellit\LevelsModel;

class LevelsModel_Test extends TestCase {

    // public function test_getAllLevels() {
        // echo getcwd();
        // $levelsModel = new LevelsModel();
        // print_r($levelsModel->getAllLevels(["_id"]));
    // }

    public function test_getAllLevelIdsAsArray() {
        $expected = 16;

        $levelsModel = new LevelsModel();
        $actual = count($levelsModel->getAllLevelIDsAsArray());
        $levelsModel->getAllLevelIDsAsArray();
        $this->assertEquals($expected, $actual);
    }

    public function test_stringToOjbect() {
        $oid = new MongoDB\BSON\ObjectId('5bcdc75e514fae742cd1462d');

        $this->expectOutputString('5bcdc75e514fae742cd1462d');
        echo $oid->__toString();
    }

    public function test_getAllLevelIDsByLevelNumberAsArray() {
        $levelsModel = new LevelsModel();

        print_r($levelsModel->getAllLevels(["levelNo"])->toArray());
        $levelsModel->getAllLevelIDsByLevelNumberAsArray();
        // foreach($levelsModel->getAllLevels(["lessons"]) as $doc)
        //     print_r($doc["levelNo"]);
    }

    public function test_getLevelContent() {
        $levelsModel = new LevelsModel();
        $levelContent = $levelsModel->getLevelContent("5bcdc75e514fae742cd1462d");
        print_r($levelContent);
    }

}

?>