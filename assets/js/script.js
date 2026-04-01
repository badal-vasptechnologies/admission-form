document.addEventListener("DOMContentLoaded", function () {

    const BASE_URL = window.ADMISSION_CONFIG.apiBaseUrl;

    const yearSelect = document.getElementById("academic_year");
    const classSelect = document.getElementById("class");
    const statusBox = document.getElementById("admissionStatus");

    let sessionsData = [];

    fetch(BASE_URL + "/admission-data.php?action=init")
        .then(res => res.json())
        .then(data => {

            sessionsData = data.sessions;

            yearSelect.innerHTML = "";

            sessionsData.forEach((session, index) => {
                yearSelect.innerHTML += `
                    <option value="${session.id}" ${index === 0 ? "selected" : ""}>
                        ${session.name}
                    </option>`;
            });

            loadClasses(yearSelect.value);

        })
        .catch(err => console.error("API Error:", err));

    yearSelect.addEventListener("change", function () {
        loadClasses(this.value);
    });

    function loadClasses(sessionId) {

        let session = sessionsData.find(s => s.id == sessionId);

        classSelect.innerHTML = "";

        if (!session) return;

        session.classes.forEach((cls, index) => {
            classSelect.innerHTML += `
                <option value="${cls.id}" ${index === 0 ? "selected" : ""}>
                    ${cls.name}
                </option>`;
        });

        renderStatus(session.classes[0]);
    }

    classSelect.addEventListener("change", function () {

        let session = sessionsData.find(s => s.id == yearSelect.value);
        if (!session) return;

        let selectedClass = session.classes.find(c => c.id == this.value);
        if (!selectedClass) return;

        renderStatus(selectedClass);
    });

    function renderStatus(selectedClass) {

        const ASSET_URL = window.ADMISSION_CONFIG.assetUrl;

        if (selectedClass.open) {

            statusBox.innerHTML = `
                <div class="closed-box">
                    <p>Admission is Open</p>
                    <button class="btn btn-yes" id="openForm">Apply Now</button>
                </div>
            `;

        } else {

            statusBox.innerHTML = `
                <div class="closed-box">
                    <img src="${ASSET_URL}/images/sorry.png" width="100"/>
                    <p>Admission is closed</p>
                    <p>Do you want Register?</p>

                    <button class="btn btn-yes" id="openForm">YES</button>
                    <button class="btn btn-no">NO</button>
                </div>
            `;
        }

        attachModalEvent();
    }

    function attachModalEvent() {
        const btn = document.getElementById("openForm");
        const modal = document.getElementById("admissionModal");

        if (btn) {
            btn.onclick = () => {

                const selectedClassText = document.getElementById("class").selectedOptions[0].text;
                const selectedYearText = document.getElementById("academic_year").selectedOptions[0].text;

                document.getElementById("modalClassName").innerText = selectedClassText;
                document.getElementById("modalYear").value = selectedYearText;

                modal.style.display = "block";
            };
        }
    }

    document.getElementById("closeModal").onclick = function () {
        document.getElementById("admissionModal").style.display = "none";
    };

    document.querySelector(".submit-btn").addEventListener("click", function (e) {

	    e.preventDefault();

	    let isValid = true;

	    const form = document.querySelector("#admissionModal");

	    const requiredFields = form.querySelectorAll("input, textarea");

	    form.querySelectorAll(".error-text").forEach(el => el.innerText = "");
	    form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

	    requiredFields.forEach(field => {

	        if (field.hasAttribute("required") && field.value.trim() === "") {
	            isValid = false;
	            field.classList.add("error");

	            const errorBox = field.parentElement.querySelector(".error-text");
	            if (errorBox) errorBox.innerText = "This field is required";
	        }

	    });

	    if (!isValid) return;

	    const formData = {
	        whatsapp: form.querySelector("[name='whatsapp']").value,
	        email: form.querySelector("[name='email']").value,
	        student_name: form.querySelector("[name='student_name']").value,
	        dob: form.querySelector("[name='dob']").value,
	        last_class: form.querySelector("[name='last_class']").value,
	        school: form.querySelector("[name='school']").value,
	        father: form.querySelector("[name='father']").value,
	        mother: form.querySelector("[name='mother']").value,
	        year: form.querySelector("[name='year']").value,
	        remarks: form.querySelector("[name='remarks']").value,
	        class_name: document.getElementById("modalClassName").innerText
	    };

	    fetch(BASE_URL + "/submit-admission.php", {
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify(formData)
		})
		.then(res => res.text())
		.then(text => {

		    try {
		        let res = JSON.parse(text);

		        if (res.success) {
		            alert("✅ Application ID: " + (res.application_id || "TEST"));
		        } else {
		            alert(res.message || "Failed ❌");
		        }

		    } catch (e) {
		        console.error("Invalid JSON:", text);
		        alert("Server returned invalid response ❌");
		    }

		});

	});

    document.querySelectorAll("input, textarea").forEach(field => {
        field.addEventListener("input", function () {
            this.classList.remove("error");
            let errorBox = this.parentElement.querySelector(".error-text");
            if (errorBox) errorBox.innerText = "";
        });
    });

});