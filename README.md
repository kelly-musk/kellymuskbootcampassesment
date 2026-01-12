# ⛽ Ethereum Gas Fee Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)

A modern, responsive web application to calculate Ethereum transaction gas fees in real-time, featuring live price fetching and an ETH to USD converter.

## ✨ Features

- 🔢 **Gas Cost Calculation**: Compute transaction costs based on gas price (Gwei) and gas limit
- 📈 **Live Price Fetching**: Get real-time Ethereum prices from FreeCryptoAPI
- 🎯 **Preset Gas Limits**: Quick-select common transaction types (Send ETH, ERC-20 Transfer, etc.)
- 💱 **ETH to USD Converter**: Instant conversion between ETH and USD
- 📱 **Responsive Design**: Modern UI that works on desktop and mobile
- ⚡ **Real-time Updates**: Automatic price updates and calculations

## 🏗️ Project Structure

```
ethereumgasfeecalculator/
├── backend/
│   ├── server.js          # Node.js HTTP server
│   ├── package.json       # Backend dependencies and scripts
│   └── .env              # Environment variables (API key)
├── frontend/
│   ├── index.html        # Main HTML page
│   ├── caculator.js      # Frontend JavaScript logic
│   └── style.css         # CSS styling
├── .gitignore           # Git ignore rules
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **Backend**: Node.js with built-in HTTP server
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: FreeCryptoAPI for live ETH prices
- **Styling**: Custom CSS with modern design patterns

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ethereumgasfeecalculator
   ```

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the `backend/` directory
   - Add your FreeCryptoAPI key: `API_KEY=your_api_key_here`

5. **Start the server**:
   ```bash
   npm start
   ```

6. **Open your browser** and navigate to `http://localhost:3000`

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
