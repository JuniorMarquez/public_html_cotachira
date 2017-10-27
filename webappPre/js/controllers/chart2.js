'use strict';

/* Controllers */


/* Controllers */
app.directive('uppercased', function() {
    return {
        require: 'ngModel',        
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
        }
    };
});

app
  // Flot Chart controller 
  .controller('FlotChartDemoCtrl2', ['$scope', '$http','$modal','MyService','$state','$filter','datepickerConfig','toaster',function($scope,$http,$modal,MyService,$state,$filter,datepickerConfi,toaster) {
//       if (typeof MyService.data.email==="undefined"){
//   $state.go('access.signin');
// }
  $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Datos de cuenta actualizados con exito',
  };
  $scope.filter = '';

  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };
    $scope.item={};
        var result = [];

  $http.get('http://52.39.15.75:1345/municipio').then(function (resp) {
    $scope.municipios = resp.data.results;
  });
  $http.get('http://52.39.15.75:1345/universidad').then(function (resp) {
    $scope.universidades = resp.data.results;
  });
  $http.get('http://52.39.15.75:1345/especialidad').then(function (resp) {
    $scope.especialidades = resp.data.results;
  });
   $http.get('http://52.39.15.75:1345/directiva').then(function (resp) {
    $scope.listadoDirectiva = resp.data.results;
  });
    $http.get('http://52.39.15.75:1345/comite').then(function (resp) {
    $scope.listadoComite = resp.data.results;
  });
$scope.estados = ['soltero(a)','casado(a)','divorciado(a)','viudo(a)'];
 $scope.nacionalidades = ['V','E'];
// $scope.municipios = ['libertad','independencia','cordova','san cristobal'];
// $scope.universidades =[ 'ULA','LUZ'];
// $scope.especialidades = [ 'Ortodoncia','Endodoncia'];
        
        $scope.anos=[];
        for (var i = 0; i < 88; ++i)
          {
            result.push(i+1930);
           $scope.anos=result;
        };

      var dato="";
  var datosCuenta="";
  $scope.nombre=MyService.data.nombre;

$scope.cargaInicial=function  () {
  $scope.estados = ['soltero(a)','casado(a)','divorciado(a)','viudo(a)'];
  $scope.anos=[];
        for (var i = 0; i < 88; ++i)
          {
            result.push(i+1930);
           $scope.anos=result;
        };
        $scope.anos=$scope.anos.reverse();
var totalOdontologos=0;
 var totalAsistentes=0;
 var totalClinicasConsultorios=0;
 var totalPendientes=0;
 var pendientes=0;
    $http.get('http://52.39.15.75:1345/miembro').then(function (resp) {
    $scope.miembros = resp.data.results;
 var numero = $scope.miembros.length;
 $scope.total= numero;
 for (var i = 0;i<$scope.miembros.length;i++){
    if ($scope.miembros[i].tipo=='Odontologo'){totalOdontologos=totalOdontologos+1;}    
    if ($scope.miembros[i].tipo=='Clinica/consultorio'){totalClinicasConsultorios=totalClinicasConsultorios+1};
    if ($scope.miembros[i].tipo=='Asistente'){totalAsistentes=totalAsistentes+1;} 
    if ($scope.miembros[i].status=='pendiente'){totalPendientes=totalPendientes+1;}    
 }
  $scope.totalPendientes=totalPendientes;
 $scope.totalOdontologos=totalOdontologos;
 $scope.totalAsistentes=totalAsistentes;
 $scope.totalClinicasConsultorios=totalClinicasConsultorios;
  });
};

$scope.cargaInicial();



$scope.guardar = function(item){
    // $scope.pop();
    item.letra="a";
      item.tipo="Odontologo";
      
      item.nivel=3;
    item.status='actualizado';
    $http.put('http://52.39.15.75:1345/miembro/'+MyService.data.idUsuario, item)
    $modalInstance.close();
     $state.go('app.ok');
};
  $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.totalMiembros=0;
    $scope.consultores=[];
    $scope.cargaMiembros = function(){
      $http.get('http://52.39.15.75:1345/miembro/').then(function (resp) {
        $scope.miembros = resp.data.results;
        // for (var i=0;i<$scope.consultores.length;++i){
        //   if($scope.consultores[i].sexo=='Macho'){
        //     $scope.consultores.push($scope.consultores[i]);
        //   }
        // }
        $scope.totalMiembros=$scope.miembros.length;
      });
    };
  $scope.cargaMiembros();
  $scope.openMision = function () {

// var dato="";
      var datosCuenta="";
      var item={};
//     $scope.item={};
    // $http.get('http://52.39.15.75:1345/configuracion').success(function(respuesta){
    //     $scope.configuracion = respuesta.results[0];
    //     $scope.item.mision=respuesta.results[0].mision; 
    // });
    // setTimeout(function() {    
    //   datosCuenta=$scope.item;
    //   $scope.item.datosCuenta=datosCuenta;
    //   MyService.data.mision=$scope.item.mision;
    // }, 300);
    // $scope.item.datosCuenta=datosCuenta;
    // setTimeout(function() {  
        // $scope.item.mision=MyService.data.mision;
       
        // var item=[];
        // item=$scope.item;
        //  // alert ("hola"+item.mision);
        //  // var datosCuenta=[];
        //  datosCuenta=item;
        //  alert(""+datosCuenta.mision);
        var modalInstance = $modal.open({
        templateUrl: 'modalMision.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
            dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
   });

};

    $scope.openListadoEspecialidades = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoEspecialidades.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
        resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openEspecialidad = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalEspecialidad.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
              dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


    $scope.openListadoUniversidades = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoUniversidades.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
        resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openUniversidad = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalUniversidad.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
        resolve: {
              dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  // Municipios 

    $scope.openListadoMunicipios = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoMunicipios.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openMunicipio = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalMunicipio.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
              dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

   // Fin municipios 


    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }])
  ; 





  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {

    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };


    $scope.d = [ [1,12],[2,11],[3,12],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50], [20, 60], [30, 90], [40, 35] ];

    $scope.d1_3 = [ [10, 80], [20, 40], [30, 30], [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.sin(i)]);
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }
 function activate() {
       $scope.filter = '';
    

    };
 
  }]);