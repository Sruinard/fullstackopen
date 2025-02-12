import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button 
          onClick={toggleVisibility}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[#10a37f] hover:bg-[#1a7f64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10a37f] transition-colors"
        >
          {props.buttonLabel}
        </button>
      </div>
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto max-w-2xl">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{props.buttonLabel}</h2>
                <button
                  onClick={toggleVisibility}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {props.children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable