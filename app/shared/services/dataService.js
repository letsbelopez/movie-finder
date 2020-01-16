sharedModule
  .factory('dataservice', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http) {
  const service = {
    get: get,
    films: []
  };
  return service;

  function get() {
    return $http
      .get('https://drafthouse.com/s/mother/v1/page/market/main/austin')
      .then(getDataComplete)
      .catch(getDataFailed);

    function getDataComplete(response) {
      service.films = response.data.data.films;
      return response;
    }

    function getDataFailed(error) {
      console.error('XHR Failed for get.' + error.data);
    }
  }
}
