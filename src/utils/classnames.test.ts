import { classNames } from "./classnames";

test("classnames", () => {
  expect(classNames("class")).toBe("class");
});

test("object", () => {
  expect(
    classNames("class", {
      pro1: "pro1",
      pro2: undefined,
      pro3: null,
      pro4: true,
      pro5: false,
      pro6: {},
      pro7: "",
    })
  ).toBe("class pro1 pro4 pro6");
});
