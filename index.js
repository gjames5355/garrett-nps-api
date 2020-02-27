
const apiKey = 'kokRPltf9QfFSu2zjzyxJNp3pNHjImRlv4PC86C2';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>
      </li>
      `
    );

    $('#results').removeClass('hidden');
  }
}

function getParksData(query, maxResults) {
  const params = {
    stateCode: query,
    limit: maxResults
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString + '&api_key=kokRPltf9QfFSu2zjzyxJNp3pNHjImRlv4PC86C2';

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}


function watchForm() {
  $('#js-form').on('submit', e => {
    e.preventDefault();
    const stateInput = $('#location').val();
    const maxResults = $('#max-results').val();
    getParksData(stateInput, maxResults);
  });
}


$(watchForm);