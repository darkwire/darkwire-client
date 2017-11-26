import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FileDownload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileUrl: null,
    }
  }

  async componentWillMount() {
    const blob = await this.createBlob(this.props.encodedFile, this.props.fileType)
    const url = window.URL.createObjectURL(blob);

    this.setState({
      fileUrl: url,
    })
  }

  async createBlob(base64, fileType) {
    const b64 = unescape(base64)
    return new Promise((resolve, reject) => {
      const sliceSize = 1024
      const byteCharacters = window.atob(b64)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      if (byteArrays.length <= 0) {
        return reject()
      }

      return resolve(new window.Blob(byteArrays, { type: fileType }))
    })
  }

  render() {
    return (
      <span>
        {this.state.fileUrl &&
          <a target='_blank' href={this.state.fileUrl}>Download {this.props.fileName}</a>
        }
      </span>
    )
  }
}

FileDownload.propTypes = {
  encodedFile: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
}

export default FileDownload
