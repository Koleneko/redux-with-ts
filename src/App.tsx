import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import { ChangeEvent, useReducer, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
type State = Array<Task>;

type Action =
  | {
      type: "ADD_TASK";
      payload: { completed: boolean; text: string };
    }
  | { type: "REMOVE_TASK"; payload: { id: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK": {
      return [
        ...state,
        {
          id: state.length,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    }
    case "REMOVE_TASK": {
      return state.filter((task) => task.id !== action.payload.id);
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [userInput, setUserInput] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const addTask = () => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        completed: completed,
        text: userInput,
      },
    });
    setUserInput("");
    setCompleted(false);
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
  const onCheckboxClick = () => {
    setCompleted((prev) => !prev);
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
          onCheck={onCheckboxClick}
          completed={completed}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.length ? (
            state.map((task) => (
              <Item
                key={task.id}
                text={task.text}
                id={task.id}
                completed={task.completed}
                onDelete={removeTask}
              />
            ))
          ) : (
            <h3 style={{ margin: "30px" }}>Добавьте первую задачу</h3>
          )}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
