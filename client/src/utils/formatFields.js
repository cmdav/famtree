export function formatDate(date) {
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  if (!date) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

export function formatId(id) {
  if (typeof id !== 'string') {
    throw new Error('Invalid input. Expected a string.');
  }
  if (id.length < 5) {
    return id;
  }
  return id.slice(-5);
}

export function sliceString(str) {
  if (str.length <= 24) {
    return str;
  } else {
    return str.slice(0, 24) + '...';
  }
}