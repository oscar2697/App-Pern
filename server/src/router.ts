import { Router } from "express"
import { CreateProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties: 
 *          id:
 *              type: integer
 *              description: The Product ID
 *              example: 1
 *          name:
 *              type: string
 *              description: The Product name
 *              example: Monitor curvo
 *          price:
 *              type: numer
 *              description: The Product price
 *              example: 300
 *          availability:
 *              type: boolean
 *              description: The Product availability
 *              example: true
 */

router.get('/', getProduct)
/**
 * @swagger
 * /api/products:    
 *  get:
 *      summary: Get a list of products
 *      tags: 
 *          - Products
 *      description: Return a list of products
 *      responses: 
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                         type: array
 *                         items:
 *                              $ref: '#/components/schemas/Product'
 */

router.get('/:id',
    param('id').isInt().withMessage('ID no es válido'),
    handleInputErrors,
    getProductById
)
/**
 * @swagger
 * /api/products/{id}:
 *  get: 
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses: 
 *          200:
 *              description: Successful reponse
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.post('/',
    body('name')
        .notEmpty().withMessage('Se debe escribir el nombre del Producto'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('Se debe escribir el precio del Producto')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    CreateProduct
)
/**
 * @swagger
 * /api/products/:
 *  post:
 *      summary: Creates a new Product
 *      tags: 
 *          - Products
 *      description: Return a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo"
 *                          price: 
 *                              type: number
 *                              example: 300
 *      responses: 
 *          201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input data
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no es válido'),
    body('name')
        .notEmpty().withMessage('Se debe escribir el nombre del Producto'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('Se debe escribir el precio del Producto')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no es válido'),
    handleInputErrors,
    updateProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  put: 
 *      summary: Updates a product with user input
 *      tags: 
 *          - Products
 *      description: Returns the updated product
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo"
 *                          price: 
 *                              type: number
 *                              example: 300
 *                          availability: 
 *                              type: boolean
 *                              example: true
 *      responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid Input data
 *              404:
 *                  description: Product not found
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no es válido'),
    handleInputErrors,
    updateAvailability
)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products 
 *      description: Return the updated availability
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID 
 *              404:
 *                  description: Product not found
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no es válido'),
    handleInputErrors,
    deleteProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product giveb by ID
 *      tags:
 *          - Products 
 *      description: Returns a confirmation message
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema: 
 *              type: integer
 *      responses: 
 *              200:
 *                  description: Successful delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID 
 *              404:
 *                  description: Product not found
 */

export default router