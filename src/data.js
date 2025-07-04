const randomText =
  "Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

export const data = (firstLevelLength = 5, initial = 0) => {
  if (initial > 3) return [];
  return new Array(firstLevelLength).fill().map((a, i) => {
    return {
      name: `Name ${i} ${randomText}`,
      path: [],
      value: randomText,
      children: data(5, ++initial)
    };
  });
};
