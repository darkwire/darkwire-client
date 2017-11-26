/* eslint-disable import/prefer-default-export */
export const getSelectedText = () => {
  let text = ''
  if (typeof window.getSelection !== 'undefined') {
    text = window.getSelection().toString()
  } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
    text = document.selection.createRange().text
  }
  return text
}
