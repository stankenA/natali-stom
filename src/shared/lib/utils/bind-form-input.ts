import { ConnectedField } from 'effector-forms';

export const bindFormInput = <T>(
  fields: ConnectedField<T>,
  options?: { toLowerCase?: boolean },
) => ({
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const targetValue = options?.toLowerCase ? e.target.value.toLowerCase() : e.target.value;
    fields.onChange(targetValue as T);
  },
  value:
    options?.toLowerCase && typeof fields.value === 'string'
      ? fields.value.toLowerCase()
      : fields.value,
  error: fields.firstError?.errorText,
});
