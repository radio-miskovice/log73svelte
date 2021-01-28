# Mouse Logger

## Preface

I have been thinking long, long time about a contest logger running in browser.

Advantages for users:
- universal runtime, available on on hardware and OS platforms
- this universal runtime is very unlikely to go away, at the same time being carefully maintained and developed
- no need to update application: the current version can be automatically loaded from the repository server
- application in browser can easily load various resources and/or data needed for configuration, information or assistance to the operator

Advantages for the developer (i.e. yours sincerely):
- Very easy to develop user interface, using HTML and CSS
  - for instance, all UI elements size and align themselves automatically, contrary to what we see in many applications developed in Pascal, C, C++ and many other programming languages, in which GUI was not the primary goal.
  - styling is very easy, flexible thanks to CSS
  - GUI changes in the application can be easily controlled via DOM properties
- Javascript, although it is maybe not the most orthogonal or orthodox programming language in the world of mathematics, is likely the best in integrating GUI and the program code
- Last but not least, running a javascript program in browser provides an easy way to reach various internet resources using the built-in functionality.

In other words, what could be easier than this!

I originally called this project "Log73" because there are so many loggers with so many names... However, after I developed a study of sending CW from browser via keyer connected to serial port, I realized, that so many things can be done by just clicking the mouse... Including, for instance, editing of contest memory texts - which is usually the most horrible and most tedious task in many contest loggers. So, based on this experience, I decided that "Mouse Logger" would actually be more apt.

## Current features

### UTC clock

Window header displays UTC time based on your computer clock. This time will also be used to log QSO times, check contest periods, etc. Make sure your local clock is accurately synchronized and set to the correct time zone. So far there is no manual or automatic clock adjustment implemented.

### Station Data

Basic station data are edited by clicking edit icon in the header. You can enter callsign, WW locator, name, QTH. More detailed operator or station data are not included and will not be included in the nearest future.
These data are persisted - when you relaod the application page, they will be automatically retrieved. Data are saved automatically every time you change them.

### Band controls and selector

Band controls are represented by mini buttons, each band used has its button. Clicking on a button will select the respective band. In the log, the current band will be logged as band worked. Button text shows band name in meters - 80m, 2m, 70cm and so on.

Band selector is used to reduce the list of all bands (which is very long - including all Region 1, 2 and 3 band allocations, it represents 31 bands) into a set that will be used in current logging session. So, basically, Band Selector dialog contains list of all bands grouped as LF (3 bands), HF (10 bands), VHF, UHF, SHF and EHF. In version 0.0.3 SHF and EHF are omitted, but will be added soon. The reason is that nobody actually needs a contesting program for these bands, many people would be able to keep their few QSOs on a parking ticket or even remember them in their mind.

You can select or unselect bands individually, or by groups (clicking on group checkbox selects or unselects all bands in that group) and you can also filter out non-contesting bands from your current selection. So preparing for a HF contest in ALL category, unselect all, select HF and than click "ONLY CONTESTING BANDS" and you're done.

Band Selector is just a convenience tool to keep your control panel tidy. You can add or remove bands from your logging selection at any time by clicking **SELECT BANDS >>** label again.

Band selection is persistent, i.e. the application will start with the same set of selected bands and current band after reload.

NOT YET IMPLEMENTED:

- synchronize band controls with rig band switching;
- alternative display of band names in KHz, MHz, GHz.

### Mode controls and selector

Similarly to band controls and selector, Mode controls switch the mode logged and Mode selector's purpose is to pick up only the modes you intend to log.

Needless to say, Mode Selector is just a convenience tool to keep your control panel tidy. You can add or remove modes from your logging selection at any time by clicking **SELECT MODES >>** label again.

Mode selection is persistent, i.e. the application will start with the same set of selected modes and current mode after reload.

NOT YET IMPLEMENTED:

- two-way mapping between logged modes (contest modes) and rig modes to facilitate synchronization;
- synchronize mode controls with rig mode switching;
- mapping logged modes to ADIF and vice versa (for log export to LOTW and other systems);
- mapping logged modes to Cabrillo and EDI mode identifiers (for contest log export).

### Contest configuration

Work in progress.
DONE: Configure contest name, contest name for contest log export, contest exchange codes.
TODO: Serial numbers, log file export format.

### Entry panel

Work in progress.
DONE: Display input fields according to contest configuration.
TODO: Non-editable fields for sent exchange. ESM functionality. CQ / S&P switch. 

## Planned features

1. Single-page application running entirely in the browser, with the application files served either from internet repository or from a tiny local server (the application does not need any server to run, the server is only needed to load everything into the browser).
2. All data stored locally. This is similar to using a small database (for instance SQLite), but the difference is that you don't have to keep extra data files and take care that they not be corrupted or deleted.
3. Of course, although the data will be "encapsulated" in the browser, it will be possible to download your logs from the browser to local file (ADIF or JSON, or perhaps some variant of the CSV logs) as well as upload you carefully kept ADIF files and store them in the browser.
4. Basic contest operation - logging contacts with all the necessary information.
5. Exporting contest log (see point 3). Where there will be a standard upload interface, it will be possible to upload the log directly to contest organizer's collection service (website). That means, you won't have to export (save) Cabrillo, then go to the contest website and upload the log manually - you will just fill your contest data (probably just category, since everything else is already stored in the brower) and click a button - if the contest organizer will provide convenient API.
6. Log management - logs from different contests, expeditions or just casual logging, stored nicely in one database.
7. Thanks to the initiative of Google, there is a serial port API available in Chrome. I already successfully tested that it is possible to send text from a browser app via keyer (it was Spider Keyer), so for those using Chrome this feature will be integrated in the first versions. Each keyer protocol will require respective driver to be included in the logger code, but in principle this logger can do the same as other loggers regarding keying. However, in the first generation, there will be no SO2R. Just one keyer talking to one rig.
8.Situation regarding  rig control is even better. Two frequently used rig control programs, rigctld (hamlib) and FLRIG use network interface to communicate with other prorgrams. The first will probably be FLRIG because it uses HTTP protocol, so it should be possible to use it with any browser.

## History of development

Being a "lonely" hobby developer, I was always looking for the easiest way out.  Therefore history of this application is marked by several attempts at doing the same using different tools and frameworks popular in their time.

The first idea was to use Bootstrap and jQuery. I can't recall the year, but it was at least ten years ago. It kind of worked, but handling the data eventually became a nightmare. At that time, I think the only possibility to persist the data was localStorage. Even with the use of JSON.stringify and JSON.parse it was difficult to imagine one could effciently handle large collections of data, hundreds of contacts in a contest, and possibly dozens of contests every year. Last but not least, if I remember, I had difficulty getting data from the internet because of the cross-site restrictions.

The second try was using Angular. For sake of accuracy, I must say it was Angular 1. In presentations and conference speaches it looked wonderful, tutorials and example apps were also appealing. As in the previous story, with the increasing complexity this task has quickly grown to a proportion not manageable by a single person.

Angular 2 and later finally buried any hopes this would be the way go. After I hardly learned Angular 1 and got some idea of design patterns, I would have to learn something completely different.

At least five or six years later, I noticed the existence of React and recalled a discussion back in 2015 with one of our Java developers, who was asking, we used Angular in one of our commercial projects and not React. So I viewed several hours of tutorial videos and decided I would try once more. After no more than three days I realized, I need to get something to handle the complexity of data in a contesting application: I started learning Redux. After another three days of implementing the most simple data, needed for running a simple contest, in react+redux, I realized I spend about 90% or even more just on boilerplating interfaces, types, action types, action dispatchers and reducers, and less than 10% is left for the actual contest program functionality. At that moment I decided to stop this silly enterprise.

Now I learned Svelte. At first I was afraid it would be just another framework bringing its own kind of complexity and boilerplating into the development process, but it seems that *this* one is made for doing simple things simply and enables complex things to be done without unnecessary additional complexity and workarounds.

So this is my last and hopefully final (i.e. successful) attempt to make a contesting application in browser. 