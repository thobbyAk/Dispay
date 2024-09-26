import axios from "axios"
import { NextApiResponse, NextApiRequest } from "next";


export default async function getAllGroups(req: NextApiRequest, res: NextApiResponse) {
    try{
          const baseUrl = `${process.env.TESTURL}/groups`;
          const response = await axios.get(baseUrl);
          res.status(200).json({
          data: response.data,
          });

    }catch (e){
        console.log("error", e);
        res.status(500).send({ e });
    }

}