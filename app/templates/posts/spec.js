// spec.js
describe('Testing Posts CRUD Module', function() {

var Post = function() {
        
        var tittle = element(by.id('tittle'));
        this.setTittle = function(tittleText) { tittle.clear(); tittle.sendKeys(tittleText); };
        
        var body = element(by.id('body'));
        this.setBody = function(bodyText) { body.clear(); body.sendKeys(bodyText); };
        
        var author = element(by.id('author'));
        this.setAuthor = function(authorText) { author.clear(); author.sendKeys(authorText); };
        
        var creation_date = element(by.id('creation_date'));
        this.setCreation_Date = function(creation_dateText) { creation_date.clear(); creation_date.sendKeys(creation_dateText); };
        

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

it('Should add a new Post', function() {

    var post = new Post();

    // Get posts URL
    post.get();

    // Goto the new menu
    element(by.linkText('Posts')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        post.setTittle("Your Title text here");
        post.setBody("Your Body text here 77569yuii3wui&%$$^"); 
        post.setAuthor("Your Title text here");
        post.setCreation_Date("2014-12-22T03:12:58.019077+00:00"); 
        element(by.css("input[type='radio'][value='0']")).click(); 

    //Expectations
    post.toast("Post saved successfully");

  });

it('Should  edit a Post', function() {

    var post = new Post();

    post.get();

    //Goto the edit menu
    element(by.linkText('Posts')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        post.setTittle("Your Updated Title text here");
        post.setBody("Your Updated Body text here 77569yuii3wui&%$$^"); 
        post.setAuthor("Your Updated Title text here");
        post.setCreation_Date("2015-12-22T03:12:58.019077+00:00"); 
        element(by.css("input[type='radio'][value='1']")).click(); 

    //Expectations
    post.toast("Update was a success");



});

it('Should  delete a Post', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Posts')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Post deleted successfully")

      });

  });
});

  });
