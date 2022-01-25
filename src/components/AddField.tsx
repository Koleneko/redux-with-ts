import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { ChangeEvent, useState } from "react";

interface AddFieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addTask: (completed: boolean) => void;
  inputValue: string;
}

export const AddField: React.FC<AddFieldProps> = ({
  onChange,
  inputValue,
  addTask,
}) => {
  const [completed, setCompleted] = useState<boolean>(false);

  const onCheckboxClick = () => {
    setCompleted((prev) => !prev);
    console.log(completed);
  };

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onClick={onCheckboxClick}
      />
      <TextField
        placeholder="Введите текст задачи..."
        onChange={onChange}
        value={inputValue}
        variant="standard"
        fullWidth
      />
      <Button>
        <AddIcon onClick={() => addTask(completed)} />
      </Button>
    </div>
  );
};
