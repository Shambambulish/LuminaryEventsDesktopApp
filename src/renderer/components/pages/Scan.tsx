import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import JsBarcode from 'jsbarcode';
import '../css/Scan.css'; // Assuming you have a CSS file for styles

export function Scan() {
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);

  const handlePrint = () => {
    if (componentRef.current && barcodeRef.current) {
      const printContents = componentRef.current.innerHTML;

      // Get the SVG as a string
      const barcodeSVG = new XMLSerializer().serializeToString(barcodeRef.current);


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
        div.innerHTML = barcodeSVG,
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

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, "123456789012", {
        format: "CODE128",
        displayValue: true,
      });
    }
  }, []);

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
        <svg ref={barcodeRef}></svg>
        <div ref={componentRef}></div>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default Scan;