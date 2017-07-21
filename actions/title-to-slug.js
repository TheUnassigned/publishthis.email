// falls-back to english
const slugify = text => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[“”"?():;\/\\@=&`[\]\|<>^~`#%]/g, '') // Remove non-safe characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .toLowerCase()
    .slice(0, 90)
}

export {
  slugify
}
