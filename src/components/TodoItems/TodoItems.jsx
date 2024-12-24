import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import { SortButton } from './components/SortButton';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState(0);

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
  const filteredBySearchItems = todoItems.filter((todoItem) => {
    // const clearedTodoItemTitle = очистка от пробелов + приведение к одному из регистров
    // const clearedSearchValue = очистка от пробелов + приведение к одному из регистров
    // const isSearched = проверка вхождения строки поиска в строку заголовка
    // return isSearched
    if (searchValue.length < 4) return true;

    const clearedTodoItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
    const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    return clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1;
    
  }).sort((a, b) => {
    switch (sortValue) {
        case 1:
            return a.priority - b.priority;
        case 2:
            return b.priority - a.priority;
        default:
            return 0;
    }
  })


  const todoItemsElements = filteredBySearchItems.map((item, index) => {
    return <TodoItem key={item.id} title={item.title} checked={item.isDone} id={item.id} priority={item.priority}/>;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue}/>
      <SortButton sortValue={sortValue} setValue={setSortValue}/>
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}