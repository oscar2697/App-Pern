import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options =  {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API NodeJs/Express/TypeScript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: [
        './src/router.ts'
    ]
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerUiOPtions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url('https://oscarlindo-portfolio.vercel.app/assets/logo-ef0415eb.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentación REST API Express/TypeScript'
}

export default swaggerSpec
export {
    swaggerUiOPtions
}