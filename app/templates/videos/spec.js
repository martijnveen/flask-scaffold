// spec.js
describe('Testing Videos CRUD Module', function() {

var Video = function() {
        
        var description = element(by.id('description'));
        this.setDescription = function(descriptionText) { description.clear(); description.sendKeys(descriptionText); };
        
        var creation_date = element(by.id('creation_date'));
        this.setCreation_Date = function(creation_dateText) { creation_date.clear(); creation_date.sendKeys(creation_dateText); };
        
        var url = element(by.id('url'));
        this.setUrl = function(urlText) { url.clear(); url.sendKeys(urlText); };
        

        this.get = function() {
                                   browser.get('http://localhost:5000/');
                                       };

        this.toast = function(message){
                                        $('.btn.btn-primary').click()  // css selectors http://angular.github.io/protractor/#/api?view=build$
                                            .then(function() {
                                                  var EC = protractor.ExpectedConditions;
                                                  var toastMessage = $('.toast-message');
                                                  browser.wait(EC.visibilityOf(toastMessage), 6000) //wait until toast is displayed
                                                             .then(function(){
                                                                    expect(toastMessage.getText()).toBe(message);

                                                                        });
                                                                  });
                                    }
                    };

it('Should add a new Video', function() {

    var video = new Video();

    // Get videos URL
    video.get();

    // Goto the new menu
    element(by.linkText('Videos')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        video.setDescription("Your Title text here");
        video.setCreation_Date("2014-12-22T03:12:58.019077+00:00"); 
        video.setUrl("Your Body text here 77569yuii3wui&%$$^"); 

    //Expectations
    video.toast("Video saved successfully");

  });

it('Should  edit a Video', function() {

    var video = new Video();

    video.get();

    //Goto the edit menu
    element(by.linkText('Videos')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        video.setDescription("Your Updated Title text here");
        video.setCreation_Date("2015-12-22T03:12:58.019077+00:00"); 
        video.setUrl("Your Updated Body text here 77569yuii3wui&%$$^"); 

    //Expectations
    video.toast("Update was a success");



});

it('Should  delete a Video', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Videos')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Video deleted successfully")

      });

  });
});

  });
