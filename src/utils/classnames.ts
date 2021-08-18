export type Mapping = { [key: string]: unknown };
export type Argument = string | Mapping;
export const classNames = (...arg: Argument[]): string => {
  const classes: string[] = [];
  arg.forEach((item) => {
    if (typeof item === "string") {
      classes.push(item);
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
