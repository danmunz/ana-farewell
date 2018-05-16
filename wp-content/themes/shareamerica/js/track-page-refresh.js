function checkRefresh() {
  // Get the time now and convert to UTC seconds
  var today = new Date();
  var now = today.getUTCSeconds();

  // Get the cookie
  var cookie = document.cookie;
  var cookieArray = cookie.split('; ');

  // Parse the cookies: get the stored time
  for (var loop=0; loop < cookieArray.length; loop++) {
    var nameValue = cookieArray[loop].split('=');

    if (nameValue[0].toString() == 'SHTS' ) {
      var cookieTime = parseInt( nameValue[1] );
    }
    else if (nameValue[0].toString() == 'SHTSP') {
      var cookieName = nameValue[1];
      break;
    }
  }

  if (cookieName && cookieTime && cookieName == escape(location.href) && Math.abs(now - cookieTime) < 60 ) {
    ga('send', 'event', 'PageRefresh', 'refresh', window.location + (cookieTime - now));
    // refresh_prepare = 0;
  }
}

function prepareForRefresh() {
  if (refresh_prepare > 0 ) {
    // Turn refresh detection on so that if this
    // page gets quickly loaded, we know it's a refresh
    var today = new Date();
    var now = today.getUTCSeconds();
    document.cookie = 'SHTS=' + now + ';';
    document.cookie = 'SHTSP=' + escape(location.href) + ';';
  } else {
    // Refresh detection has been disabled
    document.cookie = 'SHTS=;';
    document.cookie = 'SHTSP=;';
  }
}

function disableRefreshDetection() {
  refresh_prepare = 0;
  return true;
}

var refresh_prepare = 1;
