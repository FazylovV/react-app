import React from 'react';
import {styled} from 'styled-components';

export const SortButtonContainer = styled.span(props => {
    return `
    display: inline-block;
    cursor: pointer;
    padding:0px 4px;
    text-align: right;
    align-items: right;
  `;
});

export const SortButton = ({sortValue, setValue}) => {
    const sortButtonTitles = ["Приоритет 🚫", "Приоритет ↓", "Приоритет ↑"];

    const onClick = () => {
        setValue((sortValue + 1) % 3);
    }

    return <SortButtonContainer onClick={() => onClick()}>
        {(() => {
            switch (sortValue) {
                case 1:
                    return sortButtonTitles[1];
                case 2:
                    return sortButtonTitles[2];
                default:
                    return sortButtonTitles[0];
            }
        })()}
    </SortButtonContainer>
}