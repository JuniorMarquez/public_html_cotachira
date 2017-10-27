// 'use strict';angular.module('paginaPrincipal', []).controller('unicoCtrl',['$scope','$http',function($scope,$http) {$scope.horario="hola";$scope.congiguracion=[];$http.get('http://54.202.62.62:1345/configuracion').success(function(respuesta){$scope.configuracion=respuesta.results[0];$scope.texto=$scope.configuracion.mision;$scope.texto2=$scope.configuracion.vision;$scope.junta=$scope.configuracion.junta;$scope.tribunal=$scope.configuracion.tribunal;$scope.diasAtencion=$scope.configuracion.diasAtencion;$scope.horario=$scope.configuracion.horario;});}]);
'use strict';
angular.module('paginaPrincipal', []).controller('unicoCtrl',['$scope','$http',function($scope,$http) {$scope.horario="hola";
 $scope.congiguracion=[];
 $http.get('http://54.202.62.62:1345/miembro/?letra=a' ).success(function(respuesta){
      $scope.miembros = respuesta.results; 
        $scope.totalOdontologos=respuesta.total;
    });
 $http.get('http://54.202.62.62:1345/configuracion').success(function(respuesta){
 		$scope.configuracion = respuesta.results[0];
        $scope.texto=$scope.configuracion.mision;
        $scope.texto2=$scope.configuracion.vision;
        $scope.diasAtencion=$scope.configuracion.diasAtencion;
        $scope.horario=$scope.configuracion.horario;
        
      });
 $http.get('http://54.202.62.62:1345/electoral').success(function(respuesta){
 		$scope.electoral = respuesta.results;
      });
$http.get('http://54.202.62.62:1345/directiva').success(function(respuesta){
 		$scope.directiva = respuesta.results;
      });
$http.get('http://54.202.62.62:1345/comite').success(function(respuesta){
 		$scope.comite = respuesta.results;
      });
$http.get('http://54.202.62.62:1345/deporte').success(function(respuesta){
 		$scope.deporte = respuesta.results;
      });
 


}]);