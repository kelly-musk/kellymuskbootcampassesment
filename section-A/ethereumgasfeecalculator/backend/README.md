# Ethereum Gas Fee Calculator

A simple web application to calculate Ethereum transaction gas fees in real-time, including an ETH to USD converter.

## Features

- Calculate transaction costs based on gas price and gas limit
- Fetch live Ethereum price from external API
- Preset gas limits for common transaction types
- ETH to USD conversion
- Responsive design with modern UI

## Technologies Used

- **Backend**: Node.js with built-in HTTP server
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: FreeCryptoAPI for live ETH prices

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ethereumgasfeecalculator
   ```

2. Install dependencies (if any):
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your API key: `API_KEY=your_api_key_here`

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter the gas price in Gwei
2. Select a gas limit using presets or enter custom value
3. Input the current ETH price in USD
4. Click "Calculate Transaction Cost" to see results
5. Use "Get Live Price" to fetch current ETH price
6. Use the ETH to USD converter for quick conversions

## Deployment

This app can be deployed to platforms like Heroku, Railway, or Render.

### Heroku Deployment

1. Push your code to GitHub
2. Connect your Heroku app to the GitHub repository
3. Set the `API_KEY` environment variable in Heroku config vars
4. Deploy the app

### Environment Variables

- `API_KEY`: Your FreeCryptoAPI key for fetching ETH prices
- `PORT`: Server port (automatically set by deployment platforms)

## API Endpoints

- `GET /`: Serves the main HTML page
- `GET /api/eth-price`: Fetches live ETH price from external API

## Contributing

Feel free to submit issues and pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).