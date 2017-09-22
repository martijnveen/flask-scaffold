angular.module('myApp.services').factory('Post', function($resource) {
  return $resource('api/v1/posts/:id.json', { id:'@posts.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('PostListController', function($scope, $state,  Post, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Post.get(function(data) {
                     $scope.posts = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.post = value.attributes;
                                                       this.post['id'] = value.id;
                                                       this.push(this.post);                    
                                                        },   $scope.posts); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deletePost = function(selected_id) { // Delete a Post. Issues a DELETE to /api/posts/:id
      post = Post.get({ id: selected_id});
      post.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Post deleted successfully",
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
  
}).controller('PostEditController', function($scope, $state, $stateParams, toaster, $window, Post) {
     $scope.loading = false;
     $scope.updatePost = function() { //Update the post. Issues a PATCH to /v1/api/posts/:id
     
     $scope.loading = true;
    $scope.post.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('posts.list');
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

  
  $scope.loadPost = function() { //Issues a GET request to /api/posts/:id to get a post to update
                       $scope.post = Post.get({ id: $stateParams.id },
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

  $scope.loadPost(); // Load a post 
  }).controller('PostCreateController', function($scope, $state, Post, toaster) {
          $scope.post = new Post(); 
          $scope.loading = false;

         $scope.addPost = function() { //Issues a POST to v1/api/post.json
                                $scope.loading = true;
                                $scope.post.data.type = "posts";
                                $scope.post.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Post saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('posts.list');
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




  