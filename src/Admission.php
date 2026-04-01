<?php
namespace Badal\Admission;

class Admission {
	private $apiBaseUrl;

	public function __construct($config)
	{
	    $this->apiBaseUrl = $config['api_url'];
	}

	public function render()
	{
	    $apiUrl = $this->apiBaseUrl ?? '';
		echo '<div class="admission-wrapper">';

		include __DIR__ . '/../templates/form.php';
		include __DIR__ . '/../templates/modal.php';

		echo '</div>';
	}
}
