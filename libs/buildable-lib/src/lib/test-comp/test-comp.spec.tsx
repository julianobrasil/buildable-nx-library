import { render } from '@testing-library/react';

import TestComp from './test-comp';

describe('TestComp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestComp />);
    expect(baseElement).toBeTruthy();
  });
});
