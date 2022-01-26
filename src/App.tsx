import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import { ChangeEvent,  useReducer, useState } from "react";

function App() {
  interface Task {
    id: number;
    text: string;
    completed: boolean;
  }

  type State = Array<Task>;

  type Action = {
    type: "ADD_TASK";
    payload: { completed: boolean; text: string };
  };

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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);
  const [userInput, setUserInput] = useState<string>("");

  const addTask = (completed: boolean) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        completed: completed,
        text: userInput,
      },
    });
    setUserInput("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          inputValue={userInput}
          onChange={onChange}
          addTask={addTask}
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
              <Item key={task.id} text={task.text} completed={task.completed} />
            ))
          ) : (
            <h3>Добавьте первую задачу</h3>
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
