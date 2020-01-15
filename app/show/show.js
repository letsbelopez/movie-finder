'use strict';

var showModule = angular
  .module('myApp.show', ['ngRoute'])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/show/:filmSlug', {
        templateUrl: 'show/show.html',
        controller: 'ShowController',
        controllerAs: 'vm'
      });
    }
  ])
  .controller('ShowController', ShowController);

ShowController.$inject = ['dataservice', '$routeParams'];

function ShowController(dataservice, $routeParams) {
  const vm = this;
  vm.film = null;
  vm.filmSlug = $routeParams.filmSlug;

  activate();

  function activate() {
    if (dataservice.films.length) {
      loadFilm();
    } else {
      dataservice.get().then(() => {
        loadFilm();
      });
    }
  }

  function loadFilm() {
    vm.film = dataservice.films.find(film => film.slug === vm.filmSlug);
    console.log(vm.film);
  }
}
