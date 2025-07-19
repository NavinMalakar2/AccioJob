let employees = [];
    let nextId = 1;

    function addEmployee() {
      const name = document.getElementById("name").value.trim();
      const profession = document.getElementById("profession").value.trim();
      const age = document.getElementById("age").value.trim();
      const message = document.getElementById("message");

      if (!name || !profession || !age) {
        message.innerText = "Error: Please fill all the fields.";
        message.className = "message error";
        return;
      }

      const newEmployee = {
        id: nextId++,
        name,
        profession,
        age: parseInt(age)
      };

      employees.push(newEmployee);

      message.innerText = "Success: Employee added!";
      message.className = "message success";

      document.getElementById("name").value = "";
      document.getElementById("profession").value = "";
      document.getElementById("age").value = "";

      updateEmployeeList();
    }

    function updateEmployeeList() {
      const container = document.getElementById("employeeList");
      const empCount = document.getElementById("empCount");
      container.innerHTML = "";
      empCount.innerText = employees.length;

      employees.forEach(emp => {
        const div = document.createElement("div");
        div.className = "employee-card";
        div.innerHTML = `
          <div>
            <strong>${emp.name}</strong> (${emp.profession}) - Age: ${emp.age}
          </div>
          <button onclick="deleteEmployee(${emp.id})">Delete</button>
        `;
        container.appendChild(div);
      });
    }

    function deleteEmployee(id) {
      employees = employees.filter(emp => emp.id !== id);
      updateEmployeeList();
    }