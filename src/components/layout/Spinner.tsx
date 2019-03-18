import React from 'react'
import { BeatLoader } from 'react-spinners'

const css: any = {
  margin: '2rem auto'
}

export default () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <BeatLoader size={25} color={'#183059'} css={css} />
    </div>
  )
}
