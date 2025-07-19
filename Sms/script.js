let students = [];
let filteredStudents = [];

window.onload = async function () {
  const res = await fetch('./students.json');
  students = await res.json();
  filteredStudents = students;
  displayTable(filteredStudents);
};

const displayTable = (data, container = 'studentTable') => {
  const tbody = document.querySelector(`#${container} tbody`);
  tbody.innerHTML = '';

  data.forEach((student) => {
    const tr = document.createElement('tr');

    const fullName = `${student.first_name} ${student.last_name}`;
    const nameCell = `<td> ${fullName}</td>`;
    const passingStatus = student.passing ? "Passing" : "Failed";

    tr.innerHTML = `
      <td>${student.id}</td>
      ${nameCell}
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${passingStatus}</td>
      <td>${student.email}</td>
    `;
    tbody.appendChild(tr);
  });
};

document.getElementById('search').addEventListener('input', handleSearch);
document.getElementById('searchBtn').addEventListener('click', handleSearch);

function handleSearch() {
  const searchText = document.getElementById('search').value.toLowerCase();
  filteredStudents = students.filter((s) =>
    s.first_name.toLowerCase().includes(searchText) ||
    s.last_name.toLowerCase().includes(searchText) ||
    s.email.toLowerCase().includes(searchText)
  );
  displayTable(filteredStudents);
}

function sortAZ() {
  filteredStudents.sort((a, b) => {
    const nameA = a.first_name + a.last_name;
    const nameB = b.first_name + b.last_name;
    return nameA.localeCompare(nameB);
  });
  displayTable(filteredStudents);
}

function sortZA() {
  filteredStudents.sort((a, b) => {
    const nameA = a.first_name + a.last_name;
    const nameB = b.first_name + b.last_name;
    return nameB.localeCompare(nameA);
  });
  displayTable(filteredStudents);
}

function sortByMarks() {
  filteredStudents.sort((a, b) => a.marks - b.marks);
  displayTable(filteredStudents);
}

function sortByPassing() {
  const passing = students.filter((s) => s.passing);
  displayTable(passing);
}

function sortByClass() {
  filteredStudents.sort((a, b) => a.class - b.class);
  displayTable(filteredStudents);
}

function sortByGender() {
  const males = students.filter((s) => s.gender === 'Male');
  const females = students.filter((s) => s.gender === 'Female');

  const genderDiv = document.getElementById('genderTables');
  genderDiv.innerHTML = `
    <h2>Female Students</h2>
    <table id="femaleTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Class</th>
          <th>Marks</th>
          <th>Passing</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <h2>Male Students</h2>
    <table id="maleTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Class</th>
          <th>Marks</th>
          <th>Passing</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  displayTable(females, 'femaleTable');
  displayTable(males, 'maleTable');
}
