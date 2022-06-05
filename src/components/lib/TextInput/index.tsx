import { Mail } from "@mui/icons-material";
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEventHandler } from "react";

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  const { label, name, value, onChange, error, helperText } = props;

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        label={label}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        error={error}
        startAdornment={
          <InputAdornment position="start">
            <Mail />
          </InputAdornment>
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

TextInput.defaultProps = {
  error: "false",
  helperText: "",
};
