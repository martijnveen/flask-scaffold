angular.module('myApp.services').factory('Author', function($resource) {
  return $resource('api/v1/authors/:id.json', { id:'@authors.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('AuthorListController', function($scope, $state,  Author, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Author.get(function(data) {
                     $scope.authors = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.author = value.attributes;
                                                       this.author['id'] = value.id;
                                                       this.push(this.author);                    
                                                        },   $scope.authors); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteAuthor = function(selected_id) { // Delete a Author. Issues a DELETE to /api/authors/:id
      author = Author.get({ id: selected_id});
      author.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Author deleted successfully",
                showCloseButton: true,
                timeout: 0
                });
      
        $state.reload();
      }, function(error) {
         toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });;
    });
    };
  
}).controller('AuthorEditController', function($scope, $state, $stateParams, toaster, $window, Author) {
     $scope.loading = false;
     $scope.updateAuthor = function() { //Update the author. Issues a PATCH to /v1/api/authors/:id
     
     $scope.loading = true;
    $scope.author.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('authors.list');
       $scope.loading = false;
      //$state.go('sites'); // on success go back to home i.e. sites state.
    }, function(error) {
    toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });
      $scope.loading = false;
    });
  };

  
  $scope.loadAuthor = function() { //Issues a GET request to /api/authors/:id to get a author to update
                       $scope.author = Author.get({ id: $stateParams.id },
                                       function() {}, function(error) {
                                          toaster.pop({
                                                type: 'error',
                                                title: 'Error',
                                                body: error,
                                                showCloseButton: true,
                                                timeout: 0
                                                });
                                                });
                                };

  $scope.loadAuthor(); // Load a author 
  }).controller('AuthorCreateController', function($scope, $state, Author, toaster) {
          $scope.author = new Author(); 
          $scope.loading = false;

         $scope.addAuthor = function() { //Issues a POST to v1/api/author.json
                                $scope.loading = true;
                                $scope.author.data.type = "authors";
                                $scope.author.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Author saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('authors.list');
                                   $scope.loading = false; 
                                }, function(error) {
                                toaster.pop({
                                            type: 'error',
                                            title: 'Error',
                                            body: error,
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                 $scope.loading = false;
                                           });
                                 };
});




  