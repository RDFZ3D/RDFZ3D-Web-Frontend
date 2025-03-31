export type FormField<TKey extends string> = {
  fieldKey: TKey;
  [key: string]: any;
};
export type FormFieldsetInfo<TKey extends string> = FormField<TKey>[];
export type FormInfo<TTitleKey extends string, TKey extends string> = {
  title: TTitleKey;
  fields: FormFieldsetInfo<TKey>;
}[];
