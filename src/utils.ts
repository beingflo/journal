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

export const splitTagAndContent = (content: string): [string, string[]] => {
  const lines = content.split(/\r?\n/);

  let cleanEntry = '';
  let tags = [];

  if (lines[lines.length - 1].startsWith('#')) {
    cleanEntry = lines.slice(0, -1).join('\n');
    tags = lines[lines.length - 1]
      .split('#')
      .filter(t => t !== '')
      .map(t => t.trimEnd());
  } else {
    cleanEntry = lines.join('\n');
  }

  return [cleanEntry, tags];
};

export const dateToISOLocal = (date): string => {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);
  return isoLocal;
};
