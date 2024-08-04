import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/pdfjs-express-viewer';

const PdfViewer = ({ url }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewerElement = viewerRef.current;
    let instance;

    WebViewer(
      {
        licenseKey:'Mob7c75GlLqWUDt55C19',
        // licenseKey: process.env.PDFTRON_LICENSE_KEY,
        path: '/webviewer',
        initialDoc: url, 
      },
      viewerElement
    ).then((inst) => {
      instance = inst;

      const { documentViewer } = instance.Core; 

      if (documentViewer) {
        documentViewer.addEventListener('documentLoaded', () => {
          console.log('Document loaded successfully');
        });
      } else {
        console.error('Document Viewer is undefined');
      }
    });

    return () => {
      if (instance) {
        instance.dispose();
      }
    };
  }, [url]);

  return <div className="webviewer" ref={viewerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default PdfViewer;
