import * as clientService from './clientServices'

export const getClients = async (req, res) => {
    try{
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    }catch(err){
        console.log("Error getting data", err);
        res.status(500).json({message: "Internal Server Error"})
    }
}