const { forEach } = require('async');
const express  = require('express');
const { type } = require('os');
const router   = express.Router();
var path       = require('path');
var products   = require('../services/product.service.js');

router.get('/', index);
router.get('/products', viewProducts);
router.get('/product/*', viewProduct);
router.get('/add-product', viewAddProductForm);
router.post('/add-product', addProduct);
router.get('/remove-product', viewRemoveProductForm);
router.delete('/remove-product/*', removeProduct);
router.get('/update-product/*', viewUpdateProductForm);
router.put('/update-product', updateProduct);

function index(req, res, next){
    res.render('index', {
        title : "Home"
    });
}

function viewProducts(req, res, next){
    res.render('products', {
        title : 'Nos Produits',
        categories : getCategories(),
        products : products.getProducts
    })
}

function viewProduct(req, res, next){
    let prop = req.params[0];
    if(!prop[0]){
        res.render('page404', {
            title : '404 error'
        })
    }

    let product = products.getProduct(prop)

    res.render('product', {
        title : product.name,
        product : product
    })
}


function viewAddProductForm(req, res, next){

    res.render('AddProduct', {
        title : "Ajouter un Produit",
        categories : getCategories()
    })
}

function addProduct(req, res){

    let formResp = req.body;
    let product = {
        name : formResp.name,
        quantity : formResp.quantity,
        img : formResp.img_url,
        date : formResp.date,
        livraison : typeof(formResp.livraison)!=='undefined',
        categorie : formResp.categorie,
        prix : formResp.prix
    }

    let error = false;
    for (const [key, value] of Object.entries(product)) {
        if(value===""){
            error = true;
        }
    }
    
    if(error){
        res.render('AddProduct', {
            title : "Ajouter un Produit",
            categories : getCategories(),
            error : error
        })
    } else {
        products.saveProduct(product)

        res.render('AddProduct', {
            title : "Ajouter un Produit",
            categories : getCategories(),
            error : error
        })
    }
    
}

function viewRemoveProductForm(req, res, next){

    productsByCategories = getProductsByCategories()

    res.render('removeProduct', {
        title : 'Supprimer un Produit',
        productsByCategories : productsByCategories
    })

}

function removeProduct(req,res,next){
    
    let prop = req.params[0];

    if(!prop[0]){
        res.send({
            error : true
        })
        
    } else {
        res.send({
            product : products.getProduct(parseInt(prop)),
            error : !products.deleteProduct(parseInt(prop))
        })
    }
}

function viewUpdateProductForm(req, res, next){
    let prop = req.params[0];
    if(!prop[0]){
        res.render('page404', {
            title : '404 error'
        })
    }

    let product = products.getProduct(prop)

    
    res.render('updateProduct', {
        title : "Modifier un Produit",
        categories : getCategories(),
        product : product
    })
}

function updateProduct(req, res, next){
    let product = req.query['product']
    if(product){
        let productJSON = JSON.parse(product)
        res.send({
            id : productJSON.id,
            error : !products.updateProduct(productJSON)
        })
    } else {
        res.send({
            error : true
        })
    }
}

function getCategories(){
    var array = products.getProducts
    var categories = []
    array.forEach(product => {
        if(categories.indexOf(product.categorie) === -1){
            categories.push(product.categorie); a
        }
    });
    return categories
}

function getProductsByCategories(){
    let allProducts = products.getProducts
    let productsByCategories = []
    allProducts.forEach(product => {
        let categorie = product.categorie;

        if(typeof(productsByCategories[categorie]) === 'undefined')
            productsByCategories[categorie] = [product]
        else
            productsByCategories[categorie].push(product)
    });

    return productsByCategories;
}
module.exports = router;