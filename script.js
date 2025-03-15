document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("student-form");
    const tableBody = document.getElementById("table-body");

    // Load students from local storage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function renderTable() {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Save to local storage
        localStorage.setItem("students", JSON.stringify(students));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const student = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            course: document.getElementById("course").value
        };

        students.push(student);
        renderTable();
        form.reset();
    });

    window.deleteStudent = function (index) {
        students.splice(index, 1);
        renderTable();
    };

    window.editStudent = function (index) {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("phone").value = student.phone;
        document.getElementById("course").value = student.course;

        deleteStudent(index);
    };

    renderTable();
});
