import { classNames } from "./classnames";

test("string", () => {
  expect(classNames("class")).toBe("class");
});

test("number", () => {
  expect(classNames(120)).toBe("120");
});

test("undefined", () => {
  expect(classNames(undefined)).toBe("");
});

test("undefined and object", () => {
  expect(
    classNames(undefined, {
      pro1: "pro1",
      pro2: undefined,
      pro3: null,
      pro4: true,
      pro5: false,
      pro6: {},
      pro7: "",
    })
  ).toBe("pro1 pro4 pro6");
});
