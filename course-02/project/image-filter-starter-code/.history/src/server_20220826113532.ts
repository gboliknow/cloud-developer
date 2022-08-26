import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Router, Request, Response } from 'express';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
 
  app.use(bodyParser.json());


  app.get( "/filteredimage", async (req: Request, res:Response ) => {
    const image_url:string = req.query["image_url"]
  if(!image_url){
    return res.status(400).send({ message: 'Invalid Url' });
  }
   const filteredImage = await filterImageFromURL(image_url)
 
    res.status(200).sendFile( filteredImage)
    
 res.on("finish" ,() => deleteLocalFiles( [ filteredImage])  )
    

  } );


  
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();