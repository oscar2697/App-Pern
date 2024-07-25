import server from "./server";
import colors from 'colors';

const port = process.env.PORT || 3000

server.listen(3000, () => {
    console.log(colors.cyan.bold(`API en el puerto ${port}`))
})