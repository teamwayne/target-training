/**
 *  Adobe Target client side "delivery" API call.
 * For more information, please see the Adobe documentation at e.g. https://experienceleague.adobe.com/docs/target/using/implement-target/client-side/at-js-implementation/functions-overview/adobe-target-getoffers-atjs-2.html#implement-target
 */
adobe.target.getOffer({
  // This is the name of the Adobe Target mbox "namespace" on which you are targeting the campaign.
  "mbox": "demo-feb-2021",
  // Pass in parameters to use for targeting and/or use as variables in the campaign offer code.
  "params": {
    "pageid": "INSER PAGE ID HERE",
    "brand": "INSERT BRAND HERE",
    "profile.name": "Greg",
    "profile.favColour": "green",
    "profile.age": "28",
    "profile.currentCustomer": "yes"
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
