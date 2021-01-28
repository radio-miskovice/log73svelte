/**
 * QSO interface defines minimum structure necessary for contest logging and log integrity
 * id:          unique identifier (generated)
 * utcDateTime: date and time of the contact (D+T when all exchanged info was confirmed; in non-contest 
 *              QSO D+T after first successful 2-way report exchange)
 * ftx?:        TX frequency in Hz, if known
 * frx?:        RX frequency in Hz, if known
 * band:        band identifier, preferably compliant with ADIF, but lowercase. Should be interpreted as case-insensitive.
 *              In case of cross-band QSO this is TX band.
 * bandRx?:      Receiver band, only in case of cross-band QSO
 * mode:        2-way or TX Mode as desired to be logged by the operator (choose from predefined list available, but not mandatory).
 *              Log mode mapping to exported files (ADIF, Cabrillo, EDI) will be handled using a conversion table.
 *              Log mode mapping to TCVR CAT mode will be handled by another mapping table, predefined, but modifiable by the operator.
 *              Mapping of TCVR CAT mode to log mode (contests) has to be determined in mapping rules including tcvr mode, band,
 *              contest definition and possibly additional parameters.
 * modeRx:      Receiver mode in case of cross-mode QSO.
 * mycall:      logging station callsign as presented in the contact
 * op?:         Operator nick or callsign id needed. May be exported as OPERATOR ADIF field
 * call:        callsign worked
 * 
 * *** NOTE: all contest exchange codes are optional, depending on contest rules ***
 * 
 * reportS?:  RST, RSQ, RSV or dB level sent
 * serialS?:  contest QSO serial number sent
 * gridS?:    logging station own grid locator sent
 * ex1S?:     sent exchange code 1 if it is not serial or grid
 * ex2S?:     sent exchange code 2 if it is not serial or grid
 * 
 * reportR?:  RST, RSQ, RSV or dB level received
 * serialR?:  contest QSO serial number received
 * gridR?:    logging station own grid locator received
 * ex1R?:     received exchange code 1 if it is not serial or grid
 * ex2R?:     received exchange code 2 if it is not serial or grid
 * 
 * note?:     any text note made by operator, not exported
 * xtra?:     object containing any additional information in key-value pairs
 * 
 * deleted:   deleted record indicator. Data are never actually deleted, just marked as deleted, not to be used
 */

export interface Qso {
  id: string ; 
  utcDateTime : Date ; 
  ftx?: number ; // integer
  frx?: number ; // integer
  band : string ;  
  bandRx?: string ;
  mode : string ;  
  modeRx?: string ;
  mycall: string ;
  op?: string ;
  call: string ;
  //------ exchange sent -------
  reportS?: string ;
  serialS?: number ;
  gridS?: string ;
  ex1S?: string ;
  ex2S?: string ;
  //------ exchange received -------
  reportR?: string;
  serialR?: number;
  gridR?: string;
  ex1R?: string;
  ex2R?: string;
  note?: string ;
  xtra?: Object ;
  deleted: boolean ;
}

