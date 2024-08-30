export const Fragment: any = ({ context, fragment }) => {
  if (!context) {
    throw new Error("Fragment cannot render without context.");
  }

  const fragmentState = context.createFragmentState(fragment);

  return <h1>Fragment 123</h1>;
};
