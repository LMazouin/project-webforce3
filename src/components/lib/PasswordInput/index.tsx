import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (props: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword: React.MouseEventHandler<HTMLButtonElement> = () =>
    setShowPassword((previousValue) => !previousValue);

  const handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <OutlinedInput
        label={props.label}
        name={props.name}
        type={showPassword ? "text" : "password"}
        value={props.value}
        onChange={props.onChange}
        error={props.error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <Key />
          </InputAdornment>
        }
      />
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
