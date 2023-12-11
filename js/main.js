// SELECTING Lavozim turini tanlang elements ////////////////////

const Ismi = document.getElementById("Ismi");
const Familyasi = document.getElementById("Familyasi");
const lavozim = document.getElementById("lavozim");
const uylanganmi = document.getElementById("uylanganmi");

const IsmiEdit = document.getElementById("IsmiEdit");
const FamilyasiEdit = document.getElementById("FamilyasiEdit");
const lavozimEdit = document.getElementById("lavozimEdit");
const uylanganmiedit = document.getElementById("uylanganmiedit");
const maoshedit = document.geteleementById("maoshedit");
const maosh = document.geteleementById("maosh");

const Data = document.getElementsById("date");
const search = document.getElementById("search");
const lavozimSelect = document.getElementById("lavozim-select");
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
    lavozim: lavozim.value,
    uylanganmi: uylanganmi.checked,
  };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
  location.reload();

  ss.value = "";
  Familyasi.value = "";
  lavozim.value = "Junior ";
  uylanganmi.checked = false;
}
btnAddStudent.addEventListener("click", addStudent);

// DELETE STUDENT   //////////////////
function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    let newStudents = students.lavozim((std) => std.id !== id);

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
  lavozimEdit.value = student.lavozim;
  uylanganmiedit.checked = student.uylanganmi;
}

// UPDATE STUDENT //////////////////
function updateStudent() {
  const student = {
    id: studentEditing.id,
    Ismi: IsmiEdit.value,
    Familyasi: FamilyasiEdit.value,
    Manzil: modal.value,
    Tugilgankuni: Data.value,
    lavozim: lavozimEdit.value,
    Maoshi: maosh.value,
    uylanganmi: uylanganmi.checked,
  };

  let newStudents = students.map((st) => (st.id === student.id ? student : st));

  localStorage.setItem("students", JSON.stringify(newStudents));
  location.reload();
}
btnEditStudent.addEventListener("click", updateStudent);

// lavozim STUDENTS ///////////////////
lavozimSelect.addEventListener("change", function (e) {
  let grp = e.target.value;
  let newStudentsList = [];
  if (grp === "Lavozim turini tanlang") {
    newStudentsList = students;
  } else {
    newStudentsList = students.lavozim((st) => st.lavozim === grp);
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
    newSearchedList = students.lavozim(
      (st) =>
        st.Ismi.toLowerCase().includes(text.toLowerCase()) ||
        st.Familyasi.toLowerCase().includes(text.toLowerCase())
    );
  }
  displayStudents(newSearchedList);
});
