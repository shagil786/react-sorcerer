import Immutable from 'immutable';

export const INLINE_STYLES = {
  BOLD: 'bold-block',
  UNDERLINE: 'underline-block',
  RED: 'red-block',
  CODE: 'code-block'
};

export const blockRenderMap = Immutable.Map({
  'header-one': {
    element: 'div',
    wrapper: <div className="header-one-block" />
  },
  'unstyled': {
    element: 'div',
    wrapper: <div className="unstyled-block" />
  },
  'code-block': {
    element: 'pre',
    wrapper: <div className="code-block" />
  },
  'bold-block': {
    element: 'div',
    wrapper: <div className="bold-block" />
  },
  'underline-block': {
    element: 'div',
    wrapper: <div className="underline-block" />
  },
  'red-block': {
    element: 'div',
    wrapper: <div className="red-block" />
  }
});

export const blockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  console.log(type)
  switch (type) {
    case 'header-one':
      return 'header-one-block';
    case 'code-block':
      return 'code-block';
    case 'bold-block':
      return 'bold-block';
    case 'underline-block':
      return 'underline-block';
    case 'red-block':
      return 'red-block';
    default:
      return '';
  }
};
