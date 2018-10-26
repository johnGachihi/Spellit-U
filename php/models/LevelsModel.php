<?php

class LevelsModel {
    
    private $mongoClient;
    private $levelsCollection;

    public function __construct() {
        require 'MongoClient.php';
        $this->mongoClient = $mongoClient;
        $this->levelsCollection = $mongoClient->test->level;
    }

    public function getAllLevels($fields = []) {
        $projection = array();
        foreach($fields as $field) {
            $projection[$field] = 1;
        }

        $cursor = $this->levelsCollection->find([], [
            "projection" => $projection
        ]);
        return $cursor;
    }

    public function getAllLevelIDsAsArray() {
        $cursor = $this->getAllLevels(["_id"]);
        $idArray = [];

        foreach($cursor as $doc) {
            $idArray[] = $doc['_id']->__toString();
        }

        return $idArray;
    }

    public function getAllLevelIDsByLevelNumberAsArray() {
        $cursor = $this->getAllLevels(["_id", "levelNo"]);
        $idArray = [];

        foreach($cursor as $doc) {
            $idArray += [$doc["_id"]->__toString() => $doc["levelNo"]];
        }

        return $idArray;
    }

    public function getLevelContent($levelId = "") {
        $objectId = new MongoDB\BSON\ObjectId($levelId);
        $cursor = $this->levelsCollection->find(["_id" => $objectId], [
            "projection" => ["lessons" => 1, "checkpoint" => 1]
        ]);
        return $cursor->toArray();
    }

}

?>