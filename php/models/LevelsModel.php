<?php

class LevelsModel {
    
    private $mongoClient;
    private $levelsCollection;

    public function __construct() {
        require 'MongoClient.php';
        $this->mongoClient = $mongoClient;
        $this->levelsCollection = $mongoClient->spellitdb->level;
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
        $levelContent = $this->levelsCollection->findOne(["_id" => $objectId], [
            "projection" => ["lessons" => 1, "checkPoint" => 1],
            "typeMap" => ["root" => "array", "document" => "array", "array" => "array"]
        ]);
        
        // $levelContent = [];
        // foreach($cursor as $doc) {
        //     $levelContent[] = $doc["lessons"];
        // }

        return isset($levelContent) ? $levelContent : "Not found";
    }

    public function getNextId($curId) {
        $objectId = new MongoDB\BSON\ObjectId($curId);

        $nextLevel = $this->levelsCollection->findOne(
            ["_id" => ['$gt' => $objectId]],
            [
                "projection" => ["_id"],
                "typeMap" => ["root" => "array", "document" => "array", "array" => "array"]
            ]
        );
        
        return $nextLevel;
    }

}

?>