import React from 'react'

class Main extends React.Component {
  
  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      setTimeout(() => { window.scrollTo(0, 0) }, 0)
    }
  }

  render() {
    return (
      <div/>
    )
  }
}

export default Main