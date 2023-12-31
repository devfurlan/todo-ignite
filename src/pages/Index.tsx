import {createContext, useEffect, useState} from 'react';
import {Header} from '../components/Header';
import {AddTask} from '../components/AddTask';
import {ItemsCounters} from '../components/ItemsCounters';
import {ProgressBarLine} from '../components/ProgressBarLine';
import {Task} from '../components/Task';
import {Empty} from '../components/Empty';

export interface ListTasksProps {
  id: string;
  item: string;
  status: 0 | 1;
}

interface ListItemsContextType {
  tasks: ListTasksProps[] | undefined,
  handleAddTask: (newTaskToAdd: ListTasksProps) => void,
  handleUpdateTasks: (newListTasks: ListTasksProps[] | undefined) => void,
  totalTasks: number,
  totalTasksCompleted: number,
  percentOfTasksCompleted: number,
}

export const ListItemsContext = createContext({} as ListItemsContextType);

export function Index() {
  const keyListLocalStorage = 'aiLembrei__List';
  
  const [tasks, setTasks] = useState<ListTasksProps[]>([]);
  
  useEffect(() => {
    const getTasksOfLocalStorage = JSON.parse(localStorage.getItem(keyListLocalStorage) || '[]');
    
    if (getTasksOfLocalStorage.length > 0) {
      setTasks(getTasksOfLocalStorage);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem(keyListLocalStorage, JSON.stringify(tasks));
  }, [tasks]);
  
  function handleAddTask(newListTasksToAction: ListTasksProps) {
    setTasks((tasks) => [newListTasksToAction, ...tasks]);
  }
  
  function handleUpdateTasks(newListTasks: ListTasksProps[] | undefined) {
    if (newListTasks) setTasks(newListTasks);
  }
  
  const totalTasks = tasks.length;
  const totalTasksCompleted = tasks.filter(task => task.status === 1).length;
  const percentOfTasksCompleted = totalTasks ? Math.round(totalTasksCompleted / totalTasks * 100) : 0;
  
  return (
    <div className="w-screen max-w-full min-h-screen bg-gray-600 text-gray-100">
      <Header/>
      
      <div className="max-w-2xl md:m-auto mx-6 pb-4">
        <ListItemsContext.Provider
          value={{
            tasks,
            handleAddTask,
            handleUpdateTasks,
            totalTasks,
            totalTasksCompleted,
            percentOfTasksCompleted
          }}>
          <AddTask/>
          
          <ItemsCounters/>
          <ProgressBarLine/>
          
          {totalTasks ?
            <ul>
              {
                tasks.map(task => <Task key={task.id} task={task}/>)
              }
            </ul>
            : <Empty/>}
        
        </ListItemsContext.Provider>
      </div>
    
    </div>
  );
}
