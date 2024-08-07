import React, { useEffect, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Set worker URL to fetch the worker script from a CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`

const PdfThumbnail = ({ url, width = 150, height = 200 }) => {
  const canvasRef = useRef(null)
  const renderTaskRef = useRef(null)

  useEffect(() => {
    const renderThumbnail = async () => {
      if (!canvasRef.current) return

      const loadingTask = pdfjsLib.getDocument(url)

      try {
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)

        const viewport = page.getViewport({ scale: 1 })

        // Calculate scale to fit the canvas within specified width and height
        const scale = Math.min(width / viewport.width, height / viewport.height)
        const scaledViewport = page.getViewport({ scale })
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel()
        }

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        }

        renderTaskRef.current = page.render(renderContext)

        await renderTaskRef.current.promise
      } catch (error) {
        if (error.name === 'RenderingCancelledException') {
          // Handle the rendering cancellation gracefully this can be ingored as rendering multiple thumbnails will cancel the previous render task
          // can be resolved by using a separate worker for each render task but this will increase the memory usage and slower compared to using a single worker
        } else {
          console.error('Error loading PDF:', error)
        }
      }
    }

    renderThumbnail()
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }
    }
  }, [url, width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid #ccc',
      }}
    />
  )
}

export default PdfThumbnail
