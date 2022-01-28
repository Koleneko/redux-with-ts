import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { ChangeEvent } from "react";

interface AddFieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCheck: () => void;
  addTask: () => void;
  inputValue: string;
  completed: boolean;
}

export const AddField: React.FC<AddFieldProps> = ({
  onChange,
  inputValue,
  addTask,
  onCheck,
  completed,
}) => {
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onClick={onCheck}
        checked={completed}
      />
      <TextField
        placeholder="Введите текст задачи..."
        onChange={onChange}
        value={inputValue}
        variant="standard"
        fullWidth
      />
      <Button onClick={addTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
