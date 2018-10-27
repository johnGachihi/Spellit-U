<?php

class PhoneticsModel {

    private $phoneticsCollection;

    public function __construct() {
        require 'MongoClient.php';
        $this->mongoClient = $mongoClient;
        $this->phoneticsCollection = $mongoClient->test->phonetic;
    }

    public function getPhonetics($texts = []) {
        $filter = [];
        foreach($texts as $text) {
            $filter[] = ["text" => $text];
        }

        $cursor = $this->phoneticsCollection->find(
            ['$or' => $filter],
            ["typeMap" => ["root" => "array", "document" => "array", "array" => "array"]]
        );

        $response = [];
        foreach($cursor as $doc) {
            $response += [$doc["text"] => $doc["audioFileName"]];
        }

        return $response;
    }
}

?>