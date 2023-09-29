import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL

export async function fetchCryptoData() {
    try {
        console.log(apiUrl)
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        const rawData = response.data.data;
        const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
        const roundToNDecimalPlaces = (value, n) => {
            if (isNumber(value)) {
                return parseFloat(value).toFixed(n);
            }
            return value;
        };
        const filteredAndRoundedData = rawData.map((crypto) => {
            return {
                ...crypto,
                supply: roundToNDecimalPlaces(crypto.supply, 4),
                maxSupply: roundToNDecimalPlaces(crypto.maxSupply, 4),
                marketCapUsd: roundToNDecimalPlaces(crypto.marketCapUsd, 4),
                volumeUsd24Hr: roundToNDecimalPlaces(crypto.volumeUsd24Hr, 4),
                priceUsd: roundToNDecimalPlaces(crypto.priceUsd, 4),
                vwap24Hr: roundToNDecimalPlaces(crypto.vwap24Hr, 4),
                rank: parseInt(crypto.rank),
            };
        });
        return filteredAndRoundedData;
    } catch (error) {
        console.error('Error in downloading data', error);
        throw error;
    }
}
