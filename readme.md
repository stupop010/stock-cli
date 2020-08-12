## Stock CLI

A command line interface written in Node.js to check stock prices

Register an API key at https://www.alphavantage.co/

## Usage

    npm install

    npm link

## Commands

    # Help & Commands
    sck -h

    # Version
    sck -V

    # Key Commands
    sck key set  -- set api key
    sck key get  -- get your api key
    sck key delete  -- delete your api key

    # Search options
    sck search -s <search> [market] -- search for a stock

    # Stock options
    sck search -s <symbol> [days]  -- search for a stock
    sck search -d <symbol> [weeks]  -- Get info about a stock from the last number of days
    sck search -w <symbol> [months]  -- Get info about a stock from the last number of weeks
    sck search -m <symbol> [months]  Get info about a stock from the last number of months

## Version

1.0.0

## License

MIT
