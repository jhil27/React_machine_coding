
import './App.css';
import products from './products.json';
import Pagination from './pagination';
import { useEffect, useState } from 'react';
function App() {
  const totalElement = products.length;
  const [productsPerPage, setProducrPerPage] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const calculatePeoductsPerPage = () => {
    // console.log(currentPage)
    const sliced = products.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);
    const mapped = sliced.map((product) => {
      const obj = { sku: product.sku, name: product.name };
      return obj;
    });
    return mapped;
  }

  const fetchCurrentPage = (pageno) => {
    setCurrentPage(pageno)
    calculatePeoductsPerPage();
  }

  const handleOptionClick = (itemsperpage) => {
    setItemsPerPage(itemsperpage);
  }



  useEffect(() => {
    calculatePeoductsPerPage();
  }, [itemsPerPage, products.length])


  return (
    <div className="App">
      <div class="dropdown">
        <button class="dropbtn">Items Per Page</button>
        <div class="dropdown-content">
          <a onClick={() => handleOptionClick(10)}>10</a>
          <a onClick={() => handleOptionClick(25)}>25</a>
          <a onClick={() => handleOptionClick(50)}>50</a>
        </div>
      </div>
      <div className='tableContainer'>
        {calculatePeoductsPerPage().length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                {
                  Object.keys(calculatePeoductsPerPage()[0]).map((key) => {
                    return <th>{key.toUpperCase()}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {calculatePeoductsPerPage().map((item, index) => (
                <tr key={item.sku}>
                  <td>{currentPage == 1 ? (index + 1) : itemsPerPage * (currentPage - 1) + (index + 1)}</td>
                  <td>{item.sku}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          : <></>
        }
      </div>
      {totalElement > 0 && itemsPerPage > 0 ?
        <Pagination totalElement={totalElement} itemsPerPage={itemsPerPage} getCurrentPage={fetchCurrentPage} />
        : <></>}
    </div >
  );
}

export default App;
