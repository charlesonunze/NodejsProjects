const express = require( 'express' );
const hbs = require( 'hbs' );
const fs = require( 'fs' );
const app = express();
const port = 3000;

hbs.registerPartials( __dirname + '/views/partials' );
app.set( 'view engine', 'hbs' );
app.use( express.static( __dirname + '/public' ) );
app.use( ( req, res, next ) => {
  let now = new Date().toString();
  let log = `${ now}: ${ req.method} ${ req.url }`;

  fs.appendFile( 'server.log', `${ log } \n`, ( err ) => {
    if ( err ) 
      console.log( err );
    else 
      console.log( 'Success...' );
    }
  );
  next();
} );
hbs.registerHelper( 'getCurrentYear', () => {
  return new Date().getFullYear();
} );

app.get( '/', ( req, res ) => {
  res.send( 'Yollo!' );
} );

app.get( '/about', ( req, res ) => {
  res.render( 'about.hbs', { pageTitle: 'AboutHBS' } );
} );

app.listen( port, () => {
  console.log( `Server Starts on ${ port }` );
} );
