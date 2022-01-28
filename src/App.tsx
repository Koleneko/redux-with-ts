import { Paper, Divider, Button, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import TaskList from "./components/TaskList";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export type State = Array<Task>;

export enum ChoosenTab {
  "All" = 0,
  "Active" = 1,
  "Completed" = 2,
}

export enum ButtonText {
  CheckAll = "Отметить все",
  UncheckAll = "Снять все отметки",
}

type Action =
  | {
      type: "ADD_TASK";
      payload: { completed: boolean; text: string };
    }
  | { type: "REMOVE_TASK"; payload: { id: number } }
  | { type: "REMOVE_ALL_TASKS" }
  | { type: "TOGGLE_ACTIVE"; payload: { id: number } }
  | { type: "TOGGLE_ACTIVE_ALL"; payload: { idArr: number[] } }
  | { type: "TOGGLE_ACTIVE_NONE"; payload: { idArr: number[] } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK": {
      return [
        ...state,
        {
          id: state[state.length - 1]?.id + 1 || 0,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    }
    case "REMOVE_TASK": {
      return state.filter((task) => task.id !== action.payload.id);
    }
    case "TOGGLE_ACTIVE": {
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    }
    case "TOGGLE_ACTIVE_ALL": {
      return state.map((task) => {
        if (task.id in action.payload.idArr) {
          return { ...task, completed: true };
        }
        return task;
      });
    }
    case "TOGGLE_ACTIVE_NONE": {
      return state.map((task) => {
        return { ...task, completed: false };
      });
    }
    case "REMOVE_ALL_TASKS": {
      return [];
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [userInput, setUserInput] = useState<string>("");
  const [completedFromInput, setCompletedFromInput] = useState<boolean>(false);
  const [choosenTab, setChoosenTab] = useState<ChoosenTab>(ChoosenTab.Active);
  const [buttonText, setButtonText] = useState<ButtonText>(ButtonText.CheckAll);
  const [filteredState, setFilteredState] = useState<State>([]);

  useEffect(() => {
    setFilteredState(state.filter((task) => handleTabShow(task)));
  }, [state, choosenTab]);

  useEffect(() => {
    if (filteredState.every((task) => task.completed)) {
      setButtonText(ButtonText.UncheckAll);
    } else {
      setButtonText(ButtonText.CheckAll);
    }
  }, [filteredState]);

  const addTask = () => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        completed: completedFromInput,
        text: userInput,
      },
    });
    setUserInput("");
    setCompletedFromInput(false);
  };

  const removeTask = (id: number) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      dispatch({
        type: "REMOVE_TASK",
        payload: {
          id,
        },
      });
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const onInputCheckboxClick = () => {
    setCompletedFromInput((prev) => !prev);
  };
  const onListCheckboxClick = (id: number) => {
    dispatch({ type: "TOGGLE_ACTIVE", payload: { id } });
  };
  const handleTabChange = (e: SyntheticEvent, newTab: number) => {
    setChoosenTab(newTab);
  };
  const handleActiveButton = () => {
    const uncompletedId: Array<number> = [];
    const completedId: Array<number> = [];
    filteredState.forEach((task) => {
      if (!task.completed) {
        uncompletedId.push(task.id);
      } else {
        completedId.push(task.id);
      }
    });

    if (uncompletedId.length) {
      setButtonText(ButtonText.UncheckAll);
      dispatch({
        type: "TOGGLE_ACTIVE_ALL",
        payload: { idArr: uncompletedId },
      });
    } else {
      setButtonText(ButtonText.CheckAll);
      dispatch({
        type: "TOGGLE_ACTIVE_NONE",
        payload: { idArr: completedId },
      });
    }
  };

  const handleTabShow = (task: Task) => {
    switch (choosenTab) {
      case ChoosenTab.Active: {
        return !task.completed;
      }
      case ChoosenTab.Completed: {
        return task.completed;
      }
      case ChoosenTab.All: {
        return true;
      }
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Удалить все задачи?"))
      dispatch({ type: "REMOVE_ALL_TASKS" });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          inputValue={userInput}
          onChange={onInputChange}
          addTask={addTask}
          onCheck={onInputCheckboxClick}
          completed={completedFromInput}
        />
        <Divider />
        <Tabs value={choosenTab} onChange={handleTabChange}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <TaskList
          filteredState={filteredState}
          onDelete={removeTask}
          choosenTab={choosenTab}
          onListCheckboxClick={onListCheckboxClick}
        />
        <Divider />
        <div className="check-buttons">
          <Button onClick={handleActiveButton}>{buttonText}</Button>
          <Button onClick={handleDeleteAll}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
