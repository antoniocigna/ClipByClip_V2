"use strict";
/*  
ClipByClip: A tool to practice language comprehension
Antonio Cigna 2021/2022
license MIT: you can share and modify the software, but you must include the license file 
*/
/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint undef: true, unused: true */

//----------------------------------------------------------
// break text into lines always for: end of sentence (.), question mark(?), exclamation(!), semicolon(;)  
// break only if the line is too long for (1) color(":"), (2) comma(j) and (3) space 
	
//------------------------------------------------	

//----------------------------------------------------------
function break_priority(txt1, maxLen, sw_let_old_newline ) {
	
	if (sw_let_old_newline == false) {
		txt1 = txt1.replaceAll("\n", " ");  // eliminate existing newline  
	} 
	
	// break text into lines always for: end of sentence (.), question mark(?), exclamation(!), semicolon(;)  
		
    var row1 = txt1.replaceAll("<br>", "\n").
		replaceAll(". ", ".\n").
		replaceAll("? ", "?\n").
		replaceAll("! ", "!\n").
		replaceAll("; ", ";\n");
	
	return row1.split("\n");  
}
//-----------------------------------------
function break_text(txt1, maxLen, sw_let_old_newline) {

    // break for: new line, end of sentence (.), exclamantion(!)  and question mark(?), and semicolon(";")     
    // break for too long line ( last comma or last blank before reaching the maximum length   
	
	var rtxt2 = break_priority(txt1, maxLen, sw_let_old_newline);

    var txt3 = "";

    //-------------------------------	
    function tooLongLine(oneLine) {
		// break in strings with their length not > maxlen  ( firstly try to find colon(:), then comma(,) and lastily space(" ")  
        var txt3 = oneLine.trim();
        var newLine2 = "";
        var len1;
        var txt3a;
        var u, u1,u2;
		//-------------
        for (var h = 0; h < txt3.length; h++) {
            len1 = txt3.length; 
            if (len1 < 1) {
                break;
            }
            if (len1 <= maxLen) {
                newLine2 += txt3 + "\n"; 
                break;
            }
			
            txt3a = txt3.substring(0, maxLen);
			u1 = txt3a.lastIndexOf(": ");
            u2 = txt3a.lastIndexOf(", ");
			u  = Math.max(u1,u2);
            if (u >= 0) {
                u++;
            } else {
                u = txt3a.lastIndexOf(" ");
            }
            if (u < 0) {
                u = txt3.indexOf(" ");  // find next forward 
                if (u < 0) {
                    u = txt3.length;  // take all string 
                }
            }
            newLine2 += txt3.substring(0, u) + "\n";

            txt3 = txt3.substring(u).trim();
        }
        return newLine2;
		
    } // end of tooLongLine();
	
    //-------------------------------------------
	
    var newLine = "";
    for (var g = 0; g < rtxt2.length; g++) {
		newLine += tooLongLine( rtxt2[g] ); 
	}
    return newLine;

} // end of break_text() 

//-----------------------------------------
function test_break_text(txt1) {
	
	console.log("old=" + "\n" + txt1 + "\n-------------------\n"); 
	
	var newLine = break_text(txt1, TXT_SPEECH_LENGTH_LIMIT, sw_let_old_newline);
	var lines = newLine.split("\n"); 
    for (var v1 = 0; v1 <lines.length; v1++) {
        console.log(v1 + "  " + lines[v1]) ;
    }
}
//-----------------------------