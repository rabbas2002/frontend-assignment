import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
const useFile = (file) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (file) {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: 'buffer',cellDates:true});
          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws);

          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((d) => {
        setProducts(d);
      });
    }
  }, [file]);
  return products;
};
export default useFile;
