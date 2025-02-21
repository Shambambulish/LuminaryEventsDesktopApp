import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { QRCodeSVG } from 'qrcode.react';
import '../css/Scan.css'; // Assuming you have a CSS file for styles

export function Scan() {
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<SVGSVGElement>(null);

  const handlePrint = () => {
    if (componentRef.current && qrRef.current) {
      const printContents = componentRef.current.innerHTML;

      // Get the SVG as a string
      const qrSVG = new XMLSerializer().serializeToString(qrRef.current);

      // Create an iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write('<html><head><title>Print</title></head><body>');
        iframeDoc.write(printContents);

        // Create a div for barcode SVG
        const div = iframeDoc.createElement('div');
        div.innerHTML = qrSVG;
        iframeDoc.body.appendChild(div);

        iframeDoc.write('</body></html>');
        iframeDoc.close();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }
    }
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon />
        </IconButton>
      </div>
      <div>
        <Typography variant="h4">Scan Page</Typography>
        <QRCodeSVG value="https://reactjs.org/" marginSize={4} ref={qrRef} />
        <div ref={componentRef}></div>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default Scan;