# Adobe Target Demo Campaigns

Live demos can bee invoced using enclosed API calls across e.g. [www.nrma.com.au](https://www.nrma.com.au).

## Using the build framework

You can use the **campaign-boilerplate** for building Adobe Target campaigns. This was originally created a long time ago, so chances are you want to use some other tools that might be more current. The approach will however be similar.

To build, run `grunt build --campaign=[src/folder-name]`, as an example: `grunt build --campaign=floatingFooter`.

Use following on site API call for activation of demos:

## Floating Footer Widget Campaign

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

> To build using boilerplate: `grunt build --campaign=floatingFooter`

## Campaing Object (pass camaping info on window scope)

Use following on site API call for activation of demo:

```javascript
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
```

> To build using boilerplate: `grunt build --campaign=campaignObject`
