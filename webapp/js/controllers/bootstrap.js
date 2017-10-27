'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;
    $scope.miembros=[];
    $scope.estados = [
        { name: 'soltero(a)'},
        { name: 'casado(a)'},
        { name: 'divorciado(a)'},
        { name: 'viudo(a)'}
        
        ];
         $scope.nacionalidades = [
        { name: 'V'},
        { name: 'E'}
        
        ];
    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['item 1', 'Item 2', 'Item 3'];
    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push("<button tooltip=\"Ver detalles\" tooltip-placement=\"bottom\" onclick=\"angular.element(this).scope().openDetalles('')\"  class=\"btn btn-info btn-xs\" > <i class=\"fa fa-eye text\"></i></button>  <button onclick=\"angular.element(this).scope().openConfirmEliminar('')\"  class=\"btn btn-danger btn-xs\" tooltip=\"Eliminar\" tooltip-placement=\"left\"> <i class=\"fa fa-trash-o text\"></i></button>" + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg'
        // text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ;

  app.controller('ModalInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'MyService', '$filter','$modal','dato','datosCuenta','toaster', '$state',function($scope, $http, $modalInstance, items, MyService,$filter,$modal,dato,datosCuenta,toaster,$state) {

     var result = [];
    $scope.estados = ['soltero(a)','casado(a)','divorciado(a)','viudo(a)'];
    $scope.nacionalidades = ['V','E'];
  $scope.anos=[];
        for (var i = 0; i < 88; ++i)
          {
            result.push(i+1930);
           $scope.anos=result;
        };
        $scope.anos=$scope.anos.reverse();

  $http.get('http://54.202.62.62:1345/electoral').then(function (resp) {
    $scope.listadoElectoral = resp.data.results;
  });
    $http.get('http://54.202.62.62:1345/deporte').then(function (resp) {
    $scope.listadoDeporte = resp.data.results;
  });

     $http.get('http://54.202.62.62:1345/municipio').then(function (resp) {
    $scope.municipios = resp.data.results;
  });
      $http.get('http://54.202.62.62:1345/directiva').then(function (resp) {
    $scope.listadoDirectiva = resp.data.results;
  });
    $http.get('http://54.202.62.62:1345/comite').then(function (resp) {
    $scope.listadoComite = resp.data.results;
  });
  $http.get('http://54.202.62.62:1345/universidad').then(function (resp) {
    $scope.universidades = resp.data.results;
  });
  $http.get('http://54.202.62.62:1345/especialidad').then(function (resp) {
    $scope.especialidades = resp.data.results;
  });
  var selector = MyService.data.selector;
$scope.consultaEvento=function(item){
  var item=[];
  var identificador = MyService.data.identificadorEvento;
  $scope.datosMiembro={};
  $http.get('http://54.202.62.62:1345/evento/'+identificador).success(function(respuesta){        
    item=respuesta;
    
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};
if (MyService.data.selector == "edit"){$scope.consultaEvento();}

$scope.consultaMiembro=function(item){
  var item=[];
  var identificador = MyService.data.idenMiembro;
  $scope.datosMiembro={};
  $http.get('http://54.202.62.62:1345/miembro/'+identificador).success(function(respuesta){        
    item=respuesta;
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};
    var user=[];
    var dato="";
    var datosCuenta={};
    datosCuenta.tipo=MyService.tipo;
    $scope.item={};
    $scope.item.tipo=MyService.tipo;
    $scope.item.letra=MyService.letra;
    $scope.filter={};
    $scope.filter = '';
      
      $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions4 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };
    $scope.guardar = function(item){
    // $scope.pop();
     item.letra="a";
      item.tipo="Odontologo";
      
      item.nivel=3;
    item.status='pendiente';
    $http.post('http://54.202.62.62:1345/miembro/', item)
    $modalInstance.close();
    $state.go('access.ok');
};
$scope.okMision= function (item) {
  var configAct = {};
      configAct.mision=item.mision;
      configAct.vision=item.vision;
      configAct.junta=item.junta;
      configAct.tribunal=item.tribunal;
      configAct.diasAtencion=item.diasAtencion;
      configAct.horario=item.horario;
      var iden = MyService.data.idConfig;
      $http.put('http://54.202.62.62:1345/configuracion/'+MyService.data.idConfig , configAct);       
      $modalInstance.close();
    };
$scope.entrar2=function(item){
  var iden = MyService.data.idConfig;
  var datosCuenta=[];
  $http.get('http://54.202.62.62:1345/configuracion').success(function(respuesta){
        $scope.configuracion = respuesta.results[0];
        datosCuenta.mision=respuesta.results[0].mision; 
        datosCuenta.vision=respuesta.results[0].vision; 
        datosCuenta.junta=respuesta.results[0].junta;
        datosCuenta.tribunal=respuesta.results[0].tribunal;  
        datosCuenta.diasAtencion=respuesta.results[0].diasAtencion; 
        datosCuenta.horario=respuesta.results[0].horario; 
        
    });
 
  $scope.item=datosCuenta;
   
};
    
$scope.borrar=function(item){
   var idRaza=item.id;
      $http.delete('http://54.202.62.62:1345/raza/'+idRaza , item)
      $modalInstance.dismiss('cancel');
};

$scope.borrarEspecialidad=function(item){
   var idEspecialidad=item.id;
      $http.delete('http://54.202.62.62:1345/especialidad/'+idEspecialidad , item)
      $modalInstance.dismiss('cancel');
};

$scope.borrarDeporte=function(item){
   var idDeporte=item.id;
      $http.delete('http://54.202.62.62:1345/deporte/'+idDeporte , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarElectoral=function(item){
   var idElectoral=item.id;
      $http.delete('http://54.202.62.62:1345/electoral/'+idElectoral , item)
      $modalInstance.dismiss('cancel');
};

$scope.borrarDirectiva=function(item){
   var idDirectiva=item.id;
      $http.delete('http://54.202.62.62:1345/directiva/'+idDirectiva , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarComite=function(item){
   var idComite=item.id;
      $http.delete('http://54.202.62.62:1345/comite/'+idComite , item)
      $modalInstance.dismiss('cancel');
};

$scope.borrarUniversidad=function(item){
   var idUniversidad=item.id;
      $http.delete('http://54.202.62.62:1345/universidad/'+idUniversidad , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarMunicipio=function(item){
   var idMunicipio=item.id;
      $http.delete('http://54.202.62.62:1345/municipio/'+idMunicipio , item)
      $modalInstance.dismiss('cancel');
};

   $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    }; 
   
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
           var data ;
          $http.get('http://54.202.62.62:1345/miembro/').then(function (resp2) {
            $scope.miembros = resp2.data.results;
          });
          data = $scope.miembros;
     
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
 
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
  


    $scope.mensajeBorrado="Al borrar este profesional, se perderá de manera permanente toda la información referente al mismo, está seguro de querer borrarlo?";
    $scope.mensajeBorradoProfesional="Al borrar este profesional, se perderá de manera permanente toda la información referente al mismo, está seguro de querer borrarlo?";

    $scope.okNuevoMiembro = function (item) {

      item.status="pendiente";
      item.letra="a";
      item.tipo="odontologo";
      
      item.nivel=3;
      $http.post('http://54.202.62.62:1345/miembro/' ,item); 
        $modalInstance.close();
             $state.go('access.ok');

    };

    $scope.okNuevaSolicitud = function (item) {
      item.estado="Pendiente";
      $http.post('http://54.202.62.62:1345/solicitud/' ,item);  
      $modalInstance.close();
      $state.go('app.dashboard-v1');
      };
 
$scope.okEspecialidad = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/especialidad/' ,item);       
      $modalInstance.close();
    };
    $scope.okDirectiva = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/directiva/' ,item);       
      $modalInstance.close();
    };
    $scope.okComite = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/comite/' ,item);       
      $modalInstance.close();
    };
    $scope.okDeporte = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/deporte/' ,item);       
      $modalInstance.close();
    };
    $scope.okElectoral = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/electoral/' ,item);       
      $modalInstance.close();
    };
    
$scope.okAprobacion = function (item) {
    var identificador = MyService.data.idenMiembro;
    var miembroAct={};
    miembroAct.status="validado";
    miembroAct.cot=item.cot;
    miembroAct.especialidad=item.especialidad;
    miembroAct.universidadEgresoEspecialidad=item.universidadEgresoEspecialidad;
    miembroAct.anoDeEgresoEspecialidad=item.anoDeEgresoEspecialidad;
    $http.put('http://54.202.62.62:1345/miembro/'+identificador, miembroAct);
    $modalInstance.close();
    setTimeout(function() { 
      $http.get('http://54.202.62.62:1345/miembro/' ).success(function(respuesta){
      $scope.miembros = respuesta.results; 
        MyService.data.miembros=$scope.miembros;
    });}, 300);
   
    $scope.popAprobacion();

 };
 $scope.okEdicion = function (item) {
    var identificador = MyService.data.idenMiembro;
    var miembroAct={};
    miembroAct.status=item.status;

    $http.put('http://54.202.62.62:1345/miembro/'+identificador, miembroAct);
    $modalInstance.close();
    setTimeout(function() { 
      $http.get('http://54.202.62.62:1345/miembro/' ).success(function(respuesta){
      $scope.miembros = respuesta.results; 
        MyService.data.miembros=$scope.miembros;
    });}, 300);
    $scope.popEdicion();
 };

$scope.okUniversidad= function (item) {
      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/universidad/' ,item);       
      $modalInstance.close();
    };
    $scope.okMunicipio= function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1345/municipio/' ,item);       
      $modalInstance.close();
    };
$scope.setActividad1=function(){
  MyService.data.tipoActividad="privada";
};
$scope.setActividad2=function(){
  MyService.data.tipoActividad="publica";
};
$scope.okActividad = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      item.tipo=MyService.data.tipoActividad;
      $http.post('http://54.202.62.62:1345/evento/' ,item);
      MyService.data.eventoNuevo=item;
         $scope.popNuevoEvento();       
      $modalInstance.close();
    };
    $scope.okEditarActividad = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      item.tipo=MyService.data.tipoActividad;
      $http.put('http://54.202.62.62:1345/evento/'+item.id ,item);       
      $modalInstance.close();
   $scope.popEditEvento();
     setTimeout(function() {
        $state.go('app.dashboard-v1');
      }, 900);
    };

 
 $scope.okMensaje = function (item) {
      item.idSolicitud=MyService.data.idSolicitud;
      item.autor="miembro";
      item.idUsuario=MyService.data.idUsuario;
      item.avatar="img/avatarMiembro.png";
      $http.post('http://54.202.62.62:1345/mensaje/' ,item);       
      $modalInstance.close();
  };
    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro validado con éxito',


    type3: 'info',
    text3: 'Estado de miembro editado con éxito',
    title3: 'Información',
    
    type4: 'success',
    text4: 'Articulo agregado con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'Articulo editado con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este articulo se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'miembro borrado con exito',
    title8: 'Información',
    type9: 'info',
    text9: 'Actividad editada con exito',
    title9: 'Información',
    type10: 'success',
    text10: 'Actividad agregada con exito',
    title10: 'Éxito',
  };
      $scope.popAprobacion = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };
   $scope.popNuevoEvento = function(){
    toaster.pop($scope.toaster.type10, $scope.toaster.title10, $scope.toaster.text10);
  };
   $scope.popEditEvento = function(){
    toaster.pop($scope.toaster.type9, $scope.toaster.title9, $scope.toaster.text9);
  };
  $scope.popEdicion = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.popBorrado = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
    $scope.okBorrarMiembro = function (item,timeout) { 
      var dato="";
      dato = MyService.data.idenMiembro;
      $http.delete('http://54.202.62.62:1345/miembro/'+dato); 
      $scope.popBorrado();
      $modalInstance.close();
      setTimeout(function() {
        $state.go('app.dashboard-v1');
      }, 100);
      
    };
    // $scope.okConfirm = function (item) { 
    //   var idArticulo=MyService.data.identificador;
    //   $http.delete('http://54.202.62.62:1345/articulo/'+idArticulo , item)
    //   $scope.items = null;
    //   $scope.item = null;
    //   $scope.articulos = null;  
    //   $modalInstance.close();
    // };

    $scope.okConfirmProfesional = function (item) { 
      var idProfesional=MyService.data.identificador;
      $http.delete('http://54.202.62.62:1345/miembro/'+idProfesional , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };

    $scope.okConfirm2 = function (item) { 
     var idEspecialidad=MyService.data.identificador;
      $http.delete('http://54.202.62.62:1345/especialidad/'+idEspecialidad, item)
      $scope.item = null;
      $scope.items = null;
      $modalInstance.close();
    };


    $scope.ok = function (item) {
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
$scope.item={};
$scope.dato=[];
$scope.dato = dato;
$scope.item.datosCuenta=datosCuenta;




  }]);

  



  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (item) {
      var identificador =item.id;
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
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
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http','MyService','$state', '$filter', 'filterFilter',function($scope, $http, MyService, $state,$filter,filterFilter) {
    $scope.selected = undefined;

    $scope.items = null;
 
    $scope.item=null;
    $scope.selectItem2 = function(item){ 

    MyService.data.luz = 'on';
    
    $http.get('http://54.202.62.62:1345/articulo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.items2 = resp.data.results;
    });
  
    $scope.group = item.categoria;
    // $scope.group.selected = true;
    $scope.filter = item.categoria;

      // alert ("dato: " +item.sexo);
      var identificador =item.id;
      var numero =item.barcode;
      var nombre =item.nombre;
      MyService.data.hembra = nombre;
      MyService.data.numero = numero;
      MyService.data.identificador = identificador;
      MyService.data.articulo = item;
   
 $scope.state = $state;
 // alert("estamos en "+$scope.state);
        $state.go('apps.articulo');
   $scope.sap=MyService.data.sap;
 
      };

   $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 
  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

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
  }]);