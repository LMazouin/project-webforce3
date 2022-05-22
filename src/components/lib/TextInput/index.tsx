import { Mail } from "@mui/icons-material";
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText: string;
}

const TextInput: React.FunctionComponent<TextInputProps> = (props: TextInputProps): JSX.Element => (
  <FormControl fullWidth>
    <InputLabel>{props.label}</InputLabel>
    <OutlinedInput
      label={props.label}
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
      error={props.error}
      startAdornment={
        <InputAdornment position="start">
          <Mail />
        </InputAdornment>
      }
    />
    <FormHelperText>{props.helperText}</FormHelperText>
  </FormControl>
);

export default TextInput;
