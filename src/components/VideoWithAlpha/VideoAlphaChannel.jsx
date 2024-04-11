import { useEffect, useRef, useState } from 'react'
import { webgl } from '../../webgl'

export function VideoAlphaChannel(props) {
  const canvasRef = useRef()
  const [videoRef, setVideoRef] = useState()

  const handleVideoRef = (element) => {
    if (element !== videoRef) {
      setVideoRef(element)
    }
  }
  useEffect(() => {
    if (canvasRef && videoRef) {
      const video = videoRef
      const canvas = canvasRef.current
      const initWebGL = () => webgl(canvas, video)
      video.addEventListener('playing', initWebGL)
      return () => video.removeEventListener('playing', initWebGL)
    }
  }, [canvasRef, videoRef])

  return (
    <>
      <video
        ref={handleVideoRef}
        crossOrigin='anonymous'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          opacity: 0.01,
          pointerEvents: 'none',
        }}
        {...props}
      />
      <canvas ref={canvasRef} />
    </>
  )
}
