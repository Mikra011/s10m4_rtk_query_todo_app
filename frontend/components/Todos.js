import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowCompletedTodos } from '../state/todosSlice'
import { useGetTodosQuery, useToggleTodoMutation } from '../state/todosApi'


const StyledTodo = styled.li`
  text-decoration: ${pr => pr.$complete ? 'line-through' : 'initial'};
  cursor: pointer;
`

export default function Todo() {
  // RTK query
  const { data: todos, isLoading: todoIsLoading, isFetching: todoIsRefreshing  } = useGetTodosQuery()
  const [toggleTodo, { error: toggleError, isLoading: todoIsToggling }] = useToggleTodoMutation()
  // redux
  const showCompletedTodos = useSelector(st => st.todosState.showCompletedTodos)
  const dispatch = useDispatch()
  return (
    <div id="todos">
      <div className="error">{toggleError && toggleError.data.message}</div>
      <h3>Todos {todoIsToggling || todoIsRefreshing && 'Being updated...' }</h3>
      <ul>
        {
          todoIsLoading ? 'Todo is loading...' : 
          todos?.filter(todo => {
            return showCompletedTodos || !todo.complete
          })
            .map(todo => {
              const onToggle = () => {
                toggleTodo({ id: todo.id, todo: { complete: !todo.complete } })
              }
              return (
                <StyledTodo
                  onClick={onToggle}
                  $complete={todo.complete}
                  key={todo.id}>
                  <span>{todo.label}{todo.complete && ' ✔️'}</span>
                </StyledTodo>
              )
            })
        }
      </ul>
      <button onClick={() => dispatch(toggleShowCompletedTodos())}>
        {showCompletedTodos ? 'Hide' : 'Show'} completed todos
      </button>
    </div>
  )
}
