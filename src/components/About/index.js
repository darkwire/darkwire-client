import React, { Component } from 'react'

class About extends Component {
  render() {
    return (
      <div>
        <p className="bold">WARNING: Darkwire does not mask IP addresses nor can verify the integrity of parties recieving messages.
        &nbsp;Proceed with caution and always confirm recipients before starting a chat session.</p>
        <p>Please also note that <strong>ALL CHATROOMS</strong> are public.
        &nbsp;Anyone can guess your room URL. If you need a more-private room, use the lock feature or set the URL manually by entering a room ID after &quot;darkwire.io/&quot;.
        </p>
        <p>Questions/comments? Email us at hello[at]darkwire.io</p>
        <p>Found a bug or want a new feature? <a href="https://github.com/seripap/darkwire.io/issues" target="_blank" rel="noopener noreferrer">Open a ticket on Github</a>.</p>
      </div>
    )
  }
}

About.propTypes = {
}

export default About
