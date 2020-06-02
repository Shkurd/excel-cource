function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <a class="material-icons ${button.active ? 'active' : ''}"
      ${meta}
    >
      ${button.icon}
    </a>
  `
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: false,
      value: {
        textAlign: 'left'
      }
    },
    {
      icon: 'format_align_center',
      active: false,
      value: {
        textAlign: 'center'
      }
    },
    {
      icon: 'format_align_right',
      active: false,
      value: {
        textAlign: 'right'
      }
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {
        fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'
      }
    },
    {
      icon: 'format_italic',
      active: false,
      value: {
        fontWeight: 'italic'
      }
    },
    {
      icon: 'format_underline',
      active: false,
      value: {
        textDecoration: 'underline'
      }
    }
  ]
  return buttons.map(toButton).join('')
}
