# Challenger business logic description

## Local Storage

All variables that need to be persisted (e.g. to be restored after page reload) are stored in `localStorage`.

Each variable is declared in the respective module in `store` directory as writable. In the same module
autosave function is subscribed to the variable. The autosave function calls `localStorage.setItem(..., ...)`

During initialization of each module, each relevant persisted value is retrieved from localStorage to a constant
named `last<variable name>` and its value is then used as initial value when the respective `writable` is created.

## Database

`IndexedDB` API is used to store contest instances and the station log (collection of all contacts).

There are two indexed object stores:
1. **contest** representing contest instance.
2. **log** representing log (collection of all contacts)

## Logging

### Band and Mode Configuration and Selection

The application holds internally a list of all amateur radio bands and main modes. These two lists are not editable. *[TODO: make the lists editable or downloadable from internet]*

Each item (band or mode) in the respective list has a `selected` attribute. If `selected == true`, the respective band or mode is displayed in Control Panel.

Near band or mode buttons are clickable labels `SELECT BANDS >>` and `SELECT MODES >>`, respectively.

After clicking on the label a configuration dialog will open. In this dialog it is possible to select additional band(s) or mode(s), or unselect those, that the operator intends not to use in the current operating session.

### Band configuration special feature

Band selector has two additional features:

1. Range checkbox: bands are grouped into  conventional groups: LF, HF, VHF, UHF, SHF, EHF. When the user checks or unchecks group checkbox, all bands in the group will be selected or unselected, respectively.
2. Contesting bands filter: when the user click clickable label `ONLY CONTESTING BANDS`, all bands where contests are not allowed (e.g. WARC, 60 meters, VLF) will be unselected.

### Selecting Current Band and Mode

Selecting one of the band buttons will unselect the rest of them and its label will be set as value of variable `currentBand`. The same applies analogically to modes; the variable is `currentMode`.

During band and mode configuration the current band or mode may become unselected. In that case the first of the selected bands, modes will be set as current, so that the `currentBand` and `currentMode` will always be one of the bands or modes visible in Control Panel, thus avoiding logging wrong band or mode by coincidence.

## Contests

Application's primary purpose is to log contest contacts. However, if no contest is in progress, logging is also possible.

Every QSO contains contest reference ID (a string). This contest ID is set to character zero ("0") or "DX" *(yet to be decided...)* in case there is no contest in progress.

In all other cases there should be a valid contest ID, which means, that the contest ID and basic data  must be written
in the contest data store.

### Configuring a contest

1. In Control Panel, open Contest Setup dialog by clicking on edit icon next to current contest name.
