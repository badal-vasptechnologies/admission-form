# Admission Form Package

## Usage

composer install

require 'vendor/autoload.php';

use Badal\Admission\Admission;

$admission = new Admission([
    'api_url' => 'https://your-api.com'
]);

$admission->render();
# admission-form
# admission-form
