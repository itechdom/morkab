import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import superagent from 'superagent';
const HOST = "http://localhost:8082";

export class User {
  name;
  email;
  page = 1;
  itemsPerPage=10;
  originalExpenseList = [];
  @observable dailyBudget;
  @observable dailyBudgetEditable = false;
  @observable expenseList = [];
  @observable expenseEditable=false;
  @observable deletedExpense = {};
  @observable editedExpense = {};
  @observable categoryList=[];
  @observable selectedRoute = 0;
  @observable selectedDate = Date.now();
  @observable filesAccepted = [];
  pendingRequestCount = 0;
  constructor(name,email,dailyBudget,dailyBudgetEditable,expenseEditable,categoryList,selectedRoute,selectedDate,filesAccepted) {
    this.name = name;
    this.email = email;
    this.dailyBudget = dailyBudget;
    this.dailyBudgetEditable = dailyBudgetEditable;
    this.expenseEditable = expenseEditable;
    this.categoryList = categoryList;
    this.selectedRoute = selectedRoute;
    this.selectedDate = selectedDate;
    this.filesAccepted = filesAccepted;
    this.page=1;
    this.expensePage=1;
    this.deletedExpense = {};
  }

  @computed get filterByDate(){
    return this.expenseList.filter(
      expense =>  expense.date === this.selectedDate
    );
  }

  @action uploadCSV() {
    this.pendingRequestCount++;
    let req = superagent.post(`${HOST}/api/v1/expenses/upload/csv`);
    this.filesAccepted.map((file) => {
      req.attach(file.name, file);
    });
    req.end(action("uploadCSV-callback", (error, results) => {
      if (error)
      console.error(error);
      else {
        const data = JSON.parse(results.text);
        console.log(data);
        this.pendingRequestCount--;
      }
    }));
  }

  @action exportExpensesCSV(){
    window.open(`${HOST}/api/v1/expenses/export/csv`,'_blank');
  }

  @action getExpenses(){
    this.pendingRequestCount++;
    let req = superagent.get(`${HOST}/api/v1/expenses`);
    req.end(action("getExpenses-callback",(err,res)=>{
      if(err){
        console.log("err: ",err);
      }
      let newExpenses = JSON.parse(res.text);
      this.originalExpenseList = newExpenses;
      this.expenseList.push(...newExpenses.slice(0,10));
    }));
  }

  @action updateExpense(expense) {
    this.pendingRequestCount++;
    let req = superagent.put(`${HOST}/api/v1/expenses`)
    .send(expense);
    req.end(action("updateExpense-callback", (error, results) => {
      if (error){
        console.error(error);
      }
      else {
        console.log(results);
        this.pendingRequestCount--;
      }
    }));
  }

  @action deleteExpense(expense) {
    this.pendingRequestCount++;
    let req = superagent.delete(`${HOST}/api/v1/expenses`)
    .send(expense);
    let removed = this.expenseList.remove(expense);
    req.end(action("deleteExpense-callback", (error, results) => {
      if (error){
        console.error(error);
        this.expenseList.push(expense);
      }
      else {
        console.log(results);
        this.pendingRequestCount--;
      }
    }));
  }

  @action getExpensesByPage(){
    this.expensePage++;
    let currentPage = this.expensePage * this.itemsPerPage;
    let prevPage = (this.expensePage - 1) * this.itemsPerPage;
    let nextArr = this.originalExpenseList.slice(prevPage,currentPage);
    this.expenseList.push(...nextArr);
  }

}

export class Expense {
  id;
  date;
  title;
  amount;
  category;
  @observable tags;
  constructor(date,amount,category,title){
    this.id = uuidV4();
    this.date = date;
    this.amount = amount;
    this.category = category;
    this.title = title;
  }
}

export class Category {
  title;
  icon;
  constructor(title,icon){
    this.title = title;
    this.icon = icon;
  }
}

export class Reward {
  amount;
  rewardDate;
}
