'use client'

import { useState } from 'react';
import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';

const bookCategories = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy',
  'Romance', 'Thriller', 'Horror', 'Biography', 'History',
  'Self-Help', 'Business', 'Science', 'Travel', 'Poetry',
  'Children\'s', 'Young Adult', 'Classics', 'Contemporary', 'Historical Fiction'
];

const MAX_DISPLAYED_VALUES = 2;


export function SelectGenres({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(newValue);
  };

  const handleValueRemove = (val: string) =>
    onChange(value.filter((v) => v !== val));

  const values = value
    .slice(
      0,
      MAX_DISPLAYED_VALUES === value.length ? MAX_DISPLAYED_VALUES : MAX_DISPLAYED_VALUES - 1
    )
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const options = bookCategories.map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        {value.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false} radius='md'>
      <Combobox.DropdownTarget>
        <PillsInput pointer rightSection={<Combobox.Chevron />} onClick={() => combobox.toggleDropdown()}>
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > MAX_DISPLAYED_VALUES && (
                  <Pill>+{value.length - (MAX_DISPLAYED_VALUES - 1)} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder>Select Categories</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace') {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
