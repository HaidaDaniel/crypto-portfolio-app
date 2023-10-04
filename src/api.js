import axios from "axios";

const apiUrl = "http://localhost:4000/graphql"; // Укажите правильный URL для вашего локального сервера GraphQL

export async function fetchCryptoData() {
    try {
        const graphqlQuery = `
      {
        allCryptos {
          id
          rank
          symbol
          name
          supply
          maxSupply
          marketCapUsd
          volumeUsd24Hr
          priceUsd
          changePercent24Hr
          vwap24Hr
          explorer
        }
      }
    `;

        const response = await axios.post(
            apiUrl,
            {
                query: graphqlQuery,
            },
        );

        const rawData = response.data.data.allCryptos;
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
