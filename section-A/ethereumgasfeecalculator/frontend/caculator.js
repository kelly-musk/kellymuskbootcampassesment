class EthTransactionCalculator {
    static gweiToEth(gwei) { return gwei / 1000000000; }
    static calculateEthCost(gasPriceGwei, gasLimit) { return (gasPriceGwei * gasLimit) / 1000000000; }
    static calculateUsdCost(ethCost, ethPriceUsd) { return ethCost * ethPriceUsd; }
    static formatCurrency(amount, isEth = true) {
        return isEth ? amount.toFixed(8) + ' ETH' : '$' + amount.toFixed(5);
    }
}

// NEW: ETH Converter Elements
const ethAmountInput = document.getElementById('ethAmount');
const convertBtn = document.getElementById('convertBtn');
const conversionResult = document.getElementById('conversionResult');

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const gasPriceInput = document.getElementById('gasPrice');
    const gasLimitInput = document.getElementById('gasLimit');
    const ethPriceInput = document.getElementById('ethPrice');
    const calculateBtn = document.getElementById('calculateBtn');
    const fetchLivePriceBtn = document.getElementById('fetchLivePrice');
    const ethPriceDisplay = document.getElementById('ethPriceDisplay');
    const ethCostDisplay = document.getElementById('ethCost');
    const usdCostDisplay = document.getElementById('usdCost');
    const presetButtons = document.querySelectorAll('.preset-btn');

    let currentEthPrice = parseFloat(ethPriceInput.value) || 2500;
    updateDisplay();
    setupPresetButtons();

    calculateBtn.addEventListener('click', calculateCost);
    fetchLivePriceBtn.addEventListener('click', fetchLiveEthPrice);

    function setupPresetButtons() {
        presetButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                presetButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const limit = parseInt(this.dataset.limit);
                if (limit > 0) gasLimitInput.value = limit;
            });
        });
        presetButtons[0].classList.add('active');
    }

    function calculateCost() {
        if (!validateInputs()) return;
        const gasPrice = parseFloat(gasPriceInput.value);
        const gasLimit = parseInt(gasLimitInput.value);
        const ethCost = EthTransactionCalculator.calculateEthCost(gasPrice, gasLimit);
        const usdCost = EthTransactionCalculator.calculateUsdCost(ethCost, currentEthPrice);
        ethCostDisplay.textContent = EthTransactionCalculator.formatCurrency(ethCost, true);
        usdCostDisplay.textContent = EthTransactionCalculator.formatCurrency(usdCost, false);
    }

    // Convert ETH to USD
    function convertEthToUsd() {
        // Validate input
        if (!ethAmountInput.value || parseFloat(ethAmountInput.value) <= 0) {
            showError('Please enter a valid ETH amount', ethAmountInput);
            return;
        }

        const ethAmount = parseFloat(ethAmountInput.value);
        const usdValue = ethAmount * currentEthPrice;

        // Update display with formatted result
        conversionResult.textContent = `$${usdValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

        // Clear any previous error
        clearError.call(ethAmountInput);
    }

    // Event listener for ETH amount input (auto-convert on Enter)
    ethAmountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertEthToUsd();
        }
    });

    // Also update the convert button event listener
    convertBtn.addEventListener('click', convertEthToUsd);

    // Auto-update conversion when ETH price changes
    ethPriceInput.addEventListener('input', function() {
        currentEthPrice = parseFloat(this.value) || 0;
        // If there's already an ETH amount, update the conversion
        if (ethAmountInput.value && parseFloat(ethAmountInput.value) > 0) {
            convertEthToUsd();
        }
    });

    async function fetchLiveEthPrice() {
        const button = fetchLivePriceBtn;
        const originalText = button.textContent;

        try {
            button.disabled = true;
            button.textContent = 'Fetching...';
            ethPriceDisplay.textContent = 'Loading...';

            const response = await fetch('http://localhost:3000', {
                method: 'GET'
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            let price = null;
            if (data && data.symbols && data.symbols.length > 0) {
                price = data.symbols[0].last;
            }

            if (price !== null) {
                currentEthPrice = parseFloat(price);
                ethPriceInput.value = currentEthPrice;
                ethPriceDisplay.textContent = `$${currentEthPrice.toFixed(2)}`;

                // Recalculate transaction cost
                if (gasPriceInput.value && gasLimitInput.value) {
                    calculateCost();
                }

                // NEW: Auto-convert if ETH amount is entered
                if (ethAmountInput.value && parseFloat(ethAmountInput.value) > 0) {
                    convertEthToUsd();
                }
            } else {
                throw new Error('Cannot find price in API response');
            }
        } catch (error) {
            ethPriceDisplay.textContent = 'Error loading';
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    }

    function validateInputs() {
        let isValid = true;
        if (!gasPriceInput.value || parseFloat(gasPriceInput.value) <= 0) {
            showError('Please enter valid gas price', gasPriceInput);
            isValid = false;
        }
        if (!gasLimitInput.value || parseInt(gasLimitInput.value) <= 0) {
            showError('Please enter valid gas limit', gasLimitInput);
            isValid = false;
        }
        if (!ethPriceInput.value || parseFloat(ethPriceInput.value) <= 0) {
            showError('Please enter valid ETH price', ethPriceInput);
            isValid = false;
        }
        return isValid;
    }

    function showError(message, inputElement) {
        const errorId = inputElement.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.style.borderColor = '#ef4444';
        }
    }

    function clearError() {
        const errorId = this.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
            this.style.borderColor = '#e0e0e0';
        }
    }

    function updateDisplay() {
        ethPriceDisplay.textContent = `$${currentEthPrice.toFixed(2)}`;
    }

    calculateCost();
});