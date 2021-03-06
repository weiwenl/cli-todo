console.log("works!!", process.argv[2], process.argv[3]);

// require the module
const pg = require('pg');

// set all of the configuration in an object
const configs = {
    user: 'weiwenlee',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

var showList = () => {
  let text = 'SELECT * FROM items ORDER BY id ASC';

  client.query(text, (err, res) => {
    if (err) {
      console.log("query error", err.message);
    }

    else {
      for( let i=0; i<res.rows.length; i++ ){
         let items = res.rows[i];
         if (items.status === true){
           let str = `${items.id}. [X] - ${items.name}`;
           console.log(str);
         }
         else{
           let str = `${items.id}. [ ] - ${items.name}`;
           console.log(str);
         }
      }
    }
  });
}


// create a new instance of the client
const client = new pg.Client(configs);

// connect to the client
client.connect((err) => {
  if( err ){
    console.log( "error", err.message );
  }

  // show list
  if(process.argv[2] === 'show'){
    // if connection is successful, call the query method
    // if query is successful, log the result

    // set up what to query
    let text = 'SELECT * FROM items ORDER BY id ASC';

    client.query(text, (err, res) => {
      if (err) {
        console.log("query error", err.message);
      }

      else {
        for( let i=0; i<res.rows.length; i++ ){
           let items = res.rows[i];
           if (items.status === true){
             let str = `${items.id}. [X] - ${items.name}`;
             console.log(str);
           }
           else{
             let str = `${items.id}. [ ] - ${items.name}`;
             console.log(str);
           }
        }
      }
    });
  }

  // add stuff into list
  else if(process.argv[2] === 'add'){

    // if connection is successful, call the query method
    // if query is successful, add the values

    // set up what to query
    // returning allows you to see what you inserted
    // let text = "INSERT INTO items (id, name) VALUES ($1, $2) RETURNING (id, name)"
    // const values = [process.argv[3], process.argv[4]];
    let text = "INSERT INTO items (name) VALUES ($1) RETURNING (id, name)"
    const values = [process.argv[3]];
    client.query(text, values, (err, res) => {

          if (err) {
            console.log("query error", err.message);
          }

          else {
            console.log(res.rows);
          }
        });
  }

  // mark stuff to "done" in the list
  else if(process.argv[2] === 'done'){
    // if connection is successful, call the query method
    // if query is successful, mark done on the to-do list
    id = parseInt(process.argv[3]);
    let text = 'UPDATE items SET status=true WHERE id=' + id;
    //let text = "UPDATE items SET status='true' WHERE id = ($1) RETURNING (id, name)";
    //let text = 'SELECT * FROM items ORDER BY id ASC';

    client.query(text, (err, res) => {
      if (err) {
        console.log("query error", err.message);
      }

      else {
        for( let i=0; i<res.rows.length; i++ ){
           let items = res.rows[i];
           if (items.status === true){
             let str = `${items.id}. [X] - ${items.name}`;
             console.log(str);
           }
           else{
             let str = `${items.id}. [ ] - ${items.name}`;
             console.log(str);
           }
        }
      }
    });
  }
});
