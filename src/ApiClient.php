<?php
namespace Badal\Admission;

class ApiClient {
    private $baseUrl;

    public function __construct($baseUrl) {
        $this->baseUrl = $baseUrl;
    }

    public function get($endpoint) {
        return json_decode(file_get_contents($this->baseUrl . $endpoint), true);
    }

    public function post($endpoint, $data) {
        $options = [
            "http" => [
                "header"  => "Content-type: application/json",
                "method"  => "POST",
                "content" => json_encode($data),
            ]
        ];
        $context = stream_context_create($options);
        return json_decode(file_get_contents($this->baseUrl . $endpoint, false, $context), true);
    }
}
