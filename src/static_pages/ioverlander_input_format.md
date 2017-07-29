# iOverlander Input Format

## A word about data formats

When we started the project, the goal was to make a unified list of camp sites from all sorts of sources. This meant that we had several moderators that took a lot of time going through lists, cleaning them up, and getting them into the proper format. Now that we've settled on a unified format, all you need to do to get your data into iOverlander is format it properly and upload it — we'll take care of the rest. We realize that this can be a lot of work, but providing others with quality data is one of our primary goals.

## iOverlander format

To start, you'll need to get your data into a spread sheet. We personally use Google Spreadsheets, but you will be fine using Excel or Numbers. If you are using something other than these programs, just make sure that it can export spread sheets in the CSV format, and you'll be fine.

We've created a template spread sheet, complete with data validation that you can use if you'd like to get started quickly. [Click here to open the template][1].

In addition, if you'd like to see some examples of spread sheets that we used to import data, you can [check them out here][2].

## Columns

Once you have a spread sheet, you'll need to make sure it has all the proper columns. Below is a description of the fields we accept:

#### Country (Required)

The 3-letter code for the country that the place is located in. [Wikipedia][3] has a nice list of these 3-letter codes. You can also use the country name, just make sure your spelling is spot-on (and if you have trouble, consider switching to 3-letter codes).

#### City (Optional)

The name of the nearest city, or name of the park or landmark nearby.

#### GPS Coordinates (Required) or Latitude and Longitude

Exact coordinates of the places location. You can list your coordinates together in one column, or you can split into Latitude and Longitude. You can use any format you like for the coordinates. Our input program will convert automagically.

#### Elevation (optional)

The elevation of the location, in meters.

#### Name (Required)

The name of the location.

#### Description (Required)

A description of the location. Is it shady? Hot? Are there friendly people? A nice beach view? Use your best judgement. You can also add the price you paid in this field, just make sure to specify the currency and if you paid per person, per room, per vehicle, etc.

#### Date Verified (Required)

When did you last visit this location? This will help us make sure our information is accurate and up to date. It's ok if you don't know the exact date. Month and year is fine.

#### Type (Required)

The type of the location. Valid options are:

* **Hotel**: Private accommodations. Use this for all types of hotels including guesthouses, lodges, cabins, etc.
* **Hostel**: Accommodations for groups of people.
* **Rental Unit**: A rental unit. Use this for an apartment or room rental. These normally must be booked in advance through sites like AirBnB
* **Campsite**: An established camp ground or trailer park. Can be part of a hostel or hotel, but must be an established camping area, not just the parking lot out front.
* **Wild Camping**: A boon docking site, always free, usually remote.
* **Informal Campsite**: An informal place to camp. Could be the parking lot of a hotel, gas station, roadside, etc)
* **Unknown ****Accommodation**: An unspecified type of accommodation.
* **Propane**: A place to fill/purchase propane.
* **Mechanic**: A vehicle mechanic.
* **Water**: A place to refill water tanks with potable water.
* **Restaurant**: Food stalls, restaurants, etc.
* **Agricultural Checkpoint**: A police checkpoint for agricultural products.
* **Other**: Some other point of interest

If you don' think the location fits into any of these categories, please [contact us][4].

#### Image (Optional)

You can have multiple columns titled "Image", each of which can hold the fully qualified URL to an image (ie http://www.mywebsite.com/mygreatpicture.jpg). We'll copy your image off and host it ourselves so you don't pay for the bandwidth.

## Extended Attribute Columns

Depending on the location type, there are a bunch of extra columns that you can include with additional information. All of these fields are optional, but it is obviously much better to specify this data if possible. Here are the extended options:

### Electricity

Is electricity available at this location?

| Option             | Description                                        |
| ------------------ | -------------------------------------------------- |
| No                 | This place doesn't have electricity                |
| Yes – At Sites     | Electricity available at individual camp spots     |
| Yes – Not at Sites | Electricity not available at individual camp spots |
| Yes                | Electricity is available at this place             |
| Unknown            | Not sure if this is available or not.              |

### Internet

Is internet available?

| Option        | Description                              |
| ------------- | ---------------------------------------- |
| Yes – Fast    | This place has fast internet             |
| Yes – Average | This place has internet of average speed |
| Yes – Slow    | This place has slow internet             |
| No            | This place doesn't have internet         |
| Yes – Unknown | This place has internet                  |
| Unknown       | Not sure if this is available or not.    |

### Kitchen

Is a kitchen available for doing dishes and/or cooking?

| Option  | Description                           |
| ------- | ------------------------------------- |
| Yes     | There place has a kitchen             |
| No      | This place doesn't have a kitchen     |
| Unknown | Not sure if this is available or not. |

### Parking

Is parking available?

| Option             | Description                              |
| ------------------ | ---------------------------------------- |
| Street Parking     | Street Parking Available                 |
| Yes                | Parking available at this place          |
| Garage Nearby      | A garage is available nearby for parking |
| No                 | Parking not available at this place      |
| Secure Parking     | Secure Parking Lot Available             |
| Restricted Parking | Restricted Parking Area Available        |
| Unknown            | Not sure if this is available or not.    |

### Restaurant

### Is there an on-site restaurant available?

| Option  | Description                           |
| ------- | ------------------------------------- |
| Yes     | This place has a restaurant           |
| No      | This place doesn't have a restaurant  |
| Unknown | Not sure if this is available or not. |

### Showers

Are there showers avilable?

| Option  | Description                           |
| ------- | ------------------------------------- |
| Hot     | Hot showers are available             |
| Warm    | Warm showers are available            |
| Cold    | Cold showers are available            |
| No      | This place doesn't have showers       |
| Yes     | This place has showers                |
| Unknown | Not sure if this is available or not. |

### Water

Is water available?

| Option         | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| Potable        | Potable (drinkable) water is available                        |
| Non-Potable    | Non-potable (not safe to drink) water is available            |
| Natural Source | Water from a natural source (spring, river, etc) is available |
| No             | Water is not available at this place                          |
| Yes            | Water is available at this place                              |
| Unknown        | Not sure if this is available or not.                         |

### Restroom

Is a restroom available?

| Option        | Description                                |
| ------------- | ------------------------------------------ |
| Running Water | Restrooms with running water are available |
| Pit Toilets   | Restrooms with pit toilets are available   |
| No            | This place doesn't have restrooms          |
| Yes           | This place has restrooms                   |
| Unknown       | Not sure if this is available or not.      |

### Big Rig Friendly

Can big rigs (> 24 feet) fit here?

| Option  | Description                           |
| ------- | ------------------------------------- |
| Yes     | Big rigs will fit at this place       |
| No      | Big rigs will not fit in this place   |
| Unknown | Not sure if this is available or not. |

### Tent Friendly

Are there spots for tent campers?

| Option  | Description                           |
| ------- | ------------------------------------- |
| Yes     | Tents are welcome here                |
| No      | There isn't a place for tents here    |
| Unknown | Not sure if this is available or not. |

### Pet Friendly

Are pets allowed here?

| Option  | Description                           |
| ------- | ------------------------------------- |
| Yes     | Pets are welcome here                 |
| No      | Pets are not welcome here             |
| Unknown | Not sure if this is available or not. |

### Added by

A fully specified url (ex: http://www.liferemotely.com/) that will be used to attribute the person or people who collected the information about this location

### Website

Is there a URL associated with the location? For example, the website for the hotel or campsite?

## Which types support which attributes?

Obviously, not every type of location needs all the extended attributes. For example, we don't need to know if internet is available at a propane station! Here is a break down, by category, of the extended attributes that each category supports:

**Hotel, Hostel, Rental Unit, Unknown Accomodation** support the following extended attributes:

* Open
* Electricity
* Internet
* Kitchen
* Parking
* Restaurant
* Showers
* Water
* Restroom
* Big Rig Friendly
* Tent Friendly
* Pet Friendly
* Added by
* Website

**Propane, Mechanic, Water, Restaurant, Agricultural Checkpoint, Other** support the following extended attributes:

**Campsite, Informal Campsite** support the following extended attributes:

* Open
* Electricity
* Internet
* Kitchen
* Restaurant
* Showers
* Water
* Restroom
* Big Rig Friendly
* Tent Friendly
* Pet Friendly
* Added by
* Website

**Wild Camping** support the following extended attributes:

* Electricity
* Open
* Internet
* Kitchen
* Restaurant
* Showers
* Water
* Restroom
* Big Rig Friendly
* Tent Friendly
* Pet Friendly
* Added by
* Website

[1]: https://docs.google.com/spreadsheet/ccc?key=0ArGX2U6DtKxOdHlMMXZJNkdlOWJJSlZOQVI0aXdqOFE&usp=sharing
[2]: https://docs.google.com/spreadsheet/ccc?key=0ArGX2U6DtKxOdHgtYjFuQnhZRlpRb3ZGd0pDTDNwb2c&usp=sharing
[3]: http://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
[4]: /static/contact "Contact"
