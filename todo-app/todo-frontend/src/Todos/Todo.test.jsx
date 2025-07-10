import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Todo from './Todo'

describe('Todo Component', () => {
    const user = userEvent.setup()
    
    describe('When not done', () => {
        const todo = {
            text: 'Test Todo',
            done: false
        }

        let onClickDelete, onClickComplete

        beforeEach(() => {
            onClickDelete = vi.fn()
            onClickComplete = vi.fn()
            render(
                <Todo 
                    todo={todo} 
                    onClickComplete={onClickComplete} 
                    onClickDelete={onClickDelete}
                />
            )
        })

        test('renders todo text', () => {
            const todoText = screen.getByText(todo.text)
            expect(todoText).toBeDefined()
        })

        test('renders not done info', () => {
            const statusText = screen.getByText('This todo is not done')
            expect(statusText).toBeDefined()
        })
        
        test('delete button exists and can be clicked', async () => {
            const deleteButton = screen.getByText('Delete')
            expect(deleteButton).toBeDefined()
            await user.click(deleteButton)
            expect(onClickDelete.mock.calls).toHaveLength(1)
        })

        test('done button exists and can be clicked', async () => {
            const completeButton = screen.getByText('Set as done')
            expect(completeButton).toBeDefined()
            await user.click(completeButton)
            expect(onClickComplete.mock.calls).toHaveLength(1)
        })
    })

    describe('When done', () => {
        const todo = {
            text: 'Test Todo',
            done: true
        }

        let onClickDelete, onClickComplete

        beforeEach(() => {
            onClickDelete = vi.fn()
            onClickComplete = vi.fn()
            render(
                <Todo 
                    todo={todo} 
                    onClickComplete={onClickComplete} 
                    onClickDelete={onClickDelete}
                />
            )
        })

        test('renders todo text', () => {
            const todoText = screen.getByText(todo.text)
            expect(todoText).toBeDefined()
        })

        test('renders done info', () => {
            const statusText = screen.getByText('This todo is done')
            expect(statusText).toBeDefined()
        })
        
        test('delete button exists and can be clicked', async () => {
            const deleteButton = screen.getByText('Delete')
            expect(deleteButton).toBeDefined()
            await user.click(deleteButton)
            expect(onClickDelete.mock.calls).toHaveLength(1)
        })

        test('done button does not exist', () => {
            const completeButton = screen.queryByText('Set as done')
            expect(completeButton).toBeNull()
        })
    })

})
