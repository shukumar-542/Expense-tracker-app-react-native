import { createContext, useReducer } from "react";

const dummyExpenses = [
    {
        id : "e1",
        description:  ' A Pair of shoes',
        amount : 69.99,
        date : new Date("2025-06-05") 
    },
    {
        id : "e2",
        description:  ' A Pair of trousers',
        amount : 66.99,
        date : new Date("2025-06-05") 
    },
    {
        id : "e3",
        description:  ' Some Bananas',
        amount : 59.99,
        date : new Date("2025-06-04") 
    },
    {
        id : "e4",
        description:  'Some Book',
        amount : 59.99,
        date : new Date("2025-12-12") 
    },
    {
        id : "e5",
        description:  'Some Books',
        amount : 59.99,
        date : new Date("2025-12-15") 
    },
    {
        id : "e6",
        description:  'Some Mobile',
        amount : 59.99,
        date : new Date("2025-13-15") 
    },
    {
        id : "e7",
        description:  'Some Books',
        amount : 59.99,
        date : new Date("2025-12-15") 
    },
    {
        id : "e8",
        description:  'Some Books',
        amount : 59.99,
        date : new Date("2025-12-15") 
    },
    {
        id : "e9",
        description:  'Some Books',
        amount : 59.99,
        date : new Date("2025-12-15") 
    },
]

export const ExpensesContext = createContext({
    expenses : [],
    addExpenses : ({descriptions , amount , date })=>{},
    deleteExpenses : (id)=>{},
    updateExpenses : (id,{descriptions , amount , date })=>{}
});

function expensesReducer (state , action){
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload , id : id} ,...state]
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id)  
            const updatableExpense = state[updatableExpenseIndex];
            const updateItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses  =[...state]
            updatedExpenses[updatableExpenseIndex] = updateItem
            return updatedExpenses

        case "DELETE" :
            return state.filter((expense)=> expense.id !== action.payload)
    
        default:
            return state;
    }
}

function ExpenseContextProvider ({children}){
    const [expensesState , dispatch] = useReducer(expensesReducer , dummyExpenses);

    const value = {
        expenses : expensesState,
        addExpense : addExpenses ,
        deleteExpense :  deleteExpense,
        updateExpense :  updateExpense
    }

    function addExpenses (expenseData){
        dispatch({type : "ADD" , payload : expenseData})
    }
    function deleteExpense(id){
        dispatch({type : 'DELETE' , payload : id})
    }
    function updateExpense({id , expensesData }){
        dispatch({type : "UPDATE" , payload : {id : id , data : expensesData}})
    }


    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpenseContextProvider;

