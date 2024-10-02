'use client'

import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';

// floating label input
export interface FloatingLabelInputProps {
  label: string;
  placeholder: string;
  required?: boolean;
  classNames?: string;
  Invalue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  mt?: string;
  autoComplete?: string;
  dataFloating?: string;
  labelProps?: { 'data-floating': string };
}

export function FloatingLabelInput({label, placeholder, Invalue}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(Invalue||'');
  const floating = value.trim().length !== 0 || focused || undefined;

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      required
      classNames={classes}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  );
}