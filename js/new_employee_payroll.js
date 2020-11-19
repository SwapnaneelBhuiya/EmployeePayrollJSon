const sal=document.querySelector('#salary');
const salAmt=document.querySelector('.salary-output');
salAmt.textContent=sal.Value;
sal.addEventListener('input',function(){
    salAmt.textContent=sal.Value;
});
class EmployeePayrollData {

    constructor(...params){
        this.name=params[0];
        this.salary=params[1];
        this.gender=params[2];
        this.startDate=params[3];
        this.department=params[4];
    }
    get name() { return this._name; }
    set name(name) { 
        let regName=RegExp('^[A-Z]{1}[a-z]{3,}$');
        if(regName.test(name)){
        this._name = name;
    } 
    else throw 'Incorrect name';
}

    get salary(){return this._salary;}
    set salary(salary){
        if(salary>0){
            this._salary=salary;
        }
        else throw 'Incorrect salary';
    }
    get gender(){return this._gender;}
    set gender(gender){
        if(gender=='Female'||gender=='Male'){
            this._gender=gender;
        }
        else throw 'Incorrect gender';
    }
    get startDate(){return this._startDate;}
    set startDate(startDate){
        if(startDate<new Date()){
            this._startDate=startDate;
        }
        else throw 'Sorry, Future Date';
    }
   

    toString() {
        const options={year: 'numeric', month: 'numeric', day:'numeric'};
        const empDate= this.startDate===undefined?"undefined":this.startDate.toLocaleDateString("en-US",options);
        return '\nName: ' + this.name + ' salary: ' + this.salary+ ' gender: '+ this.gender+' startDate: '+ empDate+ ' dept: '+this.department;
    }

}
function save(){
    var name=document.querySelector('#name').value;
    var gender=document.querySelector('input[type=radio][name=gender]:checked').value;
    var dept=document.querySelector('input[type=checkbox][name=department]:checked').value;
    var salary=document.querySelector('#salary').value;
    let employeePayrollData= new EmployeePayrollData(name,salary,gender,new Date(),dept);
    alert(employeePayrollData.name);
}
