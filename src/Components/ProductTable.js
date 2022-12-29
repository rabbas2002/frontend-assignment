import React, { useState } from "react";
import TableHeader from './TableHeader';
import ProductBatches from './ProductBatches';
import "../CSS/ProductTable.css";
import ReactPaginate from "react-paginate";
import {useEffect } from "react";
function ProductTable(props){
    const data = props.products;
    const [currentItems, setCurrentItems] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return(
        <>
            <table className="table">
                 <TableHeader></TableHeader>
                    <tbody>
                        {currentItems!=undefined && currentItems.map((item)=>{
                            return <ProductBatches key={item[0]} product={item} />
                        })}
                    </tbody>
            </table>
            <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
        />
        </>
        
    )
}
export default ProductTable;