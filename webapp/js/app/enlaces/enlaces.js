'use strict';


app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);
app.controller('enlacesCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito'   
  };
$scope.enlaces = [];
    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    // $scope.tbOptionsPendientes = {
    // filterText: ''};
    // $scope.filter = '';
    //   $scope.tbOptionsPendientes = {
    //   bDestroy: true,
    //   pageLength: 15,
    //   data: []                                              
    // };
    
    $scope.filter = '';
      $scope.tbOptionsPublicos= {
      bDestroy: true,
      pageLength: 5,
      data: []                                        
    };

      $scope.tbOptionsPrivados = {
      bDestroy: true,
      pageLength: 15,
      data: []
                                                     
    };
   
   

 $scope.vigilante=MyService.data.contador;


    $scope.getEnlaces = function (timeout) {
      $scope.enlaces=null;
      setTimeout(function() {
           $scope.vigilante=$scope.vigilante+1;
           MyService.data.contador=$scope.vigilante;
         
   // dtInstance.rerender(); 
      
      $http.get('http://54.202.62.62:1345/enlace/').then(function (resp) {
        $scope.enlaces = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.enlacesPrivados=[];
        $scope.enlacesPublicos=[];

        var date = new Date();
        // var mes = date.getMonth();
        // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        // var odontologos = [];
        // var asistentes = [];
        // var clinicasConsultorios = [];
        // $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        // $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        // var conversations = $scope.enlaces;
        // var start_date =  Date.parse(firstDay);
        // var end_date = Date.parse(lastDay);
        // end_date=end_date+86400000;
        if ($scope.enlaces && $scope.enlaces.length > 0){
          for (var i=0;i < $scope.enlaces.length;i++){
            // var conversationDate1 =  $scope.enlaces[i].createdAt;
            // var conversationDate=Date.parse(conversationDate1);
              bandera = $scope.enlaces[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.enlaces[i].createdAtFormateada=bandera2;

              if ( $scope.enlaces[i].tipo == "privado"){
                result.push($scope.enlaces[i]);
                }
             if ( $scope.enlaces[i].tipo == "publico"){
                result3.push($scope.enlaces[i]);
                }
            // <a href class="text-info">Jessi</a>
              $scope.enlaces[i].link="<a href='"+$scope.enlaces[i].link +"'class=\"text-info\" target='_blank'> "+$scope.enlaces[i].link+"</>";
            // $scope.enlaces[i].link="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";  
            $scope.enlacesPrivados=result;
            $scope.enlacesPublicos=result3;
          }
        }
        // var identif=0;
        // if ($scope.enlacesPrivados){
        // for (var i  = 0; i<$scope.enlacesPrivados.length;i++){
        //   bandera = $scope.enlacesPrivados[i].createdAt;
        //   bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        //   $scope.enlacesPrivados[i].createdAtFormateada=bandera2;
        //   identif=$scope.enlacesPrivados[i].id;  
        //   if ($scope.enlacesPrivados[i].primerNombre){
        //   $scope.enlacesPrivados[i].nombreCompleto=$scope.enlacesPrivados[i].primerNombre+" "+$scope.enlacesPrivados[i].primerApellido;
        //   }
        //   $scope.enlacesPrivados[i].accion="";                        
        //   $scope.enlacesPrivados[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
        //   }
        // }
        // if ($scope.enlacesPublicos){
        // for (var i  = 0; i<$scope.enlacesPublicos.length;i++){
        //   bandera = $scope.enlacesPublicos[i].createdAt;
        //   bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        //   $scope.enlacesPublicos[i].createdAtFormateada=bandera2;
        //   identif=$scope.enlacesPublicos[i].id; 
        //   $scope.enlacesPublicos[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
        //   $scope.enlacesPublicos[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
        //   }
        // }

        // for (var i  = 0; i<$scope.enlacesPrivados.length;i++){
        //   if($scope.enlacesPrivados[i].letra == "a"){
        //     odontologos.push($scope.enlacesPrivados[i]);
        //   }
        //   if($scope.enlacesPrivados[i].letra == "b"){
        //     asistentes.push($scope.enlacesPrivados[i]);
        //   }
        //   if($scope.enlacesPrivados[i].letra == "c"){
        //     clinicasConsultorios.push($scope.enlacesPrivados[i]);
        //   }

        //     $scope.odontologos=odontologos;
        //     $scope.asistentes=asistentes;
        //     $scope.clinicasConsultorios=clinicasConsultorios;
        //     }     
       
        $scope.enlacesPublicos=$scope.enlacesPublicos.reverse();
        $scope.tbOptionsPublicos.data = $scope.enlacesPublicos;
        $scope.tbOptionsPublicos.aaData = $scope.enlacesPublicos;
        $scope.tbOptionsPublicos.aoColumns=[
          { mData: 'createdAtFormateada'},
          { mData: 'titulo'},
          { mData: 'descripcion'},
          { mData: 'link' } 
          ];
          $scope.enlacesPrivados=$scope.enlacesPrivados.reverse();
        $scope.tbOptionsPrivados.data = $scope.enlacesPrivados;
        $scope.tbOptionsPrivados.aaData = $scope.enlacesPrivados;
        $scope.tbOptionsPrivados.aoColumns=[
          { mData: 'createdAtFormateada'},
          { mData: 'titulo'},
          { mData: 'descripcion'},
          { mData: 'link' } 
          ];
          
   
      });
}, 500);
    };
    $scope.getEnlaces();

$scope.openBorrar = function (iden,timeout) {
  var item=[];
  var dato="";
  var datosCuenta="";
  $http.get('http://54.202.62.62:1345/enlace/'+iden).success(function(respuesta){        
    $scope.enlace = respuesta;
    $scope.item=respuesta;
    MyService.data.idenCliDel=respuesta.id;
  });
  setTimeout(function() {
    item=$scope.item;
    datosCuenta=$scope.item;
    $scope.item.datosCuenta=datosCuenta;
  }, 300);
setTimeout(function() {  var modalInstance = $modal.open({
    templateUrl: 'modalBorrar.html',
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
       $scope.getEnlaces2();
       // $state.go('app.enlaces');
    }, function () {
     
     // $log.info('Modal dismissed at: ' + new Date());
    });}, 300);
  };


 

    
  
//   if (MyService.data.contador>=1){
//    alert("mayor"+MyService.data.contador);
//     // $scope.vigilante=$scope.vigilante+1;
//  MyService.data.contador=MyService.data.contador+1;
//   // $scope.getMembers3();
  
//  }
// if (MyService.data.contador<1){
//    alert("menor"+MyService.data.contador);
//     // $scope.vigilante=$scope.vigilante+1;
// MyService.data.contador=MyService.data.contador+1;
//   // $scope.getEnlaces();

//  }
    
//  $scope.popAprobacion = function(){
//     toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
//   };

//  $scope.Aprobacion = function (iden,timeout) {
//   MyService.data.idenMiembro= iden;

//   var miembroAct={"status":"actualizado"};

//    $scope.popAprobacion();
//       $http.put('http://54.202.62.62:1345/miembro/'+MyService.data.idenMiembro, miembroAct)
//    $scope.getEnlaces2();
//    setTimeout(function() {
//     $state.go('app.dashboard-v1');
//    }, 300);

//     // $state.go('app.enlaces');
// };

}]);
