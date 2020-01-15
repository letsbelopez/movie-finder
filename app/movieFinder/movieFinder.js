'use strict';

var movieFinderModule = angular
  .module('myApp.movieFinder', ['ngRoute'])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/movie-finder', {
        templateUrl: 'movieFinder/movieFinder.html',
        controller: 'MovieFinderController',
        controllerAs: 'vm'
      })
    }
  ])
  .controller('MovieFinderController', MovieFinderController);

MovieFinderController.$inject = ['dataservice'];

function MovieFinderController(dataservice) {
  const vm = this;
  vm.cinemas = [];
  vm.currentCinema = null;
  vm.marketData = null;
  vm.sessions = [];
  vm.films = [];
  vm.availableFilms = [];

  vm.getFilmsForCinema = getFilmsForCinema;

  activate();

  function activate() {
    return getMarketData();
  }

  function getMarketData() {
    return dataservice.get().then(function(response) {
      vm.marketData = response.data.data;
      vm.sessions = vm.marketData.sessions;
      vm.films = vm.marketData.films;
      vm.cinemas = response.data.data.market.cinemas;
    });
  }

  function getFilmsForCinema(id) {
    vm.currentCinema = vm.cinemas.find(cinema => cinema.id === id);
    const availableSessions = vm.sessions.filter(session => {
      return session.cinemaId === id;
    });
    // remove duplicate films from available sessions
    vm.availableFilms = availableSessions.filter((session, index, self) => {
      return (
        index ===
        self.findIndex(t => {
          return t.filmSlug === session.filmSlug;
        })
      );
    });
  }
}
