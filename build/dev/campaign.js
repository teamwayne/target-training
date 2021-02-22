/*! DEV testing-and-optimisation-build-framework 2021-02-22 14:02 */
(function() {
adobe.target.getOffer({
  "mbox": "campaign-object",
  "params": {
    "pageid": "INSER PAGE ID HERE",
    "brand": "INSERT BRAND HERE",
    "profile.name": "Sofia",
    "profile.pref_communication": "phone",
    "profile.phone_number": "0404111222"
  },
  "success": function (offer) {
    console.log('success: ', offer);
    adobe.target.applyOffer({
      "mbox": "demo-feb-2021",
      "offer": offer
    });
  },
  "error": function (status, error) {
    console.log('Error', status, error);
  }
});

(function () {
  try {
    /* CAMPAIGN OBJ (V2)
    Array of Campaign/Activity info useful for debugging in console.
    */
    var campaignExists = false;
    if (typeof campaignInfo !== "undefined") {
      for (var i = 0; i < campaignInfo.length; i++) {
        if ('${campaign.name}'.toLowerCase() == campaignInfo[i].campaign.name.toLowerCase()) {
          campaignExists = true;
          break;
        } else {
          campaignExists = false;
        }
      }
    }

    if (!campaignExists) {
      (window.campaignInfo = window.campaignInfo || []).push({
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
          pref_communication: '${profile.pref_communication}',
          phone_number: '${profile.phone_number}'
        },
        user: {
          pcId: '${user.pcId}',
          sessionId: '${user.sessionId}',
          isFirstSession: '${user.isFirstSession}'
        }
      });
    }
    /* CAMPAIGN CODE
    Add campaign/activity offer code below here
    */

    var hello = 'Hello ' + window.campaignInfo[0].profile.name + ',\rYour prefered method of contact is ' + window.campaignInfo[0].profile.pref_communication + '\rand your phone number is ' + window.campaignInfo[0].profile.phone_number;
    alert(hello);

  } catch (e) {
    console.log('Adobe Target offer-code error:', e);
  }
})();

// Import tools from load.js
window.load = window.load || {};
window.load.tools = window.load.tools || {};
window.load.tools.log = window.load.tools.log || function (msg) { console.log(msg);};

var maxArticles = 5;
var cookieName = "tntcount";

// Get dynamic variables from Adobbe Target for use within the campaign.
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

window.load.tools.log('Adobe Target Campaign Object:', tntItms);

// This is legacy stuff...
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

var data = {
    heading: {
        mobile: tntItms.profile.name + ', take us with you wherever you go!',
        corona: tntItms.profile.name + ', what are you looking for?',
        ctp: tntItms.profile.name + ', are you insured?'
    },
    bodyTop: {
        mobile: 'Stay <span class=\"bold\">in control<\/span> of your insurance with the NRMA Insurance app. View your policies, make a payment, or make a claim for damage right from your phone.',
        corona: 'We\'re committed to helping you stay safe during the coronavirus pandemic',
        ctp: 'Cover for you and anyone who’s injured if you cause an accident on the road'
    },
    bodyBottom: {
        mobile: '<span class="bold">Blergh!</span> Something amazing!',
        corona: 'You can <span class="bold">Do something!</span> and get stuff to be better',
        ctp: 'We cover your injuries from an accident you cause (for up to 26 weeks).'
    },
    headerButton: {
        mobile: ' Click here to learn more ',
        corona: ' No thank you ',
        ctp: ' Yes, please, more! '
    },
    footer: {
        mobile: 'Already a member, well why aren\'t you using our app...',
        corona: 'Share your experience with other people who also experience things!',
        ctp: 'Already driving, with CTP, good on ya! Keep up the good work!'
    }
};

var ui = {
  css: function() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var abStyles = document.createElement('style');
    abStyles.type = 'text/css';
    abStyles.appendChild(document.createTextNode('#ad-blocker-banner,.ad-blocker-lightbox-wrapper{box-shadow:0 0 8px #000;position:fixed;bottom:0}#ad-blocker-banner{width:100%;background:#000e82;z-index:100001;padding:0}#ad-blocker-banner a,#ad-blocker-banner a:visited{color:#fff;text-decoration:none}#ad-blocker-banner a:hover{text-decoration:underline}#ad-blocker-banner button{cursor:pointer;border:1px solid #fff;border-radius:14px;background:0 0;padding:5px 21px}#ad-blocker-lightbox-wrapper .registration-header{background-color:#29aded;text-align:center;padding:10px;margin-bottom:20px}#ad-blocker-banner h1,#ad-blocker-lightbox-wrapper .registration-header h1{color:#fff;font-family:"Guardian Sans Cond",Roboto,Helvetica,Arial,sans-serif;font-size:40px;line-height:40px;margin:12px}#ad-blocker-banner,#ad-blocker-banner button,#ad-blocker-banner p{font:14px/16px "Guardian Sans",Roboto,Helvetica,Arial,sans-serif;color:#fff}#ad-blocker-banner p span.bold{font-weight:700}#ad-blocker-banner .ad-blocker-banner-header{margin:0 auto;width:100%;padding:15px 10px 0;text-align:center;display:block}#ad-blocker-banner button.both-win,#ad-blocker-banner button.subscribe{margin-bottom:16px}#ad-blocker-banner button.both-win.hide{display:none}#ad-blocker-banner button.both-win i{border:solid #fff;border-width:0 3px 3px 0;display:inline-block;padding:3px;vertical-align:middle;margin:-4px 10px 0;transform:rotate(45deg);-webkit-transform:rotate(45deg)}#ad-blocker-banner button.register i,#ad-blocker-banner button.whitelist i{border:solid #232323;border-width:0 3px 3px 0;display:inline-block;padding:3px;vertical-align:middle;margin:-4px 0 0 10px;transform:rotate(45deg);-webkit-transform:rotate(-45deg)}#ad-blocker-banner .ad-blocker-banner-content-wrapper{height:1px;opacity:0;background-color:#fff;visibility:hidden}#ad-blocker-banner .ad-blocker-banner-content{margin:0 auto;max-width:1000px;padding:0 10px 15px;text-align:center}#ad-blocker-banner .ad-blocker-banner-content button{cursor:pointer;border:1px solid #232323;border-radius:14px;background:0 0;padding:5px 21px}#ad-blocker-banner .ad-blocker-banner-content button,#ad-blocker-banner .ad-blocker-banner-content p{color:#232323}#ad-blocker-banner .ad-blocker-banner-content-top{color:#fff;display:inline-block;width:45%;text-align:center}#ad-blocker-banner .ad-blocker-banner-content-middle{margin:10px;display:inline-block;width:6%;text-align:center}#ad-blocker-banner .ad-blocker-banner-content-middle p{display:inline-block;padding:10px;border-radius:22px;background:#232323;color:#fff}#ad-blocker-banner .ad-blocker-banner-content-bottom{color:#fff;display:inline-block;width:44%;text-align:center}#ad-blocker-banner .ad-blocker-banner-footer{background-color:#232323;padding:0 10px;display:inline-block;width:100%;text-align:center}#ad-blocker-banner .ad-blocker-banner-footer-wrapper{max-width:1000px;text-align:left;margin:0 auto}#ad-blocker-banner .ad-blocker-banner-footer .text{width:75%;display:inline-block}#ad-blocker-banner .ad-blocker-banner-footer .login{width:20%;display:inline}#ad-blocker-banner .show{visibility:visible;opacity:1;padding-top:10px;transition:all .75s ease;height:auto;background-color:#fff;text-align:center;margin:0;width:100%}#ad-blocker-banner .hide{opacity:0;transition:none;visibility:0s .5s,opacity .5s linear;visibility:hidden;display:none!important}.ad-blocker-lightbox-wrapper{display:none;height:90%;width:90%;top:0;right:0;left:0;background-color:#fff;z-index:10000001;margin:auto;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}.ad-blocker-registration-background{position:fixed;top:0;bottom:0;left:0;right:0;opacity:.7;z-index:10000000;width:100%;height:100%;background-color:#000;display:none}#ad-block-registration-popup-close{background-color:#333;color:#fff;width:36px;height:36px;text-align:center;float:right;font-size:36px;line-height:36px;cursor:pointer}#newscdn-identity-component-rego iframe{height:930px!important}@media screen and (min-width:726px){.ad-blocker-lightbox-wrapper{max-width:700px;max-height:800px}#newscdn-identity-component-rego iframe{height:100%}}@media screen and (max-width:539px){#ad-blocker-banner .ad-blocker-banner-content,#ad-blocker-banner .ad-blocker-banner-content-bottom,#ad-blocker-banner .ad-blocker-banner-content-top,#ad-blocker-banner .ad-blocker-banner-footer-wrapper{width:100%}#ad-blocker-banner h1{font-size:32px}#ad-blocker-banner .ad-blocker-banner-content-middle{width:100%;margin:10px 0 -15px}#ad-blocker-banner button.login{padding:5px;top:50%;transform:translateY(-50%) translate(30%)}}'));
    head.appendChild(abStyles);
  },
  create: function(exp) {
    window.load.tools.log(data);
    window.load.tools.log(data.heading[exp]);

    // var pageBody = document.body || document.getElementsByTagName('body')[0];

    var headerHTML = hasCookie >= maxArticles ? '<div class="ad-blocker-banner-header"><h1>Dear ' + tntItms.profile.name + ',</h1><p>You are spending a lot of time here... You should really <a href="https://www.nrma.com.au/self-service/login" target="_blank">register</a></p></div>' : '<div class="ad-blocker-banner-header"> <h1>' + data.heading[exp] + '</h1><button class="both-win"> <i></i>' + data.headerButton[exp] + '<i></i> </button></div>',
      contentHTML = hasCookie >= maxArticles ? '' : '<div class="ad-blocker-banner-content"><div class="ad-blocker-banner-content-top"><p>' + data.bodyTop[exp] + '</p><button class="whitelist">Tell me more <i></i> </button></div><div class="ad-blocker-banner-content-middle"><p>OR</p></div><div class="ad-blocker-banner-content-bottom"><p>' + data.bodyBottom[exp] + '</p><button class="register">Register for FREE <i></i> </button></div></div>',
      footerHTML = '<div class="ad-blocker-banner-footer"><div class="ad-blocker-banner-footer-wrapper"><div class="text"><p>' + data.footer[exp] + '</p></div><div class="login"><button class="login">Login</button></div></div></div>';

    var wrapper = document.createElement('div'),
      header = document.createElement('div'),
      content = document.createElement('div'),
      footer = document.createElement('div'),
      lightboxBackground = document.createElement('div'),
      lightboxWrapper = document.createElement('div');

    wrapper.id = 'ad-blocker-banner';
    lightboxWrapper.id = 'ad-blocker-lightbox-wrapper';
    wrapper.setAttribute('class', 'ad-blocker-banner');
    header.setAttribute('class', 'ad-blocker-banner-header');
    content.setAttribute('class', 'ad-blocker-banner-content-wrapper');
    footer.setAttribute('class', 'ad-blocker-banner-footer');
    lightboxBackground.setAttribute('class', 'ad-blocker-registration-background');
    lightboxWrapper.setAttribute('class', 'ad-blocker-lightbox-wrapper');

    header.innerHTML = headerHTML;
    content.innerHTML = contentHTML;
    footer.innerHTML = footerHTML;
    lightboxBackground.innerHTML = '<div class="ad-blocker-registration-background"></div>';
    lightboxWrapper.innerHTML = '<div id="ad-block-registration-popup-close">x</div><div class="registration-header"><h1>Some information about something...</h1></div><div id="newscdn-identity-component-rego" class="newscdn-identity-component-rego"></div><div><p>Hi ' + tntItms.profile.name + ', at the age of ' + tntItms.profile.age + ' it is important to have a favourite colour.</p><p>We understand that your favorite colour is ' + tntItms.profile.favColour + '...nice. Very nice.</p></div>';

    wrapper.appendChild(header);
    wrapper.appendChild(content);
    wrapper.appendChild(footer);
    document.body.appendChild(lightboxBackground);
    document.body.appendChild(lightboxWrapper);
    document.body.appendChild(wrapper);
  },
  on: function(el, eventName, handler) {
    if (el && typeof el !== 'undefined') {
      if (el.addEventListener) {
        el.addEventListener(eventName, handler);
      } else {
        el.attachEvent('on' + eventName, function() {
          handler.call(el);
        });
      }
    }
  },
  attach: function() {
    var contentWrapper = document.querySelector('#ad-blocker-banner .ad-blocker-banner-content-wrapper');
    var winBtn = document.querySelector('#ad-blocker-banner button.both-win');
    var whitelistBtn = document.querySelector('#ad-blocker-banner button.whitelist');
    var registerBtn = document.querySelector('#ad-blocker-banner button.register');
    var loginBtn = document.querySelector('#ad-blocker-banner button.login');
    var subscribe = document.querySelector('#ad-blocker-banner button.subscribe');
    var lightboxBackground = document.querySelector('.ad-blocker-registration-background');
    var lightboxWrapper = document.querySelector('.ad-blocker-lightbox-wrapper');
    var identityRego = document.querySelector('#newscdn-identity-component-rego');
    var close = document.querySelector('#ad-block-registration-popup-close');
    var protocol = document.location.protocol;

    var scrolled = false;

    var winAction = function(e) {
      if (winBtn && typeof winBtn !== 'undefined') {
        winBtn.classList.add('hide');
      }

      if (contentWrapper && typeof contentWrapper !== 'undefined') {
        contentWrapper.classList.add('show');
      }
    };

    var subscribeAction = function() {
      window.open(protocol + '//www.nrma.com.au/self-service/login', '_blank');
    };

    var scrollAction = function() {
      if (!scrolled) {
        scrolled = true;
        setTimeout(function() {
          if (hasCookie < maxArticles) {
            winAction();
          }
          window.load.tools.log(this.innerText);
        }, 500);
      }
    };
    var whitelistAction = function() {
      window.load.tools.log(this.innerText);
      window.open(protocol + '//www.insuranceonline.nrma.com.au/oss/GTConnect/UnifiedAcceptor/Portal.Quote?brandId=nrma&product=Comprehensive&killSession=true&_ga=2.43901793.598010378.1613693272-1516811341.1611724738', '_blank');
    };
    var registerAction = function() {
      window.load.tools.log(this.innerText);
      lightboxWrapper.setAttribute('style', 'display: block;');
      identityRego.setAttribute('style', 'display:block;');
      lightboxBackground.setAttribute('style', 'display:block;');
      document.body.style.position = 'fixed';
      if (!document.cookie.match(/tntregd/)) {
        document.cookie = 'tntregd=1;path=/;expires=';
      }

    };
    var loginAction = function() {
      window.load.tools.log(this.innerText);
      window.open('https://www.nrma.com.au/self-service/login', '_blank');
      if (!document.cookie.match(/tntregd/)) {
        document.cookie = 'tntregd=1;path=/;expires=';
      }
    };

    var hideRegistrationForm = function() {
      lightboxWrapper.setAttribute('style', 'display:none;');
      lightboxBackground.setAttribute('style', 'display:none;');
      window.load.tools.log(this.innerText);
      if (document.cookie.match(/tntregd/)) {
        document.cookie = 'tntregd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    };

    // lightboxWrapper.addEventListener('click', function() {
    //     lightboxWrapper.setAttribute('style', 'display:none;');
    // });

    this.on(winBtn, 'click', winAction);
    this.on(whitelistBtn, 'click', whitelistAction);
    this.on(registerBtn, 'click', registerAction); //overlayInit
    this.on(loginBtn, 'click', loginAction);
    this.on(window, 'scroll', scrollAction);
    this.on(subscribe, 'click', subscribeAction);
    this.on(close, 'click', hideRegistrationForm);
  }
};

ui.css();
ui.create(experience);
ui.attach();

})();