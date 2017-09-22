angular.module('myApp.services').factory('Video', function($resource) {
  return $resource('api/v1/videos/:id.json', { id:'@videos.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('VideoListController', function($scope, $state,  Video, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Video.get(function(data) {
                     $scope.videos = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.video = value.attributes;
                                                       this.video['id'] = value.id;
                                                       this.push(this.video);                    
                                                        },   $scope.videos); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteVideo = function(selected_id) { // Delete a Video. Issues a DELETE to /api/videos/:id
      video = Video.get({ id: selected_id});
      video.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Video deleted successfully",
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
  
}).controller('VideoEditController', function($scope, $state, $stateParams, toaster, $window, Video) {
     $scope.loading = false;
     $scope.updateVideo = function() { //Update the video. Issues a PATCH to /v1/api/videos/:id
     
     $scope.loading = true;
    $scope.video.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('videos.list');
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

  
  $scope.loadVideo = function() { //Issues a GET request to /api/videos/:id to get a video to update
                       $scope.video = Video.get({ id: $stateParams.id },
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

  $scope.loadVideo(); // Load a video 
  }).controller('VideoCreateController', function($scope, $state, Video, toaster) {
          $scope.video = new Video(); 
          $scope.loading = false;

         $scope.addVideo = function() { //Issues a POST to v1/api/video.json
                                $scope.loading = true;
                                $scope.video.data.type = "videos";
                                $scope.video.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Video saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('videos.list');
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




  