const { match } = require('assert');
const Product = require('../models/product')

//this is very imp --- kyuki hm yha sab ka logic likhege ki name rating procing feature etc ko 
//type kiya to kya hoga wo yhu se decide hoga 

const getAllProductsStatic = async (req, res) => {
    //Insted of setting up trycatch and middleware  we simply just use a pacakage that does all the work for us 
    // that package that does all the thing for us is  npm i express-async-errors
    // throw new Error('testing sdync error ')
    const products = await Product.find({ price: { $gt: 30 } })
      .sort('price')
      .select('name price').limit(4);
    res.status(200).json({ products, nbHits: products.length });
  };

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {} 
  
    //this is our  logics 

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
      }
      if (company) {
        queryObject.company = company;
      }
      if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
      }

      //this is our numaricfilter 
      
    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
      }
    console.log(queryObject)


    let result = Product.find(queryObject);
    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
  //fields
    if (fields) {
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;  
  
    
    result = result.skip(skip).limit(limit);
    // 23
    // 4 7 7 7 2
  
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  };
  
           
module.exports = {
    getAllProducts, 
    getAllProductsStatic,
}















