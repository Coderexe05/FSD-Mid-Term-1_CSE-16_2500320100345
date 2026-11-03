1. POST /api/students – Adds a new student using ID, name, email, course and age after checking mandatory fields and duplicate IDs.

2. GET /api/students – Retrieves and displays all student records with status 200 OK.

3. GET /api/students/:id – Searches for a student by ID and returns details or 404 Not Found if unavailable.

4. PUT /api/students/:id – Updates the provided details of an existing student or returns 404 Not Found if unavailable.

5. DELETE /api/students/:id – Deletes a student record by ID and returns a success message or 404 Not Found if unavailable.