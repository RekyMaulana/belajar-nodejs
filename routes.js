const fs = require ('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>')
        res.write(
            `
            <body>
              <form action ="/message" method="POST">
              <label>nama</label>
                <input type ="text" name ="message"  /> <br>
                <label>email</label>
                <input type ="text" name ="message"  /> <br>
                <label>job</label>
                <input type ="text" name ="message"  />
                <button type ="submit">
                submit
                </button>
              </form>
            </body>
            `
            ,
        );

        res.end();
    }

    if ( url === '/message' && method === "POST") {
        const body = [];
        req.on('data', chunk => {
            console.log('chunk', chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=') [1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('location', '/');
                return res.end();
            });
        })
    }
};


module.exports = {
    requestHandler,
};