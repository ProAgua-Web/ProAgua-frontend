import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { FormContainer } from './container';
import { Combobox } from './input/combobox';
import { DatePicker } from './input/date-picker';
import { DateTimePicker } from './input/date-time-picker';
import { MaskedInput, noMask } from './input/masked-input';
import { MultiSelect } from './input/multi-select';
import { NumberInput } from './input/number-input';
import { Select } from './input/select';
import { TextArea } from './input/text-area';
import { TextInput } from './input/text-input';

test('FormContainer renderiza corretamente', () => {
  const props = {
    title: 'Title',
    subtitle: 'Subtitle',
    isLoading: true,
    isSubmitting: false,
    onSubmit: () => {},
    onCancel: () => {},
  };

  const ref = { current: null };

  const textInputRef = { current: null };
  const numberInputRef = { current: null };
  const maskedInputRef = { current: null };
  const textAreaRef = { current: null };
  const selectRef = { current: null };
  const multiSelectRef = { current: null };
  const comboboxRef = { current: null };
  const datePickerRef = { current: null };
  const dateTimePickerRef = { current: null };

  const container = render(
    <FormContainer {...props} isLoading={true} ref={ref}>
      <TextInput label="" aria-label="input" ref={textInputRef} />
      <NumberInput label="" aria-label="input" ref={numberInputRef} />
      <MaskedInput
        label=""
        aria-label="input"
        mask={noMask}
        ref={maskedInputRef}
      />
      <TextArea label="" aria-label="input" ref={textAreaRef} />
      <Select label="" aria-label="input" options={[]} ref={selectRef} />
      <MultiSelect
        label=""
        aria-label="input"
        options={[]}
        onSearch={() => {}}
        ref={multiSelectRef}
      />
      <Combobox
        label=""
        aria-label="input"
        options={[]}
        onSearch={() => {}}
        ref={comboboxRef}
      />
      <DatePicker label="" aria-label="input" ref={datePickerRef} />
      <DateTimePicker label="" aria-label="input" ref={dateTimePickerRef} />
    </FormContainer>,
  );

  expect(container).toBeDefined();
  expect(container.getByText('Title')).toBeDefined();
  expect(container.getByText('Subtitle')).toBeDefined();
  expect(ref.current).toBeDefined();
  expect(ref.current).toBeInstanceOf(HTMLFormElement);

  expect(textInputRef.current).toHaveProperty('disabled', true);
  expect(numberInputRef.current).toHaveProperty('disabled', true);
  expect(maskedInputRef.current).toHaveProperty('disabled', true);
  expect(textAreaRef.current).toHaveProperty('disabled', true);
  expect(selectRef.current).toHaveProperty('disabled', true);
  expect(multiSelectRef.current).toHaveProperty('disabled', true);
  expect(comboboxRef.current).toHaveProperty('disabled', true);
  expect(datePickerRef.current).toHaveProperty('disabled', true);
  expect(dateTimePickerRef.current).toHaveProperty('disabled', true);
});
