import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from './index';

test('测试 my 组件', () => {
  render(<Index />);
  // const linkElement = screen.getByText(/learn react/i)
  // expect(linkElement).toBeInTheDocument()
  // expect(screen.getAllByRole('button')[0].textContent).toBe('该按钮点击了0次')
  // fireEvent.click(screen.getAllByRole('button')[0])
  // screen.debug()
});
