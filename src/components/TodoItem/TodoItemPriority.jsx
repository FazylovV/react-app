import styled, {css} from "styled-components";
import { useTodoItemPriority} from "../../data/hooks/useData";

const checkedCss = css`
    background-color:rgb(0, 255, 8);
    background-position: center;
    background-repeat: no-repeat;
`
export const PriorityContainer = styled.span(props => {
    return `
    display: inline-block;
    cursor: pointer;
    border: 2px solid #C4C4C4;
    border-radius: 6px;
    padding:0px 4px;
    text-align: center;
    align-items: center;
    ${props.checked ? checkedCss : ''}
  `;
});

export const TodoItemPriority = ({priorityChecked, priority, id}) => {
    const {mutate} = useTodoItemPriority();

    const onClickHandler = (priority, id) => {
        mutate({priority: priority, id: id});
    }

    return <PriorityContainer  checked={priorityChecked} onClick={() => onClickHandler(priority, id)}>
        {priority}
    </PriorityContainer>

}