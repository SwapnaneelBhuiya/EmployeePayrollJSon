class EmployeePayrollData {

    // constructor(...params) {
    //     this.name = params[0];
    //     this.salary = params[1];
    //     this.gender = params[2];
    //     this.startDate = params[3];
    //     this.department = params[4];
    // }
    get id(){return this._id;}
    set id(id){
        this._id=id;
    }
    get profilePic(){return this._profilrPic;}
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        //let nameRegex = RegExp('[a-zA-z]+\s[a-zA-z]+\s[a-zA-z]+');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Incorrect name";
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        let salaryRegex = RegExp('^[1-9]{1}[0-9]*$');
        if (salaryRegex.test(salary))
            this._salary = salary;
        else throw "Salary should be non zero positive number";
    }
    get note(){
        return this._notes;
    }
    set note(notes){
        this._note=notes;
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        if (gender != undefined) {
            let genderRegex = RegExp('^(male|female)$');
            if (genderRegex.test(gender)) {
                this._gender = gender;
            } else {
                throw "Gender incorrect";
            }
        }
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate != undefined) {
            if (startDate <= new Date()) {
                const options = { year: "numeric", month: "long", day: "numeric" };
                const employeeDate = startDate.toLocaleDateString("en-US", options);
                this._startDate = employeeDate;
            }
            else throw "Select valid date!";
        }
    }
    toString() {
        return "Id: "+ this.id+ " Name: " + this.name + " Salary: " + this.salary +"Profile pic: "+this.profilePic  + " Gender: " + this.gender + " Start Date: " + this.startDate + " Department: " + this.department;
    }
}


const day = document.querySelector('#day');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const dateError = document.querySelector('.date-error');
[day, month, year].forEach(item => item.addEventListener('input', function () {
    if (month.value == 1) {
        if (isLeapYear(year.value)) {
            if (day.value > 29) {
                dateError.textContent = "Invalid Date!";
            } else dateError.textContent = "";
        } else {
            if (day.value > 28) {
                dateError.textContent = "Invalid Date!";
            } else dateError.textContent = "";
        }
    }
    if (month.value == 3 || month.value == 5 || month.value == 8 || month.value == 10) {
        if (day.value > 30) {
            dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
    }
}));
function save() {
    try{
        let employeePayrollData=createPayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e){
        return;
    }
}
const createPayroll=(){
    let employeePayrollData=new EmployeePayrollData();
    try{
        employeePayrollData.name=document.querySelector('#name');
    }
    catch(e){
        setTextValue('.text-error',e);
    }
    try {
        employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
        employeePayrollData.salary = document.querySelector('#salary').value;
        employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
        employeePayrollData.note=document.querySelector('#note');
        employeePayrollData.department=getSelectedValues('[name=department]');
        let date=document.querySelector('#day')+" "+document.querySelector('#month')+" "+document.querySelector('#year');
        employeePayrollData.startDate=Date.parse(date);
        alert(employeePayrollData.toString);
    } catch (error) {
        alert(error);
    }
}
const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const isLeapYear = (year) => {
    let result = false;
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                result = true;
            }
        } else {
            result = true;
        }
    }
    return result;
} 
window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        }
        catch(e){textError.textContent=e;}
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
    output.textContent = salary.value;
    });
});
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
    employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));

}

const reset= () => {
    setValue('#name','');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department');
    unsetSelectedValues('[name=profile]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','0');
    setValue('#year','2020');

}
const unsetSelectedValues=(propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{item.checked=false});
}
const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}