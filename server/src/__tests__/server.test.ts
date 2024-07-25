import { connectDb } from "../server";
import db from "../config/db";

jest.mock('../config/db')

describe('connectDb', () => {
    it('Should handle database conection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Error al conectarse a la Base de Datos'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDb()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectarse a la Base de Datos')
        )
    })
})