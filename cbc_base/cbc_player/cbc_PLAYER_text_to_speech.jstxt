"use strict";
/*  
ClipByClip: A tool to practice language comprehension
Antonio Cigna 2021/2022
license MIT: you can share and modify the software, but you must include the license file 
*/
/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint undef: true, unused: true */
//---------------------------------------
//
//   text to speech 
//
//======================================================================
var startTime;
var txt_length; 
var sw_pause = false; 
var time_limit = 15; // in seconds  //  it seems that  an utterance can't last more     
var ELAPSED_TIME_SPEECH_LIMIT = 1000 * ( time_limit - 1) ;  

var tot_norm_time = 0;
var tot_txt_len =0;	
var tot_norm_mill_char = 0; 	  
var tot_norm_str_leng_limit = 0;	 
var TXT_SPEECH_LENGTH_LIMIT = 80; // initial value is updated according to the actual duration runs
//----
var TTS_LOOP_begix=-1;
var	TTS_LOOP_endix=-1; 
var	TTS_LOOP_swLoop=false; 	
var TTS_LOOP_elem;   
//-----------------
var textLines = [];

const synth = window.speechSynthesis;
var utteranceList = [];

let Utt_zero = new SpeechSynthesisUtterance();
Utt_zero.lang = "en";

let voiceList = []; // voices got from the machine 

let speech_voice;
let speech_volume = 1;
let speech_rate = 1;
let speech_pitch = 1;


//----------------

function speak_a_line(utter1) {

	set_speech_Parms(utter1); 
	
    synth.speak(utter1);
	
} // end of speak_a_line()
//-------------------------------------------
var x1_line = -1;
//---------------------
function speech_end_fun() {

    x1_line++;
	
	if ((x1_line) >= textLines.length) {
		//console.log("speech_end_fun()1");
		end_speech(); // defined in the caller   **   Feb 11, 2023	
		return;
	}
    var utter1;
    //rigout += textLines[x1_line] + "<br>";
    
    //console.log("speech_end_fun() " + x1_line + ":  " + rigout.replaceAll("<br>", "\n"));
	
	
   // console.log("Utterance has finished being spoken after " + event.elapsedTime + " seconds.");

    if ((x1_line + 1) >= textLines.length) 
		{	
			//console.log("speech_end_fun()2");
			end_speech(); // defined in the caller   **   Feb 11, 2023	
			return;
		}	
	
    utter1 = utteranceList[x1_line + 1];
    utter1.onend = speech_end_fun;
	
	//utter1.onend = (event) =>  {speech_end_fun(event) } ;

	
    speak_a_line(utter1);
	
} // end of speech_end_fun

//----------------------------------------------------------

function onclick_text_to_speech(txt1) {
	//console.log("XXXXXXXXXXXX start " ); 
	
	sw_pause = false; 	
	startTime = new Date();	
	txt_length = txt1.length; 
	
	utteranceList = []; 
	x1_line=-1; 
    var newLine = break_text(txt1, TXT_SPEECH_LENGTH_LIMIT, false);  // 3rd param true =  sw_hold_existing_endOfLine
    textLines = newLine.split("\n");
    var utter1;
    var riga;
	//------------
    for (var v1 = 0; v1 < textLines.length; v1++) {
        riga = textLines[v1];
        utter1 = new SpeechSynthesisUtterance(riga);
        utteranceList.push(utter1);
    }
    utter1 = utteranceList[0];
    
	utter1.onend = speech_end_fun;
	
	//utter1.onend = (event) =>  speech_end_fun;
	
    speak_a_line(utter1);	
	

} // end of onclick_text_to_speech() 	
//----------------------------------



//-------------------------------------
function set_speech_Parms(speech1) {
    speech1.voice = speech_voice;
    speech1.volume = speech_volume;
    speech1.rate = speech_rate;
    speech1.pitch = speech_pitch;
}

//----------------------------------
function set_defaultLanguage(voiceSelect) {
    if (LS_voice_index >= 0) {
        var ixDefault = parseInt(LS_voice_index);
        voiceSelect[ixDefault].selected = true;
        return;
    }

    var ixDefault = 0;
    var txt1 = "";
    for (var u = 0; u < voiceSelect.length; u++) {
        txt1 = voiceSelect[u].text.toLowerCase();
        if (txt1.indexOf("english") < 0) continue;
        ixDefault = u;
        if (txt1.indexOf("female") >= 0) break;
    }
    voiceSelect[ixDefault].selected = true;
}
//------------------------------------------------
function set_langauge_ix(vindex) {
	var voiceSelect = document.getElementById("id_voices");
	voiceSelect[vindex].selected = true;	
    speech_voice = voiceList[vindex];	
	console.log("XXXX  voice: " + 
		" index=" + LS_voice_index +
		 " lang=" + speech_voice.lang +
		 " name=" + speech_voice.name ); 
} 
//-------------------------------------------------------------
window.speechSynthesis.onvoiceschanged = () => {
	console.log("1 onvoiceschanged()"); 

    voiceList = window.speechSynthesis.getVoices();

    let voiceSelect = document.getElementById("id_voices");
    voiceList.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));

    set_defaultLanguage(voiceSelect);
	
	onclick_change_voice( voiceSelect ) ;      

}; // end of window.speechSynthesis.onvoiceschanged =()  

//-----------------------------
function onclick_change_voice(this1) {
	
	//var this1 = document.getElementById("id_voices");
	
	console.log("2 onclick_change_voice()"); 
    var vindex = this1.value;
    speech_voice = voiceList[vindex];	
	
	LS_voice_index = vindex; 	
	
	fun_set_localStorage_item_from_vars(); 	
	
    console.log("XXXX  voice: " + 
		" index=" + LS_voice_index +
		 " lang=" + speech_voice.lang +
		 " name=" + speech_voice.name ); 
	
} // end of  onclick_change_voice(); 

//-----------------------------------------
//--------------------------------------------


document.querySelector("#volume").addEventListener("input", () => {
    speech_volume = document.querySelector("#volume").value;
    document.querySelector("#volume-label").innerHTML = speech_volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
    speech_pitch = document.querySelector("#pitch").value;
    document.querySelector("#pitch-label").innerHTML = speech_pitch;
});

document.querySelector("#id_voices").addEventListener("change", () => {
    speech_voice = voiceList[document.querySelector("#id_voices").value];
});
//----------------------------------

function onclick_change_synth_rate(this1) {
	speech_rate = parseFloat(this1.value);
	if (speech_rate < 0.25) { 
		speech_rate = 0.25; 
	}
	document.getElementById("rate-label").innerHTML = speech_rate;
	document.getElementById("id_syncRate1").value = speech_rate;
	document.getElementById("id_setSpeedy").value = speech_rate;
}

//-------------------------------------------
var lastBold_ix1 = -1;
var lastBold_ix2 = -1; 
//---------------------
function tts_remove_last_bold() {
	
	if (lastBold_ix2 < 0) return;
	
	for(var v=lastBold_ix1; v <= lastBold_ix2; v++) {
		var ele1 = document.getElementById("idc_" + v);
		var ele1_tr = ele1.parentElement.parentElement ;
		//ele1.style.visibility = "hidden"; 	
		ele1.classList.remove("boldLine");
		ele1.style.backgroundColor = null; 
		ele1.parentElement.style.border = null; // "1px solid red"; 
		ele1_tr.style.backgroundColor = "lightgrey"; // "yellow";	//feb	  
	} 
	lastBold_ix2 = -1;
}
//------------------------------
function tts_showHide_if_book_opened_from_to(z3a,z3b) {
	
	removeLastBold(); 
	
	//console.log("2tts showHide " + z3a + " " + z3b );
	
	var ele_to_test = document.getElementById("idb_" + z3a + "_m"); 
	
	//console.log("ele_to_test=" + ele_to_test.outerHTML); 
	
	if (ele_to_test.children[0].style.display == "block") {  // openbook ==> show 
		for(var v=z3a; v <= z3b; v++) {			
			var ele1 = document.getElementById("idc_" + v);
			var ele1_tr = ele1.parentElement.parentElement ;
			ele1.style.visibility = "visible"; 
			ele1.classList.add("boldLine"); 
			ele1.style.backgroundColor = "yellow";			
			ele1.parentElement.style.border = null;
			//feb if (sw_is_no_videoaudio == false) ele1_tr.style.backgroundColor = "yellow";		
			if (ele1_tr) ele1_tr.style.backgroundColor = "yellow";	//feb 	
		} 
	}
	lastBold_ix1 = z3a;
	lastBold_ix2 = z3b;
}
//----------------------------------
function tts_showHide_if_book_opened(z3) {

	removeLastBold()	
	
	//console.log("1tts showHide " + z3 );
	
	var ele1 = document.getElementById("idc_" + z3)
	var ele_to_test = document.getElementById("idb_" + z3)
	
	var ele1_tr = ele1.parentElement.parentElement ;

	var last_tr; 
	
	if (ele1 == null) {return;}	
	
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
	lastBold_ix1 = z3;
	lastBold_ix2 = z3;
		
} // end of tts_showHide_ORIG_if_book_opened() 


//-------------------------
function onclick_text_to_speech_ix(num1, swLoop, this1) {
    var txt1 = document.getElementById("idc_" + num1).innerHTML;
	
	tts_showHide_if_book_opened(num1) ;
	
	TTS_LOOP_begix=num1;
	TTS_LOOP_endix=num1; 
	TTS_LOOP_swLoop=swLoop; 	
	TTS_LOOP_elem = this1;
    onclick_text_to_speech(txt1);

} // end of onclick_text_to_speech_ix()


//----------------------------------

function onclick_text_to_speech_from_to(begix, endix, swLoop) {

	tts_showHide_if_book_opened_from_to(begix, endix); 

	TTS_LOOP_begix=begix;
	TTS_LOOP_endix=endix; 
	TTS_LOOP_swLoop=swLoop; 	
	
    var txt1 = "";
    for (var t1 = begix; t1 <= endix; t1++) {
        var txt0 = document.getElementById("idc_" + t1).innerHTML.trim();
        if (txt0.substring(txt0.length - 1) != ".") {
            txt0 += ".";
        }
        txt1 += document.getElementById("idc_" + t1).innerHTML;
    }
    onclick_text_to_speech(txt1);

} // end of onclick_text_to_speech_from_to()

//----------------------
function onclick_speech_pause() {
    console.log("onclick_speech_pause()");
	sw_pause = true; 
    //window.speechSynthesis.pause();
	synth.pause(); 
}
//---------------------
function onclick_speech_resume() {
    console.log("onclick_speech_resume()");
	sw_pause = false; 
    window.speechSynthesis.resume();
	synth.resume(); 
}
//---------------------
function onclick_speech_cancel() {
    console.log("onclick_speech_cancel()");
	
	synth.cancel();
    //window.speechSynthesis.cancel(); 
	
	
}
//--------------------------------------------
function end_speech_calculation() {
	
	// called by end_speech() in cbc_player_script   and cbc_player_word_script
	
	var  endTime = new Date();
	  var timeDiff = endTime - startTime; //actual elapsed time in ms 
	  
	 if (txt_length < 1) { return; }
	 
	  var mill_char = timeDiff / txt_length; 
	  
	  /**
	  console.log("\n---------------------------------\nend of speech: " + 
		"\n\tactual:    " + "elapsed time=" +  timeDiff + ", text length =" + txt_length +  " characters , millisecondi x carattere= " + mill_char )  ;
	  **/
	 
	 var normal_time = timeDiff * speech_rate ; 
	 
	 var normal_mill_char = normal_time / txt_length; 	  
	 var normal_string_length_limit = ELAPSED_TIME_SPEECH_LIMIT / normal_mill_char;
	 var TXT_SPEECH_LENGTH_LIMITNow =  parseInt(normal_string_length_limit * speech_rate) ; 
	 
	
	 /**
	 console.log(" \tnormalized: elapsed time=" + normal_time + ", text length =" + txt_length + ",  millsecs x char=" +  normal_mill_char.toFixed(1) + 
			      "\t            maximum string length limit = " + normal_string_length_limit.toFixed(1) +
			" (string spoken in " + (ELAPSED_TIME_SPEECH_LIMIT/1000) + " seconds" );
	 console.log(" \tactual now: maximum string length limit = " + TXT_SPEECH_LENGTH_LIMITNow); 
	 //--
	 
	 console.log("\n normalized:   millsecs x char=" +  normal_mill_char.toFixed(1) + ",\tmax str.leng.= " + normal_string_length_limit.toFixed(1) +
		" \tACTUAL:  max str.leng.= " +  TXT_SPEECH_LENGTH_LIMITNow.toFixed(1) + "  (speech rate=" + speech_rate+")" )
	 **/
	 
	 //-----------
	 tot_norm_time += normal_time;
	 tot_txt_len   += txt_length;	
	 tot_norm_mill_char = tot_norm_time / tot_txt_len; 	  
	 tot_norm_str_leng_limit =  ELAPSED_TIME_SPEECH_LIMIT / tot_norm_mill_char;	 
	 TXT_SPEECH_LENGTH_LIMIT =  parseInt(tot_norm_str_leng_limit * speech_rate) ; 
	 /**
	 console.log("---------"); 
	 console.log(" \tTOT normalized: elapsed time=" + tot_norm_time + ", txt_len=" + tot_txt_len  +  ", millsecs x char=" +  tot_norm_mill_char.toFixed(1) + 
			      "\t                maximum string length limit = " + tot_norm_str_leng_limit.toFixed(1) +
			" (string spoken in " + (ELAPSED_TIME_SPEECH_LIMIT/1000) + " seconds" );
	 
	 console.log(" \tTOT to be used: maximum string length limit = " + TXT_SPEECH_LENGTH_LIMIT + "   \n"); 
	 //----
	 
	 console.log("TOT.normalized:millsecs x char=" + tot_norm_mill_char.toFixed(1) + ",\tmax str.leng.= " + tot_norm_str_leng_limit.toFixed(1) +
		" \tACTUAL:  max str.leng.= " + TXT_SPEECH_LENGTH_LIMIT  + "  (speech rate=" + speech_rate +")");
	**/	
	
	//console.log("last max str.leng.= " +   TXT_SPEECH_LENGTH_LIMITNow.toFixed(1)+" \t " + " TOT. max str.leng.= " + TXT_SPEECH_LENGTH_LIMIT  + "  (speech rate=" + speech_rate +")");
		
	loopManager(); 	
	 
} // end of end_speech_calculation() 
//-------------------------------------------
function loopManager() {

	if (TTS_LOOP_swLoop == false) return; 
	
	
	// wait 1 second and then start again  
	setTimeout(function() {
					if (TTS_LOOP_begix == TTS_LOOP_endix) {onclick_text_to_speech_ix( TTS_LOOP_begix, TTS_LOOP_swLoop,TTS_LOOP_elem);
					} else {
					onclick_text_to_speech_from_to( TTS_LOOP_begix, TTS_LOOP_endix, TTS_LOOP_swLoop) ;
					}
				}, 
				1000);	
} // end of loopManager()

//---------------