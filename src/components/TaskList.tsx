import { ChoosenTab, State } from "../App";
import React from "react";
import { Item, ItemProps } from "./Item";
import { List } from "@mui/material";

interface TaskListProps
  extends Pick<ItemProps, "onDelete" | "onListCheckboxClick"> {
  filteredState: State;
  onDelete: (id: number) => void;
  choosenTab: ChoosenTab;
}

const TaskList: React.FC<TaskListProps> = ({
  filteredState,
  onDelete,
  choosenTab,
  onListCheckboxClick,
}) => {
  const handleEmptyList = () => {
    switch (choosenTab) {
      case ChoosenTab.Active: {
        return "Все задачи выполнены!";
      }
      case ChoosenTab.Completed: {
        return "Пора приступить!";
      }
      case ChoosenTab.All: {
        return "Добавьте первую задачу";
      }
    }
  };

  return (
    <List>
      {filteredState.length ? (
        filteredState.map((task) => (
          <Item
            key={task.id}
            id={task.id}
            onDelete={onDelete}
            completed={task.completed}
            text={task.text}
            onListCheckboxClick={onListCheckboxClick}
          />
        ))
      ) : (
        <h3 style={{ margin: "30px" }}>{handleEmptyList()}</h3>
      )}
    </List>
  );
};

export default TaskList;
