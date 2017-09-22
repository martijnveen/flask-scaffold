// spec.js
describe('Testing Authors CRUD Module', function() {

var Author = function() {
        
        var name = element(by.id('name'));
        this.setName = function(nameText) { name.clear(); name.sendKeys(nameText); };
        
        var profile = element(by.id('profile'));
        this.setProfile = function(profileText) { profile.clear(); profile.sendKeys(profileText); };
        
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

it('Should add a new Author', function() {

    var author = new Author();

    // Get authors URL
    author.get();

    // Goto the new menu
    element(by.linkText('Authors')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        author.setName("Your Title text here");
        author.setProfile("Your Body text here 77569yuii3wui&%$$^"); 
        author.setUrl("http://techarena51.com");   

    //Expectations
    author.toast("Author saved successfully");

  });

it('Should  edit a Author', function() {

    var author = new Author();

    author.get();

    //Goto the edit menu
    element(by.linkText('Authors')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        author.setName("Your Updated Title text here");
        author.setProfile("Your Updated Body text here 77569yuii3wui&%$$^"); 
        author.setUrl("https://github.com/Leo-G/DevopsWiki");   

    //Expectations
    author.toast("Update was a success");



});

it('Should  delete a Author', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Authors')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Author deleted successfully")

      });

  });
});

  });
