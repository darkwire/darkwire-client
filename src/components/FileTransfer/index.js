import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { File } from 'react-feather'
import { styles } from './styles.css'

export default class FileTransfer extends Component {
  constructor() {
    super()
    this.state = {
      supported: true,
    }
  }

  componentWillMount() {
    if (!window.File && !window.FileReader && !window.FileList && !window.Blob && !window.btoa && !window.atob && !window.Blob && !window.URL) {
      this.setState({
        supported: false,
      })
    }
  }

  componentDidMount() {
    this._fileInput.addEventListener('change', this.confirmFileTransfer)
  }

  confirmFileTransfer(event) {
    console.log(event)   
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

      resolve(new window.Blob(byteArrays, { type: fileType }))
    })
  }

  createUrlFromBlob(blob) {
    return window.URL.createObjectURL(blob)
  }

  render() {
    if (!this.state.supported) {
      return null
    }
    return (
      <button className="icon is-right send btn btn-link">
        <File />
        <input className={styles} type="file" name="fileUploader" id="fileInput" ref={c => this._fileInput = c} />
      </button>
    )
  }
}
