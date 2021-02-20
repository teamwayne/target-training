# Floating footer demo experience

Live demo can bee seen across e.g. [www.nrma.com.au](https://www.nrma.com.au).

Use following on site API call for activation of demo:

```javascript
adobe.target.getOffer({
  "mbox": "demo-feb-2021",
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
```
