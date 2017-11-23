import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { File } from 'react-feather'
import { sanitize } from 'utils'
import { styles } from './styles.css'

const VALID_FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif', 'zip', 'rar', 'gzip', 'pdf', 'txt', 'json', 'doc', 'docx', 'csv', 'js', 'html', 'css']

export default class FileTransfer extends Component {
  constructor() {
    super()
    this.state = {
      supported: true,
      localFileQueue: [],
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
    this._fileInput.addEventListener('change', this.confirmFileTransfer.bind(this))
  }

  async encodeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader()

      if (!file) {
        return reject()
      }

      reader.onload = (readerEvent) => {
        resolve(window.btoa(readerEvent.target.result))
        this._fileInput.value = ''
      }

      reader.readAsBinaryString(file)
    })
  }

  async confirmFileTransfer(event) {
    const file = event.target.files && event.target.files[0]

    if (file) {
      const fileType = file.type || 'file'
      const fileName = sanitize(file.name)
      const { localFileQueue } = this.state
      const fileExtension = file.name.split('.').pop().toLowerCase()

      if (VALID_FILE_TYPES.indexOf(fileExtension) <= -1) {
        alert('file type not supported')
        return false
      }

      if (file.size > 2000000) {
        alert('Max filesize is 2MB.')
        return false
      }

      const fileId = uuid.v4()
      // const base64 = window.btoa()
      const fileData = {
        id: fileId,
        file,
        fileName,
        fileType,
        encodedFile: await this.encodeFile(file),
      }

      localFileQueue.push(fileData)

      this.setState({
        localFileQueue,
      }, () => {
        // confirm file transfer...
        console.log(fileData)
      })
    }

    return false
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

FileTransfer.propTypes = {
  sendSocketMessage: PropTypes.func.isRequired,
}
