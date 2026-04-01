<div id="admissionModal" class="modal">
    <div class="modal-content">

        <!-- Header -->
		<div class="modal-header">
		    <span class="modal-title">
		        CLASS <span id="modalClassName">UKG</span> REGISTRATION
		    </span>

		    <span class="close-btn" id="closeModal">&times;</span>
		</div>

        <!-- Body -->
        <div class="modal-body">

            <div class="form-grid">

                <!-- Row 1 -->
                <div class="form-group">
                    <label>Whatsapp No</label>
                    <input type="text" name="whatsapp" required>
                    <div class="error-text"></div>
                </div>

                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" required>
                    <div class="error-text"></div>
                </div>

                <div class="form-group">
                    <label>Student's Name (As in birth certificate)</label>
                    <input type="text" name="student_name" required>
                    <div class="error-text"></div>
                </div>

                <!-- Row 2 -->
                <div class="form-group">
                    <label>Student's DOB</label>
                    <input type="date" name="dob" required>
                    <div class="error-text"></div>
                </div>

                <div class="form-group">
                    <label>Last Class Studied</label>
                    <input type="text" name="last_class">
                    <div class="error-text"></div>
                </div>

                <div class="form-group">
                    <label>Current School Name</label>
                    <input type="text" name="school">
                    <div class="error-text"></div>
                </div>

                <!-- Row 3 -->
                <div class="form-group">
                    <label>Father's Name</label>
                    <input type="text" name="father">
                    <div class="error-text"></div>
                </div>

                <div class="form-group">
                    <label>Mother's Name</label>
                    <input type="text" name="mother">
                    <div class="error-text"></div>
                </div>

                <div class="form-group">
                    <label>Admission Year</label>
                    <input type="text" name="year" readonly id="modalYear">
                    <div class="error-text"></div>
                </div>

                <!-- Full -->
                <div class="form-group full">
                    <label>Any Remarks</label>
                    <textarea name="remarks"></textarea>
                    <div class="error-text"></div>
                </div>

                <!-- Submit -->
                <div class="form-group full">
                    <button class="submit-btn">Submit</button>
                </div>

            </div>

        </div>
    </div>
</div>