//Listen for Form Submit
document.getElementById('myform').addEventListener('submit', saveBookmark);


//Save Bookmark
function saveBookmark(e){
  //Get form Values
  var siteName = document.getElementById('sitename').value;
  var urlName = document.getElementById('siteurl').value;

  if(!validateForm(siteName, urlName)){
    return false;
  }

  var bookmark = {
    name : siteName,
    url : urlName
  }

 /*
  //Local Storage Test
  localStorage.setItem('test', 'Hello World');  //set an item inside local storage
  console.log(localStorage.getItem('test')); //fetch item of test from local storage
  localStorage.removeItem('test'); //remove the test item from local storage.
  console.log(localStorage.getItem('test')); //fetch item of test from local storage
*/


  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
    //clear Form
    document.getElementById('myform').reset();

   fetchBookmark();

  //Prevent Form From Submitting
  e.preventDefault();
}


//Delete bookmark
function deleteBookmark(url){
  //get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmark();
}


function fetchBookmark(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarkResults = document.getElementById('bookmarkResult');

  bookmarkResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
     var name = bookmarks[i].name;
     var url = bookmarks[i].url;

     bookmarkResults.innerHTML += '<div class="well">' +
                                   '<h3>'+name+
                                   ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                   ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '</h3>' ;
  }
}

// form Validation
function validateForm(siteName, urlName){
  if(!siteName || !urlName){
    alert("Please fill in the form!");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!urlName.match(regex)){
    alert("Enter valid URL");
    return false;
  }
  return true;
}
