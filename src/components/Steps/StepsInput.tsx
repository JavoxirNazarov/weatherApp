import { TextField } from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import React, { ChangeEvent } from "react";
import { useStepStyles } from "./style";

type InputProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onClick: () => void;
};

export default function StepsInput({
  label,
  onChange,
  value,
  onClick,
}: InputProps): JSX.Element {
  const classes = useStepStyles();

  return (
    <div className={classes.inputBlock}>
      <TextField
        className={classes.input}
        value={value}
        onChange={onChange}
        label={label}
        variant="outlined"
        onKeyDown={(e) => {
          if (e.key === "Enter") onClick();
        }}
      />
      <KeyboardReturnIcon onClick={onClick} />
    </div>
  );
}
