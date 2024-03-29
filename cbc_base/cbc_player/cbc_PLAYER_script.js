"use strict";
/*  
ClipByClip: A tool to practice language comprehension
Antonio Cigna 2021/2022
license MIT: you can share and modify the software, but you must include the license file 
*/ 
/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint undef: true, unused: true */	 

/*  used in html   onchangeInputRange1  */
/*  used in html   onclick_OneClipRow_play  */
/*  used in html   onclick_22OneClipRow_showHide_sub  */
/*  used in html   onclick_OneClipRow_showHide_sub  */
/*  used in html   onclick_OneClipRow_showHide_tran  */
/*  used in html   onclick_ClipSub_Play  */
/*  used in html   onclick_changeVideoSpeed  */
/*  used in html   onloaded_fun  */
/*  used in html   onclick_change_diff_sync  */
/*  used in html   onclick_skipThisPiece  */
/*  used in html   onclick_pauseContinue  */
/*  used in html   onclick_display_subtitle  */
/*  used in html   onclick_playOrNot_to_sync  */
/*  used in html   onclick_showall_subtitles  */
/*  used in html   onclick_back_from_sub  */
/*  used in html   onclickOnOff  */
/*  used in html   onclick_show_color  */
/*  used in html   onclick_show_statist  */
/*  used in html   onclick_reset_initial_colors  */
/*  used in html   onclick_search_the_best_contrast_textColor  */
/*  used in html   get_last_clip_ix  */
/*  used in html   onclick_show_syncstaff  */
/*  used in html   fun_end_subtitle  */
/*  used in html   onclick_downloadThis_HTML */

//=============================================    								
// 1 beg. former file player_2_a_1_var_only.js             								

/**
Javascript ES6 - ECMAScript 2015 was the second major revision to JavaScript. ECMAScript 2015 is also known as ES6 and ECMAScript 6.
	Chrome	51	May 2016
	Firefox	52	Mar 2017
	Edge	14	Aug 2016
	Safari	10	Sep 2016
	Opera	38	Jun 2016
**/
var currScript = document.currentScript.src; var bar1 = currScript.lastIndexOf("\\");var bar2 = currScript.lastIndexOf("/"); 
console.log("LOADED file SCRIPT " + currScript.substring( 1+Math.max(bar1,bar2) )) ;	

//--------------------------------------------------------


//------------------------------------------
var swdebug = false; 

const NO_VIDEO_AUDIO_FILE = "noVIDEO_noAUDIO".toLowerCase(); 
var sw_is_no_videoaudio = false;

let clock_timer_symb     = "&#x23f1;"  ;
let playLoop_symb        = "&infin;"   ; 
let speakinghead_symb    = "&#128483;" ;

let pause_symb = "&#x23F8;" ; 
let play_symb  = "&#x23F5;" ; 

                                            
let openbook_symb        = "&#128214;" ; 
let closedbook_symb      = "&#128213;" ; 
let left_arrow_symb      = "&#8592;"   ; 
let right_arrow_symb     = "&#8594;"   ; 	
let breakwords_symb      = "/|/" ;  

let Clip_startTime = 0;
let Clip_stopTime  = 0; 
let clipFromRow    = 0;
let clipFromRow_min = 0;
let clipToRow      = 0;
let clip_play_time_interrupt = 0;	

let sw_the_are_no_subtitles = false; 
const NO_TEXT_NO_SUBTITLES = "NO_TEXT_NO_SUBTITLES"; 

let sw_CLIP_play      = false; 

let CLIP_Loop_StartTime    = 0;
let CLIP_Loop_StopTime     = 0;

let sw_CLIP_row_play  = false; 



let sw_active_show_lastSpokenLineTranslation = false;

let CLIP_Row_StartTime    = 0;
let CLIP_Row_StopTime     = 0;
let CLIP_Row_StopIx       = -1;

let last_ixClip=-1;

let ele_last_tran_line; 

let ele_tts = document.getElementById("id_tts"); // synthetic voce  <div >...</div>
let sw_tts = false; 


//
let ONEDAY = 24 * 60*60*1000; 
let start_milliseconds = Date.now();

let num_day_today      = Math.floor(start_milliseconds / ONEDAY); 

let sw_audio = false;

let sw_reset_storage = false; 

let title1 = "";

//--------------------------------------------------
let INITIAL_hex_BG_color = "#C8BEBC"  ; //  "#FFFFF";
let INITIAL_hex_FG_color = "#000000";  
let sw_show_time_in_subtitle = false;
let sw_show_clip_num         = true;
let numOrig = 0; 
let numTran = 0; 	


//-------------------------------------------------------
let vid_duration = 0; 

let ele_video_speed;   
let video_native_height;
let video_native_width;
let newVidH, newVidW;
let newVidHperc , newVidWperc; 
   let inp_text_orig ;
    let inp_text_tran;

let ele_mask_dragsub = document.getElementById("id_mask_dragsub");
let eleTabSub       = document.getElementById("id_tabSub"); 
let eleTabSub_tbody = document.getElementById("id_tabSub_tbody");

let ele_playNextVa_from_hhmmss_value;
let	ele_replayVa_from_hhmmss_value  ; 
let ele_replayVa_to_hhmmss_value    ;
 
let runningButton      = false; // if true action following PlayNext... or Repeat buttons  is running, otherwise it's a standard run   
let save_runningButton = false; // used by pause/continue button


let radio_type1_SECONDS         = "a";
let radio_type2_SECS_END_DIALOG = "b";
let radio_type4_LINES           = "d";

let CLIP_dur_line_TYPES =  radio_type4_LINES; 

let LS_voice_index = -1;



//----------------------------------------------------------------

let cbc_LOCALSTOR_key = "";

//  the LS_... variables here after have their values stored in window.localStorage so that they can be retrieved in the next sessions 
//  all this value are put in a list and saved in one variable the name of which contains the title of the page (each page has its own values)  

let LS_clip_secs0b_value = 3;
let LS_clip_secs1d_value = "3-false-true";
let LS_clip_secs2c_value = 3;
let LS_clip_lines_value  = 3;  

let LS_clip_checked_sw_type    = radio_type2_SECS_END_DIALOG ; // intial default
let LS_clip_checked_type_value = 3; 


let	LS_stor_ext_time     = 1.5 ; 
let	LS_stor_playnext_replay         = "00:00:00,000;;00:00:00,000;;00:00:00,000;;" ;     
let	LS_subDeltaTime                 = 0 ; 
let LS_colorBG       = "#f3c89d"; 
let LS_colorTx       = "black"; 
let LS_sub_beg_delta  = 0; 
let LS_sub_end_delta  = 0;
let LS_sub_force_visible = true;


let sw_end_dialog_sentence = true;  
let sw_end_dialog_overlap  = true;


let cbc_LOCALSTOR_ctrkey = "";
let LS_CTR_1run_num = 0;        // number of runs of this video since  building   
let LS_CTR_2run_days= 0;        // number of days of runs  
let LS_CTR_3run_num_play     = 0;   
let LS_CTR_4run_elapsed      = 0;  // total elapsed time of the runs  
let LS_CTR_5run_videoRunTime = 0;  // total of playback elapsed time 
let LS_CTR_6logon_num_play   = 0;  // number of play enter since logon   
let LS_CTR_7logon_elapsed    = 0;  // total elapsed time of the runs  
let LS_CTR_8logon_videoRunTime = 0;// total of playback elapsed time 
let LS_CTR_9numday_today    = 0;   // num.day  starting 1970 
let LS_CTR_10run_num_lines  = 0;   // num.of subtitle lines 
let LS_CTR_11run_num_words  = 0;   // num.of subtitle words 
let LS_CTR_12logon_num_lines = 0;  // num.of subtitle lines 
let LS_CTR_13logon_num_words = 0;  // num.of subtitle words 

//-------------------------------------------------------------
let ele_last_play; 
let LAST_time_change_ix = 1;
let LAST_time_change_secs = 0;
let PLAYCLIP_TYPE       = 0;
let PLAYCLIP_FROM_TIME  = 0;
let PLAYCLIP_TO_TIME    = 0;
let PLAYCLIP_FROM_LINE  = 0;
let PLAYCLIP_TO_LINE    = 0;
let CLIP_ENDTIME_PLUS   = 0;
let CLIP_ENDTIME_MINUS  = 0;
let SW_CLIP_ENDED       = false; 
//--------------------------------------------------------

let playTRIGGER_clip = 1; 
let playTRIGGER_row  = 2; 
let playTRIGGER_emul = 3; 

let lastPlayTrigger = playTRIGGER_emul; 
let lastPlayRowFromIx, lastPlayRowToIx, lastPlayRowFromTime, lastPlayRowToTime, lastPlayRowLoop; 
let lastPlayListFrom = [];
let lastPlayListIx = -1; 
let last_BoldRow; 
//----------------------------------------
let TO_TIME_TOLERANCE   = 0.5; 


let ele_replay_from_secs_innerHTML     ;

let ele_replayVa_from_row_value   ;

let ele_replay2_from_row_innerHTML     ;

let ele_replay_to_secs_innerHTML       ; 

let ele_replayVa_to_row_value      ;

let ele_replay2_to_row_innerHTML      ; 

 

let ele_clip_subtext          ; 
let html_parms_queryString = ""; 
//------------------------



let ele_dragSubT;
let ele_dragSubT_anchor;

let wScreen;
let hScreen;
let subtitles_beg_delta_time;

let src1;
let vid;
let MAX999;
let sw_HARD_subtitle;
let path1;
let sayNODIALOG = "-NODIA-";
let f1;
let f2;
let f3;
let barra;


let lastClipTimeBegin;
let lastClipTimeEnd;
let ele_time_video;
let ele_sub_filler;
let ele_subOrigText2;
let ele_subTranText2;
let ele_showOrigText2_open;
let ele_showOrigText2_close;
let	ele_showTranText2_open; 
let	ele_showTranText2_close; 
let ele_subOrigSilent;
let ele_subOrigSilentH;
let ele_main_subt = document.getElementById("id_main_subt");  

let list_elemSub =["",""];
let list_elemSub_display = [false,false];

let line_list_o_number_of_elements = 0;
let line_list_t_number_of_elements = 0;

let isPlaying      = false;
let sw_sub_onfile  = false;
let sw_sub_orig    = false;
let sw_sub_tran    = false;
let sw_no_subtitle = false; // no subtitles ( neither inside the video, neither in any file apart

let LIMIT_MIN_TIME_CLIP;
let MIN_ixClip   = 0;
let MAX_ixClip   = MAX999;





let inp_row_orig = [];
let inp_row_tran = [];

let number_of_subtitle_endsentence = 0; 
let number_of_subtitle_time_overlap= 0; 

let line_list_o_from00 = [];
let line_list_o_to00 = [];
let line_list_o_maxto00 = [];

let line_list_o_from1 = [];
let line_list_o_to1 = [];
let line_list_o_maxto1 = [];
let line_list_orig_text = [];
let line_list_o_tran_ixmin = [];
let line_list_o_tran_ixmax = [];

let line_list_t_from00 = [];
let line_list_t_to00 = [];
let line_list_t_maxto00 = [];

let line_list_t_from1 = [];
let line_list_t_to1 = [];
let line_list_t_maxto1 = [];
let line_list_tran_text = [];

//orig_and_tran_in_one_line();
let LAST_SEARCH_o_time = -1;
let LAST_SEARCH_o_ix;
let LAST_SEARCH_o_fromto;

let LAST_SEARCH_t_time = -1;
let LAST_SEARCH_t_ix;
let LAST_SEARCH_t_fromto;
//------------------------------------



let ele_ctl_playpause = document.getElementById("id_ctl_playpause"); 
ele_ctl_playpause.children[0].innerHTML = ele_ctl_playpause.children[0].innerHTML.replace("§play_symb§",play_symb);  
ele_ctl_playpause.children[1].innerHTML = ele_ctl_playpause.children[1].innerHTML.replace("§pause_symb§",pause_symb);  
let ele_ctl_slider = document.getElementById("id_ctl_slider"); 
let ele_ctl_value  = document.getElementById("id_ctl_value"); 
let ctl_slider_maxValue_hhmm = 0; 
let myLang = navigator.language;        // eg.  it-IT
let decimal_point = (0.123).toLocaleString( myLang ).toString().substr(1,1);    
  

let eleTabSub_diff_clientW, eleTabSub_diff_clientH; 
[ eleTabSub_diff_clientW, eleTabSub_diff_clientH ] = getPadding_width_height_px( eleTabSub ); 

let eleTabSub_save_clientWidth, eleTabSub_save_clientHeight;  
let sw_eleTabSub_widthInit = true; 
let t_swMove = true;

//-----------------------------


getUrlData2(); 	

window.dispatchEvent(new Event('resize'));
document.getElementById('id_practice').style.visibility = "hidden";

//assign_practice_msg();

//-----------------------------------------------------------------------  
if (sw_sub_onfile == false) {
    sw_show_clip_num = false;
} 
//--------------------------------------------------------
if (document.getElementById("id_playNext2_line_row") ) { 
	if (sw_show_clip_num) {
		document.getElementById("id_playNext2_line_row").hidden = false;
		document.getElementById("id_replay_line_row").hidden = false;
	} else {
		document.getElementById("id_playNext2_line_row").hidden = true;
		document.getElementById("id_replay_line_row").hidden = true;
	}
 } 
//--------------------------


//================================================
function assign_params_for_word_html_file(wh) {
	//console.log("assign_params_for_word_html_file(wh=" + wh+")" )
	
	var params = html_parms_queryString; 	
	params += "&p_subDeltaTime="  +  LS_subDeltaTime; 	// add parameter to html_parms_queryString (the input parameter) 
	params += "&p_voice_index="   +  LS_voice_index; 
	//--------------------------
	
	let html2call  = "cbc_PLAYER_WORDS.html";  
	var assign_parms =  html2call + params; 
	document.getElementById("id_href_parole").href =  assign_parms; 
	
	
	let html2call2  = "cbc_PLAYER_BILINGUAL.html";  
	var assign_parms2 =  html2call2 + params; 
	document.getElementById("id_href_biling").href =  assign_parms2; 
	
	
	let html2call3  = "cbc_PLAYER_ORIG_TEXT.html";  
	var assign_parms3 =  html2call3 + params; 
	document.getElementById("id_href_origTxt").href =  assign_parms3; 
}

//================================================


function getUrlData2() {
	
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX getUrlData2() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n"); 
	
	html_parms_queryString = window.location.search;
	console.log("window.location.search = html_parms_queryString="  +  html_parms_queryString);
	
	//assign_params_for_word_html_file(1);  	
	
	if ((html_parms_queryString == undefined ) || (html_parms_queryString.trim() == "") ) {
	
		let myLang = "en"; 
		let local_language = navigator.language;
		if (local_language) {
			myLang = local_language.substr(0,2);
		}
		
	
		let msg1 = "<div style='backgroundColor:white; color:black;'>"; 
		
		msg1 += "<br><br><br><div style='color:red; font-size:1.3em;'>" + "<b>" + 
								  document.getElementById("m001").innerHTML + "</b></div><br>" ;  
		msg1 += "<br><div>" +     document.getElementById("m002").innerHTML + "</div>" ;  
		msg1 += "<br><div>" +     document.getElementById("m003").innerHTML + "</div>" ;  
		msg1 += "<br><br><div>" + document.getElementById("m004").innerHTML + "</div>" ;  
		msg1 += "</div>"; 
		/**
		let msg1 = "<br>"  + "This html file has no parameters to use.<br>" + 
			"It seems it has been started clicking on it or writing its name on the line command.<br>" +
			"It can run only if its called by a file built by ClickByClip_builder.html";
		**/	

		document.getElementById("id_div20").innerHTML = msg1;  
		return; 	
	} 
	
	const urlParams = new URLSearchParams(html_parms_queryString);		

	console.log(  decodeURI(  html_parms_queryString.replaceAll("&","\n") )  );

	//document.getElementById("id_url").innerHTML =  decodeURI(  html_parms_queryString.replaceAll("&","<br>")  	); 

	
	let script_sub_path = decodeURI( urlParams.get("p_scr_sub1") );  
	console.log("script_sub_path=" + script_sub_path); 

	document.getElementById("id_hardsub"     ).innerHTML = decodeURI( urlParams.get("p_hardsub"     ) );   
	document.getElementById("id_file_suborig").innerHTML = decodeURI( urlParams.get("p_file_suborig") );   
	document.getElementById("id_file_subtran").innerHTML = decodeURI( urlParams.get("p_file_subtran") );  	
	document.getElementById("id_reset_storage").innerHTML= decodeURI( urlParams.get("p_reset_storage")); 
	
	
	sw_reset_storage = (document.getElementById("id_reset_storage").innerHTML == "true"); 
	

	var listener_video_src =  urlParams.get("p_video_src");  
	if (listener_video_src.toLowerCase().indexOf( NO_VIDEO_AUDIO_FILE ) >=0 ) {
		sw_is_no_videoaudio = true; 
	} else {
		video_native_height = decodeURI( urlParams.get("p_video_h"    ) ); 
		video_native_width  = decodeURI( urlParams.get("p_video_w"    ) ); 
		let errVideo=false;		
		if ( isNaN(video_native_height) ) {errVideo=true;}
		if ( isNaN(video_native_width) )  {errVideo=true;}
		if (errVideo) {
			console.log("VIDEO  ERROR   height or width not numeric ") ;
			document.getElementById("id_div20").innerHTML = "<br><br><br>"   + "VIDEO/AUDIO file ERROR"  + "<br><br>" + "<small>" + "run the Builder again" +"</small>";   
			document.getElementById("id_div20").style.fontSize="2em";   
			document.getElementById("id_div20").style.color = "red";   		
			document.getElementById("id_div20").style.backgroundColor = "white";   		
		}
	}
	
	// Create new script element
	const scriptSub = document.createElement('script');
	scriptSub.src = script_sub_path;
		
	//-------------------------------
	scriptSub.addEventListener('load', function() {
					// The script is loaded completely
					// Do something
					
					
					document.getElementById("id_txta_orig_sub").innerHTML =  txta_orig_sub;   
					document.getElementById("id_txta_tran_sub").innerHTML =  txta_tran_sub;   
					
					
					document.getElementById("id_titolo").innerHTML = urlParams.get("p_title");
					document.title = urlParams.get("p_title");
					
					
					var listener_video_src =  urlParams.get("p_video_src");  
					if (listener_video_src.toLowerCase().indexOf( NO_VIDEO_AUDIO_FILE ) >=0 ) {
						sw_is_no_videoaudio = true; 
					} else {
						document.getElementById("myVideo").src = urlParams.get("p_video_src");  
						document.getElementById("myVideo").style.display = "block";  
					}
					title1 = document.title; 
									
					cbc_LOCALSTOR_key    = "ClipByClip_player_"    + encodeURI(title1);	
					cbc_LOCALSTOR_ctrkey = "ClipByClip_playerCtr_" + encodeURI(title1);			
					
					fun_initial_from_localStorage_values();				
					
					
					//---------------------------------------------------------
					hex_defaultColorBG = fun_colorNameToHex( "#989a79");  
					hex_defaultColorTx = fun_colorNameToHex( "black" ); 	
					hex_current_ColorBG = hex_defaultColorBG ;
					hex_current_ColorTx = hex_defaultColorTx ;
					
					get_last_start_colors();
					
					//------------------------------------------------------------
						
					onclick_change_color( hex_defaultColorBG  , 'BG',  false); 	
					onclick_change_color( hex_defaultColorTx  , 'FG',  true); // calcola ratio contrasto
					//id_list_id_border
					
					lastBG_rgb_color = 	fun_hexToRgb( hex_defaultColorBG ) ; 
					if (sw_is_no_videoaudio) {
						FAKE_onloaded_fun(); 
						ready_to_Begin();
					}					
				}
	);
	//--------------------------------
	// Append to the `head` element
	document.head.appendChild(scriptSub);

} // end of getUrlData2()
//---------------------------------------------
       
function get_last_start_colors() {	
	
	let hBG="", hFG=""; 
	try{
		hBG = LS_colorBG;
	} catch(e1) {
	}	
	try{
		hFG = LS_colorTx; 
	} catch(e1) {
	}	
	//------------
	if (hBG) {
		if( hBG.substring(0,1) == '#') {  
			hex_defaultColorBG =  hBG; 
		}
	}
	if (hFG) {
		if( hFG.substring(0,1) == '#') {  
			hex_defaultColorTx =  hFG; 
		}
	}
	//-----------------
	//-------------------------------------------------		
	document.getElementById("id_colorBG" ).value = hex_defaultColorBG ;
	document.getElementById("id_colorTx").value  = hex_defaultColorTx;
	//----------------------------------------------------------------
	
} // end of get_last_start_colors()

//------------------------------------------
//=======================================================


 //  end former file player_2_a_2_customization_script.js 								
//=============================================    	


//--------------------
function fun_setZeroNaN( num ) { 
	if (num) {
		if (isNaN( num )) { return 0; }
		else { return num;}	
	} else {
		return 0; 
	}
}	
//---------
function fun_start_logon_ctr() {	
   
	LS_CTR_1run_num += 1;
	if (num_day_today > LS_CTR_9numday_today) {
		// new day 
		LS_CTR_2run_days +=1; 
		LS_CTR_9numday_today = num_day_today;
	}
	LS_CTR_1run_num         =  fun_setZeroNaN( LS_CTR_1run_num          ); 
	LS_CTR_2run_days        =  fun_setZeroNaN( LS_CTR_2run_days         ); 
	LS_CTR_3run_num_play    =  fun_setZeroNaN( LS_CTR_3run_num_play     ); 
	LS_CTR_4run_elapsed     =  fun_setZeroNaN( LS_CTR_4run_elapsed      ); 
	LS_CTR_5run_videoRunTime=  fun_setZeroNaN( LS_CTR_5run_videoRunTime ); 
		 
	LS_CTR_6logon_num_play     = 0; 
	LS_CTR_7logon_elapsed      = 0; 
	LS_CTR_8logon_videoRunTime = 0; 
	LS_CTR_12logon_num_lines = 0;  // num.of subtitle lines 
	LS_CTR_13logon_num_words = 0;  // num.of subtitle words 
		
	//if ( LS_CTR_1run_num > -1) {document.getElementById("id_suggest").style.display = "none"; }	
	
	fun_set_localStorage_ctrvar_item_from_vars();

} // end of fun_start_logon_ctr()
//=========================================================================

function fun_initial_from_localStorage_values(wh) {
	
	//----------------------
	// the LS_ ... default values are replaced by the those of the previous session ( if they exist)


	
	let stored_cbc_localStor = JSON.parse(localStorage.getItem( cbc_LOCALSTOR_key )); //get them back
	if (stored_cbc_localStor) {		
		
		if (sw_reset_storage) {
			fun_set_localStorage_item_from_vars(); 
		} else { 
			[
			LS_clip_checked_sw_type     ,  
			LS_clip_checked_type_value  ,  
			LS_clip_lines_value         , 
			LS_clip_secs0b_value        , 
			LS_clip_secs1d_value        ,       
			LS_clip_secs2c_value        ,      
			LS_stor_ext_time            ,  
			LS_stor_playnext_replay     ,     
			LS_subDeltaTime             ,                
			LS_colorBG                  ,
			LS_colorTx                  ,          
			LS_sub_beg_delta            ,  
			LS_sub_end_delta            ,
			LS_sub_force_visible        ,
			LS_voice_index              	
			]  =  stored_cbc_localStor; 
			if (LS_voice_index== undefined) {  LS_voice_index=-1;}			
		}	
	} else { 
		fun_set_localStorage_item_from_vars(); 
	}
		
	let stored_cbc_localStor2 = JSON.parse(localStorage.getItem( cbc_LOCALSTOR_ctrkey )); //get them back
	if (stored_cbc_localStor2) {
		[		 
		 LS_CTR_1run_num     ,
		 LS_CTR_2run_days    ,
		 LS_CTR_3run_num_play,        
		 LS_CTR_4run_elapsed     ,     
		 LS_CTR_5run_videoRunTime,     
		 LS_CTR_6logon_num_play,      
		 LS_CTR_7logon_elapsed , 
		 LS_CTR_8logon_videoRunTime , 		
		 LS_CTR_9numday_today ,
		 LS_CTR_10run_num_lines    ,   
	     LS_CTR_11run_num_words    , 
	     LS_CTR_12logon_num_lines  ,  
	     LS_CTR_13logon_num_words   
		]  =  stored_cbc_localStor2; 		
	} else { 
		fun_zero_to_LS_ctr();
	}	
	
	fun_start_logon_ctr() ;
	
	assign_params_for_word_html_file(2);
	
} // end of fun_initial_from_localStorage_values()
//---------------------------------------------

function fun_player_beginning() {

	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX fun_player_beginning() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n"); 
	
    let help_filename = document.getElementById("mh00").innerHTML;

    document.getElementById("gotoHelp0").href = help_filename;
    //document.getElementById("gotoHelp1").href = help_filename + "#help_01playnextclip";
    //document.getElementById("gotoHelp2").href = help_filename + "#help_02repeat";
    //document.getElementById("gotoHelp3").href = help_filename + "#help_03duration";
    //document.getElementById("gotoHelp4").href = help_filename + "#help_04sync";
    //document.getElementById("gotoHelp5").href = help_filename + "#help_05pausecont";
	//document.getElementById("gotoHelp6").href = help_filename + "#help_06words";
   	
   
    ele_clip_subtext     = document.getElementById("id_tabSub"); 
		
    MAX_ixClip = line_list_o_number_of_elements - 1;
    MIN_ixClip = 1;


    document.getElementById("id_div20").style.display = "block";
    //let firstDrag = true;


    ele_dragSubT = document.getElementById("id_dragSub");
    ele_dragSubT_anchor = document.getElementById("id_dragSub_anchor");
	


    wScreen = screen.availWidth;
    hScreen = screen.availHeight;

    subtitles_beg_delta_time = 0;
    src1 = document.getElementById("myVideo").src;

    lastClipTimeBegin = 0;
    lastClipTimeEnd = 0;

    MAX999 = 999999;

   
    //document.getElementById("id_show_sub").style.display = "table"; //  "block";

    //document.getElementById("MIO6hard").style.display = "none";

  

    /*
    <span id="id_hardsub" style="display:none;">true</span>   
    <span id="id_file_suborig" style="display:none;">false</span>   
    <span id="id_file_subtran" style="display:none;">false</span>  
    */
	
	 
	
    sw_HARD_subtitle = (document.getElementById("id_hardsub").innerHTML == "true");
    sw_sub_orig = (document.getElementById("id_file_suborig").innerHTML == "true");
    sw_sub_tran = (document.getElementById("id_file_subtran").innerHTML == "true");
	sw_sub_onfile = (sw_sub_orig || sw_sub_tran); //123
    sw_no_subtitle = ((sw_HARD_subtitle == false) && (sw_sub_onfile == false)); // no subtitles ( neither inside the video, neither in any file apart
	sw_reset_storage = (document.getElementById("id_reset_storage").innerHTML == "true"); 
	/*
	   HARD         orig            tran 
	true/false   true/false 	 true/false  -->  2*2*2 = 8 	
	---------------------------------------------------------
	
	HARD     sub_onfile
	true        true             ==>  incompatible prefer subtitles on files -->  force HARD = false
    true        false
	false       true
    false       false            ==>  sw_no_subtitle 
	*/
	if (sw_sub_onfile) { 
		sw_HARD_subtitle = false; 
	}  else {  
		sw_no_subtitle = (sw_HARD_subtitle == false); 
	}
	if (sw_no_subtitle) {		
		eleTabSub.style.display = "none";
	}
	
	get_lines_from_file_sub(); //123123	
	numOrig = inp_row_orig.length; 
	numTran = inp_row_tran.length; 	
	
	//---------------------
	if (sw_sub_onfile) {
		if ( (sw_sub_orig) && (sw_sub_tran==false)) {
			inp_row_tran = inp_row_orig; 
		} 
		if ( (sw_sub_orig == false) && (sw_sub_tran)) {
			inp_row_orig = inp_row_tran; 
		} 
	}	
	
	//------------------------------------

    fun_set_none_and_block();

	
    //-------------------------------------------------------       


    // let lev2 
    path1 = window.location.pathname;
    f1 = path1.lastIndexOf("/");
    f2 = path1.lastIndexOf("\\");
    f3 = -1;
    barra = "/";
    if (f1 > f2) {
        f3 = f1;
        barra = "/";
    } else {
        f3 = f2;
        barra = "\\";
    }


    lastClipTimeBegin = 0;
    lastClipTimeEnd = 0;

    //sw_play_step = false;
    //sw_jump = false;


    ele_time_video = document.getElementById("id_time_video");

    ele_sub_filler = document.getElementById("id_sub_filler");
    ele_subOrigText2 = document.getElementById("id_subOrigText2");
    ele_subTranText2 = document.getElementById("id_subTranText2");
	ele_showOrigText2_open  = document.getElementById("idb_xx").children[0]; 
	ele_showOrigText2_close = document.getElementById("idb_xx").children[1]; 
	ele_showTranText2_open  = document.getElementById("idbT_xx").children[0]; 
	ele_showTranText2_close = document.getElementById("idbT_xx").children[1]; 
    ele_subOrigSilent = document.getElementById("id_subOrigSilent");
    ele_subOrigSilentH = document.getElementById("id_subOrigSilentH");
    list_elemSub = [ele_subOrigText2, ele_subTranText2];
	/**
	try {
		ele_sub_filler.innerHTML = document.getElementById("ma17").innerHTML; //  click on left/right  to read> the original and translated subtitles here   
	} catch(e1) {
	}
	**/

    isPlaying = false;

    //get_orig_tran_text(); //123  
	
	get_tran_subtitle_text(); // must stay before 'get_orig_subtitle_text()'	
	get_orig_subtitle_text();   
		
	console.log( number_of_subtitle_endsentence + "  number of subtitle lines ending a sentence (dialog end with end of sentence)"); 
	console.log( number_of_subtitle_time_overlap + " number of subtitle lines with time overlap (dialog ends when there is no overlap)");    
	
	
    line_list_o_number_of_elements = line_list_o_from1.length;
	line_list_t_number_of_elements = line_list_t_from1.length;
	
    if ( (sw_sub_orig == false) && (sw_HARD_subtitle == false)) {
        document.getElementById("id_td_suborig2").style.display = "none";
    }
	
    if (sw_sub_tran == false) {
        document.getElementById("id_td_subtra2").style.display = "none";
    }
	

	//document.getElementById("id_divdragSub").style.display = "block";  //anto20220122
	
	//fun_dragElement(ele_dragSubT, ele_dragSubT_anchor); // anto20220122
	
	if (sw_sub_onfile == true) {
		document.getElementById("id_central"     ).style.display="block"; // anto20220122
	} 		

    LIMIT_MIN_TIME_CLIP = 0.100; // if time too near ( difference <  LIMIT_MIN_TIME_CLIP) to toTimeClip than use next clip number 

    document.getElementById("id_div20").style.display = "block";

    fun_update_html_with_last_session_values();  
	
	fun_set_next_div_via_cliptype(); 

    fun_initial_update_delta_time();

    if (sw_sub_onfile == false) {
        ele_sub_filler.style.display = "none";
		document.getElementById("id_playNext2_line_row").style.display = "none";  
		document.getElementById("id_replay2_line_row"  ).style.display = "none";  
		document.getElementById("id_replay_line_row"  ).style.display = "none";
    }

    //-------------------------------

    fun_setMinMaxIxClip();


    if (sw_is_no_videoaudio == false) {
		fun_replace_video_src();
	}

    
    console.log("\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +					
					"\nsw_no_subtitle   = " + sw_no_subtitle   + 
                    "\nsw_HARD_subtitle = " + sw_HARD_subtitle +
                    "\nsw_sub_onfile    = " + sw_sub_onfile + 
                    "\nsw_sub_orig      = " + sw_sub_orig   + "   num." +  line_list_orig_text.length + 
                    "\nsw_sub_tran      = " + sw_sub_tran   + "   num." +  line_list_tran_text.length + 
                    "\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" );
   
        
        if (sw_sub_onfile == false) { 
                        document.getElementById("id_labshowclip").style.display   = "none"; 
                        document.getElementById("id_inpshowclip").style.display = "none"; 
			
			document.getElementById("id_playNext2_line_row").style.display = "none";  	
			document.getElementById("id_replay2_line_row"  ).style.display = "none"; 
        }       
    
	
	 
	former_onclick_ClipSub_All();                    //  ...ClipSub_All(document.getElementById("id_inpshowclipA") ); 
	
	//subtitle_row_length2();
	onclick_scroll_right( document.getElementById("id_bRigthLeft") ) ;
	onclick_scroll_right( document.getElementById("id_bRigthLeft") ) ;
	onclick_scroll_right( document.getElementById("id_bRigthLeft") ) ;
	
} // end of player script beginning 

//------------------------------------------------------------------------

function fun_set_localStorage_item_from_vars() {
	
	let cbc_LOCALSTOR_val_list = [
		LS_clip_checked_sw_type     ,  
		LS_clip_checked_type_value  ,  
		LS_clip_lines_value         , 
		LS_clip_secs0b_value        , 
		LS_clip_secs1d_value        ,       
		LS_clip_secs2c_value        ,      
		LS_stor_ext_time            ,  
		LS_stor_playnext_replay     ,     
		LS_subDeltaTime             , 
		LS_colorBG                  ,
		LS_colorTx                  , 	
		LS_sub_beg_delta            ,  
		LS_sub_end_delta            ,
		LS_sub_force_visible        ,
		LS_voice_index
	]; 
	localStorage.setItem( cbc_LOCALSTOR_key, JSON.stringify( cbc_LOCALSTOR_val_list )); 	
	
	
	assign_params_for_word_html_file(3);
	
}
//-----------------------------------------------
function fun_timeStr( millsecs) {	
	if (isNaN( millsecs) ) {
		millsecs = 0;
	} 
	try {
		const d = new Date( millsecs );		
		let text = d.toISOString();
		let dd = parseInt(text.substr(9,2)) ;
		let hh0 = parseInt(text.substr(11,2));
		let hh = hh0;
		let min = text.substr(13,6);
		if (dd > 1) {  hh = hh0 + dd - 1; }
		let timex = hh.toString() + min; 
		//console.log(" timeStr millsecs=" + millsecs + " text" + text + " timex =" + timex);  
		return timex;
	} catch(e1) {
		console.log("error in ..a_var_def_init.js fun_timeStr(millsecs=" + millsecs + " ERROR = " + e1); 
		//alert("error in ..a_var_def_init.js fun_timeStr(millsecs=" + millsecs + " ERROR = " + e1); 
		return "00:00:00.000"; 
	}
} // end of timeStr	

//-----------------------------------------------
function fun_set_localStorage_ctrvar_item_from_vars() {

	
	LS_CTR_1run_num         =  fun_setZeroNaN( LS_CTR_1run_num          ); 
	LS_CTR_2run_days        =  fun_setZeroNaN( LS_CTR_2run_days         ); 
	LS_CTR_3run_num_play    =  fun_setZeroNaN( LS_CTR_3run_num_play     ); 
	LS_CTR_4run_elapsed     =  fun_setZeroNaN( LS_CTR_4run_elapsed      ); 
	LS_CTR_5run_videoRunTime=  fun_setZeroNaN( LS_CTR_5run_videoRunTime ); 
	
	let cbc_LOCALSTOR_ctrval_list = [	
		 LS_CTR_1run_num     ,
		 LS_CTR_2run_days    ,
		 LS_CTR_3run_num_play,        
		 LS_CTR_4run_elapsed     ,     
		 LS_CTR_5run_videoRunTime,     
		 LS_CTR_6logon_num_play,      
		 LS_CTR_7logon_elapsed , 
		 LS_CTR_8logon_videoRunTime , 		
		 LS_CTR_9numday_today     , 
		 LS_CTR_10run_num_lines   ,  
		 LS_CTR_11run_num_words   ,  
		 LS_CTR_12logon_num_lines ,  
		 LS_CTR_13logon_num_words 
	]; 
	
	localStorage.setItem( cbc_LOCALSTOR_ctrkey, JSON.stringify( cbc_LOCALSTOR_ctrval_list )); 

	
	document.getElementById("st_1nclip").innerHTML = LS_CTR_6logon_num_play; 
	document.getElementById("st_1elap").innerHTML  = fun_timeStr(LS_CTR_7logon_elapsed);
	document.getElementById("st_1vidtm").innerHTML = fun_timeStr(LS_CTR_8logon_videoRunTime);

	document.getElementById("st_2day").innerHTML   = LS_CTR_2run_days ;
	document.getElementById("st_2run").innerHTML   = LS_CTR_1run_num  ;								
	document.getElementById("st_2nclip").innerHTML = LS_CTR_3run_num_play ; 
	document.getElementById("st_2elap").innerHTML  = fun_timeStr(LS_CTR_4run_elapsed) ; 
	document.getElementById("st_2vidtm").innerHTML = fun_timeStr(LS_CTR_5run_videoRunTime); 
		
	document.getElementById("st_2lines").innerHTML   = LS_CTR_10run_num_lines ;
	document.getElementById("st_2words").innerHTML   = LS_CTR_11run_num_words ;
	document.getElementById("st_1lines").innerHTML   = LS_CTR_12logon_num_lines;
	document.getElementById("st_1words").innerHTML   = LS_CTR_13logon_num_words;
	
	//document.getElementById("id_statist").innerHTML = stat0 + "\n" + stat12 + "\n" +  stat1 + "\n" + stat2 + "\n" + "</table> \n";	
	
	//fun_list_localStorageItems();
	
}

//------------------------------------
function fun_zero_LS_storage_var() {

		LS_clip_secs0b_value = 3;
		LS_clip_secs1d_value = "3-false-true";
		LS_clip_secs2c_value = 3;
		LS_clip_lines_value  = 3;  

		LS_clip_checked_sw_type    = radio_type2_SECS_END_DIALOG ; // intial default
		LS_clip_checked_type_value = 3; 


		LS_stor_ext_time     = 1.5 ; 
		LS_stor_playnext_replay         = "00:00:00,000;;00:00:00,000;;00:00:00,000;;" ;     
		LS_subDeltaTime                 = 0 ; 
		LS_colorBG       = "#f3c89d"; 
		LS_colorTx       = "black"; 
		LS_sub_beg_delta  = 0; 
		LS_sub_end_delta  = 0;
		LS_sub_force_visible  = true;
		LS_voice_index = -1;
		sw_end_dialog_sentence = true;  
		sw_end_dialog_overlap  = true;

		cbc_LOCALSTOR_ctrkey = "";
		LS_CTR_1run_num = 0;        // number of runs of this video since  building   
		LS_CTR_2run_days= 0;        // number of days of runs  
		LS_CTR_3run_num_play     = 0;   
		LS_CTR_4run_elapsed      = 0;  // total elapsed time of the runs  
		LS_CTR_5run_videoRunTime = 0;  // total of playback elapsed time 
		LS_CTR_6logon_num_play   = 0;  // number of play enter since logon   
		LS_CTR_7logon_elapsed    = 0;  // total elapsed time of the runs  
		LS_CTR_8logon_videoRunTime = 0;// total of playback elapsed time 
		LS_CTR_9numday_today    = 0;   // num.day  starting 1970 
		LS_CTR_10run_num_lines  = 0;   // num.of subtitle lines 
		LS_CTR_11run_num_words  = 0;   // num.of subtitle words 
		LS_CTR_12logon_num_lines = 0;  // num.of subtitle lines 
		LS_CTR_13logon_num_words = 0;  // num.of subtitle words 	

} // end of fun_zero_LS_storage_var(); 
//------------------------------------
function fun_zero_to_LS_ctr() {
   
	     LS_CTR_1run_num        = 0;
		 LS_CTR_2run_days       = 0 ;
		 LS_CTR_3run_num_play   = 0;
		 LS_CTR_4run_elapsed    = 0;  
		 LS_CTR_5run_videoRunTime   = 0; 
		 LS_CTR_6logon_num_play     = 0; 
		 LS_CTR_7logon_elapsed      = 0; 
		 LS_CTR_8logon_videoRunTime = 0; 
		 
		 LS_CTR_9numday_today  = num_day_today; 
		 LS_CTR_2run_days +=1; 
		 
		 LS_CTR_10run_num_lines = 0;    // num.of subtitle lines 
		 LS_CTR_11run_num_words = 0;    // num.of subtitle words 
		 LS_CTR_12logon_num_lines = 0;  // num.of subtitle lines 
		 LS_CTR_13logon_num_words = 0;  // num.of subtitle words  
		
		 fun_set_localStorage_ctrvar_item_from_vars() ;   
		 
} // end of fun_zero_to_LS_ctr()

//--------------------------------
 
function fun_remove_old_clipbyclip_localStorageItems() {	
	console.log("\tfun_remove_old_clipbyclip_localStorageItems()" );
	var numrem=0;
	try{ 
		for(let i=0, len=localStorage.length; i<len; i++) {
			let key   = localStorage.key(i);
			if (key.substr(0,10) != "ClipByClip") { 
					continue;
			}			
			localStorage.removeItem(key); 
			console.log("localStorage key=" + key + " removed ");
			numrem++;
		}
	} catch(e1) {
	}	
	try{ 
		for(let i=0, len=localStorage.length; i<len; i++) {
			let key   = localStorage.key(i);
			if ((key.indexOf("stor_playnext_replay") < 0) && (key.indexOf("stor_id_video_folder") < 0)) { 
					continue;
			}			
			localStorage.removeItem(key); 
			console.log("localStorage key=" + key + " removed ");
			numrem++;
		}
	} catch(e1) {
	}	
	
	fun_zero_LS_storage_var(); 
	
	
	console.log("\tremoved " + numrem + " elements");

} // end of fun_remove_old_clipbyclip_localStorageItems()

//---------------------------

function fun_remove_localStorageItems() {	
	
	console.log("\nxxxxxxxxxxxxxxxxxxxxx\nREMOVE Local Storage"); 
	try{ 
		for(let i=0, len=localStorage.length; i<len; i++) {
			let key = localStorage.key(i);
			if (key != cbc_LOCALSTOR_key) { continue;}
			
			localStorage.removeItem(key); 
			console.log("localStorage key=" + key + " removed ");
		}
	} catch(e1) {
	}	
	console.log("");
	try{ 
		for(let i=0, len=localStorage.length; i<len; i++) {
			let key = cbc_LOCALSTOR_ctrkey.key(i);
			if (key != cbc_LOCALSTOR_ctrkey) { 		
				continue;
			}
			console.log("localStorage key=" + key + " removed");
		}
	} catch(e1) {
	}		
	console.log("-------------------------------\n"); 
	
	

} // end of fun_remove_localStorageItems()

//------------------------------
function onclick_reset_storage() {
	console.log("\nXXXXXX  onclick_reset_storage()\n"); 
	//fun_remove_old_clipbyclip_localStorageItems();
	
	fun_remove_localStorageItems();
	
	fun_zero_LS_storage_var(); 	
	sw_reset_storage = true; 
	
	fun_zero_to_LS_ctr();
	document.getElementById("id_diff_sync").value = 0;
	subtitles_beg_delta_time = 0;
	//document.getElementById("id_start_sync").value = fun_N_secs_to_hhmmssmmm(0);
	
	vid.currentTime = 0; 
	fun_initial_from_localStorage_values(); 
	fun_list_localStorageItems();
}

//-------------------------------------------------
//fun_remove_localStorageItems()
//fun_list_localStorageItems();
//------------------------------------
function fun_list_localStorageItems() {	
	console.log("\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nLIST Local Storage"); 
	try{ 
		for(let i=0, len=localStorage.length; i<len; i++) {
			let key   = localStorage.key(i);
			//console.log("localStorage.key = " + key); 
			if (key != cbc_LOCALSTOR_key) { 		
				continue;
			}
			let value = localStorage[key];
			console.log("localStorage key=" + key + "\t = " + value);
		}
	} catch(e1) {
	}	
	console.log("those above are the values of :" + 
			"\n\t LS_clip_checked_sw_type     , " + 
			"\n\t LS_clip_checked_type_value  , " + 
			"\n\t LS_clip_lines_value         , " +
			"\n\t LS_clip_secs0b_value        , " +
			"\n\t LS_clip_secs1d_value        , " +      
			"\n\t LS_clip_secs2c_value        , " +     
			"\n\t LS_stor_ext_time            , " + 
			"\n\t LS_stor_playnext_replay     , " +    
			"\n\t LS_subDeltaTime             , " +               
			"\n\t LS_colorBG                  , " +
			"\n\t LS_colorTx                  , " +         
			"\n\t LS_sub_beg_delta            , " + 
			"\n\t LS_sub_end_delta            , " +
			"\n\t LS_sub_force_visible        , " +
			"\n\t LS_voice_index		      ");  
	console.log("---------------------------------\ncbc_LOCALSTOR_ctrkey"); 
	try{ 
		for(let i=0, len=localStorage.length; i<len; i++) {
			let key = cbc_LOCALSTOR_ctrkey.key(i);
			if (key != cbc_LOCALSTOR_ctrkey) { 		
				continue;
			}
			let value = localStorage[key];
			console.log("localStorage key=" + key + "\t = " + value);
		}
	} catch(e1) {
	}	
	console.log("those above are the values of :" + 
		 "\n\t LS_CTR_1run_num     , " +
		 "\n\t LS_CTR_2run_days    , " +
		 "\n\t LS_CTR_3run_num_play,   " +      
		 "\n\t LS_CTR_4run_elapsed     ,   " +   
		 "\n\t LS_CTR_5run_videoRunTime,  " +    
		 "\n\t LS_CTR_6logon_num_play,   " +    
		 "\n\t LS_CTR_7logon_elapsed ,  " +
		 "\n\t LS_CTR_8logon_videoRunTime ,  " +		
		 "\n\t LS_CTR_9numday_today     ,  " +
		 "\n\t LS_CTR_10run_num_lines   ,  " + 
		 "\n\t LS_CTR_11run_num_words   ,  " + 
		 "\n\t LS_CTR_12logon_num_lines ,  " + 
		 "\n\t LS_CTR_13logon_num_words  " );
	console.log("---------------------------------\n"); 
	
} // end of fun_list_localStorageItems()
//-------------------------------------------------
//fun_list_localStorageItems();

//-----------------------------------------------------------
function fun_update_html_with_last_session_values() {
	
	//fun_list_localStorageItems();
	
    if (( sw_no_subtitle) || (sw_sub_onfile == false) ) { 
        LS_clip_checked_sw_type = radio_type1_SECONDS ;  // only clip in seconds 
		fun_set_localStorage_item_from_vars(); 
    }
	if ((typeof LS_clip_checked_sw_type === "undefined") || (LS_clip_checked_sw_type == "") ) {
			LS_clip_checked_sw_type = radio_type1_SECONDS ;  // only clip in seconds 
		fun_set_localStorage_item_from_vars(); 
	}
		
	//document.getElementById("id_ext_time").value = LS_stor_ext_time; 	
	
	let p_list = LS_stor_playnext_replay.split(";;");
	
	//console.log("file _a_ ... LS_stor_playnext_replay =" + LS_stor_playnext_replay);
	//console.log("file _a_ ... p_list = "+ p_list);
	
	ele_playNextVa_from_hhmmss_value = p_list[0] ;
	ele_replayVa_from_hhmmss_value   = p_list[1] ; 
	ele_replayVa_to_hhmmss_value     = p_list[2] ; 
	if (ele_playNextVa_from_hhmmss_value == 0) {  ele_playNextVa_from_hhmmss_value = "00:00:00.000";  }
	if (ele_replayVa_from_hhmmss_value == 0  ) {  ele_replayVa_from_hhmmss_value   = "00:00:00.000";  }
	if (ele_replayVa_to_hhmmss_value == 0    ) {  ele_replayVa_to_hhmmss_value     = "00:00:00.000";  }
	
	
	if ( ele_replayVa_from_hhmmss_value < ele_playNextVa_from_hhmmss_value) { ele_playNextVa_from_hhmmss_value = ele_replayVa_from_hhmmss_value; } 
	
	let secs4 =	fun_N_hhmmss_to_secs( ele_replayVa_to_hhmmss_value );
	
	console.log("ele_replayVa_to_hhmmss_value = " + ele_replayVa_to_hhmmss_value  +   " secs4=" + secs4 ); 
	
	let hhmmss4 = fun_N_secs_to_hhmmssmmm( secs4 - 1.0  );  
	ele_replayVa_to_hhmmss_value = hhmmss4; 
	
	if (sw_is_no_videoaudio == false) {
		if (vid) {
			vid.currentTime = secs4; 
		}
	}
	
	//LS_stor_playnext_replay = ele_playNextVa_from_hhmmss_value + ";;" + ele_replayVa_from_hhmmss_value + ";;" + ele_replayVa_to_hhmmss_value;  fun_set_localStorage_item_from_vars();
	
		
	let secs1d = ("0" + LS_clip_secs1d_value+"-false-true").split("-");
	
	let end_dialog_sentence= secs1d[1].trim();  
	let end_dialog_overlap = secs1d[2].trim();  
	
	//-----------
	end_dialog_sentence = "false";
	end_dialog_overlap  = "false";
	sw_end_dialog_sentence = false;
	sw_end_dialog_overlap  = false;
	
	if ( (number_of_subtitle_endsentence == 0) &&  (number_of_subtitle_time_overlap == 0) ) {
		//document.getElementById("irad_r1").style.display = "none"; 		
	} else {				
		if (number_of_subtitle_time_overlap > 0) { 
			end_dialog_overlap     = "true";  	
			sw_end_dialog_overlap  = true; 
		}
		if (number_of_subtitle_endsentence > 0) { 
			end_dialog_sentence    = "true";
			sw_end_dialog_sentence = true;
		} 
	}	

	
	fun_update_LS_sub_endbeg_delta();
	
	fun_add_delta_time_to_start_end_orig_tran(); 
	

} // end of fun_update_html_with_last_session_values()

//-------------------------------------------------------------------------------	

//--------------------------------------------

function fun_set_next_div_via_cliptype() {
	/**
	if (LS_clip_checked_sw_type == radio_type4_LINES) {
		document.getElementById("id_playNext2_line_row").style.display      = "none"; 
		document.getElementById("id_playNext2_line_hhmmss").style.display = "block"; 
		
		document.getElementById("id_replay_line_hhmmss").style.display    = "none"; 	
		document.getElementById("id_replay_line_row").style.display       = "none"; 
		document.getElementById("id_replay2_line_row").style.display      = "none"; 
		document.getElementById("id_replay2_line_hhmmss").style.display   = "none";  
		
		
		
	} else {			
		document.getElementById("id_playNext2_line_row").style.display      = "block";	
		document.getElementById("id_playNext2_line_hhmmss").style.display = "none"; 
		
		document.getElementById("id_replay_line_hhmmss").style.display    = "none"; 
		document.getElementById("id_replay_line_row").style.display       = "none";  				
		document.getElementById("id_replay2_line_row").style.display      = "none"; 	
		document.getElementById("id_replay2_line_hhmmss").style.display = "none"; 
	}
	**/
	
} // end of	fun_set_next_div_via_cliptype() 

//-------------------------------------

function fun_initial_update_delta_time() {

    subtitles_beg_delta_time = fun_add_delta_time_to_localStor(0); // get last session delta time ( from local storage)

    fun_syncronize_add_delta_time_to_subtitle_in_file(subtitles_beg_delta_time);
	
} // end of  fun_initial_update_delta_time()

//--------------------------------------

function fun_add_delta_time_to_localStor(deltaTime) {

    let newval = LS_subDeltaTime;
    if (newval == null) {
        newval = 0;
    }
    try {
        newval = parseFloat(newval);
    } catch (er1) {
        newval = 0;
    }

    newval += deltaTime;
	LS_subDeltaTime = newval;
	
	fun_set_localStorage_item_from_vars(); 
	
	//assign_params_for_word_html_file(3);
	

    return newval;



} // end of add_delta_time_to_localStor


//-------------------------------------------------------


//  end former file player_3_a_var_def_init.js 										
//=============================================    	

//=============================================    								
// 4 beg. former file player_3_b_beginning.js    	 	  								

//---------------------------------------------------------
// CONTENT: 
//    mainly page, video and subtitles management     
//--------------------------------------------------------


//-------------------------------------------
/*
undefined variables  and the files where they are defined  	
	sw_HARD_subtitle     // file: cbc_3_player_3_a_var_def_init.js   
	sw_sub_orig          // file: cbc_3_player_3_a_var_def_init.js   
	sw_sub_tran          // file: cbc_3_player_3_a_var_def_init.js   
	sw_sub_onfile        // file: cbc_3_player_3_a_var_def_init.js   
	sw_no_subtitle       // file: cbc_3_player_3_a_var_def_init.js   
	begin_td_width       // file: cbc_3_player_3_a_var_def_init.js   
	begin_td_height      // file: cbc_3_player_3_a_var_def_init.js   
	begin_video_h_max    // file: cbc_3_player_3_a_var_def_init.js   
	begin_video_h_w_ratio // file: cbc_3_player_3_a_var_def_init.js   
	line_list_o_from1      // file: cbc_3_player_3_a_var_def_init.js   
	line_list_o_to1        // file: cbc_3_player_3_a_var_def_init.js  
*/
//--------------------------------------
//---------------

function getPadding_width_height_px( element ) {
    let style = element.currentStyle || window.getComputedStyle(element);
	let w =  parseInt(style.paddingLeft) + parseInt(style.paddingRight);
	let h =  parseInt(style.paddingTop ) + parseInt(style.paddingBottom);
	return [w,h]; 
}	
//----------------------------
function fun_makeTextInvisible(element, wh,nn) {
	
	if (nn < 5) console.log("maketextInvisible element=" + element.id + ",  wh=" + wh); 
	
	//console.log("maketextInvisible element type=" + typeof element); 
	if (element == null) { return; }
	
	//let style = element.currentStyle || window.getComputedStyle(element);
	//element.style.color = style.backgroundColor;
	element.style.visibility = "hidden"; 
	/**
	if (nn < 5 ) {
		var elePar1 = element.parentElement;
		if (elePar1) { elePar1.style.border = "1px solid black";  }
	}
	**/
	
	//element.style.color = element.style.backgroundColor; 
	
	//var eleTr1 = element.parentElement.parentElement;
	//if (eleTr1) { eleTr1.style.backgroundColor = "lightgrey"; }
	
}
//----------------------------
function fun_makeTextVisible(element,wh, nn) {
	if (nn < 5) console.log("fun_makeTextVisible(element=" + element.id + ", wh=" + wh  ); 
	if (element == null) { return; }
	//let style = element.currentStyle || window.getComputedStyle(element);
	//element.style.color = style.backgroundColor;
	
	element.style.visibility = "visible"; 
	
	
	element.style.display = "block"; 
	
}

//----------------------------------------------
function fun_dim123(ele) {
	let riga= "<tr><td>" + ele.tagName + "</td><td>" + ele.id + "</td><td>client  width="+ ele.clientWidth + 
			"</td><td>height="+ ele.clientHeight + "</td><td>offsetLeft="+ ele.offsetLeft +  "</td><td>offsetTop="+ ele.offsetTop +			
			"</td></tr>"; 	
	return riga;
} 

function fun_trueDim( ele ) {
	// assume marg, border, padding are the same in all directions: left, right, top, bottom
	let c_computedstyle = window.getComputedStyle(ele, null); 
	let c1_margin  = c_computedstyle.getPropertyValue('margin-left')  ;
	let c1_border  = c_computedstyle.getPropertyValue('border-left-width')  ;
	let c1_padding = c_computedstyle.getPropertyValue('padding-left')  ; 
	let c_margin  = parseFloat(c1_margin  );
	let c_border  = parseFloat(c1_border  );
	let c_padding = parseFloat(c1_padding );	
	let fra =  c_margin + c_border + c_padding; 
	
	let c1_width   = c_computedstyle.getPropertyValue('width')  ;
	let c1_height  = c_computedstyle.getPropertyValue('height')  ;
	let c_width  = parseFloat( c1_width  );
	let c_height = parseFloat( c1_height );
	let inside_w = c_width;     let outside_w =  c_width +  fra; 
	let inside_h = c_height;    let outside_h =  c_height+  fra; 
	
	return [ inside_w, inside_h,   outside_w, outside_h, ele.offsetLeft, ele.offsetTop]; 
}
//---------------------
function fun_reduceVideoDimensions( ct_w, ct_h) {

	sw_audio = true; 
	if ((video_native_height == 0) && (video_native_width == 0)) {
		sw_audio=true; 
		video_native_height = 50; // Math.round(ct_h * 0.40);
		video_native_width  = 600; //Math.round(ct_w * 0.40);
	}
	let vidH = video_native_height;
	let vidW = video_native_width ;
	 
	 
	
	   let p1= vidH / ct_h; let p2= vidW / ct_w; 
	   let p0 = Math.max(p1,p2); 
	   if (p0 == 0) { p0=1;}
	  // p0 += 0.05; //  leave same space ( percentage) between video and container   
	  
	   p0 = Math.round(p0*100)/100; 
		   
	   newVidW = Math.floor(vidW / p0);  
	   newVidH = Math.floor(vidH / p0);  	
	   
	   
	   newVidWperc = (newVidW * 100) / ct_w ; 		   
	   newVidHperc = (newVidH * 100) / ct_h ; 

		
}	// end of reduceVideoDim1() 
//---------------------------
function fun_printDim(eleout ) {
	let strdim="<table>";
	strdim += fun_dim123( document.body); 
	strdim += fun_dim123( document.getElementById("id_div20") ); 
	strdim += fun_dim123( document.getElementById("id_div20s") ); 
	strdim += fun_dim123( document.getElementById("idtb101") ); 
	strdim += fun_dim123( document.getElementById("id_td_video") ); 
	strdim += fun_dim123( document.getElementById("id_head0") ); 
	strdim += fun_dim123( document.getElementById("id_ctrVideo") ); 
	strdim += fun_dim123( document.getElementById("myVideo") ); 
	strdim += fun_dim123( document.getElementById("id_timestaff") ); 
	strdim +="</table>"; 
	eleout.innerHTML = strdim;
}
//--------------------
function fun_magnifyVideo_begin() {
	
	
	fun_printDim( document.getElementById("id_dim_before") );
			
		
	
	

    let height_head0     = document.getElementById("id_head0").offsetHeight;
    let height_subtab    = eleTabSub.offsetHeight;
    let height_timestaff = document.getElementById("id_timestaff").offsetHeight;
	
	  
	
	let div20dim = fun_trueDim(document.getElementById("id_div20s") ); 
	let div20s_w = div20dim[0];
	let div20s_h = div20dim[1];	
	
	
	
	// table, td, ctr_video sono influenzati dalle dimensioni del video che devono contenere
	// allora x rimediare prima calcolo le dimensioni del video accettabili 
	
	
	let video_maximum_height = div20s_h - (height_head0 + height_timestaff + height_subtab);
	let video_maximum_width  = (div20s_w - 20) * 0.70; 
	fun_reduceVideoDimensions(video_maximum_width,  video_maximum_height); 
	
	let vid2 = document.getElementById("myVideo") ;
	vid2.style.width = newVidWperc.toFixed(0) + "%"; 		  
	vid2.style.height= "auto";  
	if (sw_audio) {
		vid2.style.height= "50%";
	}
fun_printDim( document.getElementById("id_dim_after") );

    //-----------------------------

    //sw_HARD_subtitle_box_dimension();

    //----------------------------
	//fun_dragElement( ele_dragSubT ,  ele_dragSubT_anchor   );
	


	
} // end of magnifyVideo


//------------------------------------------
function fun_set_inner_HARD_sub() {
		sw_sub_orig = false;
        sw_sub_tran = false;
        sw_sub_onfile = false;
		
		ele_mask_dragsub.style.display = "block"; 
		ele_mask_dragsub.style.backgroundColor = "white";

        document.getElementById("id_playNext2_line_row").style.display = "none";
        document.getElementById("id_replay_line_row").style.display = "none";
        document.getElementById("id_subtitle_container").style.display = "none"; // hide head of subtitles   
        document.getElementById("id_show_sub").style.display = "none";

		// document.getElementById("id_divdragSub").style.display = "block";  //anto20220122
		
         
		document.getElementById("id_b4_s").style.display = "none";   
        document.getElementById("id_check_sync").style.display = "none";
		
		innerHTML_from_innerHTML("m135", "m126"); // Type and Duration of a Clip - Duration of a Clip
		innerHTML_from_innerHTML("m100", "m101"); // Specify clip type and duration - Change the duration of the clips		
					
		document.getElementById("m019").style.display = "none";	
		document.getElementById("m020").style.display = "none";
		document.getElementById("st_1lines").style.display = "none"; 
		document.getElementById("st_1words").style.display = "none"; 		
		document.getElementById("st_2lines").style.display = "none"; 		
		document.getElementById("st_2words").style.display = "none"; 
		
} // end of fun_set_inner_HARD_sub()

//------------------------------------------
function fun_set_inner_no_subtitle() {
		sw_HARD_subtitle = false;


        document.getElementById("id_playNext2_line_row").style.display = "none";
        document.getElementById("id_replay_line_row").style.display = "none";
      
		document.getElementById("id_subtitle_container").style.display = "none";// anto20220122
        document.getElementById("id_show_sub").style.display = "none";// anto20220122
		
		//document.getElementById("id_divdragSub").style.display = "none";  // anto20220122

      
		document.getElementById("id_b4_s").style.display = "none";   
        document.getElementById("id_check_sync").style.display = "none";
        
		innerHTML_from_innerHTML("m135", "m126"); // Type and Duration of a Clip - Duration of a Clip
		innerHTML_from_innerHTML("m100", "m101"); // Specify clip type and duration - Change the duration of the clips			
				
		document.getElementById("m019").style.display = "none";	
		document.getElementById("m020").style.display = "none";
		document.getElementById("st_1lines").style.display = "none"; 
		document.getElementById("st_1words").style.display = "none"; 		
		document.getElementById("st_2lines").style.display = "none"; 		
		document.getElementById("st_2words").style.display = "none"; 
		
		
} // end of fun_set_inner_no_subtitle()		

//------------------------------------------
function fun_set_inner_sub_onfile() {	
		//ele_mask_dragsub.style.display = "none"; 
		
		
		
		sw_HARD_subtitle = false;
        //document.getElementById("id_dragHardS").style.display = "none";
		
        //document.getElementById("MIO6hard"    ).style.display = "none";    
        //document.getElementById("id_hardShow").style.display = "none";

		document.getElementById("id_call_words").style.display = "block";

        document.getElementById("id_subtitle_container").style.display = "block";
        //document.getElementById("id_show_sub").style.display = "table";

        //document.getElementById("id_divdragSub").style.display = "block";

        
        document.getElementById("id_check_sync").style.display = "block";
		
} // end of fun_set_inner_sub_onfile() 	

//------------------------------------------

function fun_set_inner_no_sub_in_file() {	
		//ele_mask_dragsub.style.display = "block"; 
		// no subtitle in file  (maybe hard sub.)            
        document.getElementById("id_subtitle_container").style.display = "none"; // hide head of subtitles    
        document.getElementById("id_show_sub").style.display = "none";

        //document.getElementById("id_divdragSub").style.display = "none";
		//document.getElementById("id_divdragSub").style.display = "block";  // anto20220122

        
		document.getElementById("id_b4_s").style.display = "none";   
        document.getElementById("id_check_sync").style.display = "none";
       
		document.getElementById("id_playNext2_line_row").style.display = "none"; 
		document.getElementById("id_replay_line_row"  ).style.display = "none"; 
		document.getElementById("id_playNext_line_row").style.display = "none"; 
		document.getElementById("id_replay2_line_row"  ).style.display = "none"; 
		  
		innerHTML_from_innerHTML("m135", "m126");  // Type and Duration of a Clip - Duration of a Clip
		innerHTML_from_innerHTML("m100", "m101");  // Specify clip type and duration - Change the duration of the clips			
		
		document.getElementById("st_2lines").style.display = "none"; // 
		
		document.getElementById("m019").style.display = "none";	
		document.getElementById("m020").style.display = "none";
		document.getElementById("st_1lines").style.display = "none"; 
		document.getElementById("st_1words").style.display = "none"; 		
		document.getElementById("st_2lines").style.display = "none"; 		
		document.getElementById("st_2words").style.display = "none"; 
		
		
} // end of fun_set_inner_no_sub_in_file()

//------------------------------------------------
function fun_set_none_and_block() {

    if (sw_HARD_subtitle) {
		fun_set_inner_HARD_sub();  
		return; 	
    }
    if (sw_no_subtitle) {
		fun_set_inner_no_subtitle();   
		return; 	
    }
    if (sw_sub_onfile) { // subtitle on file 
		fun_set_inner_sub_onfile();
		return;
    }
	fun_set_inner_no_sub_in_file();
    
} // end of fun_set_none_and_block()

//-----------------------------------------
function fun_replace_quotation_and_ampersand( text1 )  {
	// see remove_quotation ... in bulder folder
	
	return text1.replaceAll("&amp;"   , "&" ).
		replaceAll("&lt;"              ,"<" ).
		replaceAll("&gt;"               , ">" ).
		replaceAll('&quot;'             ,'"' ).
		replaceAll('&apos;', "'"  ).
		replaceAll('&grave;'  ,  "`" ).
		replaceAll('&Backslash;' ,  "\\"  ) ;	
		
} 

//--------------------------------------------


function build_fake_sub_entries( f_line ) {
	
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX  build_fake_sub_entries() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n");  
	
	var col1 = f_line.split("::"); 
	sw_the_are_no_subtitles = true; 
	
	//assign_practice_msg();
	
	document.getElementById("id_spee").style.left="85%"; 

	var list1_collapse_ele = [
		document.getElementById("col_3"), 
		document.getElementById("col_4"), 
		document.getElementById("id_c_textCol")
		] ;
	var list1_hide_ele = [
		document.getElementById("id_bRigthLeft"    ),   // arrow right left button ( just down stop/continue button)
		document.getElementById("id_underVideoOrig"),   // show/hide orig.sub. buttons ( under video )
		document.getElementById("id_underVideoTran"),   // show/hide tran.sub. buttons ( under video )
		
		document.getElementById("id_subOnLeftSync" ),   // initial show/hide subtitles setting button (on left of video) 
		document.getElementById("id_subOnLeftVideo"),   // initial show/hide subtitles setting button (on left of video) 
		document.getElementById("id_div_words"     ),   // words button (on left of video) 
		document.getElementById("id_div_biling"    ),   // words button (on left of video) 
		document.getElementById("id_div_origText"  )    // words button (on left of video) 
		];  
	fun_collapse(  list1_collapse_ele, list1_hide_ele, 1/3 ) ;	
	
	var from1 = parseFloat( col1[0] );
	var to1   = parseFloat( col1[1] );
	var timeF;
	var timeT = 0;
	inp_row_orig = []; 
	
	var dur = parseInt( 1+ vid.duration ) ; 
		
	for(var v=1; v <= dur; v++) {
		timeF = timeT;	
		timeT = v;
		inp_row_orig.push( timeF + "::" + timeT + "::" + "&nbsp;" ); 
	} 
	
} // end of build_fake_sub_entries()

//-------------------------------------------
function get_lines_from_file_sub() {
	 
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX get_lines_from_file_sub() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n");  

    inp_text_orig = document.getElementById("id_txta_orig_sub").innerHTML;
    inp_text_tran = document.getElementById("id_txta_tran_sub").innerHTML;
    
	inp_text_orig = inp_text_orig.replaceAll('"', '"').replaceAll("'", "'").replaceAll("\n", " "); // from level1 
    inp_text_tran = inp_text_tran.replaceAll('"', '"').replaceAll("'", "'").replaceAll("\n", " "); // from level1 
	
    inp_text_orig = fun_replace_quotation_and_ampersand( inp_text_orig ); 
    inp_text_tran = fun_replace_quotation_and_ampersand( inp_text_tran ); 
		
    let len1 = inp_text_orig.length;
    let len2 = inp_text_tran.length;
	
	
	
   
    if (len1 > 0) {
		if (len1 == 8) { if (inp_text_orig == "<br><br>") { inp_text_orig=""; len1=0; } }
        if (inp_text_orig.substring(len1 - 4) == "<br>") { len1 = len1 - 4; }
        inp_row_orig = inp_text_orig.substring(0, len1).split("<br>");
		add_999entry(inp_row_orig); 
    }
    if (len2 > 0) {
		if (len2 == 8) { if (inp_text_tran == "<br><br>") { inp_text_tran=""; len2=0; } }
        if (inp_text_tran.substring(len2 - 4) == "<br>") { len2 = len2 - 4;  }
        inp_row_tran = inp_text_tran.substring(0, len2).split("<br>");
		add_999entry(inp_row_tran); 
    }
	
	
	if (sw_sub_orig) {
		numOrig = inp_row_orig.length; 
		if (numOrig < 1) {
			inp_row_orig.push("");
		} else {
				//  00000.000::00345.000::NO_TEXT_NO_SUBTITLES
				if (inp_row_orig[0].indexOf("NO_TEXT_NO_SUBTITLES") >= 0) {
					build_fake_sub_entries( inp_row_orig[0] ); 
				}  
			
		}
	}
	if (sw_sub_tran) {
		numTran = inp_row_tran.length;  
		if (numTran < 1) {
			inp_row_tran.push("");
		}
	}
 	

} // end of get_lines_from_file_sub() 

//----------------------------------------------
function fun_text_norm( str1 ) {
	return str1.trim().replaceAll(" <br>","<br>").replaceAll("<br> ","<br>"); 
} 
//---------------------------
function add_999entry( list1 ) {
	var row="";
	var i=0;
	for (i = list1.length-1;  i>( list1.length-10); i--) {				
		row = list1[i].trim();
		if (row == "") { continue; }
		break; 
	}
	var rowcol = (row + "::::").split("::");
    var to1 = parseFloat(rowcol[1] );
	var end999 = rowcol[1] + "::" + "9999.99" + "...";   
	list1.push( end999 ); 
}

//-------------------------------------------

function get_orig_subtitle_text() {  
	
    let i, row, from1, to1, max_to1, rowcol;
	
	line_list_o_from00.push(-1);
    line_list_o_to00.push(-1);
    line_list_o_maxto00.push(-1);
	
	
	line_list_o_from1.push(-1);
    line_list_o_to1.push(-1);
    line_list_o_maxto1.push(-1);
	
    line_list_orig_text.push("");
	
	line_list_o_tran_ixmin.push(0);
	line_list_o_tran_ixmax.push(0);	
	
	
	if (sw_sub_orig == false) {
		return; 
	}
	
	max_to1 = 0; 
	to1 = 0;
	let ixmin=0; let ixmax=0; 
	let tran_len =  line_list_t_from1.length;
    //-------------------------
	let pre_from = 0; let pre_to1 = 0; 
	
	let lastix=inp_row_orig.length-1;
	
	for (i = inp_row_orig.length-1;  i>(inp_row_orig.length-10); i--) {
		if (inp_row_orig[i].trim() == "") { continue; }		
		row = inp_row_orig[i].trim();
		lastix = i; 
		break; 
	}
	from1 = 0; to1 = -1;  
	let x1=0; let x2=0;
	
	number_of_subtitle_endsentence = 0; 
	number_of_subtitle_time_overlap= 0; 
	
    for (i = 0; i <= lastix; i++) {
        row = inp_row_orig[i].trim();
        if (row == "") {
            continue;
        }	
			
		pre_from = from1; 
		pre_to1  = to1; 
        
		rowcol = (row + "::::").split("::");
        from1  = parseFloat(rowcol[0] );
		
		if (from1 < pre_from) {
			//     original language subtitle line ignored because not in sequence of time:  pre=" + pre_from + " now=" + row 
			continue; 
		}
	
		if (from1 == pre_to1) {  // to avoid that in the same moment there be 2 subtitles lines actives when actualy one is the following of the other  (upd 2022_03_16)
			
			from1 += 0.0004; 
		} 
		to1    = parseFloat(rowcol[1] );
		
		if (from1 < pre_to1) {
			number_of_subtitle_time_overlap++;   // there is a time overlap ( the speaker begin to speak before the previous one have finished)
		} 
		
		max_to1 = Math.max( max_to1, to1) ;
		
		
        line_list_o_from00.push(  from1    );
        line_list_o_to00.push(    to1      );
        line_list_o_maxto00.push( max_to1  );
		
        line_list_o_from1.push(  from1    );
        line_list_o_to1.push(    to1      );
        line_list_o_maxto1.push( max_to1  );	
		
		let rowtext = rowcol[2].trim();
		let lastchar = rowtext.substring(rowtext.length-1); 
		if ( (".?!").indexOf( lastchar ) >= 0) {		
			number_of_subtitle_endsentence++; 
		}
		
		line_list_orig_text.push( fun_text_norm( rowtext )  );			
		//	line_list_orig_text.push(  fun_cleanText(  rowcol[2] )  );		

		
		x1 = ixmin;		
		
		//console.log("\nxxxxxxxx indice=" +(line_list_o_from1.length-1) ); 
		
		for( x1=x1; x1 <= tran_len; x1++) {
				if (from1 >= line_list_t_from1[x1]) {
					ixmin = x1;
					continue;
				}	
				ixmax = ixmin; 
				for( x2=ixmin; x2 <= tran_len; x2++) {
						if ( to1 >= line_list_t_to1[x2] ) {
							ixmax = x2;
							continue;
						}
						break;
				}
				break; 		
		}
		line_list_o_tran_ixmin.push( ixmin );
		line_list_o_tran_ixmax.push( ixmax );
		//console.log("orig " + (line_list_o_from1.length-1) + " from=" + from1 + " \tto=" + to1 + " \t" +  rowcol[2] + 
		//			"\n\t  tran min=" + ixmin + " \tmax=" + ixmax  + " \t" + line_list_tran_text[ ixmin ] );  	
    }
	
	
} // end of get_orig_subtitle_text() 
//---------------------------------------


function get_tran_subtitle_text() {  
	
    let i, row, from1, to1, max_to1, rowcol;
	
	line_list_t_from00.push(-1);
    line_list_t_to00.push(-1);
    line_list_t_maxto00.push(-1);
	
	line_list_t_from1.push(-1);
    line_list_t_to1.push(-1);
    line_list_t_maxto1.push(-1);
	
    line_list_tran_text.push("");
	
	if (sw_sub_tran == false) {
		return; 
	}
	max_to1 = 0;
	
	let lastix=inp_row_tran.length-1;
	
	
	for (i = inp_row_tran.length-1; i>(inp_row_tran.length-10); i--) {
		if (inp_row_tran[i].trim() == "") { continue; }		
		row = inp_row_tran[i].trim();
		lastix = i; 
		break; 
	}
	
	let pre_from, pre_to1; 
	from1 = 0;
	to1 = -1;
    //-------------------------
    for (i = 0; i <= lastix; i++) {
        row = inp_row_tran[i].trim();
        if (row == "") {
            continue;
        }
		
		pre_from = from1; 
		pre_to1  = to1; 
		
		rowcol = (row + "::::").split("::");
        from1  = parseFloat(rowcol[0] );
		
		if (from1 < pre_from) {
			//   translated language subtitle line ignored because not in sequence of time:  pre=" + pre_from + " now=" + row );
			continue; 
		}
		if (from1 == pre_to1) {  // to avoid that in the same moment there be 2 subtitles lines actives when actualy one is the following of the other  (upd 2022_03_16)
			from1 += 0.0004; 
		}
		
        to1    = parseFloat(rowcol[1] );
		max_to1 = Math.max( max_to1, to1) ;
		
		
        line_list_t_from00.push(  from1    );
        line_list_t_to00.push(    to1      );
        line_list_t_maxto00.push( max_to1  );		
		
        line_list_t_from1.push(  from1    );
        line_list_t_to1.push(    to1      );
        line_list_t_maxto1.push( max_to1  );
			
		line_list_tran_text.push(  fun_text_norm( rowcol[2] ) );	
    }
		
} // end of get_tran_subtitle_text() 


//---------------------------------------------
function fun_setMinMaxIxClip() {

    MIN_ixClip = 0;
    MAX_ixClip = 0;

    if (line_list_o_from1.length > 3) {
        MAX_ixClip = line_list_o_to1.length - 1;
        return;
    }
    return;
}

//-------------------------------------------

function fun_replace_video_src() {

    let SAME_FOLDER_video = "_ClipByClip_";

    let path_html = location.pathname;
    let j1 = path_html.lastIndexOf("\\");
    let j2 = path_html.lastIndexOf("\/");
    if (j2 > j1) {
        j1 = j2;
    }
    if (j2 < 0) {
        return;
    }
    let html_name = path_html.substring(j2 + 1);
    //alert(html_name) 
    if (html_name.indexOf(SAME_FOLDER_video) == 0) {
        // the name of html begins _ClipByClip_ 
        //  this comunicate that        
        //                              the video or audio file is in the same folder of this html file.
        //  As an answer        
        //        replace video src  to delete the path which prefix the video file name
        //                in ths way if the video and the html file remain together can be moved in any other folder    

        let ele_vid = document.getElementById("myVideo");
        let vid_src = ele_vid.src;

        let v1 = vid_src.lastIndexOf("\\");
        let v2 = vid_src.lastIndexOf("\/");
        if (v2 > v1) {
            v1 = v2;
        }

        if (v2 > 0) {
            let new_src = vid_src.substring(v2 + 1);
            alert("new_src=" + new_src);
            ele_vid.src = new_src;
        }

    }
} // end of fun_replace_video_src()

//-------------------------------------------

//--------------------------

//-----------------------------------------------------------------
/**
function fun_dragElement(ele_drag, ele_drag_anchor) {
	
	let deltaX = ele_dragSubT_anchor.offsetWidth; 
	let deltaY = ele_dragSubT_anchor.offsetHeight; 
	  
	vid = document.getElementById("myVideo");
    let width2;	

  
        // start position is at floor of the page    
		
		let ele_20 = document.getElementById("id_td_video");
		
        let height_x_div20 = ele_20.offsetHeight;
        let left_x_div20 = ele_20.offsetLeft;
        let width_x_div20= ele_20.offsetWidth;
	
	
		let ele_tm1 = document.getElementById("id_timestaff");
	
	
		let top_drag = ele_tm1.offsetTop + 2.0*ele_tm1.offsetHeight ;   //    vid.offsetTop + vid.offsetHeight + ele_tm1.offsetHeight ;
		
		if (sw_audio) {top_drag +=  2.0*ele_tm1.offsetHeight ; }


        ele_drag.style.top = top_drag.toFixed(0) + "px";
        ele_drag.style.left = (parseFloat(left_x_div20)+0) + "px";
        ele_drag.style.width = width_x_div20 + "px";

        ele_dragSubT_anchor.style.top = top_drag.toFixed(0) + "px";
  
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    if (ele_drag_anchor) {
        ** if present, the header is where you move the DIV from:**
        ele_drag_anchor.onmousedown = dragMouseDown;
    } else {
        ** otherwise, move the DIV from anywhere inside the DIV:**
        ele_drag.onmousedown = dragMouseDown;
    }

    function fun_dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (beginPosX < 0) {
            beginPosX = pos3;
            beginPosY = pos4;
        }
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function fun_elementDrag(e) {
        e = e || window.event;
		let xx = e.pageX; 
		let yy = e.pageY;  
		if ((xx < deltaX) || (xx > (document.body.offsetWidth -deltaX)) ) { return; }
		if ((yy < deltaY) || (yy > (document.body.offsetHeight+deltaY)) ) { return; }
		
		
		//console.log("xx="+xx + " yy=" + yy + " screen.availHeight+deltaY=" +( screen.availHeight+deltaY) + " screen.availHeight-deltaY=" +( screen.availHeight-deltaY)  ); 	
		
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
		
        // set the element's new position:
		let top_pos  = ele_drag.offsetTop - pos2;
		let left_pos = ele_drag.offsetLeft - pos1;
        ele_drag.style.top  = top_pos + "px";
        ele_drag.style.left = left_pos + "px";
	
    }

    function fun_closeDragElement() {
        ** stop moving when mouse button is released:**
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
**/
//------------ end of dragable -----------    


//------------------------------- 

function fun_syncronize_add_delta_time_to_subtitle_in_file() {
	
	let myLang = navigator.language;        // eg.  it-IT
    let decimal_point = (0.123).toLocaleString( myLang ).toString().substr(1,1);    
	
	fun_syncronize_add_delta_sub_zz( decimal_point, 
			line_list_o_from1,  line_list_o_to1, line_list_o_maxto1, 
			line_list_o_from00,  line_list_o_to00, line_list_o_maxto00, 
			line_list_orig_text, sw_sub_orig ,"id_FMT_txta_orig_sub"  ); 
	fun_syncronize_add_delta_sub_zz( decimal_point, 
			line_list_t_from1,  line_list_t_to1, line_list_t_maxto1, 
			line_list_t_from00,  line_list_t_to00, line_list_t_maxto00, 	
			line_list_tran_text, sw_sub_tran ,"id_FMT_txta_tran_sub"  );
	
} 

//--------------------------------------------
//--------------------------------------------

function fun_syncronize_add_delta_sub_zz( decimal_point,
			list_x_from1,   list_x_to1,  list_x_maxto1, 
			list_x_from00,  list_x_to00, list_x_maxto00, 
			list_x_text, sw_sub_orig_tran , id_FMT_txta ) {

	
    let z;
    let len = list_x_from1.length;
    //---   add delta time to from-to time fields 
      	
    //--------------------

	
	//-----------------------
	for (z = 0; z < len; z++) {		
        list_x_from1[z]  = list_x_from00[z]  + LS_subDeltaTime + LS_sub_beg_delta;		
        list_x_to1[z]    = list_x_to00[z]    + LS_subDeltaTime + LS_sub_end_delta;
        list_x_maxto1[z] = list_x_maxto00[z] + LS_subDeltaTime + LS_sub_end_delta;                
    }
	
    // deltaTime might cause negative times at the beginning of the video or leave a gap
    for (z = 0; z < len; z++) {
        if (list_x_from1[z] < 0) {
            list_x_from1[z] = 0;
        }
        if (list_x_to1[z] < 0) {
            list_x_to1[z] = 0;
        } else {
            break;
        }
    }	
    list_x_from1[0] = 0; // film starts always from time=0; 
	list_x_from1[1] = 0; // film starts always from time=0   and index 1 
	list_x_from00[0] = 0; // film starts always from time=0; 
	list_x_from00[1] = 0; // film starts always from time=0   and index 1 
	
    let max = MAX999;
	if (sw_is_no_videoaudio == false) {
		if (vid) {
				if (vid.duration > 0) {
					max = vid.duration;
				}			
		}
	}
	
    list_x_to1[ len-1] = max; // last subtitle line must end always at the duration time; 
	list_x_to00[len-1] = max; // last subtitle line must end always at the duration time; 
	
	if (sw_sub_orig_tran == false) { return;}
	
    let fmt_str1 = "<table style='text-align:right;'>";   
    let x = 0, from00, to00,  from1, to1, fmt_from00, fmt_to00, fmt_from, fmt_to, xx_txt = "";   
	let sw_two=true; 
	if ( ( list_x_from1[1] == list_x_from00[1] ) && ( list_x_to1[1] == list_x_to00[1] )) {
		sw_two = false;
	}	
    if (sw_two) { 
			if (LS_subDeltaTime != 0) { 
				fmt_str1 += "<tr><td class='subtd1'>" + "" + "</td><td class='subtd2'>" ;  
				fmt_str1 += ""+ "</td><td class='subtd3'>" + "" + "</td><td class='subtd2'>" ; 
				fmt_str1 += LS_subDeltaTime.toFixed(3) + "</td><td class='subtd3'>" + LS_subDeltaTime.toFixed(3) +
					"</td><td class='subtd4'>" + "delta sync time"  + "</td></tr> ";	
			}
			if ( LS_sub_beg_delta != 0) {
				fmt_str1 += "<tr><td class='subtd1'>" + "" + "</td><td class='subtd2'>" ;  
				fmt_str1 += "" + "</td><td class='subtd3'>" + "" + "</td><td class='subtd2'>" ; 
				fmt_str1 += LS_sub_beg_delta.toFixed(3) + "</td><td class='subtd3'>" + "" +
					"</td><td class='subtd4'>" + "delta begin time"  + "</td></tr> ";	
				fmt_str1 += "<tr><td class='subtd1'>" + "" + "</td><td class='subtd2'>" ;  
			}
			if ( LS_sub_end_delta != 0) {
				fmt_str1 += ""+ "</td><td class='subtd3'>" + "" + "</td><td class='subtd2'>" ; 
				fmt_str1 += "" + "</td><td class='subtd3'>" +  LS_sub_end_delta.toFixed(3) +
					"</td><td class='subtd4'>" + "delta end time"  + "</td></tr> ";		    
			}
			fmt_str1 += ""+ "</td><td class='subtd3'>" + "" + "</td><td class='subtd2'>" ; 
				fmt_str1 += "" + "</td><td class='subtd3'>" + "" +
					"</td><td class='subtd4'>" + ""  + "</td></tr> ";		    
			
	}
	//--------------------------
	x=1 ;
	// first (index zero) entry is not used 
	for (let i = 1; i < list_x_from1.length; i++) {
		from1 = list_x_from1[i];
		to1   = list_x_to1[i];		
		
		from00 = list_x_from00[i];
		to00   = list_x_to00[i];	
		
		
	
		fmt_str1 += "<tr><td class='subtd1'>" + x + "</td><td class='subtd2'>" ; 
		
		if (sw_two) { 
			fmt_from00 = fun_N_secs_to_hhmmssmmm( from00 ).replace(".000","").replace(".", decimal_point);  
			fmt_to00   = fun_N_secs_to_hhmmssmmm( to00   ).replace(".000","").replace(".", decimal_point);   
			if (fmt_from00.indexOf(decimal_point) < 0 ) { fmt_from00 = fmt_from00.trim() +  decimal_point+"000" ;} 
			if (fmt_to00.indexOf(  decimal_point) < 0 ) { fmt_to00   = fmt_to00.trim()   +  decimal_point+"000" ;} 
			
			fmt_str1 += "(" + fmt_from00 + "</td><td class='subtd3'>" + fmt_to00 + ")</td><td class='subtd2'>" ; 
		}
		
        fmt_from = fun_N_secs_to_hhmmssmmm( from1 ).replace(".000","").replace(".", decimal_point);  
        fmt_to   = fun_N_secs_to_hhmmssmmm( to1   ).replace(".000","").replace(".", decimal_point);   
		if (fmt_from.indexOf(decimal_point) < 0 ) { fmt_from = fmt_from.trim() +  decimal_point+"000" ;} 
		if (fmt_to.indexOf(  decimal_point) < 0 ) { fmt_to   = fmt_to.trim()   +  decimal_point+"000" ;} 
        x += 1;
		xx_txt = list_x_text[i].trim();
		if (xx_txt.indexOf(sayNODIALOG) >= 0) {
			/**
			if ((to1 - from1) < 3) {
				continue;
			}
			xx_txt = "...";
			**/
			xx_txt = "";
		}	
	     		
		fmt_str1 += fmt_from + "  " + "</td><td class='subtd3'>" + fmt_to +
				"</td><td class='subtd4'>" + xx_txt + "</td></tr> ";	
		
    }
    fmt_str1 += "</table>";

    //document.getElementById( id_FMT_txta ).innerHTML = fmt_str1;
    
    //--------------------
} // end of fun_syncronize_add_delta_sub_zz()
	
//----------------------------------------------------------
function fun_update_LS_sub_endbeg_delta() {

	if ( isNaN(  LS_sub_beg_delta ) ) {   LS_sub_beg_delta = parseFloat( "0" + LS_sub_beg_delta ); } 
	if ( isNaN(  LS_sub_end_delta ) ) {   LS_sub_end_delta = parseFloat( "0" + LS_sub_end_delta ); } 

	let beg_val= LS_sub_beg_delta; // can be positive or negative 
    let end_val= LS_sub_end_delta; // can be positive or negative 
	
	//document.getElementById("id_beg_deltaVal").value = Math.abs( beg_val );
	//document.getElementById("id_end_deltaVal").value = Math.abs( end_val );
	let beg_PM = "plus";
	let end_PM = "plus";
	if (beg_val < 0) { beg_PM = "minus"; }
	if (end_val < 0) { end_PM = "minus"; }
	//document.getElementById("id_sel_begtime").value = beg_PM ;	
	//document.getElementById("id_sel_endtime").value = end_PM ;
	//get_begend();
}
//--------------------------------------------

function fun_add_delta_time_to_start_end_orig_tran() {
	//LS_sub_beg_delta  = beg_val; // can be positive or negative 
    //LS_sub_end_delta  = end_val; // can be positive or negative 
	
	//get_begend() ; 

} 

//----------------------------------------------

let clip_reset_BG_color = "white" ;
let clip_somerow_BG_color = "lightgrey" ;


let begix, endix;
let fromIxToIxLimit=[-1,-1]; 
let fromIxToIxButtonElement=[ null, null]; 

let save_last_oneOnlyRow = ""; 
let save_last_oneOnly_idtr = ""; 
save_last_oneOnlyRow = ""; 
save_last_oneOnly_idtr = ""; 
	
let hide_translation_symb = '<span style="font-weight:bold;min-width:4em;">t?</span></span>';  
let show_translation_symb = '<span style="font-weight:bold;">T</span></span>';  
/**				
let hide_translation_symb = '<span style="position:relative;">&nbsp;?' + 
				'<span style="position:absolute;top:-0.0em;left:-0.2em;font-weight:bold;width:1em;">t</span></span>';   			
let show_translation_symb = '<span style="position:relative;">&nbsp;' +
				'<span style="position:absolute; top:0.1em;right:-0.2em;font-weight:bold;">T</span></span>'; 
**/
let note_arrow1   = '<span style="font-size:2em;width:auto;height:1.4em;">' + right_arrow_symb   + '</span>' ;
let note_arrow2   = '<span style="font-size:2em;width:auto;height:1.4em;">' + left_arrow_symb    + '</span>' ;
let note_speaking = '<span style="font-size:2em;width:auto;height:1.4em;">' + speakinghead_symb  + '</span>' ;
let note_loop_speaking =  '<span style="font-size:2em;width:auto;height:1.4em;">' + playLoop_symb  + '</span>' ;  
let note_hide_sub = '<span style="font-size:2em;width:auto;height:1.4em;">' + openbook_symb      + '</span>' ;
let note_show_sub = '<span style="font-size:2em;width:auto;height:1.4em;">' + closedbook_symb    + '</span>' ;
let note_show_tran= '<span style="font-size:2em;width:auto;height:1.4em;">' + show_translation_symb  + '</span>' ;
let note_hide_tran= '<span style="font-size:2em;width:auto;height:1.4em;">' + hide_translation_symb  + '</span>' ;
let note_breakwords= '<span style="font-size:2em;width:auto;height:1.4em;">' + breakwords_symb  + '</span>' ;  
let note_clock_timer_symb = '<span style="font-size:2em;width:auto;height:1.4em;">' + clock_timer_symb + '</span>' ;   


//--------------------------------


let clip_legend = `<hr>
				
				<button class="buttonTD2" 
					onclick="
						{
							let ele_legend = document.getElementById('id_legend');
							if (ele_legend.style.display=='block' ) {
								ele_legend.style.display='none' ;
							} else {
								ele_legend.style.display='block' ;
							}
						}"  
						style="font-size:0.5em;"
					>
					<span style="font-size:1.0em;font-weight:bold;">Significato dei pulsanti</span>  			
					  
					<span style="font-size:0.8em;">
						${note_arrow1       }   ${note_arrow2       }   
						${note_speaking     }   ${note_loop_speaking}   
						${note_hide_sub   }   ${note_show_sub   }    ${note_hide_tran  }    ${note_show_tran  }
						<input type="range" min="0.25" max="2" value="1" step="0.25" style="width:3em;"> 
					</span>
					  
				</button>	
				<!--				
					${note_hide_tran  }   ${note_breakwords }    ${note_clock_timer_symb}
				-->
				
				<div id="id_legend" style="display:none; width:100%;border:0px solid black;text-align:center; font-size:0.8em; background-color:lightgrey;">
					<br>
					<div style="width:80%;border:0px solid black;display:flex;">
						<table style='font-size:0.5em;width:33%;color:black;border:0px solid black;text-align:left;'>	
							<tr><td style="width:5%;"></td></tr>	\n
							<tr><td>${note_arrow1       }</td><td>premi per stabilire l'inizio delle selezione delle righe</td></tr> \n 
							<tr><td>${note_arrow2       }</td><td>premi per stabilire la fine della selezione delle righe </td></tr> \n 
							<tr><td>${note_speaking     }</td><td>premi per riprodurre                                    </td></tr> \n							
							<tr><td>${note_loop_speaking}</td><td>premi per riprodurre e poi ripetere all'infinito  </td></tr> \n  	
						</table>
						<table style='font-size:0.5em;width:33%;color:black;border:0px solid black;text-align:left;'>		
							<tr><td style="width:5%;"></td></tr> \n
							<tr><td>${note_hide_sub   }</td><td>la riga è visibile, premi per nasconderla             </td></tr> \n 
							<tr><td>${note_show_sub   }</td><td>la riga è invisibile, premi per renderla visibile     </td></tr> \n
							<tr><td>${note_hide_tran  }</td><td>la traduzione è nascosta, premi per renderla visibile </td></tr> \n
							<tr><td>${note_show_tran  }</td><td>la traduzione è visibile, premi per nasconderla       </td></tr> \n
						</table>\n
						<table style='font-size:0.5em;width:33%;color:black;border:0px solid black;text-align:left;'>			
							<tr><td style="width:5%;"></td></tr> \n
							<tr><td>
								<input type="range" min="0.25" max="2" value="1" step="0.25" style="width:3em;"> 							
							</td><td>correzione del tempo di inizio o fine della riga</td></tr> \n
							<tr><td></td><td></td></tr> \n
						</table>\n
					</div>
				</div>
			
				<hr>` ; // 
//				
//	document.getElementById("id_symb_meaning").innerHTML = clip_legend;			
//
//--------------------------------------------
		
	let string_tr_fant = `
		<tr id="idtr_§1§_m2"  style="display:none;background-color:white;height:1.5em;" > 
			<td></td><td></td><td></td><td></td><td></td><td></td><td></td>
			<td></td><td></td><td></td><td></td><td></td><td></td>
		</tr> \n 		

		<tr id="idtr_§1§_m1"  class="playBut1" style="display:none;background-color:grey; border-style: inset;">
			<td></td>
			<td></td>		
			<td class="playBut1"><button class="buttonTD2" id="idb_§1§_m" onclick="onclick_OneClipRow_showHide_sub( this, true)">
				<span style="display:block;font-size:2em;">${openbook_symb}</span>
				<span style="display:none;font-size:2em;">${closedbook_symb}</span></button>
			</td>  
						
			<td class="playBut1"><button class="buttonTD2" id="idbT_§1§_m" onclick="onclick_OneClipRow_showHide_tran( this, true)">				
				<span style="display:none;font-size:2em;height:1.4em; "><span>${show_translation_symb}</span></span>
				<span style="display:block;font-size:2em;height:1.4em;padding:0 0.1em;">
				<span>${hide_translation_symb}</span></span></button>
			</td>  	
			<td></td>
			<td class="playBut1" ><button class="buttonTD2" id="sp§1§_no1" onclick="onclick_ClipSub_Play3(this,false)">
				<span style="font-size:2em;">${speakinghead_symb}</span></button>
			</td>  
			<td class="playBut1">
					<button class="buttonTD2" id="sp§1§_ye1" onclick="onclick_ClipSub_Play3(this,true)" style="font-size:1.0em;">${playLoop_symb}</button>
			</td> 
			<td></td><td></td><td></td>
			<td></td><td></td><td></td>         
		</tr>
		`; // 		
		
		//-------------------------

	let string_tr_allclip = ` 
		<tr id="idtr_§1§" style="background-color: lightgrey;width:100%;"> 	
			<td class="arrow12"><button class="buttonFromToIx" id="b1_§1§" onclick="onclick_arrowFromIx(this, §1§)">
				<span 	style="font-size:1em;height:1.4em;">→</span></button>
			</td>  
			<td class="arrow12"><button class="buttonFromToIx" id="b2_§1§" onclick="onclick_arrowToIx(  this, §1§)">
				<span style="font-size:1em;height:1.4em;">←</span></button>
			</td>  		
			<td class="playBut1">
				<button class="buttonTD2" id="idb_§1§" onclick="onclick_show_row( this, §1§)">
					<span style="display:block;font-size:2em;height:1.4em;">${openbook_symb}</span><span style="display:none;font-size:2em;height:1.4em;">${closedbook_symb}</span>
				</button>
			</td> 		
			<td class="playBut1">
				<button class="buttonTD2" id="idbT_§1§" onclick="onclick_show_row(this, §1§)">
					<span style="display:none;font-size:2em;height:1.4em; "><span>${show_translation_symb}</span></span>
					<span style="display:block;font-size:2em;height:1.4em;padding:0 0.1em;"><span>${hide_translation_symb}</span></span>
				</button>
			</td>  
			
			<td style=""> 
				<div class="suboLine" style="display:block;width:100%;" id="idc_§1§">§4txt§</div>
				<div class="tranLine" style="display:none; width:100%;" id="idt_§1§">§5txt§<br></div> 
			</td>	
			
			<td class="playBut1">
				<button class="buttonTD2" id="sp§1§" onclick="onclick_OneClipRow_play_Loop3(this, §1§,false)">
				<span style="font-size:2em;height:1.4em;">${speakinghead_symb}</span>
				</button>
			</td>  
			<td class="playBut1">
				<button class="buttonTD2 " onclick="onclick_OneClipRow_play_Loop3(this,§1§,true)" style="font-size:1.0em;">${playLoop_symb}
				</button>
			</td>  
			
			<td class="timerow1">§1§</td>
			<td class="timerow2">§2from§</td>
			<td class="timerow2">§3to§</td>
			
			<td style="padding:0 2px;text-align:right; color:black; font-size:0.5em;vertical-align:middle;min-width:5em;">
				<span class="big">±</span> 
				<input type="number" value="1.0" step="0.1" onchange="onchangeMaxMinDelta(this)" 
				style="width:4em;display:block-inline;text-align:right;" id="id_max_delta_§1§">
			</td>  	
			<td style="width:4em; text-align:center;"> 
				<input type="range" min="-4" max="4" value="0.0" step="0.01" 
				onchange="onchangeInputRange1(this)" oninput="this.nextElementSibling.value = this.value" id="id_delta_tf§1§"><output></output> 
			</td> 	
			<td style="width:4em; text-align:center;">	
				<input type="range" min="-4" max="4" value="0.0" step="0.01" 
				onchange="onchangeInputRange1(this)" oninput="this.nextElementSibling.value = this.value" id="id_delta_tt§1§"><output></output> 
			</td> 
		</tr> \n
` ; // end of string_tr_allclip 

	string_tr_allclip = string_tr_fant.trim() + "\n" + string_tr_allclip.trim(); 
	string_tr_allclip = string_tr_allclip.replaceAll("§pause§", pause_symb );  
	
	//console.log("string_tr_allclip =\n" + string_tr_allclip ); 
// ===================================================================


//--------------------------------------
function fun_checked_false_goBack(this1) {

			// exit from the clip section and return to the main page 
			//------------------------
			sw_eleTabSub_widthInit = true; 
			//restore previous dimension 
			eleTabSub.style.width  = (eleTabSub_save_clientWidth  - eleTabSub_diff_clientW) + "px"; // reset prev. dimension 
			eleTabSub.style.height = (eleTabSub_save_clientHeight - eleTabSub_diff_clientH) + "px"; // reset prev. dimension 
			//-----------
			Clip_startTime = 0;
			Clip_stopTime  = 0; 
			sw_CLIP_play   = false; 
			this1.parentElement.style.backgroundColor = null;	
				
			document.getElementById("id_NO_clip00").style.display="block"; 
			document.getElementById("id_noclip_butt").style.display = "flex"; 
			
			document.getElementById("id_clip00_subtext").style.display="none"; 
            document.getElementById("id_div_showclip").style.backgroundColor = null;	
			//document.getElementById("id_subTranText2").style.display="none"; 	
			ele_clip_subtext.style.display="none";    
			document.getElementById("id_central"     ).style.display="block"; 
			document.getElementById("id_td_suborig2" ).style.display="block"; 		
			if (sw_sub_tran) {
					document.getElementById("id_td_subtra2").style.display="block"; 
			}   
} // end of  fun_checked_false_goBack()

//-----------------

function fun_build_all_clip() { 
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX fun_build_all_clip()\nXXXXXXXXXXXXXXXXXXXXXXXXXX\n");  
	ele_sub_filler.innerHTML = "";
	if (sw_sub_onfile== false) { return;  }
	if (sw_sub_orig  == false) { return;  }
	
	save_last_oneOnlyRow = ""; 
	save_last_oneOnly_idtr = ""; 
	
	ele_last_tran_line = null; 
	
	

	//---  save dimension before modifying it  
	sw_eleTabSub_widthInit = false; 
	eleTabSub_save_clientWidth  = eleTabSub.clientWidth ; // save dimension   
	eleTabSub_save_clientHeight = eleTabSub.clientHeight; // save dimension 
	//--
		
	document.getElementById("id_NO_clip00").style.display="none"; 	
	//document.getElementById("id_subTranText2").style.display="block"; 	
	//list_elemSub[1].style.display = "none"; // start all line clip without showing translated subtitles
	
	
	//this1.parentElement.style.backgroundColor = "black";	
	
	let clipSub_showTxt, txt1; 
	//document.getElementById("id_clip00_subtext").style.display= null;  // use class= flex-container1
	//document.getElementById("id_div_showclip").style.backgroundColor = "lightgrey";	
	console.log("1vid=" + vid); 
	//console.log("12vid.duration=" + vid.duration + "<=="); 

	clipFromRow = 0 ;
	clipToRow   = line_list_orig_text.length-1;
	sw_CLIP_play   = true; 
	Clip_startTime = 0;
	
	if (sw_is_no_videoaudio == false) {
		Clip_stopTime  = vid.duration;
	}
	 
	//--------------------------	
	var z3Beg = 0;  
	for(let z3 = clipFromRow; z3 <= clipToRow; z3++) {			
			txt1 = line_list_orig_text[z3].trim();
			if (txt1 == "") { continue; }
			if (txt1 == "_.") { continue; }
			z3Beg=z3; 
			break;
	}	
	if (z3Beg > clipFromRow) { 
		clipFromRow = z3Beg; 
		clipFromRow_min = clipFromRow; 
	}	
	console.log("clipFromRow=" +  clipFromRow + "  clipToRow=" +clipToRow);

 	begix = clipFromRow; 
	endix = clipToRow;	
	
	clipSub_showTxt = "\n"; 
	for(let z3 =  clipFromRow; z3 <= clipToRow; z3++) {
			let txt1_fromtime  = line_list_o_from1[z3];
			let hhmmssFrom = fun_N_secs_to_hhmmssmmm(  txt1_fromtime ) ; 
			let txt1_totime  = line_list_o_to1[z3];
			let hhmmssTo     = fun_N_secs_to_hhmmssmmm(  txt1_totime ) ; 
			txt1 = line_list_orig_text[z3];
			
			if (txt1.indexOf(sayNODIALOG) >= 0) {
					// ignore this line if it's a no_dialog and there is some other subtitle  
					//txt1 = "continue"; // continue;
					txt1 = "..."; // continue;
			}
			let trantxt1 ="";
			
			
			for( let g = line_list_o_tran_ixmin[z3]; g <= line_list_o_tran_ixmax[z3]; g ++) {
				let txt2 = line_list_tran_text[g] ;	
				if (txt2.indexOf(sayNODIALOG) >= 0) {
					txt2 = "...";
				}
				//trantxt1 += txt2 +"<br>";		
				trantxt1 += "<br>" + txt2;	
			}	
			if (trantxt1.substr(0,4) == "<br>") { trantxt1 = trantxt1.substring(4); }
	
			string_tr_allclip = string_tr_allclip.trim();				
			
			let rowclip = string_tr_allclip.replaceAll("§1§",z3).
				replaceAll("§2from§", hhmmssFrom).replaceAll("§3to§", hhmmssTo).
				replaceAll("§4txt§", txt1).replaceAll("§5txt§", trantxt1);       //all

			clipSub_showTxt += rowclip + "\n"  ; 	
			
    } // end of for z3

	//clipSub_showTxt += "</table>\n" ; 
	
	eleTabSub_tbody.innerHTML =  clipSub_showTxt;  
	
	if (sw_is_no_videoaudio) {
		console.log("XXXXXXXXXXXX  video/audio missing") 
		sw_tts = true;
		collapse_cols(); 
	}	
	
	console.log( "fun_build_all_clip()   sw_the_are_no_subtitles=" + sw_the_are_no_subtitles); 	
		
		
	if (sw_the_are_no_subtitles) {		
		var ele_col_3_nosub   = document.getElementById("col_3" );
		var ele_col_4_nosub   = document.getElementById("col_4" );
		var ele_c_textCol_nosub = document.getElementById("id_c_textCol" );		
		ele_col_3_nosub.style.visibility   = "collapse"; 	
		ele_col_4_nosub.style.visibility   = "collapse"; 		
		ele_c_textCol_nosub.style.visibility = "collapse"; 			
	} else {
		if (sw_sub_tran == false) {
			document.getElementById("col_4"            ).style.visibility = "collapse"; 	
			document.getElementById("id_underVideoTran").style.visibility = "collapse"; 			
		}
	}
	
	
	//  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  now html elements for clip section are ready xxxxxxxxxxxxxxxxxxxxxxxxxxxx
	
	let eleF = document.getElementById("b1_" + clipFromRow) ;
	let eleT = document.getElementById("b2_" + clipToRow)   ;	

	
	onclick_arrowFromIx( eleF, clipFromRow ,1 ) ; 
	onclick_arrowToIx(   eleT, clipToRow    ) ; 
	

	
    ele_clip_subtext.style.display = "block";    
	
        
    //document.getElementById("id_central"     ).style.display = "none"; 
    document.getElementById("id_td_suborig2" ).style.display = "none"; 
	document.getElementById("id_td_subtra2"  ).style.display = "none"; 
	
	//-------------------
	//set new dimension to be the almost the body dimension 
	
		//let new_eleTabSub_clientWidth = parseInt(elebody.clientWidth  * 0.95);		
		//let new_eleTabSub_clientHeight= parseInt(elebody.clientHeight * 0.80);	
		let new_eleTabSub_clientWidth   = eleTabSub.clientWidth; 
		let new_eleTabSub_clientHeight  = eleTabSub.clientHeight; 
		//--- translate to style width/height
		eleTabSub.style.width = (new_eleTabSub_clientWidth - eleTabSub_diff_clientW) + "px";   // set  new dimension			
		eleTabSub.style.height= (new_eleTabSub_clientHeight- eleTabSub_diff_clientH) + "px";   // set  new dimension
	//----------------
	
	var elediv20 = document.getElementById("id_div20");

	clip_reset_BG_color = get_backgroundColor(elediv20);
	eleTabSub.style.backgroundColor =  clip_reset_BG_color;     
	ele_clip_subtext.style.backgroundColor =  clip_reset_BG_color;     

} // end of fun_build_all_clip();  


//----------------------------
function former_onclick_ClipSub_All(this1) {
	
	var this1_checked = true;  
	
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX onclick_ClipSub_All() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n"); 

	
	var sw_all = true; 
	ele_sub_filler.innerHTML = "";
	if (sw_sub_onfile== false) { return;  }
	if (sw_sub_orig  == false) { return;  }
	
	save_last_oneOnlyRow = ""; 
	save_last_oneOnly_idtr = ""; 
	
	ele_last_tran_line = null; 
	
	if (this1_checked == false) { 		
		fun_checked_false_goBack(this1) ;	
		console.log("\tonclick_ClipSub_All() return " ) 
		return; 
	}
	
	console.log("\tonclick_ClipSub_All() call fun_build_all_clip() " ) ;
	
	
	fun_build_all_clip();
	
	//this1.parentElement.style.backgroundColor = "black";	
	
	if (sw_all) {
		clipFromRow = clipFromRow_min;
		clipToRow   = line_list_orig_text.length-1;
		sw_CLIP_play   = true; 
		Clip_startTime = 0;
		if (sw_is_no_videoaudio == false) {
			Clip_stopTime  = vid.duration;
		}
	} else {
		clipFromRow = parseInt( ele_replayVa_from_row_value );
		clipToRow   = parseInt( ele_replayVa_to_row_value   );
		sw_CLIP_play   = true; 
		Clip_startTime = parseFloat(ele_replay_from_secs_innerHTML  );
		Clip_stopTime  = parseFloat(ele_replay_to_secs_innerHTML    ) ;
	}
	
	
	
	//  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  now html elements for clip section are ready xxxxxxxxxxxxxxxxxxxxxxxxxxxx

	let eleF = document.getElementById("b1_" + clipFromRow) ;
	let eleT = document.getElementById("b2_" + clipToRow)   ;	

	
	onclick_arrowFromIx( eleF, clipFromRow, 2) ; 
	onclick_arrowToIx(   eleT, clipToRow   ) ; 
	

	
    ele_clip_subtext.style.display = "block";    
	
        
    //document.getElementById("id_central"     ).style.display = "none"; 
    document.getElementById("id_td_suborig2" ).style.display = "none"; 
	document.getElementById("id_td_subtra2"  ).style.display = "none"; 
	/**
	let ele1 = document.getElementById("rad_csubAll");
	ele1.checked = true;
	//onclick_ClipSub_HideShow(ele1,'rad_csubClick');  
	**/
	
	//-------------------
	//set new dimension to be the almost the body dimension 
	
		//let new_eleTabSub_clientWidth = parseInt(elebody.clientWidth  * 0.95);		
		//let new_eleTabSub_clientHeight= parseInt(elebody.clientHeight * 0.80);	
		let new_eleTabSub_clientWidth   = eleTabSub.clientWidth; 
		let new_eleTabSub_clientHeight  = eleTabSub.clientHeight; 
		//--- translate to style width/height
		eleTabSub.style.width = (new_eleTabSub_clientWidth - eleTabSub_diff_clientW) + "px";   // set  new dimension			
		eleTabSub.style.height= (new_eleTabSub_clientHeight- eleTabSub_diff_clientH) + "px";   // set  new dimension
	//----------------
	
	var elediv20 = document.getElementById("id_div20");

	clip_reset_BG_color = get_backgroundColor(elediv20);
	eleTabSub.style.backgroundColor =  clip_reset_BG_color;     
	ele_clip_subtext.style.backgroundColor =  clip_reset_BG_color;     
	
}  // end of former_onclick_ClipSub_All()

//---------------------------------------------

function onchangeInputRange1(this1) {
	var pareTD = this1.parentElement;
	var pareTR = pareTD.parentElement;		
	var inpEle = pareTR.getElementsByTagName("INPUT"); 	
	var pareMaxMinInp =  inpEle[0];
	
	onchangeMaxMinDelta( pareMaxMinInp );  
} 

//-------------------------------------------
function onchangeMaxMinDelta(this1) {
	var id1 = this1.id; 
	console.log("onchangeMaxMinDelta(this1)  this1.id=" +id1);                      
	if (id1.indexOf("id_max_delta_") != 0) {
		console.log("ERROR in 'onchangeMaxMinChan(this1)'  this1.id does not begin with 'id_max_delta_'" );
	}
	var id_tf1 = id1.replace("id_max_delta_", "id_delta_tf"); 	
	var id_tt1 = id1.replace("id_max_delta_", "id_delta_tt"); 	
	
	console.log("onchangeMaxMinDelta(this1)  this1.id=" +id1 + " id_tf1=" + id_tf1);  
	
	var val1  = parseFloat(this1.value);  
	document.getElementById( id_tf1 ).max = val1;   
	document.getElementById( id_tt1 ).max = val1;
	
	document.getElementById( id_tf1 ).min = 0 - val1;   
	document.getElementById( id_tt1 ).min = 0 - val1;	
	
} // end of onchangeMaxMinDelta()

//------------------------------------------
//   onclick_ClipSub_Play()  for all the clip ( group of rows)  
//   onclick_OneClipRow_play()  (for one row )
//---------------------------------------------
/**
eg.   123: row number 
<tr id="idtr_123" style="background-color: lightgrey;width:100%;"> 	
	<td class="timerow1">123</td>
	<td class="timerow2">00:00:15.000</td>
	<td class="timerow2">00:00:17.000</td>
	...
	<td class="playBut1"><button class="buttonTD2" id="idb_4" onclick="onclick_OneClipRow_showHide_sub( this,  false)">
		<span style="display:block;font-size:2em;height:1.4em;">📖</span><span style="display:none;font-size:2em;height:1.4em;">📕</span></button></td>  
	<td class="playBut1"><button class="buttonTD2" id="idbT_4" onclick="onclick_OneClipRow_showHide_tran( this, false)">
		<span style="display:none;font-size:2em;height:1.4em; padding:0.03em 0.5em;"><span><span style="position:relative;">&nbsp;<span style="position:absolute; top:0.1em;right:-0.1em;font-weight:bold;">T</span></span></span></span>
		<span style="display:block;font-size:2em;height:1.4em;padding:0      0.3em;"><span><span style="position:relative;">☹<span style="position:absolute;top:-0.0em;left:-0.2em;font-weight:bold;">t</span></span></span></span></button></td>  
	...	
	<td class="playBut1"><button class="buttonTD2" id="sp123" onclick="onclick_OneClipRow_play(this, 123,false)">
		<span style="font-size:2em;height:1.4em;">🗣</span></button></td>  
	<td class="playBut1"><button class="buttonTD2 " onclick="onclick_OneClipRow_play(this,123,true)" style="font-size:1.0em;">∞</button></td>  	
**/

//-------------------------
function show_hideORIG(z3) {	
	let ele_orig_toTestShow = document.getElementById( "idb_"  + z3 ); // onclick ...  children opened/closed orig.image  (book) 		
	let ele_orig_text       = document.getElementById( "idc_"  + z3 ); // element of original text to show/hide	  			
	
	// show subtitle if icon opened book is visible otherwise hide it ( icon closed book is visible) 
	fun_oneClipRow_showHide_ORIG_if_book_opened(ele_orig_text,  ele_orig_toTestShow, z3); 	
} // end of  show_hideORIG
//-------------------------
function show_hideTRAN(z3) {	
	
	let ele_tran_toTestShow = document.getElementById( "idbT_" + z3 ); // onclick ...  children opened/closed tran.image  (T/t) 
	let ele_tran_text       = document.getElementById( "idt_"  + z3 ); // element of tran     text to show/hide	      
			
	// show subtitle if icon T is visible otherwise hide it ( icon t? is visible  )
	
	fun_oneClipRow_showHide_TRAN_if_book_opened(ele_tran_text,  ele_tran_toTestShow); 

} // end of  show_hideTRAN
//-----------------------------------------------------

function onclick_show_row(this1, z3) {
	removeLastBold(); 
	if (this1 == false) { return; }	
	
	if (this1.children[0].style.display == "none") {  // no openbook   
		this1.children[0].style.display = "block";                         // show opened book image  
		this1.children[1].style.display = "none";						  // hide closed book image 	
	} else {
		this1.children[0].style.display = "none";                          //  hide opened book image  
		this1.children[1].style.display = "block";						  //  show closed book image 	
	}
	show_hideORIG(z3);
	show_hideTRAN(z3);
}	

//------------------------------------------------
function highlightRow(ele1) {	
	removeLastBold();
	
	ele1.classList.add("boldLine"); 
	ele1.style.backgroundColor = "yellow";
	ele1.parentElement.style.border = "1px solid black"; 
	
	last_BoldRow = ele1; 
}
//-------------------------
function removeLastBold() {
	if (last_BoldRow) {
		console.log("removeLastBold() " + last_BoldRow.id);  
		
		last_BoldRow.classList.remove("boldLine");
		last_BoldRow.style.backgroundColor = null; 
		last_BoldRow.parentElement.style.border = null; 
		var last_ele1_tr = last_BoldRow.parentElement.parentElement ;
		last_ele1_tr.style.backgroundColor = "lightgrey"; 
	}	
	if (sw_tts) tts_remove_last_bold();  
}
//-------------------------------------------
function fun_oneClipRow_showHide_ORIG_if_book_opened( ele1, ele_to_test , z3) {
	
	console.log("fun_oneClipRow_showHide_ORIG_if_book_opened( z3=" + z3 + " to_test=" + ele_to_test.id + " ele1=" +ele1.id );
	
	var ele1_tr = ele1.parentElement.parentElement ;

	var last_tr; 
	removeLastBold(); 
	console.log(" fun_oneClipRow_showHide_ORIG_if_book_opened() " + ele1.id); 
	if (ele1 == null) {return;}	
	
	last_BoldRow = ele1; 
	
	if (ele_to_test.children[0].style.display == "block") {  // openbook ==> show 
		ele1.style.visibility = "visible"; 
		ele1.classList.add("boldLine"); 
		ele1.style.backgroundColor = "yellow";			
		ele1.parentElement.style.border = null;
		//feb if (sw_is_no_videoaudio == false) ele1_tr.style.backgroundColor = "yellow";			
		ele1_tr.style.backgroundColor = "yellow";	//feb 		
	} else {	                                      // closebook  ==> hide 
		ele1.style.visibility = "hidden"; 	
		ele1.classList.remove("boldLine");
		ele1.style.backgroundColor = null; 
		ele1.parentElement.style.border = "1px solid red"; 
		//feb if (sw_is_no_videoaudio == false) ele1_tr.style.backgroundColor = "yellow";		
		//ele1_tr.style.backgroundColor = "yellow";	//feb	  
	}	
	
	//last_BoldRow = ele1; 
		
} // end of fun_oneClipRow_showHide_ORIG_if_book_opened() 


//-----------------------------------------
//-------------------------------------------
function fun_oneClipRow_showHide_TRAN_if_book_opened( ele1, ele_to_test ) {

	if (ele1 == null) {return;}	
	
	if (ele_to_test.children[0].style.display == "block") {  // openbook ==> show 
		//ele1.style.visibility = "visible"; 	
		ele1.style.display = "block"; 
	} else {	                                      // closebook  ==> hide 
		//ele1.style.visibility = "hidden"; 
		ele1.style.display = "none"; 
	}	
		
			
} // end of fun_oneClipRow_showHide_TRAN_if_book_opened() 
//-----------------------------------------

//-------------------
function fun_oneClipRow_showHide_if_book_opened( ele1, ele_to_test, what, swOrig ) {
	if (ele1 == null) {return;}
	
	if (ele_to_test.children[0].style.display == "block") {  
												   	// openbook ==> show 
		ele1.style.visibility = "visible"; 
		ele1.parentElement.style.border = ""; // 1px solid red"; 		
		if (swOrig) {
			highlightRow(ele1);			
		}
	} else {	                                      // closebook  ==> hide 
		ele1.style.visibility = "hidden"; 		
		if (swOrig) {
			ele1.classList.remove("boldLine");
			ele1.style.backgroundColor = null; 
			ele1.parentElement.style.border = "1px solid red"; 
		}
	}	
}  // end of fun_oneClipRow_showHide_if_book_opened()

//-----------------------------------------------
function fun_copyHeaderSelected() {
	let this2; 
	let id1;
	let inBeg, inEnd; 
	
	id1 = "idb_" + begix + "_m";  
	var this1 = document.getElementById(id1); 
	if (this1 == false) { return; }
	
	
		
	
	inBeg      = begix;
	inEnd      = endix; 	
	if (begix > endix) {
		inBeg  = endix;
		inEnd  = begix; 		
	} 
	 
	var style0 , style1; 
	this2 = this1; // only one line 	
	fun_oneRowZZ(); 
	
		for(var g=inBeg; g <= inEnd; g++) {
			id1 = "idb_" + g;   			
			this2 = document.getElementById(id1); 
			fun_fun_fun_oneRow11(); 	
		} 
	 	
	//--------------
	function fun_oneRowZZ() {
		if (this2 == false) { return; }
		
		if (this2.children[0].style.display == "none") {  // no openbook   
			style0 = "none";                          //  hide opened book image  
			style1 = "block";						  //  show closed book image 
		} else {			
			style0 = "block";                         // show opened book image  
			style1 = "none";						  // hide closed book image 	
		}			
	}	
	//--------------
	function fun_fun_fun_oneRow11() {	
		if (this2 == false) { return; }
		this2.children[0].style.display = style0;         // show/hide  opened book image  
		this2.children[1].style.display = style1; 		  // show/hide closed book image 
		let subid = this1.id.replace("idb","idc"); 
		
		//console.log("subid=" + subid + " last2="  + subid.substring( subid.length-2)  ); 
		
		if (subid.substring( subid.length-2) == "_m") {
			return; 
		} 
		let ele1 = document.getElementById( subid );
		if (style0 == "block") {
			ele1.style.color = null; // style.color is set only when equal to background color (  = null means to make it visible 
		} else {
			fun_makeTextInvisible(ele1, 2);    // 	hide translation
		}
	}
} // end of fun_copyHeaderSelected()

//-----------------------------

function onclick_22OneClipRow_showHide_sub( this2, ele1 ) {
	
	if (this2 == false) { return; }

	if (this2.children[0].style.display == "none") {  // no openbook   
		this2.children[0].style.display = "block";// show opened book image  
		this2.children[1].style.display = "none";//  hide closed book image  
		ele1.style.color = null; // style.color is set only when equal to background color (  = null means to make it visible 
	} else {
		this2.children[0].style.display = "none";                         //  hide opened book image  
		this2.children[1].style.display = "block";						  //  show closed book image 	
		fun_makeTextInvisible(ele1, 3);    // 	hide text
	}
		
} // end of onclick_22OneClipRow_showHide_sub()

//-----------------------------------------

//-----------------------------
function onclick_OneClipRow_showHide_sub( this1, sw_allSel, swAllAll) {
	
	if (this1 == false) { return; }
		
	let this2; 
	let id1;
	let inBeg, inEnd; 
	inBeg      = begix;
	inEnd      = endix; 
	if (swAllAll) {
		inBeg= clipFromRow_min;
		inEnd= line_list_o_from1.length-1; 
	}

	
	if (begix > endix) {
		inBeg  = endix;
		inEnd  = begix; 		
	} 
	 
	var style0 , style1; 
	this2 = this1; // only one line 	
	if (swAllAll) {
		if (this2.children[0].style.display == "block") {  // openbook   
			style0 = "block";                         // show opened book image  
			style1 = "none";						  // hide closed book image 	
		} else {
			style0 = "none";                          //  hide opened book image  
			style1 = "block";						  //  show closed book image 	
		}
	} else {
		fun_fun_oneRow00(); 	
	}
	fun_fun_fun_oneRow11(1); 
	
	if (sw_allSel) {	
		//console.log("    onclick_OneClipRow_showHide_sub()   sw_allSel");
		for(var g=inBeg; g <= inEnd; g++) {
			id1 = "idb_" + g;   			
			this2 = document.getElementById(id1); 
			fun_fun_fun_oneRow11(1+inEnd-inBeg); 	
		} 
	} 	
	//--------------
	function fun_fun_oneRow00() {
		if (this2 == false) { return; }
		//console.log("         fun_fun_oneRow00() " + "id sub show =" + this2.id); 			
		
		if (this2.children[0].style.display == "none") {  // no openbook   
			style0 = "block";                         // show opened book image  
			style1 = "none";						  // hide closed book image 	
		} else {
			style0 = "none";                          //  hide opened book image  
			style1 = "block";						  //  show closed book image 	
		}
		console.log("         fun_fun_oneRow00() " + "id sub show =" + this2.id + " style=" + style0 + " - " + style1); 	
	}	
	//--------------
	function fun_fun_fun_oneRow11(nn) {	
		if (this2 == false) { return; }
		
		this2.children[0].style.display = style0;         // show/hide  opened book image  
		this2.children[1].style.display = style1; 		  // show/hide closed book image 
		let subid = this2.id.replace("idb","idc"); 
		
		//console.log("subid=" + subid + " last2="  + subid.substring( subid.length-2)  ); 
		
		if (subid.substring( subid.length-2) == "_m") {
			return; 
		} 
		let ele1 = document.getElementById( subid );
		
		//console.log(" fun_fun_fun_oneRow11()  subid=" + subid + " ele1.id=" + ele1.id + " style0=" + style0 +" this2.outer=" + this2.outerHTML  )  
		
		if (style0 == "block") {
			//console.log("   onclick_OneClipRow_showHide_sub()  " + subid + "  visibile");
			//ele1.style.color = null; // style.color is set only when equal to background color 
			fun_makeTextVisible(ele1,1,nn);  
		} else {
			//console.log("   onclick_OneClipRow_showHide_sub() " + subid + " INVISIBILE");
			fun_makeTextInvisible(ele1, 4,nn); 
		}
	}
	
} // end of onclick_OneClipRow_showHide_sub()

//-----------------------------------------

function onclick_OneClipRow_showHide_tran( this1, sw_allSel ) {
	if (this1 == false) { return; }
	
	let tran_id = this1.id.replace("idbT_","idt_"); 
	
	let this2; 
	let id1;
	let inBeg, inEnd; 
	inBeg      = begix;
	inEnd      = endix; 	
	if (begix > endix) {
		inBeg  = endix;
		inEnd  = begix; 		
	} 
	var outDisplay_block ;  
	var style0 , style1; 
	this2 = this1; // only one line 
	
	fun_fun_oneRow00(); 	
	
	fun_fun_fun_oneRow11(false); 
	
	if (sw_allSel) {	
		for(var g=inBeg; g <= inEnd; g++) {
			id1 = "idbT_" + g;  			
			this2 = document.getElementById(id1); 
			//console.log("gruppo tran id1=" + id1 ) ;  
			fun_fun_fun_oneRow11(true); 	
		} 
	} 
	
	//--------------
	function fun_fun_oneRow00() {	
		if (this2 == false) { return; }
		//console.log("id sub tran  show =" + this2.id + "<=="); 			
		
		if (this2.children[0].style.display == "none") {  //  opened_translation symbol is hided  (T)  
			//console.log(" tran  mostra T grande style0=block" ); 
			style0 = "block";                         // show opened_translation symbol   (T) 
			style1 = "none";						  // hide closed_translation symbol   (image)				
			outDisplay_block =	"block" ;             // show translation line 			 
			sw_active_show_lastSpokenLineTranslation = true;
		} else {
			//console.log(" tran  mostra t piccolo   style0 = none") ;	
			style0 = "none";                          // hide opened_translation symbol  (T) 
			style1 = "block";						  // show closed_translation symbol  (image) 	
			outDisplay_block =	"none" ;              // hide translation line	
			sw_active_show_lastSpokenLineTranslation = false;	
		}
	}
	//--------------
	function fun_fun_fun_oneRow11(sw_g) {	
			//console.log( "tran  fun_fun_fun_oneRow11()  this2.id=" + this2.id);  	
			
		if (this2 == null) {  return; }
		if (this2 == false) {   return; }
		
		this2.children[0].style.display = style0;         // show/hide opened_translation symbol  (T)
		this2.children[1].style.display = style1; 		  // show/hide closed_translation symbol  (image) 	
		
		tran_id = this2.id.replace("idbT_","idt_"); 
		if (document.getElementById(tran_id)) {
			document.getElementById(tran_id).style.display = style0;  // show/hide  translation line	
		}
	}

	
} // end of onclick_OneClipRow_showHide_tran()

//---------------------------------------

function fun_scroll_tr_toTop( this1, swDeb ){

	var ele_tr_target = this1; // .parentElement.parentElement ; 
	var numid= parseInt(ele_tr_target.id.substring(5).split("_")[0] );  // id="idtr_xx"   id="idtr_xx_m1"	
	
	if (swDeb) console.log("fun_scroll_tr_toTop() 1 numid=" + numid); 
	
	var ele_tr_nearest, diff_off=0;
	if (numid > 1) {
		ele_tr_nearest = document.getElementById(  "idtr_" +(numid-1)); 	
		if (ele_tr_nearest) {
			diff_off = ele_tr_target.offsetTop - ele_tr_nearest.offsetTop; 	
		}
	} else {
		ele_tr_nearest = document.getElementById(  "idtr_" +(numid+1)); 			
		if (ele_tr_nearest) {
			diff_off = 0 - (ele_tr_target.offsetTop - ele_tr_nearest.offsetTop); 	
		}
	}	
	var ele_container = document.getElementById("id_section_row");
	if (swDeb) { 
		var compHeight = window.getComputedStyle(ele_container).getPropertyValue("height");	
	
		console.log("fun_scroll_tr_toTop() 2  ele_tr_target.offsetTop - diff_off=" +  ele_tr_target.offsetTop + " - " + diff_off );
	    console.log("   ele_container  (id_tabSub).id = " + ele_container.id +
			" offsetHeight=" + ele_container.offsetHeight + " offsetTop=" + ele_container.offsetTop + 
			" style.height=" + ele_container.style.height + " computed height=" + compHeight);  
	} 
	if (numid < 2) {
		ele_container.scrollTop = 0; 
		return; 
	}
	try{
		ele_container.scrollTop = ele_tr_target.offsetTop - diff_off;
	} catch(e1) {
		console.log("fun_scroll_tr_toTop(this1)" + " this1.id=" + this1.id ); 
		console.log("  \t ele_tr_target.id=" + ele_tr_target.id); 
		ele_container.scrollTop = ele_tr_target.offsetTop - diff_off;
	}
} // end of fun_scroll_tr_toTop() 
//-------------------------------------------

//-------------------------
function set_PlayIxFromToTime( begix, endix, swLoop) {

	lastPlayRowFromIx = begix; 	
	lastPlayRowToIx   = endix; 	
	lastPlayRowLoop   = swLoop; 	
	
	
	lastPlayListFrom = []; 	
	for (var v=begix; v<=endix; v++) {
		lastPlayListFrom.push(    line_list_o_from1[v] + parseFloat( document.getElementById("id_delta_tf" + v).value )  ); 
	}	
	lastPlayRowFromTime = lastPlayListFrom[0];
	lastPlayRowToTime   = line_list_o_to1[endix]   + parseFloat( document.getElementById("id_delta_tt" + endix).value ) ; 
	lastPlayListFrom.push( 9999999999); 

	console.log("       set_PlayIxFromToTime( begix, endix, swLoop) " + " lastPlayRowFromTime=" + lastPlayRowFromTime +" lastPlayRowToTime=" +lastPlayRowToTime );
	
	
} // end of set_PlayIxFromToTime() 
//--------------
function play_or_cancel(this1) {
	
	if (isPlaying) {
	   //	console.log("\t isplaying on is still running ==> cancel it and exit");
	   if (ele_last_play) 	ele_last_play.style.backgroundColor = null;
	   
	   onclick_speech_cancel(); 
	   end_speech();
	   if (this1 == ele_last_play) {  // click on the same line which is running ==> it means ==> I just want to stop it   
			return -1; 
	   }
	   // click not on the sameline running ==> I wanted to stop the last line e start a new one 
	   
	}
	
	this1.style.backgroundColor = "red";
	ele_last_play = this1; 
	return 0; 
}
//---------------------
function onclick_OneClipRow_play_Loop3(this1,  z3 , swLoop) {
	removeLastBold();
	fun_invisible_prev_fromto(z3);
	if (sw_tts) {  // TTS 
		if (TTS_LOOP_swLoop) {TTS_LOOP_swLoop = false; return; }
		if (play_or_cancel(this1) < 0) {
			return;
		}
		isPlaying = true; 		
		onclick_text_to_speech_ix(z3,swLoop,this1); 
		return;
	}
	
	lastPlayTrigger = playTRIGGER_clip; 	
	
	fun_clip_or_row_play( this1, z3, z3, swLoop ) ;	
	
}// end of onclick_OneClipRow_play_Loop3()	

//----------------------

function onclick_ClipSub_Play3(this1, swLoop) {

	lastPlayTrigger = playTRIGGER_clip; 
	var begix, endix; 
	[begix, endix] = fromIxToIxLimit;	
	
	if (sw_tts) { // TTS 
		if (TTS_LOOP_swLoop) {TTS_LOOP_swLoop = false; return; }
		if (play_or_cancel(this1) < 0) {
			return;
		}
		onclick_text_to_speech_from_to(begix, endix, swLoop); 
		return; 
	}
	
	fun_clip_or_row_play( this1, begix, endix, swLoop ) ;	

} // end of onclick_ClipSub_Play3()

//-------------------------------------------------
	
function fun_clip_or_row_play( this1,begix, endix, swLoop ) { 	
	
	
	if (isPlaying) {
		if (ele_last_play) 	ele_last_play.style.backgroundColor = null;
		lastPlayRowToIx = -1; 
	   fun_pauseVid(); 
	   return; 
	}
	this1.style.backgroundColor = "red";
	ele_last_play = this1; 
	
	ele_subOrigText2.innerHTML = ""; // the line just below the video 
	ele_subTranText2.innerHTML = ""; // the line just below the video 
	
	if (swLoop) {
		if (lastPlayRowLoop) {
			if (lastPlayRowFromIx == begix) { 
				this1.style.backgroundColor = null;
				lastPlayRowLoop = false;
				lastPlayRowToIx = -1; 
				return; 
			}
		}	
	} 
	
	//console.log("  1 fun_clip_or_row_play( this1,begix=" + begix + ", endix=" + endix) ;
	
	set_PlayIxFromToTime(begix, endix, swLoop);
	
	fun_scroll_tr_toTop(this1.parentElement.parentElement, false); 	
	
	vid.currentTime =  lastPlayRowFromTime; 
	
	//console.log("  2 fun_clip_or_row_play() " + " vid.currentTime=" + vid.currentTime );
	
	fun_playVideo();
	
} // end of fun_clip_or_row_play()  

//---------------------------------------
function fun_invisible_prev_fromto( interX ) {
	// eliminate bold of the  previous group of lines, unless this is a line in them  
	[begix, endix] =  fromIxToIxLimit;  // previously set 
	if ((interX >= begix) && (interX <= endix)) {
		return; 
	} 
	var id_pre_tr_beg_space  = "idtr_" + begix + "_m2" ; 
	var id_pre_tr_head       = "idtr_" + begix + "_m1" ;   
	var id_post_tr_end_space = "idtr_" + (endix+1) + "_m2" ; 
			
	
	if (fromIxToIxButtonElement[0]) {
		fromIxToIxButtonElement[0].style.backgroundColor = null;
		if (document.getElementById(id_pre_tr_beg_space) ) {document.getElementById(id_pre_tr_beg_space).style.display = "none"; }
		if (document.getElementById(id_pre_tr_head     ) ) { document.getElementById(id_pre_tr_head     ).style.display = "none"; }
	}
	if (fromIxToIxButtonElement[1]) {
		fromIxToIxButtonElement[1].style.backgroundColor = null;			
		if (document.getElementById(id_post_tr_end_space  ) ) { document.getElementById(id_post_tr_end_space ).style.display = "none"; }
	}
			
} // end of fun_invisible_prev_fromto()

//------------------------------------------

function fun_copy_openClose_to_tr_m1(z3) {
	
	var i_eleSubO = document.getElementById("idb_"  + z3);        // from button id="idb_§1§"    onclick_show_row()
	var i_eleSubT = document.getElementById("idbT_" + z3);        // from button id="idbT_§1§"   onclick_show_row() 
	var o_eleSubO = document.getElementById("idb_"  + z3 + "_m"); // to   button id="idb_§1§_m"  onclick_OneClipRow_showHide_sub()
	var o_eleSubT = document.getElementById("idbT_" + z3 + "_m"); // to   button id="idbT_§1§_m" onclick_OneClipRow_showHide_tran()		
	try{	
		o_eleSubO.children[0].style.display = i_eleSubO.children[0].style.display ;    // ${openbook_symb}
		o_eleSubO.children[1].style.display = i_eleSubO.children[1].style.display ;    // ${closedbook_symb}
		o_eleSubT.children[0].style.display = i_eleSubT.children[0].style.display ;    // ${show_translation_symb}
		o_eleSubT.children[1].style.display = i_eleSubT.children[1].style.display ;    // ${hide_translation_symb}
    } catch(e1) {
		console.log("error in 'fun_copy_openClose_to_tr_m1(z3=" + z3 +")'" ); 
		console.log(e1);
	}
} // end of fun_copy_openClose_to_tr_m1() 
//---------------------------------------

function onclick_arrowFromIx( this1, z3, wh) {
	//------------------------------------------
	// button from ( --> ) has been clicked 
	//------------------------------------------
	if (z3==0) { console.log(" onclick_arrowFromIx( this1, z3=" +z3 + ", wh=" + wh); } 
	removeLastBold(); 
	fun_invisible_prev_fromto(-1);
	
	fromIxToIxLimit = [z3 ,-1]; 
	[begix, endix] =  fromIxToIxLimit;
	
	fun_copy_openClose_to_tr_m1(z3) ;  //  copy open/Close book style from this line idtr_xx to the upper idtr_xx_m1
	
	fromIxToIxButtonElement=[this1, null];
	this1.style.backgroundColor = "green";	

} // end of  onclick_arrowFromIx()  

//---------------------------------------

function onclick_arrowToIx( this1, z3 ) {
	//------------------------------------------
	// button to( <-- ) has been clicked 
	//------------------------------------------
	
	
	//reset previous ..._ToIx  button     
		
	if (fromIxToIxButtonElement[1]) {
		fromIxToIxButtonElement[1].style.backgroundColor = null;
		var endix2 = fromIxToIxLimit[1]; 
		if (endix2 > 0)  {
			var id_post_tr_end_space2 = "idtr_" + (endix2+1) + "_m2" ; 
			if (document.getElementById(id_post_tr_end_space2  ) ) { document.getElementById(id_post_tr_end_space2 ).style.display = "none"; }
		}
	}
	//-------------------------------------------
	// new ... _ToIx
	
	fromIxToIxLimit[1]   = z3;  
	fromIxToIxButtonElement[1] = this1;
	
	[begix, endix] = fromIxToIxLimit;	
	
	/*
	this:  from id="b1_§1§" fromIx(§1§,this) -  to id="b2_§1§" 
		<tr id="idtr_§1§_m2"  ...>
		<tr id="idtr_§1§_m1"  ...>
	**/
	
	var id_pre_tr_beg_space  = "idtr_" + begix + "_m2" ; 
	var id_pre_tr_head       = "idtr_" + begix + "_m1" ; 
	var id_post_tr_end_space = "idtr_" + (endix+1) + "_m2" ; 
	
	fun_copyHeaderSelected() ; 
	
	
	if (document.getElementById(id_pre_tr_beg_space ) ) {  document.getElementById(id_pre_tr_beg_space).style.display = "table-row"; } 
	//else {console.log(" manca "+id_pre_tr_beg_space ) }	
	if (document.getElementById(id_pre_tr_head      ) ) {  document.getElementById(id_pre_tr_head     ).style.display = "table-row"; }	
	//else {console.log(" manca "+id_pre_tr_head      ) }	
	if (document.getElementById(id_post_tr_end_space) ) { document.getElementById(id_post_tr_end_space).style.display = "table-row";}
	//else {console.log(" manca "+id_post_tr_end_space ) }	

	this1.style.backgroundColor="red";
	
	//c_onsole.log("onclick_arrowToIx() calls 'fun_reset_clip_all_sel()'" )  ; 
	
	//21 novembre // fun_reset_clip_all_sel();
	
	
	
} // end of onclick_arrowToIx()


//------------------------------------------
function get_backgroundColor(ele0) {
	// since the backgroundColor is not inherited the 'getComputedStyle()' cannot get it from the parent  
	var ele1 = ele0; 	
	var eleP = ele1;  
	for( var i=0; i < 99; i++) { 
		ele1 = eleP; 
		if (ele1 == null) { 
			console.log(" get_backgroundColor(ele1)  ==> bgColor=" + "  empty1"); 
			return "";
		}	
		var bgColor = window.getComputedStyle(ele1).getPropertyValue("background-color");
		var bgc1 = bgColor.split("("); 
		var bgc2 = bgc1[1].split(")"); 
		var bgx = (bgc2[0].replaceAll("  ","").replaceAll(" ","").replaceAll(","," ").trim() ).substring(0,7); 
		if (bgx == "0 0 0 0") {
			eleP = ele1.parentElement; 
		} else {
			//console.log(" get_backgroundColor(ele1=" + ele1.id + ")  ==> bgColor=" + bgColor); 
			return bgColor;  
		}
	}	
	console.log(" get_backgroundColor(ele1)  ==> bgColor=" + "  empty2"); 
	return ""; 
}

// ===================================================================
//  end former file player_3_b_12_on_clip_routines_vers2.js 	  								
//=============================================    
		
//=============================================    								
// 6 beg. former file player_3_b_29_on_routines.js 								


//--------------------------------------------------------------	

function onclick_changeVideoSpeed(this1) {	
	if (sw_tts) {  // TTS 
		onclick_change_synth_rate(this1); 
		return; 
	}
	var speed =  parseFloat( this1.value ) ; 
	if (speed  < 0.25) { 
		speed = 0.25; 
		this1.value = speed;
	}	
	vid.playbackRate = speed; 
	
} // end of onclick_changeVideoSpeed()
 
//===================

function fun_collapse( list_collapse_ele, list_hide_ele , ratio ) {	
		
	var ele_filler_nosub    = document.getElementById("id_filler"); 	
	
	console.log("    00  ele_filler_nosub.style.width = " + ele_filler_nosub.style.width);  	
	
	var diff_width_nosub = 0;
	for (var x1=0; x1 < list_collapse_ele.length; x1++) {
		diff_width_nosub += parseFloat( list_collapse_ele[x1].offsetWidth ); 
		console.log("          collapse id=" + list_collapse_ele[x1].id + 
			" width=" +  list_collapse_ele[x1].offsetWidth + " diff_width_nosub=" + diff_width_nosub)
	}	
	
	var filler_nosub_with   =  parseInt(diff_width_nosub * ratio); 	   	
	
	console.log("       filler_nosub_with =" + filler_nosub_with );  
	
	for (var x1=0; x1 < list_collapse_ele.length; x1++) {
		list_collapse_ele[x1].style.visibility   = "collapse"; 	 
	}	
	
	ele_filler_nosub.style.width = filler_nosub_with  + "px"; 
	
	console.log("    11   ele_filler_nosub.style.width = " + ele_filler_nosub.style.width);  
	
		
	for (var x2=0; x2 < list_hide_ele.length; x2++) {
		console.log("          HIDE id=" + list_hide_ele[x2].id); 
		list_hide_ele[x2].style.display = "none";  
	}	
	
} // end of fun_collapse()

//------------------------------
function innerHTML_from_innerHTML(id_to, id_from) {
	
	if (document.getElementById(id_to) ) {
		if ( document.getElementById( id_from) ) {
			document.getElementById(id_to).innerHTML = document.getElementById( id_from).innerHTML;  
			if (id_to=="m031") {  console.log("XXX  " + id_to + " " + document.getElementById(id_to).innerHTML);}
		} else { 
			console.log("innerHTML " + id_from + "  does not exist"); 
		}
	} else { 
		console.log("innerHTML " + id_to  + "  does not exist"); 
	}	
} // end of innerHTML_from_innerHTML( 

//--------------------------
function collapse_cols() {

	var list1_collapse_ele = [
		//document.getElementById("col_6_7"),    // x TTS 
		document.getElementById("col_9_13")
		] ;
	var list1_hide_ele = [
		//document.getElementById("id_spee"    ),  // arrow right-left, change speed, stop/continus buttons ( on the right of video place)
		document.getElementById("id_bRigthLeft"    ),  // arrow right-left, 
		document.getElementById("id_central" ),  // video/audio zone (video, cursor, show/hide original/translated subtitles button) 
		document.getElementById("id_subOnLeftSync")   // sync button on left of video zone 
		//ele_time_video                           // seconds and clips progress ( at top just after the video title 
		];  	
				
	fun_collapse(  list1_collapse_ele, list1_hide_ele, 0 ) ;	
	if (NO_VIDEO_AUDIO_FILE) {
		ele_time_video.innerHTML = '<span style="font-size:2em; font-weight:bold;">' + "</span>";
	} else {	
		ele_time_video.innerHTML = '<span style="font-size:2em; font-weight:bold;">' + document.getElementById("mc88").innerHTML + "</span>";//bilingue   	
	}	
	innerHTML_from_innerHTML("m224", "m324"); // Text Lines 
	//innerHTML_from_innerHTML("m891", "m791"); // Original Text 
	//innerHTML_from_innerHTML("m892", "m792"); // Translated Text 
	innerHTML_from_innerHTML("m111", "m711"); // Lines 
	innerHTML_from_innerHTML("m115", "m715"); // show all subtitles  / lines	
	innerHTML_from_innerHTML("m116", "m716"); // hide all subtitles  / lines 									
	//innerHTML_from_innerHTML("m117", "m717"); // list of all subtitles / lines
	//innerHTML_from_innerHTML("m031", "m731"); // goto beginning of original subtitles / lines
	//innerHTML_from_innerHTML("m032", "m732"); // goto beginning of translated subtitles / lines
}



//-----------------------------------------------------------------
function FAKE_onloaded_fun() {
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX FAKE_onloaded_fun() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n"); 
						
    document.getElementById("id_div20").style.display = "block";
	
	ele_ctl_slider.value = 0;  	
	runningButton = false;
	PLAYCLIP_TO_TIME = 0;
    PLAYCLIP_TO_LINE = 0;
	
    isPlaying = false;
	
    fun_player_beginning();
    
	//fun_magnifyVideo_begin();
	
    document.getElementById("id_div20buffer").style.display = "block";
   	
	document.getElementById("idbT_xx").children[0].innerHTML = show_translation_symb;  
	document.getElementById("idbT_xx").children[1].innerHTML = hide_translation_symb;  
	
	set_initial_force_sub_visibility() ; 


} // end of FAKE_onloaded_fun() 


//--------------------------

function onloaded_fun() {
	console.log("\nXXXXXXXXXXXXXXXXXXXXXXXXXX\nX onloaded_fun() \nXXXXXXXXXXXXXXXXXXXXXXXXXX\n"); 
    document.getElementById("id_div20").style.display = "block";

    vid = document.getElementById("myVideo");	
	
	console.log("vid=" + vid.outerHTML); 
	
	vid_duration = vid.duration;
	
	ele_ctl_slider.max = vid_duration;
	ele_ctl_slider.value = 0;  
	
	ctl_slider_maxValue_hhmm = fun_N_secs_to_hhmmssRid( parseFloat(vid_duration) ) ;
	
	
	console.log("vid.duration=" + vid_duration + " ctl_slider_maxValue_hhmm=" + ctl_slider_maxValue_hhmm); 
	 
    // Assign an ontimeupdate event to the video element, and execute a function if the current playback position has changed
    
	vid.ontimeupdate = function() {       
        if (runningButton == false) {
            PLAYCLIP_TO_TIME = vid.duration;
            PLAYCLIP_TO_LINE = MAX_ixClip;
        }
		
        fun_updateVideoTime();
    };	
	
    isPlaying = false;

    // On video playing toggle values
    vid.onplaying = function() {
        isPlaying = true;
    };

    // On video pause toggle values
    vid.onpause = function() {
        isPlaying = false;
        runningButton = false;
        silentH_none();
    };

    //-------------------------------------


    fun_player_beginning();
    
	fun_magnifyVideo_begin();
	//fun_riduz_VideoDim();
	 
	//fun_dragElement( ele_dragSubT ,  ele_dragSubT_anchor   );  // 31 ott.
	
    document.getElementById("id_div20buffer").style.display = "block";
   	
	document.getElementById("idbT_xx").children[0].innerHTML = show_translation_symb;  
	document.getElementById("idbT_xx").children[1].innerHTML = hide_translation_symb;  
	
	set_initial_force_sub_visibility() ; 
	
	ready_to_Begin();
	
} // end of onloaded_fun()
//----------------------
function silentH_none() {
	ele_subOrigSilentH.style.display = "none";   
	ele_main_subt.style.display      = "block";  
}
function silentH_block() {
	ele_subOrigSilentH.style.display = "block";   
	ele_main_subt.style.display      = "none";  
}
//--------------------------------
function set_initial_force_sub_visibility() {
	var eleOpen  = document.getElementById("id_forceSubOpen");
	var eleClose = document.getElementById("id_forceSubClose");
	eleOpen.checked  = LS_sub_force_visible; 
	eleClose.checked = (LS_sub_force_visible== false);
	//onclick_OneClipRow_showHide_AllSub( eleOpen.checked); 
} // end of set_initial_force_sub_visibility()	

//------------------------------------------------------------

function onclick_change_diff_sync() {

    // the value triggered by onchange event replace  the delta time value  
	
    LS_subDeltaTime = document.getElementById("id_diff_sync").value;
	fun_set_localStorage_item_from_vars("g_main 6"); 

    fun_initial_update_delta_time();

} // end of onclick_change_diff_sync()


//------------------------------------------------------------------------------------------

function onclick_skipThisPiece() {

	LAST_time_change_secs = vid.currentTime;  
    let ixfromto = get_ix_orig_fromTo(LAST_time_change_secs, 5);
	
	//console.log("onclick_skipThisPiece()  LAST_time_change_secs=" + LAST_time_change_secs + "  XX ixfromto=" +   ixfromto ) ;  
	
    let toIxClip4 = ixfromto[1];
    if (toIxClip4 > 0) { 
		LAST_time_change_ix = toIxClip4;
	}	
	LAST_time_change_ix += 1;
	
    let time_secs = line_list_o_from1[LAST_time_change_ix] + 0.0004;
	LAST_time_change_secs = time_secs;  
	
	vid.currentTime = time_secs;
		//--
	
	let hhmmss                          = fun_N_secs_to_hhmmssmmm( time_secs ) ; 
	
	ele_playNextVa_from_hhmmss_value    = hhmmss;  
	//--
	

	//--	
    if (runningButton) {
	
		//onclick_playNextClip();
       
		//fun_playVideo();
    }
	
} // end of onclick_skipThisPiece()

//-------------------------------------------

function onclick_pauseContinue(this1,isClip=false) {
	
	if (sw_tts) { // TTS 
		if (sw_pause) {
			this1.style.backgroundColor = null;	
			this1.style.color = null;
			onclick_speech_resume();
		} else {
			this1.style.backgroundColor = "black";		
			this1.style.color = "white";			
			onclick_speech_pause();			
		}
		return; 
	}
	//----------------------

	if (isClip) {
		if (sw_CLIP_play) { 			
			if (isPlaying) { 
				// stop the running clip 
				clip_play_time_interrupt = vid.currentTime; 
				save_runningButton = runningButton;
				//document.getElementById("id_t5").style.backgroundColor = "lightgrey";
				this1.style.backgroundColor = "black";		
				this1.style.color = "white";				
				vid.pause();
			} else { 
				// continue
				runningButton = save_runningButton;
				//document.getElementById("id_t5").style.backgroundColor = null;
				this1.style.backgroundColor = null;	
				this1.style.color = null;
				//onclick_replay_from_to(true, clip_play_time_interrupt); 				
			}	
			return;  
		} else { 
			console.log("ERROR in  onclick_pauseContinue() this1.id=" + this1.id + ",isClip=" + isClip + "  not equal to sw_CLIP_play=" + sw_CLIP_play);
		}
	}

	//------------------------------------
    if (isPlaying) { // stop the running clip 
        save_runningButton = runningButton;
        //document.getElementById("id_t5").style.backgroundColor = "lightgrey";
		this1.style.backgroundColor = "black";		
		this1.style.color = "white";				
        vid.pause();
    } else {  // continue
        runningButton = save_runningButton;
        //document.getElementById("id_t5").style.backgroundColor = null;
		this1.style.backgroundColor = null;	
		this1.style.color = null;		
        fun_playVideo("onclick_pauseContinue() file ..29_on_routines.js");
    }
} // end of onclick_pauseContinue()

//--------------------------------------------------------
//--------------------------------------------------------

function onclick_display_subtitle(numEle) {
   	
	if (numEle == 0) {	
        if (sw_HARD_subtitle) {
            fun_hideDisplay3();
            return;
        }
    }
	
    ele_sub_filler.style.display = "none";
    //let hideshow ;

	if (list_elemSub_display[numEle]) {
		list_elemSub[numEle].style.display = "none";
		list_elemSub_display[numEle] = false;
	} else {
		list_elemSub[numEle].style.display = "block";
		list_elemSub_display[numEle] = true;
	}
	
} // end of onclick_display_subtitle


//--------------------------------------------------------

function onclick_playOrNot_to_sync2(this1, swPlay) {	
	
	fun_pause_sync_check();	
	
} // end of onclick_playOrNot_to_sync2()  

//------------------------------------------------------------------------------

function onclick_showall_subtitles() {
	document.getElementById("id_sub_back1").style.display = "block";		
	document.getElementById("id_sub_back2").style.display = "block";		
	
	document.getElementById('id_subtitle_container').scrollIntoView();
	
}

//--------------------------------------------

function onclick_back_from_sub() {
	document.getElementById("id_sub_back1").style.display = "none";		
	document.getElementById("id_sub_back2").style.display = "none";	
}

//----------------------------------

function onclickOnOff( id1, display1) {
	console.log("onclickOnOff(id=" + id1 + " " + display1); 
	var ele1 = document.getElementById( id1 ); 
	if (ele1.style.display == "none") {
		ele1.style.display = display1;  
	} else {
		ele1.style.display = "none"; 
	}
} // end of onclickOnOff
//--------------
//--------------------------------------------------

function onclick_show_color() {
		 let divcolor = document.getElementById("id_div_color"); 
		 
		 if (divcolor.style.display == "none") {
			divcolor.style.display = "block";
			
			fun_checkConstrast(true);			
			
			//document.getElementById("id_td_color").style.backgroundColor = "lightgrey";
		 } else {
			divcolor.style.display = "none";
			//document.getElementById("id_td_color").style.backgroundColor = null;
		 }
 } // end of  onclick_show_color()

//--------------------------------------------------

function onclick_show_statist() {
		 let divstati = document.getElementById("id_statist"); 
		 
		 if (divstati.style.display == "none") {
			divstati.style.display = "block";		
			//document.getElementById("id_td_statist").style.backgroundColor = "lightgrey";
		 } else {
			divstati.style.display = "none";
			//document.getElementById("id_td_statist").style.backgroundColor = null;
		 }
 } // end of  onclick_show_statist()
//------------------------------------------

function onclick_reset_initial_colors() {
	 hex_defaultColorBG = INITIAL_hex_BG_color; 
	 hex_defaultColorTx = INITIAL_hex_FG_color; 
	 document.getElementById("id_colorBG" ).value = hex_defaultColorBG ;
	 document.getElementById("id_colorTx").value  = hex_defaultColorTx;
	 onclick_change_color( hex_defaultColorBG, "BG"   , false); 
	 onclick_change_color( hex_defaultColorTx, "FG"   , true);  	
}	 
//---------------------------------------------------------

function onclick_search_the_best_contrast_textColor(id_output, percToTest, numMillSecs,numColorsPerInterval) {
	// id_output = id of destination html element
	// percNum  = percentage of  total number of colors  to test ( eg. 10 ==> 16 million colors (total number of colors) * 10% = 1,600,000 colors to test  
					
    // step1  = max number of colors (256 x 256 x 256) / step = number of colors to test 
	// numMillSecs = 3   ; // milliseconds of wait in one interval setting ==> eg. setInterval(mioRate, 3)    
	// numColorsPerInterval = 20000 ; // number of co,lors tested in one interval 
	
	let step1 = Math.round( 100 / percToTest); 
	
	
    

    let rgbColor_to_compare = fun_hexToRgb(hex_current_ColorBG);
    let lumToComp = getLuminosity(rgbColor_to_compare);

  
    let ncolor = 0;
    let ratio;
   
   

    //let numTotColors = 256 * 256 * 256;  // near 16 million  = 16777217 
  

	let progressDiv = document.getElementById("searchProgress");
    let elemBar = document.getElementById("myBar");
	
	
	progressDiv.style.display = "block"; 
	document.getElementById("id_isValidRatio_Searching").style.display = "block";
	document.getElementById("id_isValidRatio_Passed").style.display = "none";
	document.getElementById("id_isValidRatio_Failed").style.display = "none";

    let width = 10;

   

    //-----------------
    let max_ratio = 0;
    let max_rgb_color = "rgb(0,0,0)";
    let max_lumin = 0;
	

    //---------------------------------------------------------------		


    let maxn = 256 * 256 * 256; // <===  MAX NUM 
    let i1 = 0,
        i2 = 0,
        i3 = 0;
    let mx = 256;
 

    let perc00 = 100 / maxn;
    let perc = 0;
    let pperc = 0;


    let z1 = 0;

    let s_i1, s_i2, s_i3;
	let nn=0;
    //------------------------------------------
    function fun_check_one_color(s_i1, s_i2, s_i3) {

        let rgbMioColor = "rgb(" + s_i1 + "," + s_i2 + "," + s_i3 + ")";
		
        let lumin = getLuminosity(rgbMioColor);

        if (lumin > lumToComp) {
            ratio = fun_computeContrast(lumin, lumToComp);
        } else {
            ratio = fun_computeContrast(lumToComp, lumin);
        }
        if (ratio > max_ratio) {
            max_ratio = ratio;
            max_rgb_color = rgbMioColor;
            max_lumin = lumin;
        }
        
        ncolor++;
		
    } // end of check_one_color
	
    //--------------------------------------
	
    function fun_intervalRoutine() {
		for(let ciclo=0; ciclo < numColorsPerInterval; ciclo++) {  
			z1 += 1;
			if (z1 > maxn) {
				clearInterval(myInterval);
				nn+=1; 
				fun_contr_search_final();
				return;
			} else {
				s_i1 = i1;
				s_i2 = i2;
				s_i3 = i3;
				

				i3 += 1;
				if (i3 >= mx) {
					i3 = 0;
					i2 += 1;
				}
				if (i2 >= mx) {
					i2 = 0;
					i1 += 1;
				}
				
				if ((z1 % step1) == 0) {
					fun_check_one_color(s_i1, s_i2, s_i3);					
				}			
			}
		}
		perc = Math.round(z1 * perc00);
				if (perc > pperc) {
					pperc = perc;
					width = perc;
					elemBar.style.width = width + "%";
					//elemBar.innerHTML = width + "%";
				}
    } // end mio_rate; 
    //-----------------------------------------------------------


    const myInterval = setInterval(fun_intervalRoutine, numMillSecs);




    //--------------------------------
	function fun_contr_search_final() {
	
		
	

		let out_rgb_color = max_rgb_color;
	
		
		let out_hex_color = fun_rgbToHex(out_rgb_color);

		

		

		document.getElementById(id_output).value = out_hex_color; // assign chosen color
		
		onclick_change_color(     document.getElementById(id_output).value, "FG"          , true);  		
		
		//changeTxt_color(document.getElementById(id_output).value,'id_list_id_fg', true); // assign chosen color	to text color 
		progressDiv.style.display = "none" ;
		
	} // end of fun_contr_search_final(); 

} // end of  cercaContrasti_colori_x_per_rgb()

 
//-------------------------------------------------

function fun_N_secs_to_hhmmssmmm(from1) {
	// surely a film lasts less than 10 hour
	
	if (  (isNaN( from1 )) || (from1 == 0) )  {
		return "00:00:00.000";
	}	
	let secs = 3600*10 + 1*from1;
		
    let hhmmss2 = new Date(secs * 1000).toISOString().substr(11, 12);
    let hhmmss = "0" + hhmmss2.substring(1);
    
   return hhmmss;
}

//------------------------------

function fun_set_replayVa_toTime_secs_and_hhmmss(  secs ) {
        
        ele_replay_to_secs_innerHTML = secs;    
        
        let hhmmss = fun_N_secs_to_hhmmssmmm( secs );  
        
        ele_replayVa_to_hhmmss_value = hhmmss; 
        
} // end of fun_set_replayVa_toTime_secs_and_hhmmss()

//------------------

function fun_adjust_replay2_to_row() {
	let time1 = ele_replay_to_secs_innerHTML; 
	let ix = ele_replay2_to_row_innerHTML; 
			
	if (  Math.abs( line_list_o_from1[ ix ] - time1 ) < TO_TIME_TOLERANCE	) {
			if (ix > 1) { 
				ele_replayVa_to_row_value      = ix-1;  
				ele_replay2_to_row_innerHTML = ix-1;  
			}		
	}
} // end of fun_adjust_replay2_to_row() 
						
//=============================================    	

//----------------
function fun_update_ctr_stat() { 	
	
	let now_milliseconds = Date.now();
	let diff_elapsed = now_milliseconds - start_milliseconds- LS_CTR_7logon_elapsed; 
	let videoRunTime = (PLAYCLIP_TO_TIME  - PLAYCLIP_FROM_TIME) * 1000 ;  
	LS_CTR_4run_elapsed        += diff_elapsed; 
	LS_CTR_7logon_elapsed      += diff_elapsed; 
	LS_CTR_5run_videoRunTime   += videoRunTime; 
	LS_CTR_8logon_videoRunTime += videoRunTime; 
	LS_CTR_3run_num_play       += 1; 
	LS_CTR_6logon_num_play     += 1; 
	
	let numOfLines = PLAYCLIP_TO_LINE - PLAYCLIP_FROM_LINE + 1; 
	let numWords = 0;
	let txt1="", txt0; 
	for( let t = PLAYCLIP_FROM_LINE; t <= PLAYCLIP_TO_LINE; t++) {   
		txt0 = line_list_orig_text[t];  
		txt1 += txt0;
		try { 
			if (txt0.length > 0) {
				if ((txt0 != "...") && (txt0.indexOf( sayNODIALOG) < 0)){
					numWords += txt0.replaceAll("'s"," ").replaceAll("'t"," ").match(/(\w+)/g).length;  // count words (spaces or punctuation marks as separation; 
						 // take care also of English genitive (eg.Bob's) and negative (eg. doesn't) eg. Bob's  => 1 word, Bob'a => 2 words,  Bob'someone ==> 2 words
				}	
			}
		} catch(e1) { 
			return; 
			//console.log("error in ..playfromto.js update_ctr_stat  text0=" + txt0 + "<==   error=" + e1); 
			//alert("error in ..playfromto.js update_ctr_stat  text0=" + txt0 + "<==   error=" + e1); 
		} 	
	}	
	//c_onsole.log("UPDATE CTR STAT time: from=" + PLAYCLIP_FROM_TIME + " to=" +  PLAYCLIP_TO_TIME + " line: from="+PLAYCLIP_FROM_LINE + " to=" + PLAYCLIP_TO_LINE + 
	//		" txt=" + txt1 + " \n\t" + " videoRuntime="+ videoRunTime + " numlines=" + numOfLines + " n words=" + numWords); 

	LS_CTR_10run_num_lines   += numOfLines;
	LS_CTR_11run_num_words   += numWords;
	LS_CTR_12logon_num_lines += numOfLines;
	LS_CTR_13logon_num_words += numWords;

	fun_set_localStorage_ctrvar_item_from_vars();
	
} // end of  fun_update_ctr_stat() 		

//---------------------------------------------------------------------

function fun_playNextmsg() {
	
    let msgnext = "";
	
    msgnext += parseFloat(PLAYCLIP_TO_TIME - PLAYCLIP_FROM_TIME).toFixed(1) + " " + document.getElementById("mb84").innerHTML; // n. seconds 
	
	
	//c_onsole.log("anto1 fun_playNextmsg() PLAYCLIP_TO_TIME=" + PLAYCLIP_TO_TIME + " PLAYCLIP_FROM_TIME=" + PLAYCLIP_FROM_TIME + " =>" + parseFloat(PLAYCLIP_TO_TIME - PLAYCLIP_FROM_TIME)  ); 
	//c_onsole.log("anto1_1 msgnext = " + msgnext)
    if ((PLAYCLIP_TO_LINE > 0) && (PLAYCLIP_FROM_LINE > 0)) {
        msgnext += "<br>" + parseInt(PLAYCLIP_TO_LINE - PLAYCLIP_FROM_LINE + 1) + " " + document.getElementById("mb91")
            .innerHTML + "";
    }
}

//-------------------------------------

function fun_set_local_storage_playnext() {
    //------------------------------------------------------
    // save values in localStorage ( for next sessions)
    //------------------------------------------------------       
    if (typeof(Storage) == "undefined") {
        return;
    }
	
    //c_onsole.log(" fun_set_local_storage_playnext() playnext_replay=" +playnext_replay); 

  

} // end of fun_set_local_storage_playnext()


//---------------------
//  end former file player_3_e_playfromto.js   										
//=============================================    	

//=============================================    								
// 10 beg. former file player_3_f_video_and_subtitles.js  	  
								
//-----------------------------
var currScript = document.currentScript.src;
var bar1 = currScript.lastIndexOf("\\");
var bar2 = currScript.lastIndexOf("/");

console.log("LOADED file SCRIPT " + currScript.substring(1 + Math.max(bar1, bar2)));

//----------------------------------------------------------------------------
function fun_updateVideoTime() {
    /**
    console.log("\nupdateVideoTime 0 vid.currentTime=" + vid.currentTime + "   sw_CLIP_play=" + sw_CLIP_play + " sw_CLIP_row_play=" + sw_CLIP_row_play + 
    				" CLIP_Row_StartTime=" + CLIP_Row_StartTime + "  CLIP_Row_StopTime=" + CLIP_Row_StopTime   );	
	
	console.log("\tfun_updateVideoTime() lastPlayTrigger=" + lastPlayTrigger );
	**/	

	set_ctl_value( vid.currentTime );
	
	if (lastPlayTrigger == playTRIGGER_emul) {
		fun_running_video_emul(vid.currentTime);
		return; 
	}	
	
	if (lastPlayTrigger == playTRIGGER_clip) {
		fun_running_video_clip();
		return; 
	}	
	fun_running_video_clip();	 
	
} // end of fun_updateVideoTime() 

//----------------------------------------

function fun_running_video_clip() {	

	var time_secs = vid.currentTime;
	
	if (time_secs < lastPlayRowFromTime) { return; } 
	if (time_secs >= lastPlayRowToTime) { 
		if (lastPlayRowLoop) {
			fun_updateVideo_CheckStop( lastPlayRowFromTime, lastPlayRowToTime);
		} else {
			fun_pauseVid();
			return; 
		}
	}	
	
	var ix1 = 0; 
	if (lastPlayRowToIx < lastPlayRowFromIx)  {  
		fun_pauseVid();
		return; 
	}
	for(var v=lastPlayRowFromIx; v <= lastPlayRowToIx+1; v++) {
		if (time_secs < lastPlayListFrom[  v - lastPlayRowFromIx ] )  { break; } 
		ix1 = v;
	}

	
	if (ix1 != lastPlayListIx) {
		lastPlayListIx = ix1; 		
		show_hideORIG(ix1); 
		show_hideTRAN(ix1); 
	}
	
	ele_time_video.innerHTML = lineTime(time_secs, ix1);  
	
	fun_playVideo(); 
	
} // end of fun_running_video_clip()

//--------------------------

function fun_updateVideo_CheckStop(timeFrom, timeTo) {
	
    if (vid.currentTime < timeTo) {
        return;
    }
    // when at end pause 2 seconds and then begin again 
    vid.pause();
    vid.currentTime = timeFrom;

    setTimeout(function() {
        vid.play();
    }, 1000);

} // end of fun_updateVideo_CheckStop()

//-------------------------------------------------------
function lineTime( time_secs, ixClip) {
	let hhmmss = fun_N_secs_to_hhmmssmmm(time_secs);
	let msg = "";
    msg += hhmmss.substr(0, 8) + " = " + time_secs.toFixed(3) + " ";
    msg += document.getElementById("mb84").innerHTML; // "884 secondi"; 	 
	if ((sw_sub_onfile == false) || (numOrig < 2)) { // there is no subtitile file 	
		return msg;
	}
	
    msg += "    ";
    msg += " " + document.getElementById("mc85").innerHTML + " " + ixClip;	
	try{ 
		msg += " (" + line_list_o_from1[ixClip].toFixed(3);
		msg += "  :  " + line_list_o_to1[ixClip].toFixed(3);
	} catch(e1) {
		return msg; 
	}	
	/**	
    if (subtitles_beg_delta_time != 0) { // adjustment of sync. error
        msg += " ";
        if (subtitles_beg_delta_time > 0) {
            msg += " " + document.getElementById("mc86").innerHTML +
                " " + subtitles_beg_delta_time.toFixed(3);
        } else {
            msg += " " + document.getElementById("mc87").innerHTML +
                " " + (0 - subtitles_beg_delta_time.toFixed(3));
        }
        msg += " " + document.getElementById("mb84").innerHTML; // "884 secondi";     
    }
	**/
    msg += ")";
	
	msg += ")";
    return msg;
}
//---------------------------
function fun_running_video_emul(time_secs) {
	
	/*
    this function as all the others is not called in continuous time, but in discrete time, 
    	so seldom the end time of the clip is exactily matched with time_secs in the argument, 
    	to try to solve this problem 
    	the time in the argument (time_secs) clip is checked if it stays nearby after the end time of the clip    
    */
	
	let hhmmss = fun_N_secs_to_hhmmssmmm(time_secs);
   
    //--------------------------
    let timeNext = time_secs;
    let msg = "";
    msg += hhmmss.substr(0, 8) + " = " + timeNext.toFixed(3) + " ";
    msg += document.getElementById("mb84").innerHTML; // "884 secondi"; 	 

    ele_time_video.innerHTML = msg; // time line bEwlow the video 


    //---------------------   

    let ixfrom_o = -1;
    let ixto_o = -1;
    let ixfrom_t = -1;
    let ixto_t = -1;

    if ((sw_sub_onfile == false) || (numOrig < 2)) { // there is no subtitile file 	
		console.log("1  fun_running_video_emul(time_secs=" + time_secs );  
        return;
    }
	
	//console.log("2  fun_running_video_emul(time_secs=" + time_secs ); 
	
    let time_ix = time_secs;

    // if time is very near the end of the clip, show the last subtitle line 
	//					(this is to avoid to show the next line the start time of which is the same of the end of the current line)   

    let orig_ixfromto = get_ixClip_orig_fromTime(time_ix); //////////////////////////////////////  
    let tran_ixfromto = get_ixClip_tran_fromTime(time_ix); //////////////////////////////////////  
	
    ixfrom_o = orig_ixfromto[0];
    ixto_o = orig_ixfromto[1];
    ixfrom_t = tran_ixfromto[0];
    ixto_t = tran_ixfromto[1];

    let ixClip = ixfrom_o;
	if (ixClip != last_ixClip) {
		last_ixClip = ixClip; 
		var elix = document.getElementById( "idtr_" + ixClip ) ;
		//console.log("elix last_ixClip=" + last_ixClip + " " + elix.outerHTML.substring(0,60) );  
		fun_scroll_tr_toTop(elix, false); 
	}
	

    msg += "    ";
    msg += " " + document.getElementById("mc85").innerHTML + " " + ixClip;	
	try{ 
		msg += " (" + line_list_o_from1[ixClip].toFixed(3);
		msg += "  :  " + line_list_o_to1[ixClip].toFixed(3);
	} catch(e1) {
		return; 
	}

    msg += ")";
    ele_time_video.innerHTML = msg;

	//console.log("\t4  _display_subtitles_lineclip_o_t(" + time_secs + ", " + ixfrom_o + ", " + ixto_o );  
			
    fun_display_subtitles_lineclip_o_t(time_secs, ixfrom_o, ixto_o, ixfrom_t, ixto_t); // subtitle texts ( more lines can be active on the same moment 

} // end of fun_running_video_emul()

//----------------------------------------------
function fun_display_subtitles_lineclip_ORIG_2( time_secs, fromIxZero_o, toIxZero_o) { 
		let origTextX = "";
		let z2, txt1;
		

		let t_IGNORE = 0.001; // ignore the line if its beginning time is too near the time instant of playing 
							  // ( may be this time is the end-time of the clip   )   
		let endTime = 0;	
		let idc11 = "";
		
		//---------------
		for (z2 = fromIxZero_o; z2 <= toIxZero_o; z2++) {
            if (z2 < 1) {
                continue;
            }
            if ((time_secs - line_list_o_from1[z2]) < t_IGNORE) {
                continue;
            } // if the time is very near to the beginning the line is not displayed		 	 

            txt1 = line_list_orig_text[z2].replace("\n", " ");
            if (toIxZero_o > fromIxZero_o) {
                if (txt1.indexOf(sayNODIALOG) >= 0) {
                    // ignore this line if it's a no_dialog and there is some other subtitle  
                    continue;
                }
            }
            origTextX += txt1 + "<br>";
			
			show_hideORIG(z2);
        }
		
        origTextX = origTextX.trim();
        document.getElementById("subOrigEndTime2").innerHTML = endTime;
        fun_setOrigText(origTextX);
		
		return [ idc11, origTextX ]; 
			
} // end of fun_display_subtitles_lineclip_ORIG_2

//-----------------------------------------------------------------

function fun_display_subtitles_lineclip_TRAN_2( time_secs, fromIxZero_o, toIxZero_o, fromIxZero_t, toIxZero_t) { 
		
		let tranTextX = "";
		let z2, txt1;

		let t_IGNORE = 0.001; // ignore the line if its beginning time is too near the time instant of playing ( may be this time is the end-time of the clip   ) 
  	
		//--------------------	
		for (z2 = fromIxZero_t; z2 <= toIxZero_t; z2++) {
            if (z2 < 1) {
                continue;
            }
            if ((time_secs - line_list_t_from1[z2]) < t_IGNORE) {
                continue;
            } // if the time is very near to the beginning the line is not displayed		 
            //if ( (line_list_t_to1[z2] - time_secs   ) < t_IGNORE)  { continue; } 	

            
            txt1 = line_list_tran_text[z2];
            if (toIxZero_t > fromIxZero_t) {
                if (txt1.indexOf(sayNODIALOG) >= 0) {
                    // ignore this line if it's a no_dialog and there is some other subtitle  
                    continue;
                }
            }
            tranTextX += txt1 + "<br>";
		
			show_hideTRAN(z2); 
           
        }
        
		fun_setTranText(tranTextX);
		
		return tranTextX;
		
} // end of fun_display_subtitles_lineclip_TRAN_2

//---------------------------------------------------------

function fun_display_subtitles_lineclip_NO_DIALOG(time_secs, origTextX_diag, tranTextX_diag, idc11_diag)  {
	

    origTextX_diag = origTextX_diag.replace(sayNODIALOG, " ");
    fun_setOrigText(origTextX_diag);

    tranTextX_diag = tranTextX_diag.replace(sayNODIALOG, " ");
    fun_setTranText(tranTextX_diag);
    if (origTextX_diag != "") {
        ele_subOrigSilent.innerHTML = origTextX_diag;
    } else {
        if (tranTextX_diag != "") {
            ele_subOrigSilent.innerHTML = tranTextX_diag;
        } else {
            ele_subOrigSilent.innerHTML = "";
            silentH_none();
        }
    }
    if (document.getElementById(idc11_diag)) {		
		document.getElementById(idc11_diag).innerHTML = origTextX_diag;
	}

    silentH_block(); 
	
    ele_subOrigText2.style.visibility = "hidden"; 
    ele_subTranText2.style.visibility = "hidden"; 
    ele_sub_filler.style.visibility = "hidden"; 
    ele_subOrigText2.innerHTML = "";
    ele_subTranText2.innerHTML = "";

    if (time_secs >= PLAYCLIP_TO_TIME) {
        silentH_none();
    }

} // end of fun_display_subtitles_lineclip_NO_DIALOG() 


//-------------------------------------------------------

function fun_display_subtitles_lineclip_o_t(time_secs, fromIxZero_o, toIxZero_o, fromIxZero_t, toIxZero_t) {
	
    if (list_elemSub_display[0]) {
        list_elemSub[0].style.display = "block";
    }
    if (list_elemSub_display[1]) {
        list_elemSub[1].style.display = "block";
    }
	//-------------------------------
	var origTextX_ret = ""; 
	var tranTextX_ret = ""; 
	var idc11_ret = ""; 
	
    if (sw_sub_orig) {
		[idc11_ret, origTextX_ret] = fun_display_subtitles_lineclip_ORIG_2( time_secs, fromIxZero_o, toIxZero_o, fromIxZero_t, toIxZero_t);        
    }
    if (sw_sub_tran) {
       tranTextX_ret = fun_display_subtitles_lineclip_TRAN_2( time_secs, fromIxZero_o, toIxZero_o, fromIxZero_t, toIxZero_t);
    }
	
    //------------------------------
    if (origTextX_ret.indexOf(sayNODIALOG) < 0) {
        silentH_none();		
        return;
    }	
    //-----------------------------------------------
    // there is a warning o no dialog gap
	
	fun_display_subtitles_lineclip_NO_DIALOG(time_secs, origTextX_ret, tranTextX_ret, idc11_ret); 

} // end of fun_display_subtitles_lineclip_o_t

//------------------------------------------------

function get_ixClip_orig_fromTime(timeInSeconds) {

    if (isNaN(timeInSeconds)) {
        return [-1, -1];
    }

    if (timeInSeconds == LAST_time_change_secs) {
        if (fun_compatible_ix_and_time(LAST_time_change_ix, LAST_time_change_secs)) {
            // LAST_time_change_ix seems good   
            let to1 = -1;
            for (let t1 = LAST_time_change_ix; t1 < line_list_o_number_of_elements; t1++) {
                if (timeInSeconds < line_list_o_from1[t1]) {
                    break;
                }
                if ((timeInSeconds >= line_list_o_from1[t1]) && (timeInSeconds <= line_list_o_maxto1[t1])) {
                    //if (from1 <0) { from1 = t1; }
                    to1 = t1;
                }
            }
            return [LAST_time_change_ix, to1];
        }
    }

    let ret1 = get_ix_orig_fromTo(timeInSeconds, 8);
    return ret1;

} // end of get_ixClip_orig_fromTime
//----------------------------------------

function get_ixClip_tran_fromTime(timeInSeconds) {

    if (timeInSeconds == LAST_time_change_secs) {
        if (fun_compatible_ix_and_time(LAST_time_change_ix, LAST_time_change_secs)) {
            // LAST_time_change_ix seems good   
            let to1 = -1;
            for (let t1 = LAST_time_change_ix; t1 < line_list_o_number_of_elements; t1++) {
                if (timeInSeconds < line_list_o_from1[t1]) {
                    break;
                }
                if ((timeInSeconds >= line_list_o_from1[t1]) && (timeInSeconds <= line_list_o_maxto1[t1])) {
                    //if (from1 <0) { from1 = t1; }
                    to1 = t1;
                }
            }
            return [LAST_time_change_ix, to1];
        }
    }

    return get_ix_tran_fromTo(timeInSeconds);

} // end of get_ixClip_tran_fromTime
//------------------------------
function get_ix_orig_fromTo(time1, wh) {
    /*
            search list to find the lines that contain the time1 
            
            since there can be several lines for the same time: 
                    the index (found or not) is not used 
                    the last limits ( start/end ) are used to 
                            search backward from start 
                            search forward from end 
    */
    let ix123;
    if (time1 == LAST_SEARCH_o_time) {
        ix123 = LAST_SEARCH_o_ix;
        return LAST_SEARCH_o_fromto;
    } else {
        ix123 = fun_binarySearch_insertionPoint(line_list_o_from1, time1); // look for  original language subtitle index

        LAST_SEARCH_o_time = time1;
        LAST_SEARCH_o_ix = ix123;
        LAST_SEARCH_o_fromto = null;
    }
	
    let ix1 = ix123[0]; // ix1 = -1 if not found       
    let from1 = ix123[1];
    let to1 = ix123[2];
    if (ix1 < 0) {
        ix1 = from1;
    }

    let t1;

    // go backward,  exclude zero index (this entry is empty)
    from1 = ix1;
    for (t1 = ix1; t1 > 0; t1--) {

        if (time1 >= line_list_o_to1[t1]) {
            break;
        }
        from1 = t1;
    }
    // accept only  index with toTime > time1 

    // go forward
    to1 = ix1 - 1;
    for (t1 = ix1; t1 < line_list_o_number_of_elements; t1++) {

        if (time1 < line_list_o_from1[t1]) {
            break;
        }
        to1 = t1;
    }
    // accept only  index with fromTime <= time1
    // now we have fromTime(ixfrom) >= time1 < toTime[ixto]


    if (from1 < 1) {
        from1 = 1;
    } // zero index entry is empty
	
	//-------------
	if (from1 > to1) {
		var newFrom1=-1; var newTo1 = -1; 
		for (t1 = to1; t1 <= from1; t1++) {
			if (time1 > line_list_o_from1[t1]) { continue; }
			if (newFrom1 < 0) { newFrom1 = t1;}
			newTo1 = t1;
			if (time1 >= line_list_o_to1[t1]) { break; }
		}	
		if (newFrom1 > 0) {
			from1 = newFrom1; to1 = newTo1;  
		}
	}
	//--------------
	/**
	if (time1 < (line_list_o_from1[from1] + 0.5) ) {
		//console.log("get_ix_orig_FromTo() time1=" + time1 + "  line_list_o_from1[from1] =" + line_list_o_from1[from1] ); 
		return [-1,-1]; 
	}
	**/

	if (swdebug) {
		console.log("get_ix_orig_fromTo(time1=" + time1 + " wh=" + wh + "  ix123=" + ix123 + "   from1="+ from1 + "  to1=" + to1 + 
		"\n\t from1=" + from1  + " " + line_list_o_from1[from1] + " _ " +  line_list_o_to1[from1] +
		"\n\t to1  =" + to1    + " " +  line_list_o_from1[to1]  + " - " + line_list_o_to1[to1] ); 
	}
	
    LAST_SEARCH_o_fromto = [from1, to1];

    return LAST_SEARCH_o_fromto;

} // end of get_ix_orig_FromTo()

//---------------------------------------

function get_ix_tran_fromTo(time1) {
    /*
            search list to find the lines that contain the time1 
            
            since there can be several lines for the same time: 
                    the index (found or not) is not used 
                    the last limits ( start/end ) are used to 
                            search backward from start 
                            search forward from end 
    */
    let ix123;
    if (time1 == LAST_SEARCH_t_time) {
        ix123 = LAST_SEARCH_t_ix;
        return LAST_SEARCH_t_fromto;
    } else {
        ix123 = fun_binarySearch_insertionPoint(line_list_t_from1, time1); // look for TRANSLATED language subtitle index

        LAST_SEARCH_t_time = time1;
        LAST_SEARCH_t_ix = ix123;
        LAST_SEARCH_t_fromto = null;
    }

    let ix1 = ix123[0]; // ix1 = -1 if not found       
    let from1 = ix123[1];
    let to1 = ix123[2];

    if (ix1 < 0) {
        ix1 = from1;
    }

    let t1;

    // go backward,  exclude zero index (this entry is empty)
    from1 = ix1;
    for (t1 = ix1; t1 > 0; t1--) {

        if (time1 >= line_list_t_to1[t1]) {
            break;
        }
        from1 = t1;
    }
    // accept only  index with toTime > time1 

    // go forward
    to1 = ix1 - 1;
    for (t1 = ix1; t1 < line_list_t_number_of_elements; t1++) {
        if (time1 < line_list_t_from1[t1]) {
            break;
        }
        to1 = t1;
    }
    // accept only  index with fromTime <= time1
    // now we have fromTime(ixfrom) >= time1 < toTime[ixto]


    if (from1 < 1) {
        from1 = 1;
    } // zero index entry is empty


    LAST_SEARCH_t_fromto = [from1, to1];

    return LAST_SEARCH_t_fromto;

} // end of get_ix_tran_FromTo()

//--------------------------------------------------

function fun_set_timeline_type123_SECONDS_to_test_end(time_secs, ixfrom, ixto) {

    if (time_secs < PLAYCLIP_FROM_TIME) {
        return -1;
    }
    if (time_secs > PLAYCLIP_TO_TIME) {
        LAST_time_change_ix = ixto;
        LAST_time_change_secs = PLAYCLIP_TO_TIME;


        fun_set_next_Input_from_secs_and_hhmmss(PLAYCLIP_TO_TIME); // ready for next clip   

        
        vid.pause();
        return -1;
    }
    return 0;

} // end of set_timeline_type123_secs()

//----------------------------------------------------------------------

function fun_set_timeline_type4_LINES(time_secs, ixfrom, ixto) {
	
    if (ixfrom < PLAYCLIP_FROM_LINE) {
        return -1;
    }
    if (ixto > PLAYCLIP_TO_LINE) {
        LAST_time_change_ix = ixto;
        LAST_time_change_secs = time_secs;
        LAST_time_change_secs = PLAYCLIP_TO_TIME;

       

        fun_set_next_Input_from_secs_and_hhmmss(PLAYCLIP_TO_TIME); // ready for next clip 

        ele_replayVa_to_row_value = LAST_time_change_ix; // to   clip 
        ele_replay2_to_row_innerHTML = LAST_time_change_ix; // to   clip 
       
        fun_set_replayVa_toTime_secs_and_hhmmss(PLAYCLIP_TO_TIME);

        fun_adjust_replay2_to_row();

        vid.pause();
        return -1;
    }
    return 0;

} // end of set_timeline_type4_lines

//----------------------------------------------------------------------------

function fun_compatible_ix_and_time(ix1, time1) {
    if (ix1 < 0) {
        return false;
    }
    if (ix1 >= line_list_o_number_of_elements) {
        return false;
    }

    if ((time1 < line_list_o_from1[ix1]) || (time1 > line_list_o_to1[ix1])) {
        return false;
    }
    return true;
}

//-------------------------------------------------
// Find the index of a value in a sorted array or return the index where it should be placed.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// original found in  https://gist.github.com/primaryobjects/117017f85769124c28c858f8735f27d8

//-------------------------------------------------------------------------------
function fun_binarySearch_insertionPoint(nums, target) {



    let start = 0;
    let end = nums.length - 1;

    let index = Math.floor((end - start) / 2) + start;

    let start2 = start;
    let end2 = end;

    if (target >= nums[end]) {
        // The target is beyond the end of this array.
        return [end, end2, end2];
    }

    // Start in middle, divide and conquer.
    while (start < end) {
        start2 = start;
        end2 = end;

        // Get value at current index.
        let value = nums[index];

        if (value === target) {
            // Found our target.
            //result = index;  // found
            break;
        } else if (target < value) {
            // Target is lower in array, move the index halfway down.
            end = index;
        } else {
            // Target is higher in array, move the index halfway up.
            start = index + 1;
        }
        // Get next mid-point.
        index = Math.floor((end - start) / 2) + start;
    }

    return [index, start2, end2];

} // end of fun_binarySearch_insertionPoint()


//---------------------------------------------------
function get_end_of_dialog(ixto) {
	
	/*
		it is assumed that a new line belong to a new dialog ... 
			1) when the start time of a the line is greater (or equal) thant the end times of all previous lines
            2) when the previous line ends with an ending of sentence character  ( . ? ! )			
	*/
    // find the row with end time <= next row start time
    /*
    1  10-----20
    2     15---------25
    3       17--23
    4                  24---27    this is the line ending the dialog 
    5                                 28--30
    */
	
		
	//-----------------
	let z;
	for (z = ixto; z < line_list_o_number_of_elements - 1; z++) {	
		if (sw_end_dialog_overlap) {
			if (line_list_o_maxto1[z] <= line_list_o_from1[z + 1]) {
				return [z, line_list_o_maxto1[z]];
			}	
		}		
		let linez    = line_list_orig_text[z].trim();
		let lastchar = linez.substring( linez.length-1) ; 	
		if (sw_end_dialog_sentence) {
			if ( (".?!").indexOf( lastchar ) >= 0) {			
				//	line_list_orig_text[z] = linez + " (end of dialog z=" + z;
				return [z, line_list_o_maxto1[z]];
			} 
		}
    }
    z = line_list_o_number_of_elements - 1;

    return [z, line_list_o_maxto1[z]];

} // end of get_end_of_dialog()

//----------------------------------------------
function fun_hideDisplay3() {
    /*
    the hardcoded subtitles are hided by a  mask 
    in order to show them the mask become invisible ( display=none)
    to hide them the mask become visible ( display = block ) 
    this process is driven by the button "subtitles" 
    */
	
	ele_mask_dragsub.innerHTML = "<br> <br> <br> <br> "; 
	ele_mask_dragsub.style.backgroundColor = document.getElementById("id_body").style.backgroundColor; 	
	
	if (ele_mask_dragsub.style.opacity !== undefined) {
		if ( ele_mask_dragsub.style.opacity == "0") {
			ele_mask_dragsub.style.opacity = "1";		
		} else {
			document.getElementById("id_tabSub"    ).style.backgroundColor = null;		
			ele_mask_dragsub.style.opacity = "0";
				
			//document.getElementById("id_tabSub"    ).style.border = null;		
		}    
	} else {
	}
}

//========================================

function fun_pause_sync_check() {
    /*
                            if (document.getElementById("id_diff_time").style.display == "block") {
                                            document.getElementById("id_diff_time").style.display = "none";
                                            return;
                            }
        */

    runningButton = false;

    //fun_pauseVid();

    fun_set_time_to_show(vid.currentTime, 1); // 2021.08.23 
    fun_pauseVid();
}


//-------------------------------------------------------

function onclick_show_syncstaff(this1) {
	
	console.log("onclick_show_syncstaff()"); 
	ele_sub_filler.style.border = null; 
	ele_sub_filler.innerHTML = "";
   
	document.getElementById("id_NO_clip00").style.display = "block";  
    let this2 = document.getElementById("id_td_sync1");
	console.log("this2.id=" + this2.id); 
    if (this2.style.display == "none") {
		console.log("this2  none"); 
        document.getElementById("id_td_sync1").style.display = "block";
		
        
        document.getElementById("id_diff_sync").value = subtitles_beg_delta_time.toFixed(3);

        document.getElementById("id_td_subtra2").style.display = "none";
        document.getElementById("id_td_suborig2").style.display = "none";
		ele_sub_filler.innerHTML = '';
        /**
		//ele_sub_filler.innerHTML = '<span style="font-size:0.8em;">' + msg244 + "<br>" + msg245 + '</span>';
		var nowStart =  document.getElementById("id_start_sync").value ;
		console.log("id_start_sync.value=>" + nowStart + "<=="); 
		//if (nowStart.replace(",",".") == "00:00:00.000") {
					 document.getElementById("id_start_sync").value = fun_N_secs_to_hhmmssmmm( vid.currentTime );
		//}
		**/
    } else {
		console.log("this2  not none"); 
        document.getElementById("id_td_sync1").style.display = "none";
        
        document.getElementById("id_diff_time").style.display = "none";
        if (sw_sub_tran) {
            document.getElementById("id_td_subtra2").style.display = "block";
        }
        if (sw_sub_orig) {
            document.getElementById("id_td_suborig2").style.display = "block";
        }
        ele_sub_filler.innerHTML = '';
    }
	
	window.scrollTo(0, this1.offsetTop);
	
} // end of onclick_show_syncstaff

//-----------------------------------------

function onclick_show_syncstaff_help(this1) {
	let msg244 = document.getElementById("m244").innerHTML;//To synchronize the subtitles to speech enter the sync value in <b>Diff.Sync</b>field or           
    let msg245 = document.getElementById("m245").innerHTML; // Press the <b>Play/Stop</b> button and <br>press it as soon as a subtitle has been fully spoken
	
	if (this1.checked) {
		console.log("show help");
		ele_sub_filler.style.display= "block"; 
		ele_sub_filler.style.border = "1px solid red"; 
		ele_sub_filler.innerHTML = '<span style="font-size:0.8em;">' + msg244 + "<br>" + msg245 + '</span>';
	}
	else {
		console.log("hide help");
		//ele_sub_filler.style.display= "none";
		ele_sub_filler.style.border = null; 
		ele_sub_filler.innerHTML = "";
	}
}

//-------------------------------------------------
function fun_show_difference(time_secs, ixClip1) {
    let txt1 = fun_show_difference_table(time_secs, ixClip1);

    document.getElementById("id_diff_time").innerHTML = txt1;
    document.getElementById("id_diff_time").style.display = "block";

} //   end of fun_show_difference() 

//-----------------------------                
//--------------------------------------------------------------
function fun_show_difference_table(time_secs, ixClip1) {
    let txt1 = '<div class="center">';

    //let diff_endtime0=0;  
    let diff_endtime1 = line_list_o_to1[ixClip1] - time_secs;
    let diff_endtime2 = 0;

    let ixClip0 = ixClip1 - 3;
    let ixClip2 = ixClip1 + 3;

    if (ixClip0 < 0) {
        ixClip0 = 0;
    }
    if (ixClip2 >= line_list_o_to1.length) {
        ixClip2 = line_list_o_to1.length - 1;
    }

    //let x_stoptime = document.getElementById("mb83").innerHTML; // "883 tempo di stop "; 
    let x_secondi = document.getElementById("mb84").innerHTML; // "884 secondi";
    let x_da = document.getElementById("mb85").innerHTML; // "885 dal secondo" ;
    let x_a = document.getElementById("mb86").innerHTML; // "886 al secondo" ; 

    let x_parole = document.getElementById("mb89").innerHTML; // "889 testo della clip";  
    let x_press_last_word = document.getElementById("mb90").innerHTML; // "(.b90)) Premi il pulsante della riga che termina con l'ultima parola pronunciata ";

    /**
	txt1 += x_stoptime + " " + time_secs.toFixed(1) + " " +
        x_secondi;
    txt1 += "<br>";
	**/
    txt1 += x_press_last_word + "<br>";


    diff_endtime1 = 0;
    diff_endtime2 = 0;



    txt1 += "<table  style='border:1px solid black;'>";
    txt1 += "<tr style='text-align:center;'>" + "<th>" + x_da +
        "</th><th>" + x_a + "</th>" +
        "<th style='text-align:center'> " + x_parole + "</th>" +
        "<th>" + "" + "</th>" +
        "</tr>";
    let z2 = -1;
    for (let z1 = ixClip0; z1 <= ixClip2; z1++) {
        z2 += 1;

        txt1 += " <tr style='text-align:center;'>" +
            "<td>" + line_list_o_from1[z1].toFixed(1) + "</td>" +
            "<td>" + line_list_o_to1[z1].toFixed(1) + "</td>";
        if (z1 == ixClip1) {
            txt1 += "<td style='text-align:left;color:red;'>" + line_list_orig_text[z1].trim() + "</td>";
        } else {
            txt1 += "<td style='text-align:left;'>" + line_list_orig_text[z1].trim() + "</td>";
        }
        txt1 += "<td>" +
            '<button class="button" style="width:3em;height:1em;"  onclick="fun_end_subtitle(' +
            time_secs + ',' + z1 + ')">' + z1 + '</button>' + "</td>" +
            "</tr>";

    }
    txt1 += "</table>";

    txt1 += "</div>";
    return txt1;
} // end of show_difference_table               

//--------------------------------------------
function fun_setOrigText(txt1) {
	ele_subOrigText2.innerHTML = txt1.trim();
	if (ele_showOrigText2_open.style.display == "block") {
		ele_subOrigText2.style.visibility = "visible";
	} else {
		ele_subOrigText2.style.visibility = "hidden"; 
	}	
}

//--------------------------------------------
function fun_setTranText(txt1) {
	ele_subTranText2.innerHTML = txt1;
	if (ele_showTranText2_open.style.display == "block") {
		ele_subTranText2.style.visibility = "visible";
	} else {
		ele_subTranText2.style.visibility = "hidden";  
	}	
}


//-------------------------------
function fun_setting_subtitles_of_group4_o_t(time_secs, fromIxZero_o, toIxZero_o,  fromIxZero_t, toIxZero_t) {

    let origTextX = "",
        tranTextX = "";
    let z2, txt1;

    let endTime = 0;

   
	
	if (list_elemSub_display[0]) {  list_elemSub[0].style.display = "block"; }
	if (list_elemSub_display[1]) {  list_elemSub[1].style.display = "block"; }
	
	//list_elemSub[0].style.display = save_list_elemSub_display[0]; 
	//list_elemSub[1].style.display = save_list_elemSub_display[1];  
	
		
	
    if (sw_sub_orig) {
        if (fromIxZero_o >= 0) {
            for (z2 = fromIxZero_o; z2 <= toIxZero_o; z2++) {
                endTime = line_list_o_to1[z2];
                txt1 = line_list_orig_text[z2];
                                
                                if (sw_show_time_in_subtitle) { 
                                        let z2_fromTime =  line_list_o_from1[z2] ;
                                        txt1 = fun_add_time_to_text( z2_fromTime, endTime, txt1 ); 
                                }
                                
                if (toIxZero_o > fromIxZero_o) {
                    if (txt1.indexOf(sayNODIALOG) >= 0) {
                        // ignore this line if it's a no_dialog and there is some other subtitle  
                        continue;
                    }
                }
                origTextX += txt1 + "<br>";
            }
            document.getElementById("subOrigEndTime2").innerHTML = endTime; 
			fun_setOrigText(origTextX);			
        }
    }

    //-----------
    if (sw_sub_tran) {
        if (fromIxZero_t >= 0) {
            for (z2 = fromIxZero_t; z2 <= toIxZero_t; z2++) {
                endTime = line_list_t_to1[z2];
                txt1 = line_list_tran_text[z2];
                if (toIxZero_t > fromIxZero_t) {
                    if (txt1.indexOf(sayNODIALOG) >= 0) {
                        // ignore this line if it's a no_dialog and there is some other subtitle  
                        continue;
                    }
                }
                tranTextX += txt1 + "<br>";
            }
            fun_setTranText(tranTextX); 				
        }
    }

    //---------------------- 

    if ((origTextX.indexOf(sayNODIALOG) >= 0) || (tranTextX.indexOf(
            sayNODIALOG) >= 0)) {
        origTextX = origTextX.replace(sayNODIALOG, " ");

        fun_setOrigText(origTextX);
        tranTextX = tranTextX.replace(sayNODIALOG, " ");
        ele_subTranText2.innerHTML = tranTextX;

        if (origTextX != "") {
            ele_subOrigSilent.innerHTML = origTextX;
        } else {
            if (tranTextX != "") {
                ele_subOrigSilent.innerHTML = tranTextX;
            } else {
                ele_subOrigSilent.innerHTML = "";
				silentH_none();            }
        }

        silentH_block();
		
		ele_subOrigText2.style.visibility = "hidden"; 	 
		ele_subTranText2.style.visibility = "hidden"; 
        ele_sub_filler.style.display = "none";
        ele_subOrigText2.innerHTML = "";
        ele_subTranText2.innerHTML = "";

    
        if (time_secs >= (endTime - 1)) {
			silentH_none();
        }
        return;
    } else {
        silentH_none();
    }

} // end of fun_setting_subtitles_of_group4_o_t(

//---------------------------------------

function fun_set_time_to_show(time_secs, swpause) {
    //
    // called by: fun_updateVideoTime()    (vid.current, 0)secs
    //            fun_pause_sync_check()   (vid.current, 1)
    //
    // the purpose is to: display time lines below the video screen, display from/to times, update LAST_... variables, get the subtitle lines
   
    fun_set_next_Input_from_secs_and_hhmmss( time_secs ); 
        
    let msg = "2 ";
    let hhmmss = new Date(time_secs * 1000).toISOString().substr(11, 8);
    msg += hhmmss + " = " + time_secs.toFixed(3) + " ";
    msg += document.getElementById("mb84").innerHTML; // "884 secondi"; 

    ele_time_video.innerHTML = msg; // time line bwlow the video 

	let time_ix = time_secs; 				
    let orig_ixfromto = get_ixClip_orig_fromTime(time_ix); //////////////////////////////////////  
	
    let ixfrom_o = orig_ixfromto[0];
    let ixto_o   = orig_ixfromto[1];
	
	 let rc = 0;

    if (sw_sub_onfile == false) { // there is no subtitile file 
		rc = fun_set_timeline_type123_SECONDS_to_test_end(time_secs, ixfrom_o, ixto_o);       
        return;
    }
	
	let tran_ixfromto = get_ixClip_tran_fromTime(time_ix); //////////////////////////////////////  
	
	let ixfrom_t = tran_ixfromto[0];
    let ixto_t   = tran_ixfromto[1];

    orig_ixfromto =  get_ix_orig_fromTo(time_secs, 2); 
    ixfrom_o = orig_ixfromto[0];
    ixto_o   = orig_ixfromto[1];
	
	
    if (runningButton) {
        if (sw_sub_onfile) {
            // only if run is started by button and there are subtitles on file, test clip limits ( rc < 1 ==> out of limits 
           
            if (PLAYCLIP_TYPE == radio_type4_LINES) {
                rc = fun_set_timeline_type4_LINES(time_secs, ixfrom_o, ixto_o);
            } else {
				rc = fun_set_timeline_type123_SECONDS_to_test_end(time_secs, ixfrom_o, ixto_o);  
            }
            if (rc < 0) {
                return;
            }
        }
    }

   
    // clip indexes are usable  

    let ixClip = ixfrom_o;

    msg += "    ";

    fun_set_next_Input_from_secs_and_hhmmss( time_secs ); 
        
        
    LAST_time_change_secs = time_secs;
    //2ele_playNext_fmt_from_secs.innerHTML = hhmmss;


    if (sw_sub_onfile == false) {
        ele_time_video.innerHTML = msg;
        return;
    }

    //----------------   


    //ele_playNext2_from_row.innerHTML = ixClip; // "from" field in the PlayNext button  ( for debug use only, normally it is not displayed) 

    LAST_time_change_ix = ixClip;

    if (runningButton) {
        if ((ixClip < 0) || (line_list_o_to1[ixClip] >= MAX999)) {
            ele_time_video.innerHTML = msg;      
			fun_setting_subtitles_of_group4_o_t(time_secs, ixfrom_o, ixto_o,  ixfrom_t, ixto_t );
            return;
        }
    }
    if (ixClip < 0) {
        ixClip = 0;
    }

    msg += " " + document.getElementById("mc85").innerHTML + " " + ixClip;
    msg += " (" + line_list_o_from1[ixClip].toFixed(3);
    msg += "  :  " + line_list_o_to1[ixClip].toFixed(3);

    //msg += " " + line_list_orig_text[ ixClip ]   

    if (subtitles_beg_delta_time != 0) { // adjustment of sync. error
        msg += " ";
        if (subtitles_beg_delta_time > 0) {
            msg += " " + document.getElementById("mc86").innerHTML +
                " " + subtitles_beg_delta_time.toFixed(3);
        } else {
            msg += " " + document.getElementById("mc87").innerHTML +
                " " + (0 - subtitles_beg_delta_time.toFixed(3));
        }
        msg += " " + document.getElementById("mb84").innerHTML; // "884 secondi";     
    }
    msg += ")";

    if (swpause == 1) { // 2021.08.23
          fun_show_difference(time_secs, ixClip);
    }
		
    ele_time_video.innerHTML = msg;
	
	fun_setting_subtitles_of_group4_o_t(time_secs, ixfrom_o, ixto_o,  ixfrom_t, ixto_t );

} //  end of set_time_to_show

//--------------------
ele_video_speed = document.getElementById("id_setSpeedy"); 
//----------------------------
function fun_playVideo() {
	
	//console.log("fun_playVideo()   isPlaying=" + isPlaying + "  vid.paused=" + vid.paused); 
	
	vid.playbackRate = parseFloat( ele_video_speed.value ) ; 
	
    // each tick (less than a second) in the playing,  calls  updateVideoAudio function  

    if (isPlaying) {
		//c_onsole.log("isPlaying) but isPlaying=" + isPlaying + " ==> ignore play ==> return" );
        return;
    }
    if (vid.paused) {
        vid.play();
    }
} // end of fun_playVideo()

//-------------------------------------------------

function fun_pauseVid() {
    runningButton = false;

    if (vid.paused) {
        return;
    }
    if (isPlaying) {
		if (ele_last_play) 	ele_last_play.style.backgroundColor = null;
        vid.pause();
    }
} // end of fun_pauseVid()

//-------------------------------------


function fun_N_hhmmss_to_secs( x ) {
  let col00 = ("0:0:0:" +  x.toString().replace(",",".") ).split(":");
  let col = col00.slice(-3);
   
  let hh1 = col[0]*3600;
  let mm1 = col[1]*60; 
  let ss1 = col[2]*1; 
  
 let secs =  Math.round(  (hh1+mm1+ss1) * 1000 ) / 1000;  
  return  secs;
} 

//-----------------------

function fun_set_next_Input_from_secs_and_hhmmss(  secs0 ) {

        let secs = Math.round(secs0 * 1000)/1000; 
        
         
        let hhmmss = fun_N_secs_to_hhmmssmmm( secs );  
        
        ele_playNextVa_from_hhmmss_value = hhmmss; 
		
} // end of fun_set_next_Input_from_secs_and_hhmmss()

//---------------------------------------------


//-------------------------
//  if (sw_show_time_in_subtitle) { text = fun_add_time_to_text( from1, to1, text );   }
//-----------------------------
function fun_add_time_to_text( from1, to1, text ) {

        let fmt_from = fun_fromTime_to_hhmmssmmm(from1);
        let fmt_to   = fun_fromTime_to_hhmmssmmm(to1);

        let fmt_txt = "<small>" + fmt_from + " --> " + fmt_to + "</small><br>" + text;
        
                return fmt_txt; 
}
//--------------------------
//-----------------------------------------------


function fun_fromTime_to_hhmmssmmm(from1) {
    let hhmmss = new Date(from1 * 1000).toISOString().substr(11, 12);
    hhmmss = (" " + hhmmss).replaceAll(" 00:0", " xxxx")
        .replaceAll(" 00:", " xxx")
        .replaceAll(" 0", " x")
        .replaceAll("x", "");
    return hhmmss;
}

//==================================================================
//
// download for debugging 
//   the file  "cbc_3_player_1_html.html" has some code contained in script files named "cbc_3_player_1_html_making_... .jsHTML"   
//
//  to download the whole html file ( after the insertion of code by the cbc_3_player_1_html_making_... files ) 
//   	pass the mouse over the video title
//      a button will appear,  click on it 
//   
//------------------------------------------	
function onclick_downloadThis_HTML(t) {	
	
	let text = document.getElementsByTagName("html")[0].outerHTML ; 
	
	let element = document.createElement('a');
	
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(text));

	let filename = "debug_html_cbc.html.txt";
	
    element.setAttribute('download', filename);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
	
}  //end of onclick_downloadThis_HTML();

//---------------------------------------------------------
// CONTENT: 
//    color mangement
//--------------------------------------------------------
/*
undefined variables  and the files where they are defined  		
	LS_colorBG	                 // file: cbc_3_player_3_a_var_def_init.js    
	LS_colorTx	                 // file: cbc_3_player_3_a_var_def_init.js 
	set_localStorage_var         // file: cbc_3_player_3_a_var_def_init.js  	
	
	get_last_start_colors        // file: cbc_3_player_3_h_color1_script.js  
*/

	//---------------------------------------------------------
	/*  
    code about luminosity, contrast, colors  copied or adapted from the original in  https://app.contrast-finder.org/?lang=en
    */
	//---------------------------------------------------------
	//these variables are updated in the 'cbc_3_player_2_customization_script.js' file  
 	let hex_defaultColorBG  = INITIAL_hex_BG_color;
	let hex_defaultColorTx  = INITIAL_hex_FG_color;  	
	let hex_current_ColorBG ;
	let hex_current_ColorTx ;
	
	//onclick_change_color( hex_defaultColorBG  , 'BG',  false); 	
	//onclick_change_color( hex_defaultColorTx  , 'FG',  true); // calcola ratio contrasto
	//id_list_id_border	
	let lastBG_rgb_color ; // 	fun_hexToRgb( hex_defaultColorBG ) ; 
	//
	//----------------------------------------------------------------------------
	
	function get_id_list(id1_list, type_bgfg, value) {
		
		//console.log("get_id_list( id1_list=" + id1_list + "  type=" + type_bgfg + " value=" + value);
	  
		let listId = document.getElementById(id1_list).innerHTML ; 	
		
		let idx = listId.split(" "); 
		for(let g1=0; g1 < idx.length; g1++) {   
			let id1 = idx[g1].trim();
			if (id1 == "") { continue; }
			try {		
				switch ( type_bgfg ) {
				  case "BG":
					document.getElementById( id1 ).style.backgroundColor = value;
					break;
				  case "FG":
					document.getElementById( id1 ).style.color = value;
					break;
				  case "BORDER":
					document.getElementById( id1 ).style.border = "1px solid " + value;
					break;
				} // end of switch
			} catch(e1) {
			}
		}		
					
	
	} // end of get_id_list()
	
	//-----------------------------------------------------------------------
	
	//------------------------------
	function onclick_change_color(value,type_bgfg, sw_check_contrast) { 	
	
		if (type_bgfg == "BG") {
			get_id_list('id_list_id_bg', 'BG', value); 
			LS_colorBG = value ; 			
			fun_set_localStorage_item_from_vars("i_color2 8");
			hex_current_ColorBG = value; 	
			lastBG_rgb_color = fun_hexToRgb(value);		
		}	
		if (type_bgfg == "FG") {
			get_id_list('id_list_id_fg'     , 'FG'     , value); 		
			get_id_list('id_list_id_border' , 'BORDER' , value); 		
			
			LS_colorTx = value ; 
			fun_set_localStorage_item_from_vars("i_color2 9");
			hex_current_ColorTx = value; 	
		}	
		
		if (sw_check_contrast) { 
			fun_checkConstrast(true); 
		}
	}
	
//----------------------------------------------------------------------
//  oninput  + onchange   input type="text"
//--------------------------------------  



function isValidateColorName(c) {
    let d = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond",
        "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral",
        "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray",
        "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid",
        "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise",
        "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite",
        "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green",
        "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush",
        "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray",
        "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray",
        "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon",
        "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue",
        "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose",
        "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid",
        "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink",
        "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
        "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow",
        "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White",
        "WhiteSmoke", "Yellow", "YellowGreen", "RebeccaPurple"
    ];
    let b = c.trim().toLowerCase();
    let a = "";
    d.some(function(f) {
        if (b === f.toLowerCase()) {
            a = f;
            return true;
        }
    });
    if (a !== "") {
        return a;
    }
    return false;
}
//--------------------------------------------
//----------------------------------------------------------------------

function isValideRgbMaxValue(e) {
    let a = e.match(/(\d{1,3})/g);
    if (a !== null) {
        let d = true;
        for (let b = 0, f = a.length; b < f; b++) {
            if (a[b] > 255) {
                d = false;
            }
        }
        return d;
    }
    return false;
}

//----------------------------------------------------------------------

function isValidateColorRgb(a) {
    a = a.trim();
    if (a.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)?$/i) !== null) {
        if (isValideRgbMaxValue(a) === true) {
            if (a.substr(-1) !== ")") {
                a = a + ")"  ;
            }
            return a;
        }
    } else {
        if (a.match(/^(\d{1,3}),(\d{1,3}),(\d{1,3})$/i) !== null) {
            if (isValideRgbMaxValue(a) === true) {
                return "rgb(" + a + ")";
            }
        }
    }
    return false;
}

//----------------------------------------------------------------------

function isValidateColorHex(a) {
    a = a.trim();
    if (a.match(/^#?[a-f0-9]{6}$/i) !== null || a.match(/^#?[a-f0-9]{3}$/i) !== null) {
        if (a.substr(0, 1) !== "#") {
            a = "#" + a ;
        }
        return a ;
    }
    return false; 
}


//----------------------------------------------------------------------

function isValidateColor(c) {
    c = c.trim();
    let b = c.match(/,/g);
    let a = false;
    if (b !== null) {
        if (b.length === 2) {
            a = isValidateColorRgb(c);
            if (a !== false) {
                colorType = "rgb" ;
            }
        }
    } else {
        a = isValidateColorHex(c);
        if (a !== false) {
            colorType = "hex";
        } else {
            a = isValidateColorName(c);
            if (a !== false) {
                colorType = "name";
            }
        }
    }
    return a;
}

//----------------------------------------------------------------------

function fun_checkConstrast(p) {
	
	//console.log(" fun_checkConstrast(" + p +")" );
  
	document.getElementById("searchProgress").style.display = "none" ;
	
    let l = document.getElementById("id_currentRatioData");
    // let m = document.getElementById("id_foreground-input");
    // let b = document.getElementById("id_background-input");
   
    
	let h  = 4.5 ;   //  minimo ratio  
    let f = hex_current_ColorTx.toLowerCase();   //   m.value.toLowerCase();
    let n = hex_current_ColorBG.toLowerCase();   //   b.value.toLowerCase();
	
    f = f.toString().replace(/\s/g, "");
    n = n.toString().replace(/\s/g, "");
	
	//console.log("anto2 fun_checkConstrast()  " + " currentRatioData=" + l.innerHTML + "\n\t foreground: " + f  + "\n\t background: " + n); 
	
    f = isValidateColor(f.toString());
    if (f !== false) {
        if (colorType === "hex") {
            f = fun_hexToRgb(f);
        } else {
            if (colorType === "name") {
                f = fun_hexToRgb(fun_colorNameToHex(f));
            }
        }
        n = isValidateColor(n.toString());
        if (n !== false) {
            if (colorType === "hex") {
                n = fun_hexToRgb(n);
            } else {
                if (colorType === "name") {
                    n = fun_hexToRgb(fun_colorNameToHex(n)) ;
                }
            }
			//console.log("anto3 fun_checkConstrast()  " + " foreground f=" + f + "  background n=" + n + " ==> getContrastRatio(n, f) " ) 
			
            let j = getContrastRatio(n, f);
            j = fun_precisionRound(j, 2);
            if (p === true) {
                if (j < h) { // failed
                    document.getElementById("id_isValidRatio_Passed").style.display = "none";   //anto
                    document.getElementById("id_isValidRatio_Failed").style.display = "block";   //anto
                } else {
                    document.getElementById("id_isValidRatio_Failed").style.display = "none";   //anto
                    document.getElementById("id_isValidRatio_Passed").style.display = "block";   //anto
                }
                l.innerHTML = j;
                //document.getElementById("id_currentRatio").style.display = "block";   //anto
            }
            let i = "Passed";
            let g = "green";
            if (j < h) {
                i = "Failed";
                g = "red";
            }
            let d = h;
            if (d.length === 1) {
                d = h + "  ";
            }
            let c = j.toString();
            if (c.length === 1) {
                c = j.toString() + "   ";
            }
            let k = f;
            if (c.length < 16) {
                k = f.padEnd(16);
            }
            let a = n;
            if (c.length < 16) {
                a = n.padEnd(16);
            }
						
			let mio_msg = 
			i + " - Ratio " + c + " vs minimum ratio " + d + "<br>"  + "background:" + a + "<br>foreground:" +  f + 
                "";
							document.getElementById("id_out_mio_msg").innerHTML = mio_msg; 	
			//console.log(	mio_msg.replaceAll("<br>","\n\t") ); 
            return true;
        }
    }
    return false;
}

//----------------------------------------------------------------------

function fun_precisionRound(c, a) {
    let b = Math.pow(10, a);
    return Math.round(c * b) / b ;
}
let colorType = "";

//-------------------------------------
function fun_computeContrast(a, b) {
	//console.log("   fun_computeContrast(a,b) ==> " +  ((a + 0.05) / (b + 0.05))  ); 
    return ((a + 0.05) / (b + 0.05)) ;
}
//-------------------------------------
function getComposantValue(a) {
    let b = a / 255;
    if (b <= 0.03928) {
        return b / 12.92;
    } else {
        return Math.pow(((b + 0.055) / 1.055), 2.4);
    }
}
//----------------------------------------------------------------------
function getLuminosity(b) {
	
	let e = /(.*?)rgb\((\d+),(\d+),(\d+)\)/.exec(b);
	let f = parseInt(e[2]);
	let d = parseInt(e[3]);
	let a = parseInt(e[4]);
	
	
    let c = getComposantValue(f) * 0.2126 + getComposantValue(d) * 0.7152 + getComposantValue(a) * 0.0722;
    return c;
}
//----------------------------------------------------------------------
function getContrastRatio(d, c) {
    let a = getLuminosity(d);
    let b = getLuminosity(c);
	
	//console.log("anto4  getContrastRatio(d,c) " + " color" + d + " ==> luminosity=" + a + ",   color" + c + " ==> luminosity=" +b) ; 
	//document.getElementById("id_luminBG").innerHTML = a.toFixed(2); 
	//document.getElementById("id_luminTxt").innerHTML = b.toFixed(2);  
    if (a > b) {
        return fun_computeContrast(a, b);
    } else {
        return fun_computeContrast(b, a);
    }
}
//----------------------------------------------------------------------
function fun_hexToRgb(c) {
	//console.log("fun_hexToRgb( c=" + c  );
    if (c.match(/^#?[a-f0-9]{3}$/i) !== null) {
        let b = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(c);
        c = b[1] + b[1] + b[2] + b[2] + b[3] + b[3] ;
    }
    let a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
	//console.log("fun_hexToRgb(2     a=" + a  +  " tipo a=" + typeof a);
    return "rgb(" + parseInt(a[1], 16) + "," + parseInt(a[2], 16) + "," + parseInt(a[3], 16) + ")" ;
}
//----------------------------------------------------------------------
function fun_rgbToHex(c) {
    let b = c.replace(/[^\d,]/g, "").split(",");
    return "#" + ((1 << 24) + (+b[0] << 16) + (+b[1] << 8) + +b[2]).toString(16).slice(1) ;
}
//----------------------------------------------------------------------
function fun_colorNameToHex(c) {
    c = c.trim().toLowerCase();
    let b = document.createElement("div");
    b.style.color = c;
    let a = window.getComputedStyle(document.body.appendChild(b)).color.match(/\d+/g).map(function(d) {
        return parseInt(d, 10);
    });
    document.body.removeChild(b);
    return (a.length >= 3) ? "#" + (((1 << 24) + (a[0] << 16) + (a[1] << 8) + a[2]).toString(16).substr(1)) : false ;
}
//----------------------------------------------------------------------


function onclick_controls_emul_play(this1) {
	lastPlayTrigger = playTRIGGER_emul; 
	var sw_play = (this1.children[0].style.display == "block") ; 
	if (sw_play) {
		this1.children[0].style.display = "none"; 
		this1.children[1].style.display = "block"; 
		fun_playVideo("onclick_controls_emul_play()") ; 
	} else {
		this1.children[0].style.display = "block"; 
		this1.children[1].style.display = "none"; 
		fun_pauseVid(); 
	}

} // end of onclick_controls_emul_play(); 
//---------------------
function oninput_ctl_slider() {
	//ele_ctl_value.innerHTML = fun_N_secs_to_hhmmssmmmRid(  ele_ctl_slider.value) + "/" + ctl_slider_maxValue_hhmm; 
	ele_ctl_value.innerHTML = fun_N_secs_to_hhmmssRid(  ele_ctl_slider.value) + "/" + ctl_slider_maxValue_hhmm; 

	//console.log("oninput_ctl_slider() ctl slider= " +  parseFloat(ele_ctl_slider.value ) ) ;  
} // end of oninput_ctl_slider()
//---------------------
function onchange_ctl_slider() {
	// metti qui l'aggiornamento del testo riga e sua traduzione 
	//console.log("onchange_ctl_slider()=  " +  parseFloat(ele_ctl_slider.value ) ) ;  
	vid.currentTime =  parseFloat(ele_ctl_slider.value);	
} // end of onchange_ctl_slider()
//-----------------------------------
function fun_N_secs_to_hhmmssmmmRid(  seconds ) {	
	var hhmm1 = " " + fun_N_secs_to_hhmmssmmm( parseFloat( seconds ) );
	//console.log("fun_N_secs_to_hhmmssmmmRid(" + seconds + "   hhmm1=" + hhmm1);  
	
	return hhmm1.replace(".", decimal_point).
		replace(" 00:00:0"," ").replace(" 00:00:"," ").replace(" 00:0"," ").replace(" 00:"," ").
		replace(" 0"," ").replace(" ,", " 0,").replace(" ."," 0.").trim() ; 
}
//-----------------------------------
function fun_N_secs_to_hhmmssRid(  seconds ) {	
	var hhmm2 = fun_N_secs_to_hhmmssmmmRid(  seconds ); 
	var hhmm3 = hhmm2.split( decimal_point)[0]; 
	return hhmm3; 
}
//---------------------------------------------
function set_ctl_value( seconds ) {

    //var hhmm = fun_N_secs_to_hhmmssmmmRid( seconds ) ;	
	var hhmm = fun_N_secs_to_hhmmssRid( seconds ) ;
	ele_ctl_value.innerHTML = hhmm + " / " + ctl_slider_maxValue_hhmm; 
	
	ele_ctl_slider.value = seconds;
	
	LS_stor_playnext_replay = hhmm + ";;" + hhmm + ";;" + hhmm; 
	//LS_stor_playnext_replay = ele_playNextVa_from_hhmmss_value + ";;" + ele_replayVa_from_hhmmss_value + ";;" + ele_replayVa_to_hhmmss_value;  
	fun_set_localStorage_item_from_vars();	
	
} // end of oninput_ctl_slider()
//------------------------------------------
function onclick_show_LEFT() {
	if (document.getElementById("id_leftCols").style.visibility == "visible") {
		document.getElementById("id_leftCols").style.visibility   = "collapse"; 
		document.getElementById("id_rangeLeft").style.visibility  = "collapse"; 		 
		document.getElementById("id_rangeRight").style.visibility = "collapse"; 
	} else {
		document.getElementById("id_leftCols").style.visibility   = "visible";
		document.getElementById("id_rangeLeft").style.visibility  = "visible";  		 
		document.getElementById("id_rangeRight").style.visibility = "visible"; 
	}	
 } // end of onclick_show_LEFT()
 
//--------------------------------------------

function fun_end_subtitle(time_secs, ixClipX) {

    let deltaTime = time_secs - line_list_o_to1[ixClipX]; // to be added to the original sub. times  (incremental difference)

    subtitles_beg_delta_time = fun_add_delta_time_to_localStor(
        deltaTime);


    fun_syncronize_add_delta_time_to_subtitle_in_file( subtitles_beg_delta_time );

    document.getElementById("id_diff_sync").value    = subtitles_beg_delta_time.toFixed(3);
	//document.getElementById("id_showsync").innerHTML = subtitles_beg_delta_time.toFixed(3);

} // end of fun_end_subtitle

//--------------------------------------------


//-------------------------------------
function subtitle_row_length() {
    //----------------------------------------------------------------------
    let t_eleTabParent  = document.getElementById("id_section_row");
    let t_eleTabSub     = document.getElementById("id_tabSub");
    let t_eleTextCol    = document.getElementById("id_h_textCol");
	
	console.log("id_h_textCol = " + document.getElementById("id_h_textCol").tagName + " " +   document.getElementById("id_h_textCol").id);  
	
    let t_eleRightBeg   = document.getElementById("id_h_rightBeg");
    let t_ele_c_TextCol = document.getElementById("id_c_textCol");
	
    let t_objTextCol   = window.getComputedStyle( t_eleTextCol,   null);
    let t_objTabParent = window.getComputedStyle( t_eleTabParent, null);
	
    let t_ele_lastCol = document.getElementById("id_h_lastCol");
    let t_swMove = true;
    //----------------------
    t_eleTabSub.style.width = "400%";
    define_tabSub_length();
    fun_scroll_right(); // 1/3    this function MUST be called 3 times
    fun_scroll_right(); // 2/3 
    fun_scroll_right(); // 3/3 
    //----------------------------
    function define_tabSub_length() {

        let width_righPart = t_ele_lastCol.offsetLeft + t_ele_lastCol.offsetWidth - t_eleRightBeg.offsetLeft; //  row rightPart width
        let width_leftPart = t_eleRightBeg.offsetLeft; //  row leftPart width

        let totRowWidth = width_leftPart + width_righPart; // row tot. width 

        //let t_objTabParent = window.getComputedStyle(t_eleTabParent, null);	
        let tabParentWidth = parseFloat(t_objTabParent.getPropertyValue("width"));
        tabParentWidth = tabParentWidth - 4;

        // force left_part = parent window width   modifying  textCol width
        let diff1 = tabParentWidth - (width_leftPart * 1); // difference width between parent and parte leftPart

        let oldTextCol_width = parseFloat(t_objTextCol.getPropertyValue("width")); // subtitle text column width 

        let newTextCol_width = oldTextCol_width + diff1;

        let new_totRowWidth = totRowWidth + diff1;

        let percTextCol = parseInt(newTextCol_width * 100 / totRowWidth);
        let percRowWidth = parseInt(new_totRowWidth * 100 / tabParentWidth);


        t_eleTabSub.style.width = percRowWidth + "%";
        t_eleTextCol.style.width = percTextCol + "%";

    } // end of define_tabSub_length()

    //---------------------------------------- 

    function fun_scroll_right() {

        let t_ele_lastCol = document.getElementById("id_h_lastCol");

        let t_objTabParent = window.getComputedStyle(t_eleTabParent, null);
        let tabParentWidth = parseFloat(t_objTabParent.getPropertyValue("width"));
        let lastCol_right = t_ele_lastCol.offsetLeft + t_ele_lastCol.offsetWidth;

        let t_objTextCol = window.getComputedStyle(t_eleTextCol, null);
        let old_textWidth = parseFloat(t_objTextCol.getPropertyValue("width"));

        let t_eleRightBegLeft = t_eleRightBeg.offsetLeft;

        let diff1 = tabParentWidth - t_eleRightBegLeft;

        if (diff1 > 0) {
            let new_textWidth = old_textWidth + diff1;

            let pare = t_eleTextCol.parentElement;
            let objPare = window.getComputedStyle(pare, null);
            let obj_pareWidth = parseFloat(objPare.getPropertyValue("width"));

            //let obj_text_width = new_textWidth;
            //let offset_pareWidth = pare.offsetWidth;
            //let offset_textWidth = t_eleTextCol.offsetWidth;
            let perceTextWidth = new_textWidth * 100 / obj_pareWidth;
            t_eleTextCol.style.width = perceTextWidth + "%";
        }


        let diff_pos = lastCol_right - t_eleTabParent.clientWidth;

        if (t_swMove) {
            t_swMove = false;
            t_eleTabParent.scrollLeft = -diff_pos;
            t_ele_c_TextCol.style.textAlign = "right";
        } else {
            t_swMove = true;
            t_eleTabParent.scrollLeft = diff_pos;
            //t_eleTextCol.innerHTML = "rigaSpostata";
            t_ele_c_TextCol.style.textAlign = "right";
        }

    } // end of fun_scroll_right()

    //-----------------------------------------------------
} // end of subtitle_row_length()

//============================================

//---------------------------------------- 


    function onclick_scroll_right(this1) {
		var rightArrow = '<span style="font-weight:bold; font-size:2em;"> &xrArr; </span>'; 
		var leftArrow  = '<span style="font-weight:bold; font-size:2em;"> &xlArr; </span>'; 
		
		let t_eleTabParent  = document.getElementById("id_section_row");
		//let t_eleTabSub     = document.getElementById("id_tabSub");
	  
		//let t_eleRightBeg   = document.getElementById("id_h_rightBeg");
	   
		//let t_objTabParent = window.getComputedStyle( t_eleTabParent, null);
		
		let t_ele_lastCol = document.getElementById("id_h_lastCol");
		
		//----------------------

       
        //let tabParentWidth = parseFloat(t_objTabParent.getPropertyValue("width"));
        let lastCol_right = t_ele_lastCol.offsetLeft + t_ele_lastCol.offsetWidth;
			
        let diff_pos = lastCol_right - t_eleTabParent.clientWidth;
		
		//console.log("t_eleTabParent  tag=" + t_eleTabParent.tagName + " " +  t_eleTabParent.id) 
		//console.log(" tabParentWidth=" +   tabParentWidth  + " lastCol_right=" + lastCol_right  +  " diff_pos=" + diff_pos + "  t_swMove=" + t_swMove);
	 
        if (t_swMove) {
            t_swMove = false;
            t_eleTabParent.scrollLeft = -diff_pos;
			//this1.innerHTML = "left";
			this1.innerHTML = rightArrow;
        } else {
            t_swMove = true;
            t_eleTabParent.scrollLeft = diff_pos;
            //t_eleTextCol.innerHTML = "rigaSpostata";                
			//this1.innerHTML = "right";
			this1.innerHTML = leftArrow;
        }

    } // end of onclick_scroll_right()

 //---------------------------------------
 function onclick_OneClipRow_showHide_AllSub(openBookChecked) {
	/**
		<td class="playBut1"><button class="buttonTD2" id="idb_0_m" onclick="onclick_OneClipRow_showHide_sub( this, true)">
				<span style="display:block;font-size:2em;">📖</span>
				<span style="display:none;font-size:2em;">📕</span></button>
			</td>  
	**/

	LS_sub_force_visible = openBookChecked; 	
	
	fun_set_localStorage_item_from_vars(); 
	
	
	var ele1 = document.getElementById("idb_" + clipFromRow_min + "_m"); 
	if (openBookChecked) {
		console.log("force all subtitles visible"); 
		ele1.children[0].style.display="block";        
		ele1.children[1].style.display="none";  
	} else {
		console.log("force all subtitles invisible"); 
		ele1.children[0].style.display="none";  		
		ele1.children[1].style.display="block";  
	} 	
	onclick_OneClipRow_showHide_sub( ele1, true, true ); 
	
 } // end of onclick_OneClipRow_showHide_AllSub()
//----------------------------------------
function show_practice(this1) {
	//console.log("show_practice()");
	var ele_practice = document.getElementById('id_practice');
	ele_practice.style.visibility = "visible";
	this1.style.marginBottom = "1em";
	this1.scrollIntoView();
}
//-------------------------------------------	
function assign_practice_msg() {
	
	//console.log("assign_practice_msg() sw_the_are_no_subtitles=" + sw_the_are_no_subtitles + "  sw_is_no_videoaudios=" + sw_is_no_videoaudio); 
	
	document.getElementById('m895_897').innerHTML = document.getElementById('m895').innerHTML ;	
	
	document.getElementById("id_time_video").style.display = "block";
	document.getElementById("id_toric"     ).style.display = "flex";
	
	if (sw_the_are_no_subtitles) {	
		console.log("sw_the_are_no_subtitles=" + sw_the_are_no_subtitles); 
		document.getElementById('m895_897').innerHTML = document.getElementById('m896').innerHTML ;	
		document.getElementById("id_main_subt").style.display = "none";		
	}	
	if (sw_is_no_videoaudio) {
		console.log("sw_is_no_videoaudios=" + sw_is_no_videoaudio); 
		document.getElementById('m895_897').innerHTML = document.getElementById('m897').innerHTML ;	
		document.getElementById("id_main_subt" ).style.display = "none";
		document.getElementById("id_toric"     ).style.display = "none";
		document.getElementById("id_time_video").style.display = "none";
	}	
}
//--------------------------
function ready_to_Begin() {

	document.getElementById("id_ready"     ).style.display = "none";
	document.getElementById("id_butt_pract").style.display = "block";
	document.getElementById("id_main_subt" ).style.display = "block";
	assign_practice_msg();
	if (sw_tts) {
		ele_tts.style.display = "flex"; 
	} else {
		ele_tts.style.display = "none"; 
	}
} // end of ready_to_Begin()
//--------------------		
function end_speech() {
	if (isPlaying) isPlaying = false ; 
	if (ele_last_play) {
		if (TTS_LOOP_swLoop == false) { 
			ele_last_play.style.backgroundColor = null;
		}
	}
	end_speech_calculation();  
} // end of end_speech()

//-------------------------------------------


