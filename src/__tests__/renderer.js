import testRenderer from 'react-test-renderer';

const render = component => {
  const renderer = testRenderer.create(component);

  return {
    renderer,
    root: renderer.root,
    instance: renderer.getInstance(),
    toJSON: () => renderer.toJSON()
  };
};

export { render };
