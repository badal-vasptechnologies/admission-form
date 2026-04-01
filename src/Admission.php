<?php
namespace Badal\Admission;

class Admission {
    private $api;

    public function __construct($config) {
        $this->api = new ApiClient($config['api_url']);
    }

    public function render() {
        include __DIR__ . '/../templates/form.php';
        include __DIR__ . '/../templates/modal.php';
    }
}
