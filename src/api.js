import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_API_URL

export async function fetchCryptoData() {
    try {
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
                supply: parseInt(roundToNDecimalPlaces(crypto.supply, 0)),
                maxSupply: parseInt(roundToNDecimalPlaces(crypto.maxSupply, 0)),
                marketCapUsd: parseInt(roundToNDecimalPlaces(crypto.marketCapUsd, 0)),
                volumeUsd24Hr: parseInt(roundToNDecimalPlaces(crypto.volumeUsd24Hr, 0)),
                priceUsd: parseFloat(roundToNDecimalPlaces(crypto.priceUsd, 10)),
                vwap24Hr: parseInt(roundToNDecimalPlaces(crypto.vwap24Hr, 0)),
                rank: parseInt(crypto.rank),
            };
        });
        console.log(filteredAndRoundedData)
        return filteredAndRoundedData;
    } catch (error) {
        console.error('Error in downloading data', error);
        throw error;
    }
}
