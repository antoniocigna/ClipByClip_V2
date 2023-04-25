"use strict";
/*  
ClipByClip A tool to practice language comprehension
Antonio Cigna 2021/2022
license MIT: you can share and modify the software, but you must include the license file 
*/
/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint undef: true, unused: true */
//
//====================  file ... builder script ... ==============
//
// part1: subtitle_data  

var SILENT_GAP_LIMIT = 2; // limit in seconds 
//  if there is time gap  ==> add something to the to_time of the previous and subtract something from the present line    
//  if the gap is too much large insert a new line with a button to skip it 
var SILENT_GAP_LIMIT2 = 2 * SILENT_GAP_LIMIT; // limit in seconds 
const MARK_orig = "orig";
const MARK_tran = "tran";
const TRANSLATION_NOT_WANTED = "...";
const NO_TEXT_NO_SUBTITLES = "NO_TEXT_NO_SUBTITLES";
const NO_VIDEO_AUDIO_FILE = "noVIDEO_noAUDIO";
const NO_VIDEO_TIME_INCR = 1.000;
var sw_thereIs_noSub = false;
var sw_inpSRT_only = true;
var sw_srt_error = false;
var sw_is_no_videoaudio = false;
var sw_translation_not_wanted = false;
//--------------
function fun_console(funame) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" +
        "\nx     " + funame +
        "\n-----------------------------------------------");
} // ------------
//--------------------------------
function getMsgId(id1) {
    console.log("msg " + id1 + "  getMsgId()");
    return document.getElementById(id1).innerHTML;
}
//--------------------------------------------------------------------
function copyMsgId_to_from(id_to, id_from) {
    console.log("msg " + id_to + " (copyMsgId_to_from(" + id_to + ", " + id_from + ")" + "\n" +
        "msg " + id_from + " (copyMsgId_to_from(" + id_to + ", " + id_from + ")");
    document.getElementById(id_to).innerHTML = document.getElementById(id_from).innerHTML;
}
//-----------------------------------------------------------------------

function get_timehhmmss(str0) {
    /*
    	try to manager time in srt or vtt  even when non correctly written ( maybe it's out of automatic translation)

    	expected ==>    00:12:45,123                   ( hh:mm:ss,mmmm ) 
    					00:12:45.123 other staff vtt   ( hh:mm:ss.mmmm )
    					00:12:45                       ( hh:mm:ss ) 	
    	can manage	1: 2: 45,123      transformed to 00:02:45.123
    				12:45,123         transformed to 00:12:45.123
    				45,123            transformed to 00:00:45.123					
    */

    var str1 = (str0 + "").trim().replace(",", ".").replaceAll(": ", ":").replaceAll(": ", ":");

    var tt1 = str1.split(":");
    var len1 = tt1.length;
    if (len1 < 3) {
        str1 = "00:" + str1;
        if (len1 < 2) {
            str1 = "00:" + str1;
        }
        tt1 = str1.split(":");
    }
    var tHH = tt1[0].trim();
    var tMM = tt1[1].trim();
    var tSS = tt1[2].trim().split(" ")[0]; // ignore whatever follows ( that is the case of vtt subtitiles) 


    if (isNaN(tHH)) {
        return;
    }
    if (isNaN(tMM)) {
        return;
    }
    if (isNaN(tSS)) {
        return;
    }
    var nHH = parseInt(tHH);
    var nMM = parseInt(tMM);
    var nSS = parseFloat(tSS);


    if ((nHH >= 60) || (nHH < 0) || (nMM >= 60) || (nMM < 0) || (nSS >= 60) || (nSS < 0)) {
        return;
    }

    var seconds = nHH * 3600 + nMM * 60 + nSS;

    tHH = (100 + nHH).toString().substring(1);
    tMM = (100 + nMM).toString().substring(1);
    tSS = (100.0000001 + nSS).toString().substr(1, 6);

    return [seconds, tHH + ":" + tMM + ":" + tSS];

} // end of get_timehhmmss(); 
//----------------------------------------
function isTimeLine(str1) {

    var line = str1.trim().
    replace("- ->", "-->").
    replace(" -> ", " --> ").
    replace("-- >", "-->"); // replace used to avoid random error from automatic translation  
    if (line.indexOf("-->") < 0) {
        return [false, true, "", ""];
    }
    var part = line.split("-->");
    var timehh_fromX = get_timehhmmss(part[0]);
    var timehh_toX = get_timehhmmss(part[1]);

    if ((timehh_fromX === undefined) || (timehh_toX === undefined)) {
        console.log("error in " + line);
        return [true, true, part[0], part[1]];
    }

    return [true, false, timehh_fromX, timehh_toX];
}

//--------------------------------------------------

function sec2time(timeInSeconds) {
    return new Date(timeInSeconds * 1000).toISOString().substr(11, 12);
}

//----------------------------------------

function fromText_to_srt(inpsub) {

    sw_inpSRT_only = false;

    var newText = (inpsub.trim() + "  ").replaceAll(". ", ". \n").replaceAll(" \n", "\n").replaceAll("\n\n", "\n");

    var subline = newText.split("\n"); // <===  INPUT  	
    var i; 
    var list_time_from = [0];
    var list_time_to = [0];
    var list_text = [""];
    var idsrt = [""];
    //------------------------------
    subline.push("");
	
    var line = "";        
  
    //-----------------------------------		
    var noVideoTime = 0;
    var noVideoHHMM = sec2time(noVideoTime).replace(".", ",");
    var noVideo_hh1;
	var punto2;
	var ix1=0; 
    for (i = 0; i < subline.length; i++) {
        line = subline[i].trim();
        if (line == "") {
            continue;
        }
		if (line.substring(0,2) == "::") {
			punto2 = line.split("::"); 
			noVideoTime = parseInt(punto2[1]); 
			line = punto2[2].trim();
		}
        list_time_from.push(noVideoTime);

        noVideo_hh1 = noVideoHHMM;
        noVideoTime += NO_VIDEO_TIME_INCR;
        noVideoHHMM = sec2time(noVideoTime).replace(".", ",");

        list_time_to.push(noVideoTime);
        list_text.push(line);
        idsrt.push(noVideo_hh1 + " " + noVideoHHMM);
    }
    return [list_time_from, list_time_to, list_text, idsrt];

} // end of fromText_to_srt()

//------------------------------------

function isTextMissing(inpsub, origTran) {

	if (inpsub == "") {
		return true;
	}
    if (origTran == MARK_orig) {
		if (inpsub.length < 10) {
			console.log("missing, " + MARK_orig + " text ==>" + inpsub + " <==")
			// on the contrary of translated text, original text must exit always
			return true; // no input 
		} 
		console.log("exist,  " + MARK_orig + " text ==>" + inpsub + " <==")
		return false; 		
	}
	
	// check translated text    
	
	sw_translation_not_wanted = false;
	var lenMatch = inpsub.length;
	if (lenMatch < 3)  {
		return true;  // no input 
	}	
	// if there are from 3 to 9 dots then it means there is no translaton text and we know it ( we didn't forget it)  
	var toMatch = TRANSLATION_NOT_WANTED + TRANSLATION_NOT_WANTED + TRANSLATION_NOT_WANTED;
	sw_translation_not_wanted = (inpsub.substring(0, lenMatch) == toMatch.substring(0, lenMatch));
	 
	if (sw_translation_not_wanted) {
        return true;   //  as it were no input 
    }
	return false; 
    
} // end of isTextMissing()

//----------------------------------
function getTypeFileText(inpsub, origTran) {
	var type_txt; var id1;
	if (origTran == MARK_orig) {
		id1 = "inpFileTypeOrig";
	} else {
		id1 = "inpFileTypeTran";		
	}
	type_txt = document.getElementById(id1).innerHTML;
	
	if(type_txt == "") {
		if (inpsub.substring(0,50).indexOf("->") > 0) {
			type_txt = "srt"
		} else {
			type_txt = "txt"; 
		}  		
		console.log(origTran + " " + inpsub.substring(0,40) + "...  we don't know from file extention if it's srt or txt -  we assume it's " + type_txt); 
		document.getElementById(id1).innerHTML = type_txt;
	}
	return type_txt;
	
} // end of getTypeFileText() 

//
function get_subtitle_strdata(inpsub, origTran) {
	console.log("function get_subtitle_strdata(inpsub=" + inpsub.substring(0,30) + " ...etc.., origTran=" + origTran +")" ); 
    //---------------------------------------
    // get subtitles in srt or vtt format 
    // and return a string with a line for each subtitle group     
    //---------------------------------------
    /* 
		sample of a srt file
			14
			00:01:08,000 --> 00:01:10,000      ixtime[13] = 52
			one line of text
			other lines of text
			 
			15
			00:01:10,000 --> 00:01:15,000      ixtime[14] = 57
			lines
			of texts   
		---------------------------------------------
		sample of a vtt file 
			WEBVTT                             (this is the first line which identify a webvtt subtitle file  		
			STYLE
			::cue(.S1) {
			color: white;
			...
			}
			REGION
			id:R1
			...

			1
			00:00:01.000 --> 00:00:02.040 region:R1 align:center
			<c.S1>one line</c>

			2
			00:00:02.600 --> 00:00:03.640 region:R1 align:center
			<c.S1>another line</c>

    */

    //----------------------------
    inpsub = inpsub.trim();

    var i, txt1;

    var okTime = false;

    var list_time_from = [0];
    var list_time_to = [0];
    var list_text = [""];
    var idsrt = [""];
	
	//----------------------------
	
	if ( isTextMissing( inpsub.substring(0,10) ) )  {
		console.log("text missing "  + origTran + "   inpsub=>" + inpsub.substring(0,50) + "<=="); 
		return [list_time_from, list_time_to, list_text, idsrt];
	}  
	//-------------------------
	
	var type_txt = getTypeFileText(inpsub, origTran);		

	var is_srt_type = (type_txt == "srt"); 
	
    if (sw_is_no_videoaudio) {
		if (is_srt_type == false) {  // type is not srt, the text i read line by line   
			 return fromText_to_srt(inpsub);
		}       
		if (inpsub.indexOf("->") < 0) { // type is srt, but the content doesn't seem it does 
			 return fromText_to_srt(inpsub);
		}  
		// get the contents from srt   	
    }
	
	//---------------------------------

    if (inpsub.indexOf("->") < 0) {
        sw_srt_error = true;
        //console.log("get_subtitle_strdata() " + origTran + " 002 sw_srt_error =" + sw_srt_error ) ;
        return [list_time_from, list_time_to, list_text, idsrt];
    }
    //-------------------
    var subline = inpsub.split("\n"); // <===  INPUT  

    //------------------------------
    subline.push("");
	
    // look at what follows the time line,  stop when there is a blank line ( but might be missing ) 

    //list_start=[];  
    var line = "";
    var preline = "";

    var list_ix_beg = [0];
    var list_ix_end = [0];



    var num = 0;
    /***
    subline.push(""); 
    subline.push("99999999"); 
    subline.push("99:99:99,999 --> 99:99:99,999"); 
    **/

    var isTime;
    var time_err;
    var timehh_fromX;
    var timehh_toX;

    //---
    function close_previous_group() {
        // the previous line should be a number 
		preline = preline.replace("°","");  // character ° is wrongly inserted by translate.google 
        num = list_ix_end.length - 2;
        if (list_ix_beg[num] >= 0) {
            if (isNaN(preline)) {
                list_ix_end[num] = i;
            } else {
                list_ix_end[num] = i - 1;
            }
        }
    } //end of  close_previous_group()

    //-----------------------------------

    //-----------------------------
    for (i = 0; i < subline.length; i++) {
        preline = line;
        line = subline[i];
        [isTime, time_err, timehh_fromX, timehh_toX] = isTimeLine(line);
        if (isTime == false) {
            continue;
        }
        if (time_err) {
            // error in time line
            list_ix_beg.push(-1);
            list_ix_end.push(-1);
            list_time_from.push(0);
            list_time_to.push(0);
            list_text.push("");
            idsrt.push("");
            close_previous_group();

            continue;
        }
        okTime = true;

        var timehh_from = timehh_fromX[1];
        var timehh_to = timehh_toX[1];

        var time_secs_from = timehh_fromX[0];
        var time_secs_to = timehh_toX[0];

        list_ix_beg.push(i);
        list_ix_end.push(i);


        list_time_from.push(time_secs_from);
        list_time_to.push(time_secs_to);

        list_text.push("");

        idsrt.push(timehh_from + " " + timehh_to);
        close_previous_group();

    }

    if (okTime == false) {
        console.log("this file is not a srt subtitle file  (time format error)");
        sw_srt_error = true;
        //console.log("get_subtitle_strdata() " + origTran + " 003 sw_srt_error =" + sw_srt_error  )
        return [list_time_from, list_time_to, list_text, idsrt];
    }

    list_ix_end[list_ix_end.length - 1] = subline.length;

    //-----------------	
    //return [ list_time_from, list_time_to, list_text ,idsrt ]; 

    // add_nodialog_clips2( list_time_from, list_time_to, list_text ,idsrt );	
    //------------------------	
    var ixfrom, ixto;
    for (var k = 1; k < list_ix_end.length; k++) {
        txt1 = "";
        ixfrom = list_ix_beg[k];
        if (ixfrom < 0) {
            continue;
        }
        ixto = list_ix_end[k];
        for (var z = ixfrom + 1; z < ixto; z++) {
            txt1 += subline[z] + " ";
        }
        list_text[k] = txt1;
    }
    //------------------------	
    /**
    for(var k=1; k < list_ix_end.length; k++) {		
    	console.log(list_time_from[k] + "  " + list_time_to[k] + " txt="+ list_text[k] + " idsrt=" + idsrt[k]   ); 
    } 
    **/


    return [list_time_from, list_time_to, list_text, idsrt];


    // add_nodialog_clips2( list_time_from, list_time_to, list_text ,idsrt );	

} // end of get_subtitle_strdata()

//-----------------------------------

// end of part1 subtitle data  
//======================================================
// part2: add_nodialog 

//-----------------------------------
function add_nodialog_clips3(inpArray) {
    //
    //  from the 3 lists (rigaFrom, rigaTo, rigaTxt ) 
    //       obtains a string which contains all the subtitle lines ( a line = from-seconds::to-seconds::text )
    //       
    //       if the are time gaps between a to-seconds field of a line  and a from-seconds of the following one 
    //              insert a new line if the gap is too large otherwise increase the to-seconds field and decrease the from-seconds field making them equal  	
    //       eg.1  
    //            110.100 - 120.000  line number n
    //            500.000 - 505.123  line number n+1   	
    //          become
    //            110.100 - 120.000  line number n       
    //            120.000 - 500.000  no dialog line            <==  inserted new line( in the player it will become a button which var you to skip a boring waiting         
    //            500.000 - 505.123  line number n+1             	
    //	
    //       eg.2  
    //            120.100 - 130.000  line number n
    //            132.000 - 150.123  line number n+1   	
    //          become
    //            120.100 - 131.000  line number n             (   130...  ==>  131.000 )
    //            131.000 - 150.123  line number n+1           (   132...  ==>  131.000 )  	
    //-------------------------------------------------------------------

    var rigaFrom = [];
    var rigaTo = [];
    var rigaTxt = [];
    var idsrt = [];
    [rigaFrom, rigaTo, rigaTxt, idsrt] = inpArray;

    var righe_wrk = [];
    var fromT;
    var silent_gap = 0;
    var silent_row;
    var txtsilent;
    var i = 0;
    var riga;

    fromT = "";
    var fromTime = 0,
        toTime = 0;
    var maxPrevToTime = 0;
    var half_gap;
    //----------------
    // starts from i=1 because i=0 is empty 
    //----------------------------------------

    //console.log("\n-----------------------------\nbuilder 4_2 \n"); 

    for (i = 1; i < rigaFrom.length; i++) {

        if (toTime > maxPrevToTime) {
            maxPrevToTime = toTime;
        }

        fromTime = parseFloat(rigaFrom[i]);
        toTime = parseFloat(rigaTo[i]);


        //if (i < 7) { console.log("builder 4_2   i=" + i + "  fromTime="+fromTime + " to=" + toTime + "  " + rigaTxt[i]  + " [[ " + idsrt[i]);   }



        if (fromTime <= maxPrevToTime) {
            continue;
        }
        silent_gap = fromTime - maxPrevToTime;

        if (silent_gap > 0) {
            //console.log("silent_gap=" + silent_gap + "  limit=" + SILENT_GAP_LIMIT);
            if (silent_gap <= SILENT_GAP_LIMIT2) {
                // the gap is small,  eliminate it by increasing the previous to_time and decreasing the present from-time ( maybe useful to hide sync errors) 
                half_gap = silent_gap;
            } else {
                // the gap is too large, may be is annoying  (the user of this tool want to listen, not to wait)     
                //     use half the gap limit to increase the previous to_time and decrease the present from-time (maybe useful to hide sync errors)   
                //     and add a line which will host a button to skip it
                //half_gap = (silent_gap - SILENT_GAP_LIMIT) / 2; 
                half_gap = SILENT_GAP_LIMIT / 2;
            }

            if (maxPrevToTime >= 1.00) {
                maxPrevToTime += half_gap; // increase the maximum toTime for a bit
                rigaTo[i - 1] = maxPrevToTime; // and assign it to the last to_time 
            }
            fromTime -= half_gap; // decrease  the present fromTime for a bit 
            rigaFrom[i] = fromTime; // and assign it to the present from time  

            //console.log("help_gap=" + half_gap + "  new maxPrevToTime=" + maxPrevToTime + "  fromTime=" + fromTime);		

            if (maxPrevToTime < fromTime) {
                txtsilent = sayNODIALOG + (fromTime - maxPrevToTime).toFixed(0) + " " + getMsgId("ma30");
                silent_row = (100000 + maxPrevToTime).toFixed(3).substring(1) + "::" + (100000 + fromTime).toFixed(3).substring(1) + ":: " + txtsilent;
                righe_wrk.push(silent_row);
            }
        }

    } // end of for i

    //----------------------------

    for (i = 0; i < rigaFrom.length; i++) {
        if (rigaTo[i] == 0) {
            continue;
        }
        riga = (100000 + rigaFrom[i]).toFixed(3).substring(1) + "::" + (100000 + rigaTo[i]).toFixed(3).substring(1) + ":: " + rigaTxt[i];
        righe_wrk.push(riga);
    }
    //-------------------	

    righe_wrk.sort();

    //-----------------------------
    var text_out = "";

    for (i = 0; i < righe_wrk.length; i++) {
        text_out += righe_wrk[i] + "<br>\r\n";
    }
    return text_out;

} // end of add_nodialog_clips3()



// end of part2 add no dialog 

//=========================================

// part3 ( main )  

//------------------------------------------------------------

//  apice inverso Alt + 096   `

var DEBUG = false; // if true display range of time in the subtitle strings 


var video_native_height;
var video_native_width;

var script_lev2_fn = "";
var videoaudioTYPE = "";
var out_html_file = "";
var src_var = "";

var sw_video_ok = false;
var sw_sub_ok = false;
var sw_title_ok = false;

var sw_ready_to_write = false;
var HTML_TITLE = "";


var sw_inp_sub_orig = false;
var sw_inp_sub_tran = false;

var sayNODIALOG = "-NODIA-";



var newVidH, newVidW;
var newVidHperc, newVidWperc;
//----------------------------------------------------


var video_folder_path = "";



//--------------------------------------------------	

// var lev2 
var path1 = window.location.pathname;
var f1 = path1.lastIndexOf("/");
var f2 = path1.lastIndexOf("\\");
var f3 = -1;
var barra = "/";
if (f1 > f2) {
    f3 = f1;
    barra = "/";
} else {
    f3 = f2;
    barra = "\\";
}

var vid;
var url_local = "file:///";
var video_filename = "";
var video_filetype = "";
var video_filesize = "";
var video_fileerror = false;

var this_file_root = get_this_file_path(window.location.href); // eliminate file name 

this_file_root = get_this_file_path(this_file_root); // eliminate this folder (cbc_builder)

var this_cbc_base = this_file_root;


var INTRAFN = "";
var orig_subtitles_string = "";
var tran_subtitles_string = "";

var script_fn_download = "";
var html_fn_download = "";



var video_src = "";

var place_id_hardsub = "false";
var place_id_file_suborig = "true";
var place_id_file_subtran = "true";

var isPlaying = false;

/**
var righe_lang;


righe_lang = build_language_list();
var html_elemLingua = document.getElementById("id_ch_lang");
html_elemLingua.innerHTML = righe_lang;

h1_getAllMsgInLang_xx(myLang);
**/


//------------------------------------------------

var loadedfile_srt1 = [];
var loadedfile_srt2 = [];

get_file_mime_type("filetesto1", loadedfile_srt1);
get_file_mime_type("filetesto2", loadedfile_srt2);

var HARD_subtitle = false;
var HARDCODED = "HARDCODED";

//-----------------------------------------------------
var cbc_LOCALSTOR_key = "ClipByClip_Builder";
//  the LS_... variables here after have their values stored in window.localStorage so that they can be retrieved in the next sessions 
//  all this value are put in a list and saved in one variable the name of which contains the title of the page (each page has its own values)  
var LS_video_path = "";
var video_title = "";

initial_from_localStorage_values();

video_folder_path = LS_video_path;
document.getElementById("out_title").value = video_title;

//---------------------
function reduceVideoDimensions(ct_w, ct_h) {

    var vidH = video_native_height;
    var vidW = video_native_width;
    var p1 = vidH / ct_h;
    var p2 = vidW / ct_w;
    var p0 = Math.max(p1, p2);
    if (p0 == 0) {
        p0 = 1;
    }
    // p0 += 0.05; //  leave same space ( percentage) between video and container   

    p0 = Math.round(p0 * 100) / 100;
    console.log("vidH/ct_h=p1=" + p1 + "   vidW/ct_w=p2=" + p2 + " p0=max(p1,p2) + gap  = " + p0);

    newVidW = Math.floor(vidW / p0);
    newVidH = Math.floor(vidH / p0);

    console.log("newVidW = (vidW/p0)=" + newVidW + "  newVidH = (vidH/p0)=" + newVidH);

    newVidWperc = (newVidW * 100) / ct_w;
    newVidHperc = (newVidH * 100) / ct_h;

    //console.log("video native dimension w="+ vidW + " h=" + vidH +  "     container: w=" + ct_w + " h=" + ct_h) ;
    //console.log("video new    dimension w="+ newVidW + " h=" + newVidH  + " container perc w=" + newVidWperc + " H=" + newVidHperc) ;
    //vid.style.height = newVidH
    //vid.style.width  = newVidW
} // end of reduceVideoDim1() 
//---------------------------

function h1_videoFileMissing() {

    video_filename = NO_VIDEO_AUDIO_FILE;
    video_filetype = "";
    video_filesize = "";
    video_fileerror = "";
    document.getElementById("id_videoerror").style.display = "block";
    document.getElementById("id_videoerror").innerHTML = "non esiste nessun file video o audio";

    document.getElementById('id_div13A_sub').style.display = 'none';
    document.getElementById('id_post_title').style.display = 'block';
    document.getElementById("id_video0").style.display = 'none';
    copyMsgId_to_from("m704", "m714"); //  704 <== 714
    copyMsgId_to_from("m705", "m715"); //  705 <== 715  

} // end of h1_videoFileMissing()


//////////////////////////////////////////////
function h1_get_video_filename3(this1) {

    var arr_out = h1_get_file_name_type(this1, " video audio ");
    if ((arr_out == undefined) || (arr_out.length < 2)) {
        video_filename = "";
        video_filetype = "";
        video_filesize = "";
        video_fileerror = "ERROR " + arr_out;
        return -1;
    }

    video_filename = arr_out[0];
    video_filetype = arr_out[1];

    sw_is_no_videoaudio = (video_filename.toLowerCase() == NO_VIDEO_AUDIO_FILE);

    if (sw_is_no_videoaudio) {
        document.getElementById("id_videoerror").style.display = "block";
        document.getElementById("id_videoerror").innerHTML = "non esiste nessun file video o audio";
        document.getElementById("ma21").innerHTML = "zz3 " + getMsgId("ma22");

        return 0;
    }

    console.log("file name=" + video_filename + " type=" + video_filetype);

    if (video_filetype.substring(0, 5) == "video") {
        videoaudioTYPE = "video";
    } else {
        if (video_filetype.substring(0, 5) == "audio") {
            videoaudioTYPE = "audio";
            copyMsgId_to_from("mb22", "mb23"); // mb22 <== mb73 
        }
    }

    video_filesize = arr_out[3];
    video_fileerror = arr_out[4];

    document.getElementById("id_scelta2").style.display = "block";
    document.getElementById("id_videoerror").style.display = "none";
    if (video_fileerror) {
        console.log("ERROR in h1_get_video_filename()  video_fileerror=" + video_fileerror);
        video_fileerror = '<br><span class="c_error">' + getMsgId("mb50") + '</span>'; //  né video né audio
        document.getElementById("id_videoerror").style.display = "block";
        document.getElementById("id_scelta2").style.display = "none";
    }
    document.getElementById("id_videotype").innerHTML = video_filetype;
    document.getElementById("id_videoname").innerHTML = video_filename;
    document.getElementById("id_videosize").innerHTML = video_filesize;
    document.getElementById("id_videoerror").innerHTML = video_fileerror;

    var msg = '<span style="color:blue;">' + video_filename + '</span>' + "<small><br>(" + video_filetype + " " +
        video_filesize + ")</small>";
    msg += "<br>nella cartella<br>" + '<span style="color:blue;">' + video_folder_path + "</span>"; // 2021/08/22 

    return 0;


} // end of h1_get_video_filename3()

//---------------------------

function h1_get_folder(this1) {
    //  function h1_get_folder()      used in  html
    //console.log( "h1_get_folder() 0 ");

    //sw_is_no_videoaudio

    document.getElementById('id_post_title').style.display = 'block';

    document.getElementById("id_video00_folder").style.display = 'none';
    document.getElementById("butfold1").style.display = 'none';

    document.getElementById("id_msg_viderr").innerHTML = "";
    document.getElementById("id_msg_viderr").style.backgroundColor = null;
    console.log("h1_get_folder(this1)");

    var video_folder_path = this1.value;
    LS_video_path = video_folder_path;

    set_localStorage_var();
    if (video_fileerror) {
        console.log("error video1 ");
        return;
    }

    if (video_filename == "") {
        console.log("error video2 ");
        var msgerr1 = "video file name is missing";
        document.getElementById("id_msg13A").innerHTML = msgerr1 + "<br>&nbsp;";
        document.getElementById("id_msg13A").style.backgroundColor = "white";
        return;
    }

    document.getElementById("id_msg13A").innerHTML = video_filename;

    if (sw_is_no_videoaudio) {
        video_src = "";
        document.getElementById("out_title").innerHTML = tempTitle;
        //LS_video_path  = LS_video_path ;  	
        video_title = tempTitle;
        set_localStorage_var();
        //fun_after_drop_uno();		
        sw_ready_to_write = true;
        sw_video_ok = true;
        copyMsgId_to_from("ma21", "ma22"); // ma21 <== ma22  the srt / text in source language is missing
        return;
    }


    var tempTitle = video_filename;
    var p1 = video_filename.lastIndexOf(".");
    if (p1 > 0) {
        tempTitle = video_filename.substring(0, p1);
    }
    //--------------------------------------------------------------------------
    //----------------------------- hidden facility ---
    // here his a not advertised and hidden facility   
    // it allows to specify an online video o audio file istead of an offline one
    // it's not advertised because the application can't manage youtube or vimeo file which can run only inside an iframe that cannot be accessed from outside  
    // to use it: 
    //      specify as file name any video or file on your computer  ( it will be ignored ) 
    //      specify as a folder the url of the online video or audio eg. https://radiodownload.one.two.three.mp3	
    var sw_web = false;
    if (LS_video_path.substr(0, 6) == "https:") {
        if (LS_video_path.indexOf("www.youtube.") < 0) {
            video_src = LS_video_path;
            var j1 = video_src.lastIndexOf("\\");
            console.log("13A  j1=" + j1);
            if (j1 >= 0) {
                video_filename = video_src.substring(j1 + 1);
            } else {
                j1 = video_src.lastIndexOf("/");
                console.log("13A  j1=" + j1);
                if (j1 < 0) {
                    video_filename = video_src;
                } else {
                    video_filename = video_src.substring(j1 + 1);
                }
            }
            document.getElementById("id_msg13A").innerHTML = video_filename;
            document.getElementById('id_videoname2').innerHTML = video_filename;
            tempTitle = video_filename;

            console.log("13A = " + document.getElementById("id_msg13A").innerHTML);
            //LS_video_path = ""; 
            video_filename = "";
            url_local = "";
            sw_web = true;

        }
    } // end of hidden facility 
    //-----------------------------------------------------
    //---------------------

    if (sw_web == false) {
        var lastchar = LS_video_path.substring(LS_video_path.length - 1);
        if (lastchar != barra) {
            LS_video_path += barra;
        }
        if (LS_video_path.indexOf(video_filename) < 0) {
            video_src = url_local + LS_video_path + video_filename;
        } else {
            video_src = url_local + video_filename;
        }
    }

    console.log("h1_get_folder() 2 video src=" + video_src);

    document.getElementById("id_video1").src = video_src;

    //document.getElementById("but_titleGet").style.display = "block";
    //document.getElementById("id_video_fn").innerHTML = video_filename;

    tempTitle = video_filename;
    p1 = video_filename.lastIndexOf(".");
    if (p1 > 0) {
        tempTitle = video_filename.substring(0, p1);
    }

    document.getElementById("out_title").innerHTML = tempTitle;

    //LS_video_path  = LS_video_path ;  	
    video_title = tempTitle;

    set_localStorage_var();

    fun_after_drop_uno();

} // end of h1_get_folder()



//---------------------------
function h1_get_file_name_type(ele1, valid_type) {

    if (ele1 == null) {
        return ["", "", "", "", true, "", "file null"];
    }
    if (ele1.files.length < 1) {
        return ["", "", "", "", true, ele1.id, "files.length=" + ele1.files.length];
    }

    var file1 = ele1.files[0];

    var fftt = file1.type.split(barra);
    var filetype2 = fftt[0].toLowerCase().trim();

    if (filetype2 == "") {
        filetype2 = "text";
    }

    var filesize = file1.size;
    var fsize = "";
    if (filesize < 1024) {
        fsize = filesize + "bytes";
    } else {
        if (filesize < (1024 * 1024)) {
            fsize = (filesize / 1024).toFixed(0) + "Kb";
        } else {
            fsize = (filesize / (1024 * 1024)).toFixed(0) + "Mb";
        }
    }

    var ltype = " " + valid_type.toLowerCase() + " ";
    var sw_error = false;

    if (ltype.indexOf(filetype2) < 0) {
        sw_error = true;
    }
    return [file1.name, file1.type, filesize, fsize, sw_error, ele1.id, "not valid type"];
}

//-------------------------------------------	
function h1_video3(this1) {
    //  function h1_video3()         used in  html

    var rc = h1_get_video_filename3(this1); // manca    lev1_update_localStorage_video_folder();
    console.log("h1_video3()  rc=" + rc);
    if (rc < 0) {
        /**
		console.log("error in h1_get_video_filename");
        //document.getElementById("but_titleGet").style.display = "none";
        document.getElementById("id_ch_lang").style.display = "none";
        document.getElementById("id_h0").style.display = "none";
		**/
    } else {
        document.getElementById("id_scelta_fatta").style.display = "block";
    }
} // end of fun_video3



//---------------------------------------------------------------------------

//----------------------------

function errorVideoFile(src_var1) {

    var i2 = src_var1.lastIndexOf(barra);

    var video_fn = src_var1.substring(i2 + 1);

    var video_fn1 = '<span style="color:blue;">' + video_fn + '</span>';
    var video_fn2 = video_fn1 + "<br>" + getMsgId("mb75") + "<br>" + '<span style="color:blue;">' + video_folder_path + "</span>"; // 2021/08/22  

    var video_err_msg = "<br>" + decodeURI(video_fn2) + "</b><br>" + getMsgId("ma52"); // can't be played";

    video_err_msg += "<br>" + getMsgId("mb74");

    //document.getElementById("butFvideoGet").style.display="block";		
    return video_err_msg.replaceAll("%20", " ");
}

//------------------------------------------		 
function h1_hide_show(id1) {

    var language_name = document.getElementById("language").innerHTML.trim().toLowerCase();
    var M_language = language_name.charAt(0).toUpperCase() + language_name.slice(1);
    var id_language = document.getElementById("id_language").innerHTML.trim().toLowerCase();

    console.log("M language =>" + M_language + "<==" + " id=" + id_language + "<==");

    var x = document.getElementById(id1);

    if (x.style.display === "none") {
        x.style.display = "block";
        /**
        x.innerHTML = '<iframe id="id_iframe" src="doc/ClipByClip_description_' + myLang +
            '.html" title="Info"  style="width:100%;height:100%;border: 4px solid black;"></iframe>';
		**/
        x.innerHTML = '<iframe id="id_iframe" src="doc/doc_' + M_language + '/ClipByClip_HELP_' + id_language + '.html" ' +
            ' title="Info"  style="width:100%;height:100%;border: 4px solid black;"></iframe>';
    } else {
        x.style.display = "none";
    }
} //----------------------------------------

//------------------------------------------

function fun_after_drop_uno() {

    document.getElementById("id_video1").style.display = "block";

    document.getElementById("id_msg13A").innerHTML = "";
    document.getElementById("id_msg13A").style.backgroundColor = "rgb(0 142 255/52%)";



    var vid00 = document.getElementById("id_video1");
    if (vid00 == undefined) {
        return false;
    }

    if (vid00.src == undefined) {
        return false;
    }
    if (vid00.src == null) {
        return false;
    }
    if (vid00.src == "") {
        return false;
    }


    src_var = vid00.src;

    vid00.src = decodeURIComponent(src_var); // transform url encode to utf8  (eg. from %20 to ' ')  



    vid = vid00; //   document.getElementById("myVideo");
    vid.src = vid00.src;

    //console.log("fun_after_drop_uno()     vid.src=" + vid.src);

    document.getElementById("id_video1").style.display = "block";

    vid.addEventListener('error', function(e) {
        var video_err_msg = errorVideoFile(vid00.src);

        document.getElementById("id_video1").style.display = "none";


        document.getElementById("id_msg_viderr").innerHTML = video_err_msg + "<br>&nbsp;"; // nuovo 22/8/2021
        document.getElementById("id_msg_viderr").style.backgroundColor = "white"; // nuovo 22/8/2021

        //document.getElementById("id_div00_2").innerHTML = "<br><br><br>"; // nuovo 22/8/2021		

        //document.getElementById("id_div00").style.display = "block"; // nuovo 22/8/2021	

        document.getElementById('id_post_title').style.display = 'none'; // visible only if no error
        document.getElementById("butfold1").style.display = 'block';
        document.getElementById("id_video00_folder").style.display = 'block';

        return false;
    });

    // Initializing values
    isPlaying = false;
    // On video playing toggle values

    vid.onplaying = function() {
        isPlaying = true;
    };

    // On video pause toggle values
    vid.onpause = function() {
        isPlaying = false;
    };

    document.getElementById("id_msg13A").innerHTML = "";

    document.getElementById("id_video1").parentElement.style.display = "block";
    //document.getElementById("id_msg13A").style.display = "none";

    sw_ready_to_write = true;
    sw_video_ok = true;



    return true;
} // end of  fun_after_drop_uno()

//----------------
function h1_get_title() {
    var msgerr1 = get_titleTWO();
    if (msgerr1 != "") {
        document.getElementById("id_msg16").innerHTML = msgerr1;
        document.getElementById("id_msg16").style.backgroundColor = "white";
        document.getElementById("id_msg13A").innerHTML = msgerr1;
        document.getElementById("id_msg13A").style.color = "red";
        document.getElementById("id_msg13A").style.backgroundColor = "white";
        return;
    }

    if (sw_is_no_videoaudio) {
        document.getElementById("id_post_title").style.display = "none";
        document.getElementById("id_div15").style.display = "none";
        document.getElementById("id_div16").style.display = "block";
        confirm_subtitle_type("srt");
    } else {
        document.getElementById("id_post_title").style.display = "none";
        document.getElementById("id_div15").style.display = "block";
    }

} // end of h1_get_title()

//-------------------------------
function get_titleTWO() {
    //  function h1_get_title()          used in  html


    var vid = document.getElementById("id_video1");


    var dur = 0;
    try {
        dur = vid.duration; // just to test video 

        if (Number.isNaN(dur)) {
            console.log("video " + vid.src + "\n\terror duration=" + dur);
            document.getElementById("id_msg_viderr").innerHTML = "video error  duration = " + dur;
        }

        if (dur) {
            if (dur > 0) {
                console.log("video " + vid.src + "\n\tduration=" + dur);
                document.getElementById("id_msg_viderr").innerHTML = "duration=" + dur;
            } else {
                console.log("video " + vid.src + "\n\terror duration=" + dur);
                document.getElementById("id_msg_viderr").innerHTML = "video error  duration null";
            }
        }
    } catch (e1) {
        console.log("video " + vid.src + "\n\terror \n\t" + e1);
        document.getElementById("id_msg_viderr").innerHTML = "video error<br>" + e1;
    }

    var msgerr1 = "";
    var out_title = document.getElementById("out_title").value.trim();
    if (out_title == "") {
        msgerr1 = "<br>" + getMsgId("ma20"); //  "join1 m720 title is missing"
        return msgerr1;
    }
    sw_title_ok = true;

    HTML_TITLE = out_title;

    const d = new Date();
    INTRAFN = (HTML_TITLE + "_" + d.toJSON()).replaceAll("-", "_").replaceAll(":", "_").replaceAll(".", "_");

    out_html_file = "CBC_1_" + INTRAFN + ".html";
    script_lev2_fn = "CBC_2_" + INTRAFN + ".js";
    //
    //ClipByClip_" + HTML_TITLE + ".sub.js";

    //document.getElementById("id_titolo").innerHTML = HTML_TITLE;
    //document.getElementById("id_title15").innerHTML = HTML_TITLE;
    document.getElementById("id_title16").innerHTML = HTML_TITLE;

    var msg867_868 = "";

    msg867_868 += '<br><b>' + out_html_file + '</b>';
    msg867_868 += '<br><b>' + script_lev2_fn + "</b>";


    document.getElementById("m867_868").innerHTML = msg867_868;

    document.getElementById("id_div13A").style.display = "none";

    if (videoaudioTYPE == "audio") {
        document.getElementById("id_div15").style.display = "none";
        // document.getElementById("id_div16").style.display = "block";
        return "";
    }

    document.getElementById("id_div15").style.display = "block";
    if (sw_is_no_videoaudio == false) {
        //document.getElementById("id_videocopy").innerHTML = document.getElementById("myVideo").innerHTML; // 2021_09_11
        document.getElementById("id_videocopy").innerHTML = document.getElementById("id_video1").innerHTML; // 2021_09_11
    }
    return "";

} // end of get_titleTWO()

//----------------------------------

function confirm_subtitle_type(sub_type) {
    //  function confirm_subtitle_type()   used in  html

    HARD_subtitle = false;

    if (sub_type == "no") {
        HARD_subtitle = false;
        document.getElementById("id_div15").style.display = "none";
        //document.getElementById("id_div16").style.display = "block";
        place_id_hardsub = HARD_subtitle;
        document.getElementById("id_up_filetesto1").innerHTML = "";
        document.getElementById("txt_pagOrig").value = "";
        document.getElementById("txt_pagOrig").style.display = "none";
        h1_join_orig_trad(2);
    }
    if (sub_type == "hard") {
        HARD_subtitle = true;
        document.getElementById("id_div15").style.display = "none";
        //document.getElementById("id_div16").style.display = "block";
        place_id_hardsub = HARD_subtitle;

        document.getElementById("id_up_filetesto1").innerHTML = "<b>" + getMsgId("mb71") + "</b"; // m871 hard coded inside the video file    
        document.getElementById("txt_pagOrig").value = HARDCODED + "\nSUBTITLES\n";
        document.getElementById("txt_pagOrig").style.display = "none";
        h1_join_orig_trad(3);
    }
    if (sub_type == "srt") {
        HARD_subtitle = false;
        document.getElementById("id_div15").style.display = "none";
        //document.getElementById("id_div16").style.display = "block";
        place_id_hardsub = HARD_subtitle;
    }

} // end of h1_confirm_subtitle_type()
//------------------------------


//-------------------------------------------

function fun_script_file_download() {
    //  function fun_script_file_download()  used in  html

    if (sw_thereIs_noSub == false) {
        fun_test_orig_subtitle();
        if (sw_inp_sub_orig == false) { // original language subtitles are missing 		
            return;
        }
    }

    script_fn_download = write_script3(INTRAFN, orig_subtitles_string, tran_subtitles_string);

    document.getElementById("id_div16_down1").style.display = "none";
    document.getElementById("id_div16_down2").style.display = "block";

} // end of fun_script_file_download()

//-------------------------------------------

function fun_html_file_download() {
    //  function fun_html_file_download()    used in  html

    html_fn_download = "CBC_1_" + INTRAFN + ".html";
	
	html_fn_download   = correctFileName(  html_fn_download   );    
	script_fn_download = correctFileName(  script_fn_download );    

    // function second_level_html() is in file cbc_1_builder_3_lev2_html_model.jsHTML
	
    var text1 = second_level_html(HTML_TITLE, LS_video_path, video_filename, this_cbc_base, html_fn_download, script_fn_download);

    console.log("write_html3()  download " + html_fn_download);

    download(html_fn_download, text1);


} // end of fun_html_file_download()

//--------------------------------------------------
function fun_test_orig_subtitle() {

    fun_console("fun_test_orig_subtitle()");

    var msgerr1 = "";
    orig_subtitles_string = add_nodialog_clips3(get_subtitle_strdata(document.getElementById("txt_pagOrig").value.trim(), MARK_orig));

    place_id_file_suborig = "true";
    sw_inp_sub_orig = false;

    if (orig_subtitles_string != "") {
        sw_inp_sub_orig = true;
    } else {
        sw_inp_sub_orig = false;
        place_id_file_suborig = "false";
        msgerr1 += "<br>" + getMsgId("ma22"); //  ma22 the source language subtitle file  has not been read or is empty" ;         
    }

    return msgerr1;

} // end of fun_test_orig_subtitle()
//----------------------------------------------

//--------------------------------------------------

function fun_test_tran_subtitle(msgerrOrig) {

    fun_console("fun_test_tran_subtitle() ");

    var msgerr1 = "";

    tran_subtitles_string = add_nodialog_clips3(get_subtitle_strdata(document.getElementById("txt_pagTrad").value.trim(), MARK_tran));

    place_id_file_subtran = "true";
    sw_inp_sub_tran = false;

    if (tran_subtitles_string != "") {
        sw_inp_sub_tran = true;
    } else {
        sw_inp_sub_tran = false;
        place_id_file_subtran = "false";
		
        if (sw_translation_not_wanted == false) {
			msgerr1 += "<br>" + getMsgId("ma23"); //  ma23  translated subfile missing     					
			if (msgerrOrig == "") { // only if original srt is Ok  
				msgerr1 += "<br>" + getMsgId("ma26").replace("§...§", TRANSLATION_NOT_WANTED).
				replace("§m705§", getMsgId("m705")); // if yout don't want transl. srt type ...
			}
        }
    }
    return msgerr1;

} // end of fun_test_tran_subtitle()

//----------------------------------------------

function h1_join_nothing() {
    fun_console("h1_join_nothing()");

    sw_thereIs_noSub = true;
    place_id_file_suborig = "false";
    place_id_file_subtran = "false";
    orig_subtitles_string = "";
    tran_subtitles_string = "";
    sw_inp_sub_orig = false;
    sw_inp_sub_tran = false;
    document.getElementById("id_div16").style.display = "none";
    document.getElementById("id_div16_down1").style.display = "block";

    var empty_srt = "";
    /**
    var	dur =  vid.duration;
    if (Number.isNaN(dur) ) {
    	return;
    }
    **/
    var timesec3 = 0;

    var HHMM = sec2time(timesec3).replace(".", ",");
    var preHHMM = HHMM;
    var noth_txt = NO_TEXT_NO_SUBTITLES;
    for (timesec3 = 0; timesec3 < 3; timesec3++) {
        preHHMM = HHMM;
        HHMM = sec2time(timesec3).replace(".", ",");
        empty_srt += timesec3 + "\n" + preHHMM + " --> " + HHMM + "\n" + noth_txt + "\n\n";
    }
    console.log("empty_srt=" + empty_srt);
    document.getElementById("txt_pagOrig").value = empty_srt;
    document.getElementById("txt_pagTrad").value = empty_srt;

    h1_join_orig_trad(10);


} // end of h1_join_nothing()

//----------------------
function putMsgerr(msgerr1) {
    if (msgerr1 == "") {
        document.getElementById("id_msg16").style.display = "none";
    } else {
        if (msgerr1.substring(0, 4) == "<br>") {
            msgerr1 = msgerr1.substring(4);
        }
        document.getElementById("id_msg16").innerHTML = msgerr1;
        document.getElementById("id_msg16").style.backgroundColor = "white";
        document.getElementById("id_msg16").style.display = "block";
    }

    // document.getElementById("id_div16").style.display = "none";
    document.getElementById("id_div16_down1").style.display = "none";
    document.getElementById("id_div16_down2").style.display = "none";

} // end of putMsgerr()

//-------------------------------------

function isError_type_orig_tran() {

	var type_orig = document.getElementById("inpFileTypeOrig").innerHTML;
	var type_tran = document.getElementById("inpFileTypeTran").innerHTML;
	
	if (type_orig == "") {
		return false;    // can't check 
	}
	if (type_tran == "") {
		return false;    // can't check 
	}
	if (type_orig == type_tran) {
		return false;   // no error 
	}
	var msg = getMsgId("m015").replace("§origtype§", type_orig).replace("§trantype§", type_tran); 	
	putMsgerr(msg);
    document.getElementById("id_msg16").style.color = "red";
	
	return true;

} // end of isError_type_orig_tran()

//--------------------------
function h1_join_orig_trad(where) {
    //  function h1_join_orig_trad()     triggered in  html

    fun_console("h1_join_orig_trad()");

    document.getElementById("id_msg16").innerHTML = "";
	
	if (isError_type_orig_tran() ) {  
        return;
	}
    
	console.log("\t h1_join_orig_trad() no type match error"); 
	
    sw_translation_not_wanted = false;
    sw_srt_error = false;	
	var msgerr0 = ""; 
    
	var msgerr1 = fun_test_orig_subtitle(); // get orig. text /srt
	
    var sw_srt_error1 = sw_srt_error;
    if (sw_srt_error) {
        msgerr0 += "<br>" + getMsgId("ma25").replace("§file§", getMsgId("m704")); //wrong srt 
        putMsgerr(msgerr0);
        document.getElementById("id_msg16").style.color = "red";
    }
    sw_srt_error = false;

    var msgerr2 = fun_test_tran_subtitle(msgerr1); // get tran. text/srt	

    if (sw_srt_error) {
        msgerr0 += "<br>" + getMsgId("ma25").replace("§file§", getMsgId("m705")); //wrong srt 
        putMsgerr(msgerr0);
        document.getElementById("id_msg16").style.color = "red";
        return;
    }
    if (sw_srt_error1) {
        return;
    }

    msgerr0 += msgerr1 + msgerr2;
    var msgerr3 = "";

    if (sw_is_no_videoaudio == false) {
        // if there's a video/audio file, there must be srt only or nothing  
        if (sw_inpSRT_only == false) {
            // there is a text file that can't be used at all  
            msgerr3 = "<br>" + getMsgId("ma24");
        } else {

        }
    }
    msgerr0 += msgerr3;

    if (msgerr0 != "") {
        putMsgerr(msgerr0);
        document.getElementById("id_msg16").style.color = "red";
        return;
    }
    document.getElementById("id_msg16").style.color = null;
    document.getElementById("id_div16").style.display = "none";
    document.getElementById("id_div16_down1").style.display = "block";
    document.getElementById("id_div16_down2").style.display = "block";

    return;

    //=================

    function canIclose() {

        alert(getMsgId("ma89")); // ma89 If the 2 files have been downloaded, press OK to exit<
        window.close();
        return "OK";
    }
    async function wait_and_close() {
        var myPromise = new Promise(
            function(resolve) {
                // wait 5 seconds and the ask to close
                setTimeout(function() {
                    resolve(canIclose());
                }, 10000);
            }
        );
        var ok1 = await myPromise;
    }

    wait_and_close();

    //==============================


} // end of h1_join_orig_trad()
//----------------------------------------------------

function write_script3(intrafn, TXTorig, TXTtran) {
    var hscr1 = "";
    hscr1 += "//---------------------------- \n";
    hscr1 += "// you can change the following 2 address constants, but please  leave string.raw  and back-ticks ( ` = ALT + 96 ), otherwise you loose the back slash characters\n";
    hscr1 += "//------------------------------------------------ \n";
    hscr1 += "\n";
    var hscr2 = "var x_vidpath = String.raw`file:///" + LS_video_path + "` ; \n";

    var cbc_base = this_cbc_base;
    if (cbc_base.indexOf("file:///") == 0) {
        cbc_base = cbc_base.substring(8);
    }
    var hscr3 = "var x_main_code_folder = String.raw`" + cbc_base + "`;	\n";

    hscr1 += hscr2 + hscr3;
    hscr1 += "//----------------------------------------------------------------------------------\n";
    //hscr1 += 'var x_title   = "'  + HTML_TITLE + '";\n';  
    //hscr1 += 'var x_vidfile = "'  + video_filename + '"; \n';  

    hscr1 += "var x_title   = String.raw`" + HTML_TITLE + "` ; \n";
    hscr1 += "var x_vidfile = String.raw`" + video_filename + "` ; \n";

    hscr1 += 'var x_vid_width     = ' + video_native_width + ';\n';
    hscr1 += 'var x_vid_height    = ' + video_native_height + ';\n';
    hscr1 += 'var x_xhardsub      = ' + HARD_subtitle + ';\n';
    hscr1 += 'var x_xfile_suborig = ' + sw_inp_sub_orig + ';\n';
    hscr1 += 'var x_xfile_subtran = ' + sw_inp_sub_tran + ';\n';
    const time_builder = new Date();
    const time_limit = time_builder.setSeconds(time_builder.getSeconds());
    var fmt_time_limit = (new Date(time_limit)).toLocaleString();


    var id_language = document.getElementById("id_language").innerHTML.trim().toLowerCase();


    hscr1 += 'var x_bldtime       = ' + time_limit + ';  //build time ' + fmt_time_limit + '\n';
    hscr1 += 'var x_language      = "' + id_language + '";  // 2 character language id ' + '\n';
    hscr1 += 'var x_reset_storage = false;   // reset previous run values (default=false)' + '\n';
    hscr1 += '//-----------------------------------------\n\n';


    var tick = "`"; // ALT + 96 
    //---------------------------------------------
    var dwn_msg = "";

    dwn_msg += hscr1;

    /**
    dwn_msg += "var txta_msg = " + tick + "\n" ; 
    for (var k = 0; k < list_msg_id.length; k++) {
    		var msgid = list_msg_id[k];
    		var msgtxt = list_msg_text[k];
    		var hmsgid = "m" + msgid;
    		
    		dwn_msg += msgid + ":" + msgtxt + "\n" ;
    }
    dwn_msg += tick + "; \n";
    **/


    /***
    //var str_orig = TXTorig.replaceAll('"', '&quot;').replaceAll("'", "&apos;");
    //var str_tran = TXTtran.replaceAll('"', '&quot;').replaceAll("'", "&apos;");
	var str_orig = TXTorig;
    var str_tran = TXTtran; 
	**/
    /***
    var text1 = "var txta_orig_sub = " + tick + "\n" + str_orig + "\n" + tick + "; // end of  txta_orig_sub"+ "\n" +
				"\n" + 
				"var txta_tran_sub = " + tick + "\n" + str_tran + "\n" + tick + "; // end of  txta_tran_sub" + "\n" +
				"// end of script "; 
				
	**/
    var text1 = "var txta_orig_sub = " + tick + TXTorig + tick + "; // end of  txta_orig_sub" + "\n" +
        "\n" +
        "var txta_tran_sub = " + tick + TXTtran + tick + "; // end of  txta_tran_sub" + "\n" +
        "// end of script ";


    //var script_sub_fn = "CBC_2_" + intrafn +  ".js"; 
    var script_sub_fn = "CBC_1_" + intrafn + ".js";
	
	script_sub_fn = correctFileName( script_sub_fn );    

    download(script_sub_fn, dwn_msg + text1);

    return script_sub_fn;

} // end write-script 


//------------------------------
function get_this_file_path(this_path0) {

    var ll = this_path0.length;
    var this_path = this_path0;
    var lastChar = this_path0.substring(ll - 1, ll);
    if ((lastChar == "/") || (lastChar == "\\")) {
        this_path = this_path0.substring(0, ll - 1);
    }
    var this_file = "",
        this_root = "";
    var p1 = Math.max(0, this_path.lastIndexOf("/"));
    var p2 = Math.max(0, this_path.lastIndexOf("\\"));
    var p3 = Math.max(p1, p2);
    if (p3 < 0) {
        this_file = this_path;
    } else {
        this_file = this_path.substr(p3 + 1);
        this_root = this_path.substring(0, p3 + 1);
    }
    console.log("path=" + this_path0 + "\nroot=" + this_root);
    return this_root;

} // end of get_this_file_path()


//-----------------------------------
function time_split(str1) {
    //    123.000:224.000:: text123
    var pp = str1.split("::");
    return [parseFloat(pp[0]), parseFloat(pp[1])];
}

//=========================================
function fun_missing_text_file() {

    fun_console("fun_missing_text_file()");

    document.getElementById("id_div16").style.display = "none";
    h1_join_nothing();

} // end of fun_missing_text_file() 


//---------------------------

function h1_fileRead(input, miotext, inpFileType) {
    //  function h1_fileRead()        used in  html
    fun_console("h1_fileRead() " + input.id);
    document.getElementById("id_msg16").innerHTML = "";

    var srt1_filename = "";
    var srt1_filetype = "";
    var srt1_filesize = "";
    var srt1_fsize = "";
    var sw_fileerror = "";
    var file_id1 = "";
    var file_err1 = "";

    var arr_out = h1_get_file_name_type(input, " text ");

    [srt1_filename, srt1_filetype, srt1_filesize, srt1_fsize, sw_fileerror, file_id1, file_err1] = arr_out;
    if (srt1_filename == "") {
        return;
    }
    if (srt1_filetype == "") {
        var j1 = srt1_filename.lastIndexOf(".");
        if (j1 > 0) {
            srt1_filetype = srt1_filename.substring(j1 + 1);
        }
    }
    document.getElementById(inpFileType).innerHTML = srt1_filetype;

    document.getElementById("match1").style.display = "block";
    document.getElementById("ma18").style.display = "block";
    if (sw_fileerror) {
        document.getElementById("id_msg16_err").style.display = "block";
        //document.getElementById(miotext).value = arr_out[0] + "<br>" + arr_out[1] + getMsgId("mb64");
        /**
        document.getElementById(miotext).value = "file read error " + 
        	"filename="+srt1_filename + "<br>" + " type=" + srt1_filetype + " size="+ srt1_filesize + " = " + srt1_fsize + 
        	" err=" + sw_fileerror + "<br>" + " id=" + file_id1 + " file_err1=" + file_err1; 
        **/
        console.log("file read error " +
            "filename=" + srt1_filename + "<br>" + " type=" + srt1_filetype + " size=" + srt1_filesize + " = " + srt1_fsize +
            " err=" + sw_fileerror + "<br>" + " id=" + file_id1 + " file_err1=" + file_err1);

        var msg2 = getMsgId("mb65"); //  is not a text file	

        document.getElementById("id_msg16_err").innerHTML = "<br>" + arr_out[0] + "<br>" + arr_out[1] + "<br>" + msg2;

        document.getElementById("match1").style.display = "none";
        document.getElementById("ma18").style.display = "none";

        return;
    }
    document.getElementById("id_msg16_err").style.display = "none";

    document.getElementById("id_msg13A").innerHTML = "";
    document.getElementById("id_msg13A").style.color = "red";

    try {
        var file = input.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            document.getElementById(miotext).value = reader.result;
        };
        reader.onerror = function() {
            document.getElementById(miotext).value = reader.error;
        };
    } catch (e1) {
        console.log("error in " + "h1_fileRead() " + input.id);
        console.log("\tfilename=" + srt1_filename + "\n\ttype=" + srt1_filetype + " size=" + srt1_filesize + " = " + srt1_fsize + " err=" + sw_fileerror);
        console.log("\t" + e1);
    }
} // end of h1_fileRead(); 

//---------------------------------------------

function eliminate_builder_part(htmltext) {
    var k1 = -1;
    var jendH = htmltext.indexOf("<\/head>", k1 + 1);

    var jnotL2b = htmltext.indexOf("NOT_IN_LEV2_BEGIN");
    if ((jnotL2b > 0) && (jnotL2b < jendH)) {
        var jnotL2e = htmltext.indexOf("NOT_IN_LEV2_END", jnotL2b);
        if ((jnotL2e > 0) && (jnotL2e < jendH)) {
            htmltext = htmltext.substring(0, jnotL2b) + " " + htmltext.substring(jnotL2e + 15);
            /**
			htmltext = htmltext.substring(0, jnotL2b) +
			
                " --> \n" +
                "     <script >                                     \n" +
                "	      var SECOND_LEVEL = true;                  \n" +
                "	      function onloaded_fun(fvideo, fperc) {};  \n" +
                "     </script>                                     \n" +
                "<!-- " +

                htmltext.substring(jnotL2e + 15);
			**/
        }
    }


    k1 = htmltext.indexOf("<body");
    var k2_10 = htmltext.indexOf("id_div10", k1);
    var k3_20 = htmltext.indexOf("id_div20", k2_10);

    var newtext = htmltext.substring(0, k2_10) + htmltext.substring(k3_20);

    return newtext; //   newtext.replace("display:none","display:block")  

} // end of  eliminate_builder_part
//------------------------------------------	
function h1_write_html() {

    if (sw_video_ok && sw_sub_ok && sw_title_ok) {

    } else {
        return;
    }

    var save_title = document.title;

    document.title = out_html_file;

    var htmltext = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

    if (DEBUG) {
        download("debug" + ".html",
            htmltext.replace("none", "block")
        );
    }


    htmltext = eliminate_builder_part(htmltext);

    document.title = save_title;
    var downfilename = out_html_file + ".html";
	downfilename = correctFileName(  downfilename ); 
	
    download(downfilename, htmltext);
    return downfilename;
}

//------------------------------------------	
function download(filename, text) {

    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(text));
    /**	
    if (filename.indexOf(".html") > 0) {
    	filename += ".txt"; 
    }
    **/

    console.log("element.setAttribute('download'," + filename + ")");

    element.setAttribute('download', filename);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

//--------------------------------------------------
function get_file_mime_type(id_input, loadedfile) {

    //   https://humanwhocodes.com/blog/2012/05/08/working-with-files-in-javascript-part-1/

    var control = document.getElementById(id_input);
    control.addEventListener("change", function(event) {
        // When the control has changed, there are new files

        var files = control.files;

        for (var i = 0; i < files.length; i++) {
            loadedfile.push(
                [id_input, i, files[i].type, files[i].size, files[i].name]
            );
        }
    }, false);
}

//-----------------------------------------------------

function modify_video_dimensions2(vid, h_percentage) {

    if (videoaudioTYPE == "audio") { // audio file  
        vid.parentElement.style.width = "90%";
        vid.style.width = "100%";
        vid.parentElement.style.height = (h_percentage * 100).toFixed(0) + "%";
        vid.style.height = "3.0rem";
        /**
        console.log("audio hpercentage=" + h_percentage + "  parent width=" + vid.parentElement.style.width +
            " height=" + vid.parentElement.style.height +
            "    vid width=" + vid.style.width + "  height=" + vid.style.height);
		**/
        return;
    }
    //----------------------
    var ww0 = document.getElementById("id_div13A").offsetWidth;

    var hh0 = document.getElementById("id_div13A").offsetHeight;
    var hh1 = 0; //document.getElementById("idf1").offsetHeight;  
    var hh2 = document.getElementById("id_video00_folder").offsetHeight;
    var hh3 = document.getElementById("butfold1").offsetHeight;
    var hh4 = document.getElementById("id_title1").offsetHeight;
    var hh5 = 0; // document.getElementById("id_butFcont2").offsetHeight;    

    var video_maximum_height = hh0 - (hh1 + hh2 + hh3 + hh4 + hh5 + 5 * 30);
    var video_maximum_width = ww0 - 20;
    video_maximum_height = 0.70 * video_maximum_height;

    reduceVideoDimensions(video_maximum_width, video_maximum_height);

    var vid2 = document.getElementById("id_video1");
    console.log("video 1  w=" + vid2.offsetWidth + "  h=" + vid2.offsetHeight);
    vid2.style.width = newVidWperc.toFixed(0) + "%";
    vid2.style.height = "auto";
    console.log("video 2  w=" + vid2.offsetWidth + "  h=" + vid2.offsetHeight);

} // end of modify_video_dimensions2()	  
//-------------------------------------

function onloaded_fun(fvideo, fperc) {
    // function onloaded_fun() used in html 

    video_native_height = fvideo.videoHeight;
    video_native_width = fvideo.videoWidth;
    console.log("video dimension w=" + video_native_width + " h=" + video_native_height);

    modify_video_dimensions2(fvideo, fperc);

}

//----------------------------------------------------------------

function initial_from_localStorage_values() {
    //----------------------
    // the LS_ ... default values are replaced by the those of the previous session ( if they exist)

    // from localStorage to variables LS_... 

    var stored_cbc_localStor = JSON.parse(localStorage.getItem(cbc_LOCALSTOR_key)); //get them back

    if (stored_cbc_localStor) {
        [
            LS_video_path
        ] = stored_cbc_localStor;
    } else {
        set_localStorage_var();
    }

    //list_localStorageItems();

    video_folder_path = LS_video_path;
    document.getElementById("id_vid_folder").value = LS_video_path;

    console.log("\n initial_from_localStorage_values() " + "\n\tLS_video_path=" + LS_video_path + "\n\tvideo_title=" + video_title + "\n");

} // end of initial_from_localStorage_values()

//------------------------------------------------------------------------

function set_localStorage_var() {

    fun_console("set_localStorage_var()  key=" + cbc_LOCALSTOR_key);

    var cbc_LOCALSTOR_val_list = [
        LS_video_path
    ];


    localStorage.setItem(cbc_LOCALSTOR_key, JSON.stringify(cbc_LOCALSTOR_val_list)); //store colors

    var key = cbc_LOCALSTOR_key;
    var value = localStorage[key];

    console.log("\nxxxxxxxxxxxxxxxxxxxx\nset_localStorage_var() => " + "localStorage key=" + key + "\t = " + value);

    //list_localStorageItems();

}
//------------------------------------------------------------------------------


function remove_localStorageItems() {
    try {
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            localStorage.removeItem(key);
        }
    } catch (e1) {}
} // end of remove_localStorageItems()

//-------------------------------------------------
//remove_localStorageItems()
//list_localStorageItems();
//------------------------------------
function list_localStorageItems() {
    try {
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);

            var value = localStorage[key];

            console.log("localStorage key=" + key + "\t = " + value);
        }
    } catch (e1) {}
} // end of list_localStorageItems()
//-------------------------------------------------
//list_localStorageItems();

//---------------------------------------------
function correctFileName( str1 ) {

	var toAvoid = "#%&{}\<>*?/$!";  
		toAvoid += " "; 
		toAvoid += "\'\"\`"; 
		toAvoid += ":@+"; 
		toAvoid += "|="; 
	var str2 = str1;	
	
	for(var g=0; g<toAvoid.length; g++) {
		str2 = str2.replaceAll( toAvoid.charAt(g),"_"); 
	}  		
   return str2; 

} // end of correctFileName() 

//==================================================================