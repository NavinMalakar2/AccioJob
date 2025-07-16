/** @format */

let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

function PrintDeveloperbyMap() {
  //Write your code here , just console.log
   arr.map((ele)=>{
    if(ele.profession === "developer"){
    console.log(ele);
    }
  })
}

function PrintDeveloperbyForEach() {
  //Write your code here , just console.log
  arr.forEach((ele)=>{
    if(ele.profession ==="developer"){
      console.log(ele)
    }
    
  })
}

function addData() {
  //Write your code here, just console.log
  let newEmp =  { id: 4, name: "Susan", age: "20", profession: "intern" };
  arr.push(newEmp);
  console.log(arr)
}

function removeAdmin() {
  //Write your code here, just console.log
  let arrr = arr.filter(emp => emp.profession !== "admin");
  console.log(arrr);
}

function concatenateArray() {
  //Write your code here, just console.log
  const newEmployees = [
    { id: 5, name: "Tom", age: "21", profession: "developer" },
    { id: 6, name: "Harry", age: "22", profession: "manager" },
    { id: 7, name: "Emma", age: "23", profession: "intern" }
  ];
  let combined = arr.concat(newEmployees);
  console.log(combined);
}
