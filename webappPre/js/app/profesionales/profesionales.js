'use strict';

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig','dato','datosCuenta',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosCuenta) {
$scope.date = moment();
}]);
app.controller('ProfesionalesCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 $scope.nivel=MyService.data.nivel;
  var dato="";
  var datosCuenta="";
  $scope.toaster = {
        
    type3: 'info',
    text3: 'El profesional ha sido borrado',
    title3: 'Información',
    
    type4: 'success',
    text4: 'Profesional agregado con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'Profesional editado con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este consultor se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'Especialidad borrada con exito',
    title8: 'Información',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del consultor';
    
  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';
    $scope.nacionalidades = ['V','E'];
  $scope.carga = function (){
    $http.get('http://54.202.62.62:1345/especialidad/').then(function (resp) {
      $scope.especialidades = resp.data.results;
    });
  };


  $http.get('http://54.202.62.62:1345/especialidad/').then(function (resp) {
    $scope.especialidades = resp.data.results;
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
  };

  $scope.consultar = function(item){
  MyService.data.consultorConsultado = null;
  MyService.data.consultorConsultado = item;
  if (MyService.data.consultorConsultado.sexo==="Hembra"){
    $state.go('apps.historicoConsultor');
    }
  if (MyService.data.consultorConsultado.sexo==="Macho"){
    $state.go('apps.historicoConsultorMacho');
    }
  };
  $scope.carga = function(){
    $http.get('http://54.202.62.62:1345/especialidad/').then(function (resp) {
      $scope.especialidades = resp.data.results;
    });
  };
 
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
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
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openConfirmBorrarProfesional = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmBorrarProfesional.html',
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
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
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
       $scope.especialidades.splice($scope.especialidades.indexOf(item), 1);
        $scope.item = null;  
        // $scope.items = null;  
        $scope.pop8();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.createEspecialidad = function(){
    var especialidad = {nombre: 'Nueva especialidad'};          
    especialidad.nombre = $scope.checkItem(especialidad, $scope.especialidades, 'nombre');
    especialidad.idUsuario = MyService.data.idUsuario;
    $scope.especialidades.push(especialidad);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteEspecialidad = function(item){
    $http.delete('http://54.202.62.62:1345/especialidad/'+item.id , item)
    $scope.especialidades.splice($scope.especialidades.indexOf(item), 1);
  };

  $scope.selectEspecialidad = function(item){   
    MyService.data.especialidad=item.nombre;
    angular.forEach($scope.especialidades, function(item) {
      item.selected = false;
    });
    $scope.especialidad = item;
    $scope.especialidad.selected = true;
    $scope.filter = item.nombre;
    $http.get('http://54.202.62.62:1345/miembro/').then(function (resp) {
      $scope.items = resp.data.results;
      // alert("aqui");
       for (var i = 0; i < $scope.items.length; ++i) {
        if(typeof($scope.items[i].especialidad) == "undefined"){
        $scope.items[i].especialidad="ODONTOLOGÍA GENERAL";
      }
    }    
      $scope.item = null;  
    });
  };



  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var primerNombre =item.primerNombre;
    var primerApellido =item.primerApellido;
    MyService.data.primerNombre = primerNombre;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });

    $scope.item = item;
    $scope.item.selected = true;

    $http.get('http://54.202.62.62:1345/miembro/').then(function (resp) {
      $scope.profesionales = resp.data.results;
     
      });
     var pas = item.id;
    $scope.profesionalesFiltrados = $scope.profesionales.filter(function (profesional) {
      return (profesional.idprofesional == pas );
      });
    setTimeout(function() {}, 500);
    
  };

  

  $scope.deleteItem = function(item){
    $http.delete('http://54.202.62.62:1345/miembro/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'primerNombre')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteprofesional = function(profesional){
    $http.delete('http://54.202.62.62:1345/miembro/'+profesional.id , profesional)
    $scope.profesionalesFiltrados.splice($scope.profesionales.indexOf(profesional), 1);
    $scope.profesional = $filter('orderBy')($scope.profesionales, 'nombres')[0];
    if($scope.profesional) $scope.profesional.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      avatar:'img/avatar.png',
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      idEstablecimiento: MyService.data.idEstablecimiento,
      nivel:2
    };
    
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $scope.item.especialidad = MyService.data.especialidad;
    $scope.item.mensajeNuevo=null;
    $scope.item.idUsuario = MyService.data.idUsuario;
    $http.get('http://54.202.62.62:1345/especialidad/').then(function (resp) {
    $scope.especialidades = resp.data.results;
    }); 
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditingEspecialidad = function(item){
    item.editing = false;
    var especialidadAct= {};
    MyService.data.idenEspecialidad= item.id;
    especialidadAct.nombre=item.nombre;
    especialidadAct.idEstablecimiento=item.idEstablecimiento;
    especialidadAct.idUsuario=item.idUsuario;
    especialidadAct.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    especialidadAct.selected=item.selected;
    especialidadAct.editing=item.editing;
    if (MyService.data.idenEspecialidad){
      $http.put('http://54.202.62.62:1345/especialidad/'+MyService.data.idenEspecialidad, especialidadAct)
    }
    else {
      $http.post('http://54.202.62.62:1345/especialidad/', especialidadAct)
    }
  
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
 
  };


  $scope.doneEditingProfesional = function(item){
    var profesionalAct = {};
    MyService.data.idenProfesional=item.id;
    

    profesionalAct.primerNombre=item.primerNombre;
    profesionalAct.segundoNombre=item.segundoNombre;
    profesionalAct.primerApellido=item.primerApellido;
    profesionalAct.segundoApellido=item.segundoApellido;
     profesionalAct.nacionalidad=item.nacionalidad;

    profesionalAct.fechaNacimiento=item.fechaNacimiento;
    profesionalAct.sexo=item.sexo;
    profesionalAct.estadoCivil=item.estadoCivil;
    profesionalAct.cedula=item.cedula;
    
    profesionalAct.cov=item.cov;
    profesionalAct.msas=item.msas;

    profesionalAct.universidadEgreso=item.universidadEgreso;
    profesionalAct.anoDeEgreso=item.anoDeEgreso;

    profesionalAct.especialidad=item.especialidad;
    profesionalAct.anoDeEgresoEspecialidad=item.anoDeEgresoEspecialidad;
    profesionalAct.universidadEgresoEspecialidad=item.universidadEgresoEspecialidad;

    profesionalAct.cuentaI=item.cuentaI;
    profesionalAct.cuentaF=item.cuentaF;
    // profesionalAct.avatar='img/avatar.png';
    profesionalAct.direccionTrabajo=item.direccionTrabajo;
    profesionalAct.municipio=item.municipio;
    profesionalAct.email=item.email;
    profesionalAct.telefonoTrabajo=item.telefonoTrabajo;
    profesionalAct.telefonoCelular=item.telefonoCelular;
 
    profesionalAct.letra=item.letra;

    profesionalAct.tipo=item.tipo;
    profesionalAct.nivel=item.nivel;
    profesionalAct.status=item.status;

    profesionalAct.idUsuario=item.idUsuario;

    if (MyService.data.idenProfesional){
      $scope.pop4();
      $http.put('http://54.202.62.62:1345/miembro/'+MyService.data.idenProfesional , profesionalAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://54.202.62.62:1345/miembro/', profesionalAct)
    }
    $http.get('http://54.202.62.62:1345/especialidad/').then(function (resp) {
      $scope.especialidades = resp.data.results;
    });
    $http.get('http://54.202.62.62:1345/miembro/').then(function (resp) {
      $scope.app.states = resp.data.results;
    });
    // $scope.items = null;
    $scope.profesionales = null;
    // $scope.item=null;
    item.editing = false;
  };

}]);
