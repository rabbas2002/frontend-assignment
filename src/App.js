import { useEffect, useState } from 'react';
import './App.css';
import useFile from './hooks/useFile';
import useGrouping from './hooks/useGrouping';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from 'react-drag-drop-files';
import Search from './Components/Search';
import ProductTable from './Components/ProductTable';
function App() {
  const [fileInput, changeInput] = useState();
  const [searchWord,changeSearchWord] = useState('');
  const ungroupedProducts = useFile(fileInput);
  const groupedProducts = useGrouping(ungroupedProducts);
  const [products,setProducts] = useState(groupedProducts);
  
  const fileInputHandler = (file) => {
    if (file) {
      changeInput(file);
    }
  }
  
  
  const searchHandler = (searchQuery)=>{
    changeSearchWord(searchQuery);
  }
  useEffect(()=>{
    if(searchWord){
      const filteredArray = groupedProducts.filter((product)=>{
        return product[0].toUpperCase().includes(searchWord);
      })
      setProducts(filteredArray)
      
    }
  },[searchWord])
  return (
    <div className="App">
      <div className='row-container'>
        <FileUploader
          handleChange={fileInputHandler}
          name="file"
          types={['XLSX']}
        />
        {fileInput && !groupedProducts.length>0 && !searchWord.length>0 && <h2 className='loading'>Loading.....</h2>}
      
      </div>
        <Search onSearch={searchHandler}/>
        {
          searchWord && <ProductTable products={products}/>
        }
        {
          !searchWord && <ProductTable products={groupedProducts}/>
        }
        {searchWord.length>0 && products.length<=0 && <h2 className='no-products'>No Products Found!</h2>}

    </div>
  );
}

export default App;
