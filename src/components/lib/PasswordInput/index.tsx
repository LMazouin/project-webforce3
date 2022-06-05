import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEventHandler, useState } from "react";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword: React.MouseEventHandler<HTMLButtonElement> = () =>
    setShowPassword((previousValue) => !previousValue);

  const handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const { label, name, value, onChange, error, helperText } = props;

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        label={label}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        error={error}
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
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

PasswordInput.defaultProps = {
  error: false,
  helperText: "",
};
