# 📦 Admission Form Package

Reusable Online Admission Form for Core PHP Projects.

---

## 🚀 Installation

```bash
composer require badal/admission-form
```

---

## ⚙️ Usage

```php
require 'vendor/autoload.php';

use Badal\Admission\Admission;

$admission = new Admission([
    'api_url' => 'http://localhost/your-project/api'
]);

$admission->render();
```

---

## 📁 Required Setup (IMPORTANT)

You must create the following structure in your project:

```
your-project/
│── api/
│    ├── admission-data.php
│    └── submit-admission.php
│
│── storage/
│    └── admissions.txt
```

---

## 🔌 API: admission-data.php

This API provides sessions and classes.

```php
<?php
header('Content-Type: application/json');

$action = $_GET['action'] ?? 'init';

if ($action === 'init') {

    echo json_encode([
        "sessions" => [
            [
                "id" => 1,
                "name" => "2026-2027",
                "classes" => [
                    ["id" => 1, "name" => "UKG", "open" => true],
                    ["id" => 2, "name" => "LKG", "open" => false]
                ]
            ]
        ]
    ]);

    exit;
}
```

---

## 📩 API: submit-admission.php

Handles form submission, saving data, and sending email.

```php
<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

if (
    empty($data['student_name']) ||
    empty($data['whatsapp']) ||
    empty($data['email'])
) {
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
    exit;
}

// Generate Application ID
$appId = "APP-" . date("Y") . "-" . rand(1000, 9999);

// Prepare Data
$record = [
    "application_id" => $appId,
    "student_name" => $data['student_name'],
    "email" => $data['email'],
    "created_at" => date("Y-m-d H:i:s")
];

// Storage Path
$dir = __DIR__ . "/../storage";
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$file = $dir . "/admissions.txt";

// Save
file_put_contents($file, json_encode($record) . PHP_EOL, FILE_APPEND);

// Send Email
@mail($data['email'], "Admission Submitted", "Your ID: $appId");

// Response
echo json_encode([
    "success" => true,
    "application_id" => $appId
]);
```

---

## 🔐 Permissions

Make sure storage directory is writable:

```bash
chmod -R 777 storage/
```

---

## 🎯 Features

* Dynamic Session & Class Loading
* Admission Open/Closed Logic
* Modal-based Form UI
* API-based Submission
* Application ID Generation
* Email Notification

---

## ⚠️ Important Notes

* Do NOT store data inside `vendor/`
* APIs must be created in your project
* This package is UI + JS only

---

## 🚀 Future Improvements

* MySQL Integration
* Admin Panel
* PDF Generation
* SMTP Email (PHPMailer)

---

## 📄 License

MIT License
