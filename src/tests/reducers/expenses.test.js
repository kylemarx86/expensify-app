import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// should add expense
test('should add an expense', () => {
    const expense = {
        id: '5',
        description: 'Car',
        note: '',
        amount: 2500000,
        createdAt: 0
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

// should edit an expense
test('should edit expense by id', () => {
    const note = 'Discover';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: {
            note
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[2].note).toBe(note);
});

// should not edit expense if id not found
test('should not edit expense if id not found', () => {
    const updates = {
        note: 'candy'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});