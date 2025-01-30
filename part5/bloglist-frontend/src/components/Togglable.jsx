import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const hiddenWhenVisible = { display: visible? 'none': '' }
  const showWhenVisible = { display: visible? '': 'none' }
  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>
            cancel
        </button>
      </div>
      <button style={hiddenWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable