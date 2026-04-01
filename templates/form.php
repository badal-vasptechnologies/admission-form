<?php
$baseUrl = dirname($_SERVER['SCRIPT_NAME']) . '/vendor/badal/admission-form/assets';
?>

<link rel="stylesheet" href="<?= $baseUrl ?>/css/style.css">

<div class="admission-box">

    <p class="warning">
    COMPLETING THE ADMISSION FORM DOES NOT AUTOMATICALLY SECURE ADMISSION.THE INTERACTION SESSION FOR APPLICANTS AND THEIR PARENTS WILL BE CONDUCTED ON THE DATE AND TIME SPECIFIED IN THE DOWNLOADED APPLICATION FORM. THE FINALIZED LIST OF ACCEPTED STUDENTS WILL BE RELEASED.
    </p>

    <div class="row">
        <select id="academic_year"></select>
        <select id="class"></select>
    </div>
    <div id="admissionStatus"></div>


</div>
<script src="<?= $baseUrl ?>/js/script.js"></script>
<script>
window.ADMISSION_CONFIG = {
    apiBaseUrl: "<?= $apiUrl ?>",
    assetUrl: "<?= $baseUrl ?>"
};
</script>
