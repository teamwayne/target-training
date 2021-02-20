window.load = window.load || {};
window.load.tools = window.load.tools || {};
window.load.tools.log = window.load.tools.log || function() {console.log();};

// var waitForBody = function(method) {
//     if(document.body || document.getElementsByTagName('body')[0]) {
//         method();
//     } else {
//         window.adobe.log('waitForBody...');
//         setTimeout(function () {
//             waitForBody(method);
//         }, 50);
//     }
// };

// var getQueryParams = function(qs) {
//     qs = qs.replace(/\+/g, " ");
//     var params = {},
//         re = /[?&]?([^=]+)=([^&]*)/g,
//         tokens;
//    /* jshint ignore:start */
//     while (tokens = re.exec(qs)) {
//     params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
//     }
//    /* jshint ignore:end */
//     return params;
// };

// var queryParams = getQueryParams(window.location.search);

var maxArticles = 5;

var cookieName = "tntcount";
var tntItms = {
    campaign: {
        name: '${campaign.name}',
        recepiName: '${campaign.recipe.name}',
        campaignId: '${campaign.id}',
        recepiId: '${campaign.recipe.id}',
        trafficType: '${campaign.recipe.trafficType}'
    },
    profile: {
        age: '${profile.age}',
        name: '${profile.name}',
        favColour: '${profile.favColour}',
        currentCustomer: '${profile.currentCustomer}'
    },
    user: {
        pcId: '${user.pcId}',
        sessionId: '${user.sessionId}',
        isFirstSession: '${user.isFirstSession}'
    }
};

var experience = tntItms.campaign.recepiName;
// var experience = 'ctp';

window.load.tools.log(tntItms);

var readCookie = function(name) {
    name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

    var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)', 'i'),
        match = document.cookie.match(regex);

    return match && window.unescape(match[1]);
};

var setCookie = function(name, value) {
    var exdate, val;
    val = window.escape(value) + "; path=/";
    if (value === false) {
        exdate = new Date(0);
        val += "; expires=" + exdate.toUTCString();
    } else {
        var time = 60 * 60 * 24 * 60 * 1000; // 60 days
        exdate = new Date((new Date()).getTime() + time);
        val += "; expires=" + exdate.toUTCString();

    }
    document.cookie = name + "=" + val;
};

var hasCookie = readCookie(cookieName) ? parseInt(readCookie(cookieName), 10) : 1;
// var hasCookie = 0;
window.load.tools.log(hasCookie);
if (hasCookie >= maxArticles) {
    // Load the 5 (maxArticles) or more views experience
    window.load.tools.log("You have viewed 5 or more articles, you need to become a subscriber!");
} else if (hasCookie < maxArticles || !hasCookie) {
    // Load the ad blocker experience - percipient footer
    var newVal = hasCookie ? (hasCookie + 1) : 1;
    setCookie(cookieName, newVal);
    window.load.tools.log("newVal: " + newVal + "\nhasCookie: " + hasCookie);
}
