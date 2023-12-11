// SELECTING Lavozim turini tanlang elements ////////////////////

const Ismi = document.getElementById("Ismi");
const Familyasi = document.getElementById("Familyasi");
const group = document.getElementById("group");
const uylanganmi = document.getElementById("uylanganmi");

const IsmiEdit = document.getElementById("IsmiEdit");
const FamilyasiEdit = document.getElementById("FamilyasiEdit");
const groupEdit = document.getElementById("groupEdit");
const doesWorkEdit = document.getElementById("doesWorkEdit");

const search = document.getElementById("search");
const filterSelect = document.getElementById("filter-select");
const studentsList = document.getElementById("students-list");
const btnAddStudent = document.getElementById("btn-add-student");
const btnEditStudent = document.getElementById("btn-edit-student");
const modal = document.getElementById("modal-select");

let students = JSON.parse(localStorage.getItem("students")) || [];

// DISPLAY Lavozim turini tanlang STUDENTS  //////////////
function displayStudents(students) {
  let str = "";
  students.map((student, i) => {
    str += `
    <tr>
      <td>${i + 1}</td>
      <td>${student.Ismi}</td>
      <td>${student.Familya}</td>
      <td>${student.Manzil}</td>
      <td>${(student.Tugilgan, kuni)}</td>
      <td>${student.Lavozimi}</td>
      <td>${student.Maoshi}</td>
      <td>${student.Uylanganmi ? "Ha" : "Yo'q"}</td>
      <td>
        <button class="btn btn-warning btn-sm" data-bs-toggle="modal"
        data-bs-target="#editModal" onclick="editStudent(${
          student.id
        })">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${
          student.id
        })">Delete</button>
      </td>
    </tr>
    `;
  });
  studentsList.innerHTML = str;
}
displayStudents(students);

// ADD NEW STUDENT   ////////////////
function addStudent() {
  const student = {
    id: students.length + 1,
    Ismi: Ismi.value,
    Familyasi: Familyasi.value,
    group: group.value,
    uylanganmi: uylanganmi.checked,
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  location.reload();

  ss.value = "";
  Familyasi.value = "";
  group.value = "REN32ACT ";
  uylanganmi.checked = false;
}
btnAddStudent.addEventListener("click", addStudent);

// DELETE STUDENT   //////////////////
function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    let newStudents = students.filter((std) => std.id !== id);

    localStorage.setItem("students", JSON.stringify(newStudents));
    location.reload();
  }
}

// EDIT STUDENT  //////////////////
let studentEditing = {};
function editStudent(id) {
  let student = students.find((student) => student.id === id);
  studentEditing = student;

  IsmiEdit.value = student.Ismi;
  FamilyasiEdit.value = student.Familyasi;
  groupEdit.value = student.group;
  doesWorkEdit.checked = student.doesWork;
}

// UPDATE STUDENT //////////////////
function updateStudent() {
  const student = {
    id: studentEditing.id,
    Ismi: IsmiEdit.value,
    Familyasi: FamilyasiEdit.value,
    group: groupEdit.value,
    doesWork: doesWorkEdit.checked,
  };

  let newStudents = students.map((st) => (st.id === student.id ? student : st));

  localStorage.setItem("students", JSON.stringify(newStudents));
  location.reload();
}
btnEditStudent.addEventListener("click", updateStudent);

// FILTER STUDENTS ///////////////////
filterSelect.addEventListener("change", function (e) {
  let grp = e.target.value;
  let newStudentsList = [];
  if (grp === "Lavozim turini tanlang") {
    newStudentsList = students;
  } else {
    newStudentsList = students.filter((st) => st.group === grp);
  }
  displayStudents(newStudentsList);
});

// SEARCH STUDENTS //////////////////
search.addEventListener("input", function (e) {
  let text = e.target.value;
  let newSearchedList = [];
  if (text === "") {
    newSearchedList = students;
  } else {
    newSearchedList = students.filter(
      (st) =>
        st.Ismi.toLowerCase().includes(text.toLowerCase()) ||
        st.Familyasi.toLowerCase().includes(text.toLowerCase())
    );
  }
  displayStudents(newSearchedList);
});
