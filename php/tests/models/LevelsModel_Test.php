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

        // print_r($levelsModel->getAllLevels(["levelNo"])->toArray());
        $levelsModel->getAllLevelIDsByLevelNumberAsArray();
        // foreach($levelsModel->getAllLevels(["lessons"]) as $doc)
        //     print_r($doc["levelNo"]);
    }

    public function test_getLevelContent() {
        $levelsModel = new LevelsModel();
        $levelContent = $levelsModel->getLevelContent("5bd353af514fae320cf656e6");
    
        $expectedLessons = [
            "lessons" => [
                [
                    "word" => [
                        "text" => "benz",
                        "wordSegments" => [
                            "ben",
                            "z"
                        ],
                        "imagePath" => "SIT5948202628029344863.jpg",
                        "phoneticPath" => "SIT3329441938150707703.mp3"
                    ]
                ],
                [
                    "word" => [
                        "text" => "bend",
                        "wordSegments" => [
                            "ben",
                            "d"
                        ],
                        "imagePath" => "SIT6599061268566238515.jpg",
                        "phoneticPath" => "SIT65134024025895118.mp3"
                    ]
                ]
            ]
        ];

        $expectedCheckpoint = [
            "checkPoint" => [
                "wordImagePath" => "SIT1653829229108815134.jpeg",
                "testWord" => "dice",
                "incompleteTestWord" => "d_ce"
            ]
        ];

        // print_r($expectedLessons + $expectedCheckpoint);

        // print_r($levelContent[0]["lessons"]->jsonSerialize());

        // print_r($levelContent);
    }

    public function test_getNextId() {
        $levelsModel = new LevelsModel();


        print_r($levelsModel->getNextId("5bd59a9e514fae03148535b1")["_id"]->__toString());
    }

}

?>