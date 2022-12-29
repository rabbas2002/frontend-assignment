import _ from "lodash";
const useGrouping = (ungroupedProducts)=>{
    //convert date
    for(const prod of ungroupedProducts){
        const date = new Date(prod.exp)
        const seconds = (date.getTime())+86400;
        prod['exp'] = new Date(seconds)
    }
    const groupedProductsObject = _.groupBy(ungroupedProducts, 'name');
    const groupedProductsArr = Object.entries(groupedProductsObject);
    return groupedProductsArr;
}
export default useGrouping;