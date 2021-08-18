export type Mapping = { [key: string]: unknown };
export type Value = string | number | boolean | undefined | null;
export type Argument = Value | Mapping;
export const classNames = (...arg: Argument[]): string => {
  const classes: string[] = [];
  arg.forEach((item) => {
    if (item == null) {
      return;
    }
    if (typeof item === "string" || typeof item === "number") {
      classes.push(String(item));
    } else {
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  });
  return classes.join(" ");
};
