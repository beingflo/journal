// Execute callback function if event did not target an input
export const validateEvent = callback => event => {
  if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    event.preventDefault();
    callback();
  }
};

export const getNewId = () => crypto.randomUUID();
