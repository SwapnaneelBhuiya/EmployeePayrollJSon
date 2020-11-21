let empList;
window.addEventListener('DOMContentLoaded', (event) => {
    empList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empList.length;
    createInnerHtml();
    // localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}


const createInnerHtml = () => {
    let innerHtml='';
    if(empList.length==0)return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
    "<th>Salary</th><th>Start Date</th><th>Note</th>";
  if(empList.length>0) innerHtml = ` ${headerHtml}`;
  for (const employee of empList) {
      innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" src="${employee._profilePic}" alt = ""></td>
        <td>${employee._name}</td>
        <td>${employee._gender}</td>
        <td>${getDeptHtml(employee._department)}</td>
        <td>${employee._salary}</td>
        <td>${stringifyDate(employee._startDate)}</td>
        <td>
        <img name="${employee._id}" onclick="remove(this)" alt="delete" 
                src="/assets/assets/icons/delete-black-18dp.svg">
        <img name="${employee._id}" onclick="update(this)" alt="edit" 
                src="/assets/assets/icons/create-black-18dp.svg">
        </td>
      </tr>`;
  }
    document.querySelector('#table-display').innerHTML = innerHtml;
}  
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            "_name": "Swap Bhu",
            "_gender": "Male",
            "_department": [
                "Engineering"
            ],
            "_salary": "450000",
            "_startDate": "16 Dec 2018",
            "_note": "",
            "_profile": "/assets/assets/profile-images/Ellipse -2.png"
        },
        {
            "_name": "Sourav Das",
            "_gender": "Male",
            "_department": [
                "Sales", "Marketing"
            ],
            "_salary": "500000",
            "_startDate": "19 Sept 2020",
            "_note": "",
            "_profile": "/assets/assets/profile-images/Ellipse -1.png"
        }
    ]
    return empPayrollListLocal;
}
const getDeptHtml = (departmentList) => {
    let deptHtml = ``;
    for (const dept of departmentList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
} 