import React, { useState } from "react";
import _ from "lodash";
import '../CSS/ProductBatches.css';
function ProductBatches(props){
    const product = props.product[1];
    const [selectedBatch,setSelectedBatch] = useState("All");
    //Get the unique Batches for a product
    const set = new Set();
    for(const prod of product){
        set.add(prod.batch)
    }
    const uniqueBatches = ["All",...set]
    //Get the free and deal column values
    let minDealFreeRatio = Number.MAX_VALUE;
    let free = 0;
    let deal = 0;
    for(const prod of product){
        
        const currRatio = (prod['free']/prod['deal']);
        if(currRatio<minDealFreeRatio){
            minDealFreeRatio = currRatio;
            free = prod['free'];
            deal = prod['deal'];
        }
    }
    const dropDownHandler = (event)=>{
        const selectedBatch = event.target.value;
        setSelectedBatch(selectedBatch);
    }
    
const name = props.product[0];
   if(selectedBatch=="All"){
    const stock = _(product).sumBy("stock"); 
    const mrp = _(product).maxBy("mrp").mrp;
    const rate = _(product).minBy("rate").rate;
    const expDate = _(product).minBy("exp").exp;
    
    return(
        <tr >
            <td>{name}</td>
            <td>
                <select onChange={dropDownHandler} className="col-lg-6 " id="batch-select">
                    {uniqueBatches.map((batch,index)=>{
                        return <option key={index}>{batch}</option>
                    })}
                </select>
            </td>
            <td>{stock}</td>
            <td>{deal}</td>
            <td>{free}</td>
            <td>{mrp}</td>
            <td>{rate}</td>
            <td>{expDate.getDate()+"/"+(expDate.getMonth()+1)+"/"+expDate.getFullYear()}</td>
        </tr>
    )
   }
   else{
    const selectedProduct = product.filter((prod)=>{
        return prod.batch==selectedBatch;
    })
    const stock = _(selectedProduct).sumBy("stock");
    const deal = _(selectedProduct).sumBy("deal");
    const free = _(selectedProduct).sumBy("free");
    const mrp = _(selectedProduct).maxBy("mrp").mrp;
    const rate = _(selectedProduct).maxBy("rate").rate;
    const expDate = _(selectedProduct).minBy("exp").exp;

    return(

        <tr className={selectedBatch!="All"?"selected":""}>
            <td>{name}</td>
            <td>
                <select onChange={dropDownHandler} className="col-lg-6 " id="batch-select">
                    {uniqueBatches.map((batch,index)=>{
                        return <option key={index}>{batch}</option>
                    })}
                </select>
            </td>
            <td>{stock}</td>
            <td>{deal}</td>
            <td>{free}</td>
            <td>{mrp}</td>
            <td>{rate}</td>
            <td>{expDate.getDate()+"/"+(expDate.getMonth()+1)+"/"+expDate.getFullYear()}</td>

        </tr>

    )

   }
}
export default ProductBatches;