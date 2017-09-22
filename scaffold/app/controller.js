angular.module('myApp.services').factory('{Resource}', function($resource){{
  return $resource('api/v1/{resources}/:id.json', {{ id:'@{resources}.id' }}, {{
    update: {{method: 'PATCH',}}
  }}, {{
    stripTrailingSlashes: false
  }});
}});

angular.module('myApp.controllers')
.controller('{Resource}ListController', function($scope, $state,  {Resource}, $auth, toaster, DTOptionsBuilder){{
  $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();
  {Resource}.get(function(data){{
    $scope.{resources} = [];
    angular.forEach(data.data, function(value, key){{
      this.{resource} = value.attributes;
      this.{resource}['id'] = value.id;
      this.push(this.{resource});                    
    }}, $scope.{resources});
  }}, function(error){{
    $scope.error = error.data;
  }});

  // Delete a {Resource}. Issues a DELETE to /api/{resources}/:id
  $scope.delete{Resource} = function(selected_id){{ 
    {resource} = {Resource}.get({{ id: selected_id}});
    {resource}.$delete({{ id: selected_id}}, function(){{
      toaster.pop({{
        type: 'success',
        title: 'Sucess',
        body: "{Resource} deleted successfully",
        showCloseButton: true,
        timeout: 5
      }});  
      $state.reload();
    }}, function(error){{
      toaster.pop({{
        type: 'error',
        title: 'Error',
        body: error,
        showCloseButton: true,
        timeout: 5
      }});;
    }});
  }};
}})

.controller('{Resource}EditController', function($scope, $state, $stateParams, toaster, $window, {Resource}){{
  $scope.loading = false;

  // Update the {resource}. Issues a PATCH to /v1/api/{resources}/:id
  $scope.update{Resource} = function() {{ 
    $scope.loading = true;
    $scope.{resource}.$update({{ id: $stateParams.id }},function() {{
    toaster.pop({{
      type: 'success',
      title: 'Sucess',
      body: "Update was a success",
      showCloseButton: true,
      timeout: 5
    }});
        
    $state.go('{resources}.list');
    $scope.loading = false;
    // $state.go('sites'); // on success go back to home i.e. sites state.
    }}, function(error){{
      toaster.pop({{
        type: 'error',
        title: 'Error',
        body: error,
        showCloseButton: true,
        timeout: 5
      }});
      $scope.loading = false;
    }});
  }};
  
  // Issues a GET request to /api/{resources}/:id to get a {resource} to update
  $scope.load{Resource} = function(){{
    $scope.{resource} = {Resource}.get({{ id: $stateParams.id }}, function(){{
      //  do nothing
    }}, function(error){{
      toaster.pop({{
        type: 'error',
        title: 'Error',
        body: error,
        showCloseButton: true,
        timeout: 0
      }});
    }});
  }};

  // Load a {resource} 
  $scope.load{Resource}(); 
}})

.controller('{Resource}CreateController', function($scope, $state, {Resource}, toaster){{
  $scope.{resource} = new {Resource}(); 
  $scope.loading = false;

  //Issues a POST to v1/api/{resource}.json
  $scope.add{Resource} = function() {{ 
    $scope.loading = true;
    $scope.{resource}.data.type = "{resources}";
    $scope.{resource}.$save(function(){{
      toaster.pop({{
        type: 'success',
        title: 'Sucess',
        body: "{Resource} saved successfully",
        showCloseButton: true,
        timeout: 5
      }});
      $state.go('{resources}.list');
      $scope.loading = false; 
    }}, function(error){{
      toaster.pop({{
        type: 'error',
        title: 'Error',
        body: error,
        showCloseButton: true,
        timeout: 5
      }});
      $scope.loading = false;
    }});
  }};
}});
