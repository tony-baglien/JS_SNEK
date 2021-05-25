const showPicker = new jscolor('#show-picker', { format: 'rgba' });

showPicker.option({
  width: 200,
  height: 275,
  backgroundColor: '#999',
  smartPosition: false,
  position: 'top',
  onInput: () => update(showPicker),
  // previewElement: '#head',
});

function update(picker) {
  document.getElementById('head').style.background = picker.toRGBAString();
}

export default { showPicker };
