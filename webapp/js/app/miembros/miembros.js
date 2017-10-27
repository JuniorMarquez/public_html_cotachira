'use strict';


app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);
app.controller('miembrosCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito',

    title2: 'Exito',
    type2: 'success',
    text2: 'Miembro borrado con exito'   
  };
$scope.miembros = [];
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
    $scope.tbOptionsPendientes = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptionsPendientes = {
      bDestroy: true,
      pageLength: 150,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                        
    };

      $scope.tbOptionsOdontologos = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };
   
      $scope.tbOptionsClinicasConsultorios = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };

      $scope.tbOptionsAsistentes = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };

 $scope.vigilante=MyService.data.contador;
    $scope.getMiembros = function (timeout) {
      $scope.miembros=null;
      setTimeout(function() {
           $scope.vigilante=$scope.vigilante+1;
           MyService.data.contador=$scope.vigilante;
         
   // dtInstance.rerender(); 
        $scope.miembros = MyService.data.miembros;
        var bandera="";
        var bandera2="";
        $scope.miembrosValidados=[];
        $scope.odontologos=[];
        $scope.asistentes=[];
        $scope.clinicasConsultorios=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        var odontologos = [];
        var asistentes = [];
        var clinicasConsultorios = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.miembros;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif=0;
        if ($scope.miembros && $scope.miembros.length > 0){
          for (var i=0;i < $scope.miembros.length;i++){
            var conversationDate1 =  $scope.miembros[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
              identif=$scope.miembros[i].id;  
            if (conversationDate ){
              if ( $scope.miembros[i].status == "validado"){
               
                result.push($scope.miembros[i]);
                }
             if ( $scope.miembros[i].status == "pendiente"){
              $scope.miembros[i].accion=" <button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                                  
                result3.push($scope.miembros[i]);
                }
            }
            $scope.miembrosValidados=result;
            $scope.miembrosPendientes=result3;
          }
        }
        
        if ($scope.miembrosValidados){
        for (var i  = 0; i<$scope.miembrosValidados.length;i++){
          bandera = $scope.miembrosValidados[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.miembrosValidados[i].createdAtFormateada=bandera2;
          identif=$scope.miembrosValidados[i].id;  
           if(typeof($scope.miembrosValidados[i].especialidad) == "undefined"){
        $scope.miembrosValidados[i].especialidad="ODONTOLOGÍA GENERAL";
      }
          if ($scope.miembrosValidados[i].primerNombre){
          $scope.miembrosValidados[i].nombreCompleto=$scope.miembrosValidados[i].primerNombre+" "+$scope.miembrosValidados[i].segundoNombre+" "+$scope.miembrosValidados[i].primerApellido+" "+$scope.miembrosValidados[i].segundoApellido;
          }
          if ($scope.miembrosValidados[i].letra=="a"){
           $scope.miembrosValidados[i].accion="";                                               
           if ($scope.miembrosValidados[i].status){
        // $scope.miembrosValidados[i].accion="<button onclick=\"angular.element(this).scope().Edicion('" +identif +"')\"  class=\"btn btn-info btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Editar Status</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
         $scope.miembrosValidados[i].accion="";                        
         
           } 
          }
           
          $scope.miembrosValidados[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
        if ($scope.miembrosPendientes){
        for (var i  = 0; i<$scope.miembrosPendientes.length;i++){
          bandera = $scope.miembrosPendientes[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.miembrosPendientes[i].createdAtFormateada=bandera2;
          identif=$scope.miembrosPendientes[i].id; 
          // $scope.miembrosPendientes[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.miembrosPendientes[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }

        for (var i  = 0; i<$scope.miembrosValidados.length;i++){
          if($scope.miembrosValidados[i].letra == "a"){
            odontologos.push($scope.miembrosValidados[i]);
          }
          if($scope.miembrosValidados[i].letra == "b"){
            asistentes.push($scope.miembrosValidados[i]);
          }
          if($scope.miembrosValidados[i].letra == "c"){
            clinicasConsultorios.push($scope.miembrosValidados[i]);
          }

            $scope.odontologos=odontologos;
            $scope.asistentes=asistentes;
            $scope.clinicasConsultorios=clinicasConsultorios;
            }     
        $scope.miembrosValidados=$scope.miembrosValidados.reverse();
        $scope.tbOptionsPendientes.data = $scope.miembrosValidados;
        $scope.tbOptionsPendientes.aaData = $scope.miembrosPendientes;
        $scope.tbOptionsPendientes.aoColumns=[
          { mData: 'createdAtFormateada'},
          {mData:'cedula'},
          {mData:'primerNombre'},
          {mData:'primerApellido'},
          { mData: 'email'},
          { mData: 'tipo'},
          { mData: 'accion' },
          { mData: 'accion2' }   
          ];

          $scope.tbOptionsOdontologos.data = $scope.odontologos;
          $scope.tbOptionsOdontologos.aaData = $scope.odontologos;
          $scope.tbOptionsOdontologos.aoColumns=[
            { mData:'createdAtFormateada'},
              {mData:'cedula'},
          {mData:'especialidad'},
            { mData: 'email'},
            { mData: 'nombreCompleto' },
            { mData: 'accion' },   
            { mData: 'accion2' }   
            ];
          $scope.tbOptionsAsistentes.data = $scope.asistentes;
          $scope.tbOptionsAsistentes.aaData = $scope.asistentes;
          $scope.tbOptionsAsistentes.aoColumns=[
            { mData:'createdAtFormateada'},
            { mData: 'email'},
            { mData: 'nombreCompleto' },
            { mData: 'accion2' }   
            ];
          $scope.tbOptionsClinicasConsultorios.data = $scope.clinicasConsultorios;
          $scope.tbOptionsClinicasConsultorios.aaData = $scope.clinicasConsultorios;
          $scope.tbOptionsClinicasConsultorios.aoColumns=[
            { mData:'createdAtFormateada'},
            { mData: 'email'},
            { mData: 'nombres' },
            { mData: 'accion2' }   
            ];
 
}, 100);
    };
    $scope.getMiembros();

$scope.openBorrar = function (item) {
    var item=[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalBorrar.html',
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
    modalInstance.result.then(function (selectedItem,timeout) {
      }, function () {
    });
     
  };



 $scope.openEdicion = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.idenMiembro=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalEdicion.html',
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
      modalInstance.result.then(function (selectedItem,timeout) {
  
      }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };



 

 $scope.openPeticionCot = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.idenMiembro=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalPeticionCot.html',
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
      modalInstance.result.then(function (selectedItem,timeout) {
          $scope.miembrosPendientes.splice($scope.miembrosPendientes.indexOf(selectedItem), 1);
      }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.Aprobacion = function (iden) {
  MyService.data.idenMiembro=iden;
  $scope.openPeticionCot(iden);
};
$scope.Edicion = function (iden) {
  MyService.data.idenMiembro=iden;
  $scope.openEdicion(iden);
};
 $scope.Borrado = function (iden) {
  MyService.data.idenMiembro=iden;
  $scope.openBorrar();
};

}]);
