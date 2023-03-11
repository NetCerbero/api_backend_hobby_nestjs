export const magicSelect = (select: Select) => {
  const selected = [];
  Object.keys(select).forEach((key) => {
    if (select[key])
      selected.push(
        ...(typeof select[key] == 'string'
          ? (select[key] as string).split(',')
          : (select[key] as string[])
        ).map((attribute: string) => `${key}.${attribute}`),
      );
    else selected.push(key);
  });
  return selected;
};

interface Select {
  [key: string]: string | string[];
}
