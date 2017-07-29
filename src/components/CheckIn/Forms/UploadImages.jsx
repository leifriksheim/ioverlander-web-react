import React, { PropTypes } from 'react'

class UploadImagesForm extends React.Component {
  render () {
    return <main className='content is-flex' style={{ display: 'block' }}>
      <div className='row'>
        <div className='small-12 medium-centered medium-8 large-6 columns center check-in-form'>
          <h4>Did you take any photos?</h4>
          <p>If you have any photos of this place you can upload them below so future vistors can know what to expect.</p>
        </div>

        {!this.props.state.previewImages.length && <form method='POST' action='/photos/upload' encType='multipart/form-data' onSubmit={this.context.uploadImages}>
          <input type='hidden' name='check_in_id' ref='check_in' value={this.props.state.checkInId} />
          <input ref='files' style={{ display: 'block', margin: 'auto' }} type='file' multiple name='photos' accept='.jpg, .png, .gif' onChange={this.context.resolveUploadText} />
          <button style={{ display: 'block', margin: '20px auto 0 auto' }} type='submit' disabled={this.props.state.isUploading || this.props.state.isProcessing} className='btn'>{this.props.state.uploadText}</button>
        </form>}

        {!!this.props.state.previewImages.length && <div style={{ float: 'none', textAlign: 'center' }} className='small-12 medium-centered medium-8 large-6 columns center'>
          <h5>Here are the images you uploaded:</h5>
          <div className='check-in-preview-image-container'>
            {this.props.state.previewImages.map((img, i) => <img src={img} key={i} alt='' />)}
          </div>
            <button style={{ display: 'block', margin: '20px auto 0 auto' }} className='btn' onClick={(e) => { e.preventDefault(); this.context.setState({ editPlaceDetails: true }) } }>Shall we continue?</button>
        </div>}
      </div>
    </main>
  }
}

UploadImagesForm.propTypes = {
  formState: PropTypes.object,
  selectedPlace: PropTypes.object,
  state: PropTypes.object
}

UploadImagesForm.contextTypes = {
  resolveUploadText: PropTypes.func,
  uploadImages: PropTypes.func,
  setState: PropTypes.func
}

UploadImagesForm.displayName = 'UploadImagesForm'

export default UploadImagesForm
