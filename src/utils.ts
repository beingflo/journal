// Execute callback function if event did not target an input
export const validateEvent = callback => event => {
  if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    event.preventDefault();
    callback();
  }
};

export const getNewId = () => crypto.randomUUID();

export const addTagToContent = (content: string, tag: string): string => {
  let cont = content;
  const lines = content.split(/\r?\n/);

  if (lines[lines.length - 1].startsWith('#')) {
    cont = cont + ` #${tag}`;
  } else {
    cont = cont + `\n#${tag}`;
  }

  return cont;
};
