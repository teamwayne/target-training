# CampaignInfo object

Live demo can bee seen across e.g. [www.nrma.com.au](https://www.nrma.com.au).

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

## Using the build framework

You can use the **campaign-boilerplate** for building Adobe Target campaigns. This was originally created a long time ago, so chances are you want to use some other tools that might be more current. The approach will however be similar.

To build, run `grunt build --campaign=[src/folder-name]`, as an example: `grunt build --campaign=campaignObject`.
