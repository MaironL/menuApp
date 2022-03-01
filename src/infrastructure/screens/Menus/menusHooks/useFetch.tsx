const axios = require('axios').default;

const apiKey = '&apiKey=b653baae85fa4d108d027cf905c7dd2a&includeNutrition=false';

const useFetch = () => {
  const fetch = async () => {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch?query=p&number=60&addRecipeInformation=true' +
        apiKey
    );
    console.log('Data :', response);
    //return data;
  };

  return { fetch };
};

export default useFetch;
