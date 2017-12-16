angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Facturas', function($scope, $http, Facturas) {
		$scope.newFactura = {};
		$scope.loading = true;
		$scope.total = 0; 
		$scope.newFactura.Total = 0;
		$scope.newFactura.cantidad = 1;
		
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Facturas.get()
			.success(function(data) {
				$scope.facturas = data;
				$scope.loading = false;
				$scope.prueba =
				{"valor1": "CC","valor2": "CE","valor3": "TI","valor4": "RC","valor5": "NIT"}
            	
			}   
			);
			Facturas.get2()
			.success(function(data) {
				$scope.clientes = data;
				$scope.loading = false;
			});
            Facturas.get3()
			.success(function(data) {
				$scope.productos = data;
				$scope.loading = false;
			/*	for (i= 0; i < $scope.productos.length; i++ ) 
				{
					console.log($scope.productos[i].Valoru);
					$scope.total =  parseInt($scope.productos[i].Valoru)  + parseInt($scope.total);
				
				}
				console.log("total "+$scope.total);
				*/
			});
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the newFactura to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.newFactura.Cliente != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Facturas.create($scope.newFactura)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.total =  parseInt($scope.newFactura.Total)  + parseInt($scope.total);
						$scope.newFactura = {}; // clear the form so our user is ready to enter another
						$scope.facturas = data; // assign our new list of todos
					});
			}
		};
		$scope.createCliente = function() {
			
						// validate the newFactura to make sure that something is there
						// if form is empty, nothing will happen
						if ($scope.newCliente.Nombre != undefined) {
							$scope.loading = true;
			
							// call the create function from our service (returns a promise object)
							Facturas.create2($scope.newCliente)
			
								// if successful creation, call our get function to get all the new todos
								.success(function(data) {
									$scope.loading = false;
									$scope.newCliente = {}; // clear the form so our user is ready to enter another
									$scope.clientes = data; // assign our new list of todos
								});
						}
					};
		$scope.createProducto = function() {
						
									// validate the newFactura to make sure that something is there
									// if form is empty, nothing will happen
									if ($scope.newProducto.Nombre != undefined) {
										$scope.loading = true;
						
										// call the create function from our service (returns a promise object)
										Facturas.create3($scope.newProducto)
						
											// if successful creation, call our get function to get all the new todos
											.success(function(data) {
												$scope.loading = false;
												$scope.newProducto = {}; // clear the form so our user is ready to enter another
												$scope.clientes = data; // assign our new list of todos
											});
									}
								};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Facturas.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.facturas = data; // assign our new list of todos
				});
		};
		$scope.deleteCliente = function(id) {
			$scope.loading = true;

			Facturas.delete2(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.clientes = data; // assign our new list of todos
				});
		};
		$scope.deleteProducto = function(id) {
			$scope.loading = true;

			Facturas.delete3(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.productos = data; // assign our new list of todos
				});
		};
		$scope.misproductos = [];
		$scope.agregarProducto = function(productonew) {
			

			
			$scope.total =  parseInt(productonew.Valoru)  * parseInt($scope.newFactura.cantidad) + parseInt($scope.total);
			$scope.parcial =  parseInt(productonew.Valoru)  * parseInt($scope.newFactura.cantidad) ;
			console.log("total por producto: " + $scope.parcial);
			productonew.Valort = $scope.parcial;
			productonew.Cantidad = $scope.newFactura.cantidad;
			$scope.newFactura.cantidad = 1;
			$scope.newFactura.Total = $scope.total;
			$scope.parcial = 0;
			console.log("producto modificado")
            console.log(productonew);
			$scope.misproductos.push(productonew);
			console.log("todos los productos");
			for (i= 0; i < $scope.misproductos.length; i++ ) 
			{
			console.log($scope.misproductos[i]._id);
			};
			$scope.newFactura.Productos = $scope.misproductos;
		};
	}]);