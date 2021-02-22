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

})();