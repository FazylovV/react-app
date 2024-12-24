import React from 'react';
import styled, { css } from "styled-components"
import { TodoItemContainer } from './TodoItemContainer'
import { TodoItemCheckbox } from './TodoItemCheckbox';
import { useDeleteTodoItem } from '../../data/hooks/useData';
import { TodoItemPriority } from './TodoItemPriority';

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    width: 55%;
    font-size: 15px;
    overflow-wrap: break-word;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({ title, checked, id, priority }) => {

  const { mutate } = useDeleteTodoItem();
  const onClickDeleteHandler = () => {
    if (window.confirm(`Удалить элемент ${title}?`)) {
      mutate({ id });
    };
  }

  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} disabled={false} id={id} />
      <Title checked={checked}>
        {title}
      </Title>
      <TodoItemPriority priorityChecked={priority===1} priority={1} id={id}/>
      <TodoItemPriority priorityChecked={priority===2} priority={2} id={id}/>
      <TodoItemPriority priorityChecked={priority===3} priority={3} id={id}/>
      <Delete onClick={onClickDeleteHandler} />
    </TodoItemContainer>
  )
}
