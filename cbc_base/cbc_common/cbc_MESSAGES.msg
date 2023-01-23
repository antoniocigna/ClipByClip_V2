"use strict";
/*  
ClipByClip: A tool to practice language comprehension
Antonio Cigna 2021/2022
license MIT: you can share and modify the software, but you must include the license file 
*/ 
/* jshint strict: true */
/* jshint esversion: 6 */
/* jshint undef: true, unused: true */	 
//---------------------------------------------------------


var word_separator = ".,.;:?!_+-\[\]\(\)"  + "\t\n\r" ;  // word separator characters 

//----------------------------------------------------
// This function returns an XML string with all the messages from the application.
// xml doesn&apos;t accept &apos;<&apos; and &apos;&&apos; characters,
// but here you can use the following html markup: <br><b></b> <ul><li></li></ul>
// and the following characters: & &apos; "
//-----
// If you want to edit a message you need to edit this file only (the texts in the html file are just for reminder).
// You can add any language using the English part as a base, as long as you change the first 2 lines and the last one appropriately:
//    <lang_xx> </lang_xx> where xx is the language identifier.
//    <id_language>xx</id_language>
//    <lang_name>Name of the language</lang_name> This line is never used in any script it is only used as a comment.
// The language used by the script is determined by the local language of the computer.
// The script gets the local language identifier, looks for the corresponding part in this file, if it can&apos;t find it, use the English one.
// for example: the identifier is fr, since the French part is missing (lang_fr) the English one (lang_en) is used.
//----
// The message id has the form <Bm...></Bm...>  
// where the first character can be one of A, B, C
//    A  message for  cbc_builder.html file    
//    B  message for  cbc_player.html file    
//    C  message for  cbc_Player_Words_ClipByClip.html file    
//    H  message for  ...  DOC/DOC_english/doc_en.html     
//    S  message for  ...  SRT_v2_from_TEXT.html

// The m... following A,B,C is the id  of the html element that will receive the message text (eg. id="m123")   
//
//----------------------------------------------------------------------------------------------------------------------------------------
// Questa funzione restituisce una stringa XML con tutti i messaggi dell&apos;applicazione. 
// xml non accetta i caratteri &apos;<&apos; e &apos;&&apos;,
// ma qui puoi usare i seguenti marcatori html: <br><b></b> <ul><li></li></ul>
// e i seguenti caratteri: & &apos; "
//-----
// Se vuoi modificare un messaggio devi modificare soltanto questo file (quelli nel file html servono soltanto come promemoria)
// Puoi aggiungere qualsiasi lingua usando come base la parte inglese, a patto di modificare opportunamente le prime 3 righe e l&apos;ultima:
//    <lang_xx>   </lang_xx>   dove xx è l&apos;identificatore della lingua.
//    <id_language>xx</id_language>
//    <languageName>Nome della lingua usata</languageName>  Questa riga non  è mai usata in nessuno script serve soltanto come commento.
// La lingua utilizzata dallo script è determinata dalla lingua locale del computer.
// Lo script ottiene l&apos;identificativo xx della lingua locale, cerca la parte corrispondente in questo file, 
// se non la trova, utilizza quella in inglese.
// per esempio: l&apos;identificativo è fr, poiché manca la parte francese (lang_fr) viene utilizzata quella inglese (lang_en).
//----
// L&apos;id del messaggio ha la forma <Bm...></Bm...>
// dove il primo carattere può essere A, B, o C
// 		A messaggio per il file cbc_builder.html
//      B messaggio per il file cbc_player.html
//      C messaggio per il file cbc_Player_Words_ClipByClip.html
// La m... che segue A,B,C è l&apos;id dell&apos;elemento html che riceverà il testo del messaggio  (es. id="m123")
//               
//---------------------------------------------------------------------------------------------------------------------------------------

function get_messages() {

	var xml_text = `
<messages>
	<lang_en>		
		<id_language>en</id_language>	
		<languageName>English</languageName>	
		
		<Afile>cbc_builder.html</Afile>
		<Ama20>title is missing</Ama20>		
		<Ama21>the original subtitle file has not been read yet or is empty</Ama21>	
		<Ama22>the text in source language is missing</Ama22>	
		<Ama23>the translated text is missing</Ama23>	
		<Ama24>a text file is useless, a subtitle file is needed</Ama24>
		<Ama25>The file <b>§file§</b> content is not in srt subtitle format</Ama25>
		<Ama26>but if that's ok, in the <b>§m705§</b> window write 3 dots in a row <b>§...§</b></Ama26>  
		<Ama30>seconds without dialogue</Ama30>	
		<Amh00>../DOC/doc_English/doc_en.html</Amh00>			
		<Am001>after you have pressed the key below,
			<br>before clicking on the name of the chosen file,
			<br>select and copy the full address of the folder that contains it (you&apos;ll have to paste it right after)
		</Am001>
		<Am002>Choose video or audio file</Am002>
		<Am003>Confirm or make a new choice</Am003>
		<Am004>Confirm</Am004>
		<Am005>File Name</Am005>
		<Am006>Go back</Am006>		
		<Am007>Does the original language subtitle file exist?</Am007>
		<Am008>Yes, it exists</Am008>
		<Am009>No, it doesn't exist</Am009>		
		<Am010>The input consists of a video or audio file, a text or subtitle file in the original language and translated
			<br>one or more files may be missing
		</Am010>
		<Am011>Is there a video or audio file to play? </Am011>
		<Am012>Yes, there is a video or audio file </Am012>
		<Am013>No, there is neither a video file nor an audio file</Am013>
		<Am014>but there is a text file</Am014>
		<Am015>the file type of the original text <b>§origtype§</b> 
			is not the same as that of the translated text <b>§trantype§</b>
		</Am015>
		<Am138> Download</Am138>
		<Am139> Two files will be downloaded in the system download folder. 
			<br> Press the button here below to download the first file (it contains all the subtitles)
			</Am139>
		<Am140> Download script file</Am140>
		<Am141> Download html file</Am141>
		<Am142> After the previous download has been completed, press the button below. <br>
			<br>Immediately after, the newly built application is ready for use.
			<br><br>It can be re-run as many times as you want<br> by clicking on the CBC_1 _..... html file 
			<br> The two files (script and html) can be moved to any other folder, but they must always stay together. <br> <br>
			</Am142>
		<Am143> Download the html file</Am143>			
		<Am157> paste here below the path to the selected file</Am157>
		<Am158> Confirm</Am158>
		<Am159> Confirm</Am159>
		<Am160> Confirm</Am160>		
		<Am161> Write the title</Am161>
		<Am700> A tool to  <br>improve foreign language comprehension</Am700>
		
		<Am704> Source Language Subtitles</Am704>
		<Am705> Translated Subtitles</Am705>
		<Am706> make subtitles and write new file</Am706>
		<Am714> Source Language text</Am714>
		<Am715> Translated text</Am715>
		
		
		<Am875> Video/Audio Folder</Am875>				
		<Amb64>is not text</Amb64>									
		<Amb65>is not a text file</Amb65>		
		<Amb67> select the subtitles files and then <br>click here below<br> to download the two files</Amb67>		
		<Amb68> select the subtitles files and then <br>click here below<br> to download the two files</Amb68>	
		
		<Bmh00>../DOC/doc_English/doc_en.html</Bmh00>	
		<Bfile>cbc_player.html</Bfile>
		<Bm001>ERROR</Bm001>									
		<Bm002>This html file has no parameters to use.</Bm002>		
		<Bm003>It appears to have been started by clicking on it or typing its name on the command line,									
				<br>but he can&apos;t go alone (he lacks the data to use).									
		</Bm003>									
		<Bm004>Must be called from a file created by <b>ClickByClip_builder.html</b>.</Bm004>									
		<Bm010>how much are you working with this file</Bm010>									
		<Bm011>Session<br>&nbsp;</Bm011>									
		<Bm012>num.<br>days</Bm012>									
		<Bm013>num.<br>sessions</Bm013>									
		<Bm014>num.<br>clips</Bm014>									
		<Bm015>time<br>usage</Bm015>									
		<Bm016>time<br>visual.</Bm016>									
		<Bm017>this session</Bm017>									
		<Bm018>all sessions</Bm018>									
		<Bm019>num.<br>sub.lines</Bm019>									
		<Bm020>num.<br>words</Bm020>									
		<Bm021>the dialogue ends with</Bm021>									
		<Bm022>seconds and sentence completion</Bm022>									
		<Bm023>seconds and to the end of any overlapping entries</Bm023>									
		<Bm024>Play the entire clip</Bm024>									
		<Bm025>Stop / Continue</Bm025>									
		<Bm026>Translation of the line being played</Bm026>									
		<Bm027>returns to the beginning</Bm027>									
		<Bm028>go to start of Original Subtitles</Bm028>									
		<Bm029>go to start of Translated Subtitles</Bm029>									
		<Bm030>return to the beginning</Bm030>									
		<Bm031>go to start of Original Subtitles</Bm031>									
		<Bm032>go to start of Translated Subtitles</Bm032>									
		<Bm033>Hide the clip&apos;s subtitles</Bm033>									
		<Bm034>Play the entire clip</Bm034>									
		<Bm035>Show all subtitles</Bm035>									
		<Bm036>Hide all subtitles</Bm036>									
		<Bm037>show</Bm037>									
		<Bm038>hide</Bm038>									
		<Bm039>translation of the last line</Bm039>	
		<Bm040>Change the speed</Bm040>			
		<Bm506>Change the Speed</Bm506>									
		<Bm100>Specify clip type and duration</Bm100>									
		<Bm101>Change the duration of the clips</Bm101>									
		<Bm103>seconds</Bm103>									
		<Bm104>seconds and dialogue completion</Bm104>									
		<Bm105>seconds and line completion</Bm105>									
		<Bm106>lines of subtitles</Bm106>									
		<Bm107>Play</Bm107>									
		<Bm108>a new Clip</Bm108>									
		<Bm109>Change<br>type and duration</Bm109>									
		<Bm110>Synchronization</Bm110>									
		<Bm111>Subtitles</Bm111>									
		<Bm112>Change<br>duration</Bm112>									
		<Bm113>Reset</Bm113>									
		<Bm114>Stop<br>Continue</Bm114>									
		<Bm115>show all subtitles</Bm115>									
		<Bm116>hide all subtitles</Bm116>									
		<Bm117>list of all subtitles</Bm117>									
		<Bm218>Meaning of the buttons</Bm218>									
		<Bm119>press to establish start of row selection</Bm119>									
		<Bm120>press to establish end of row selection</Bm120>									
		<Bm121>press to play</Bm121>									
		<Bm122>press to play and then repeat indefinitely</Bm122>									
		<Bm123>Stop/Continue</Bm123>									
		<Bm126>Duration of a Clip</Bm126>									
		<Bm501>DOC/shared/cbc_4_HELP.html?language=en</Bm501>									
		<Bm135>Type and Duration of a Clip</Bm135>									
		<Bm145>reset</Bm145>									
		<Bm146>restores the initial text and background colors</Bm146>									
		<Bm147>choose the background color</Bm147>									
		<Bm148>choose text color</Bm148>									
		<Bm149>automatic search for the text color that best matches the background</Bm149>									
		<Bm167>the line is visible, press to hide it</Bm167>									
		<Bm168>the row is invisible, press to make it visible </Bm168>									
		<Bm169>the translation is hidden, press to make it visible</Bm169>									
		<Bm170>the translation is visible, press to hide it </Bm170>									
		<Bm171>Fix line start or end time</Bm171>									
		<Bm201>Colors</Bm201>									
		<Bm202>Change Colors</Bm202>									
		<Bm204>Background</Bm204>									
		<Bm205>Text</Bm205>									
		<Bm206>Text</Bm206>									
		<Bm207>automatic</Bm207>									
		<Bm208><br>The <b>Contrast</b>between the background and text colors is</Bm208>									
		<Bm209>good</Bm209>									
		<Bm210>insufficient</Bm210>		
		<Bm211>change the color of the background or text<br>or press the <b>auto.</b>key									
			<br>to automatically search for the most suitable text color									
		</Bm211>									
		<Bm212>I&apos;m looking for the best color</Bm212>									
		<Bm213>Statistics</Bm213>		
		<Bm220>select start</Bm220>
		<Bm221>select end</Bm221>
		<Bm222>show / hide<br>subtitles</Bm222>
		<Bm223>show / hide<br>translation</Bm223>
		<Bm224>Subtitles</Bm224>
		<Bm225>Play once</Bm225>
		<Bm226>Play endlessly</Bm226>
		<Bm227>N.</Bm227>
		<Bm228>from</Bm228>
		<Bm229>to</Bm229>
		<Bm230>maximum number of <br>seconds of sliding<br></Bm230>
		<Bm231>slide the cursor left or right<br>to bring forward <br>or delay<br>the beginning of the line</Bm231>
		<Bm232>slide the cursor left or right<br>to bring forward <br>or delay <br>the end of the line</Bm232>		
		<Bm244><b>To synchronize subtitles with speech</b></Bm244>	
		<Bm245><ul><li>Select a group of subtitle lines (keys <b>&#8594; &nbsp; &#8592;</b>),
			</li><li>make sure the subtitles are visible (open book &#128214;)
			</li><li>click the talking head icon &#128483; to start playback.
			</li><li>as soon as any line of subtitles has been fully spoken press the <b>Stop</b> key
			</li><li>If it is difficult to stop playback at the exact point, decrease the speed (vertical slider to the right) and try again.
			</li><li>After the stop, a box will open where you will have to indicate this last talked line.
			</li><li>At this point the correction will have been made and
			it will remain active in subsequent sessions (even after restarting the computer).
			</li><li>To close this window press the <b>Sync.OK</b> button. </li></ul>
		</Bm245>
		<Bm300>Words</Bm300>									
		<Bm301>in reverse order of use</Bm301>	
		<Bm302>Printable Bilingual</Bm302>		
		<Bm303>Printable Text</Bm303>	
		<Bm324>Text Lines</Bm324> 
		<Bmd01>Play all Subtitles</Bmd01>		
		<Bm711>Text Lines</Bm711>
		<Bm715>show all lines</Bm715>
		<Bm716>hide all lines</Bm716>
		<Bm717>list all lines</Bm717>		
		<Bm731>go to beginning of lines in original language</Bm731>
		<Bm732>go to beginning of translated lines</Bm732>
		<Bm782>Show the <b>Subtitles</b>of the line being played</Bm782>									
		<Bm783>Show the <b>Translation</b>of the line being played</Bm783>			
		<Bm791>Original text</Bm791>
		<Bm792>Translated text</Bm792>	
		<Bm801>Click here to download<br>the complete source of this HTML page<br>(if you are not a developer, ignore) </Bm801>									
		<Bm846>Skip</Bm846>									
		<Bm891>Subtitles in original language</Bm891>									
		<Bm892>Translated subtitles</Bm892>									
		<Bma06>Confirm</Bma06>									
		<Bma10>Press to download</Bma10>									
		<Bma12>title</Bma12>			
		<Bma17><b>This is the subtitle area</b>,<br>you can move it by dragging the anchor									
			<br>(click on the anchor and hold down and move the mouse)									
			<br>You can change the size of this strip<br>by dragging the blue square .									
		</Bma17>									
		<Bma18>You need to move the downloaded file from the download folder to the <b>ClipByClip/PLAYER</b></Bma18>									
		<Bma20>title is missing</Bma20>									
		<Bma21>the original subtitle file has not been read yet or is empty</Bma21>									
		<Bma24>error1 in previous step: Aspectless format line in extract_time(</Bma24>									
		<Bma25>error2 in previous step: Aspectless format line in extract_time(</Bma25>									
		<Bma26>error3 in extract_time()</Bma26>									
		<Bma30>seconds without dialogue</Bma30>									
		<Bma50>Select one or more files.</Bma50>									
		<Bma52>cannot be played</Bma52>									
		<Bma80>Show</Bma80>									
		<Bma81>Hide</Bma81>									
		<Bmb07>or </Bmb07>									
		<Bmb10>The video or audio files to be played must be located in the <b>ClipByClip/VideoAudio</b></Bmb10>									
		<Bmb12>VIDEO or Audio file</Bmb12>									
		<Bmb13>Select another Video or Audio file in the <b>ClipByClip/VideoAudio</b></Bmb13>									
		<Bmb22>to improve listening and reading comprehension of a foreign language</Bmb22>									
		<Bmb23>to improve listening and reading comprehension of a foreign language</Bmb23>									
		<Bmb50>Error<br>the file is neither video nor audio</Bmb50>		
		<Bmb52>can&apos;t be played</Bmb52>								
		<Bmb62>the file to run</Bmb62>									
		<Bmb64>is not text</Bmb64>									
		<Bmb65>is not a text file</Bmb65>									
		<Bmb67>Specify the subtitle files to use and then <br>click below<br>to download the two files</Bmb67>									
		<Bmb68>Specify the subtitle files to use and then <br>click below<br>to download the two files</Bmb68>									
		<Bmb71>encoded in the video file</Bmb71>									
		<Bmb74><b>The folder name and path must be the same as those containing the file </b></Bmb74>									
		<Bmb77>has been downloaded to your download folder</Bmb77>									
		<Bmb78>To be able to run it, change the final part of the name to <b>.html</b></Bmb78>									
		<Bmb79>This file can be moved and executed in any folder on your computer</Bmb79>									
		<Bmb81>the file</Bmb81>									
		<Bmb83>end time</Bmb83>									
		<Bmb84>seconds</Bmb84>									
		<Bmb85>since the <br>second</Bmb85>									
		<Bmb86>per <br>second</Bmb86>									
		<Bmb89>text</Bmb89>									
		<Bmb90>Press the button of the line that ends with the last word spoken</Bmb90>									
		<Bmb91>subtitle lines</Bmb91>									
		<Bmc85>subtitle line</Bmc85>									
		<Bmc86>increased by</Bmc86>									
		<Bmc87>decreased by</Bmc87>	
		<Bmc88>Bilingual Text</Bmc88> 	
			
		<Cfile>cbc_Player_Words_ClipByClip.html</Cfile>
		<Cm001>ERROR</Cm001>
		<Cm002>This html file has no parameters to use.</Cm002>
		<Cm003>It appears to have been started by clicking on it or typing its name on the command line,
				<br>but he can&apos;t go alone (he lacks the data to use).
		</Cm003>
		<Cm004>Must be called from a file created by <b>ClickByClip_builder.html</b>.</Cm004>
		<Cm500>Words</Cm500>
		<Cm501>DOC/shared/cbc_4_HELP.html?language=en</Cm501>
		<Cm502>$numwords$ words ($percSingle$%) form the <b>$percX$% of the text</b></Cm502>
		<Cm503>This word is found in $numlines$ lines (Click on the yellow button to execute the first line)</Cm503>
		<Cm504>All subtitle words are listed as buttons here on the right in reverse order of frequency, from most to least referenced.</Cm504>
		<Cm505>By clicking on a button that contains a word, it is possible to reproduce all the lines of subtitles that contain it</Cm505>
		<Cm506>Change the Speed</Cm506>
		<Cm507>change begin time</Cm507>
		<Cm508>change end time</Cm508>
		<Cm509>The word is in the lines identified by the numbers listed below it<br>
		(you can reproduce a row after the other by clicking on the <b>play +</b> button,  <br>  
		or you can click on any of the number listed and then on the <b>repeat</b> button)
		</Cm509>
		<Cm510>Play + <br>line</Cm510>
		<Cm511>Repeat<br>line</Cm511>
		<Cm512>Show Original Subtitles</Cm512>
		<Cm513>Show Translated Subtitles</Cm513>
		<Cm514>Repeat endlessly<br>line</Cm514>		
		<Cm604>All the words of the text are listed as buttons here on the right in reverse order of frequency, from most to least referenced.</Cm604>
		<Cm605>By clicking on a button showing a word it is possible to read all the lines that contain it</Cm605>	
		<Cm609>The word is found in the lines identified by the numbers listed below it<br>
			to read a row click on the corresponding number or <br>
			to go from one to the next, click on the <b>Go to line</b> button
		</Cm609>
		<Cm610>Go to <br>line</Cm610>
		<Cm611>Show<br>line</Cm611>
		<Cm612>Show Original Text Line</Cm612>
		<Cm613>Show Translated Text Line</Cm613>		
			
		<Hfile>doc/helpxx.html</Hfile>
		<Hm800><b>ClipByClip</b> is a tool to practice the comprehension of a language.</Hm800>
		<Hm820>It can be used in active mode by listening, reading and repeating 
				<br>or in passive mode by endlessly listening to a few lines of subtitles while busy doing something else.
				<br>It can also be useful in your native language to memorize for instance a poem, a piece of prose or a list of terms. 
		</Hm820>			
		<Hm812>The following could be a possible exploitation of the tool</Hm812> 
		<Hm801>Select a few lines of subtitles to play 
			by clicking on the §arrowRight§ icon of the first line and the §arrowLeft§ of the last line. 
		</Hm801> 
		<Hm802>Hide these lines (click to change the §openedbook§ icon to §closedBook§) and 
			play them once (click on the §talkingHead§ icon) or several times (§infinity§ icon).
		</Hm802>
		<Hm803>If it&apos;s useful you can reduce the playback speed (vertical slider).</Hm803>
		<Hm804>Try to repeat what you hear</Hm804> 
		<Hm805>Show the lines (click to change the  the §openedbook§ icon to §closedBook§) and play them again.</Hm805>
		<Hm806>To see the translation click on the §hideTran§ icon to change it to §showTran§.</Hm806>
		<Hm807>You can play and practice a line at time</Hm807>
		<Hm808>Of course you can just  enjoy the video as usual from the beginning to the end with or without subtitles.</Hm808>
		<Hm809>To watch the film without interruptions click on the button with the little arrow which is just below the video. </Hm809>
		<Hm810>To read the subtitles in the original language, click on the §closedBook§ icon and to hide them click on the §openedbook§.</Hm810>
		<Hm811>To read the translated subtitles, click on the §hideTran§ icon and to hide them click on the §showTran§ icon. </Hm811>		
		<Hm813>To select some lines of subtitles to play click on the §arrowRight§ icon of the first line 
			and the §arrowLeft§ of the last line.<br>Two highlighted stripes will appear before the first line and after the last.
			<br>The buttons on the new line before the first have effect on all the selected lines 
			(eg. clicking on the §talkingHead§ playbacks all the selected lines). </Hm813>    
		<Hm814>You can know when a subtitle is playing even when it is invisible,
			because in this case the line containing it is framed by a red border.
		</Hm814>	
		<Hm815>You can show, hide and play a single line inside a selected group</Hm815>
		<Hm816>This page is called up by the button <b>Words in reverse order of use</b>.
			<br>All subtitle words are listed on the buttons to the right in reverse order of use,
			the most used ones (those that appear in multiple lines) are listed first, so you can see which practice first.
			<br><br>Clicking on a button calls up all lines containing the word.
		</Hm816>	
		<Hm817>Each line containing the requested word is represented by a button.
			Clicking on one of these plays the corresponding piece.
			<br><br>The right button <b>Play + line</b> is used to play one line after another.
			<br>The <b>Repeat line</b> button is used to repeat the line.
			<br>The <b>Repeat endlessly line</b> button is used to repeat the line endlessly (click again to stop).
			<br><br>It is possible to decrease the playback speed by acting on the slider <b>Change speed</b>.
			<br><br>The two cursors <b>change the start time</b> and <b>change the end time</b> can be useful
			to make the start and end of the line earlier or later if needed.
		</Hm817>
	</lang_en>	
	<lang_it>
		<id_language>it</id_language>	
		<languageName>Italiano</languageName>	
		
		<Afile>cbc_builder.html</Afile>	
		<Ama20>manca il titolo</Ama20>
		<Ama21>il file dei sottotitoli originali non è stato ancora letto oppure è vuoto</Ama21>		
		<Ama22>manca il testo in lingua originale</Ama22>		
		<Ama23>manca il testo tradotto</Ama23>		
		<Ama24>il file di testo non può essere utilizzato, serve un file di sottotitoli</Ama24>	
		<Ama25>il contenuto del file <b>§file§</b> non è in  formato di sottotitoli srt</Ama25>
		<Ama26>ma se va bene così nella finestra <b>§m705§</b> scrivi 3 puntini di seguito <b>§...§</b></Ama26>   
		<Ama30>secondi senza dialogo</Ama30>
		<Amh00>../DOC/doc_Italiano/doc_it.html</Amh00>	
		<Am001>dopo che hai premuto il tasto qui sotto,
					<br>prima di cliccare sul nome del file scelto, 
				<br>seleziona e copia l&apos;indirizzo completo della cartella che lo contiene  (dovrai incollarlo subito dopo) 
		</Am001>		
		<Am002>Scegli il file video o audio</Am002>
		<Am003>Conferma o fai una nuova scelta</Am003>
        <Am004>Conferma</Am004>	
		<Am005>Nome del File</Am005>			
		<Am006>Torna indietro</Am006>
		<Am007>Esiste il file di sottotitoli in lingua originale?</Am007>
		<Am008>Si, esiste</Am008>			
		<Am009>No, non esiste</Am009>		
		<Am010>L&apos;input consiste in un file video o audio, un file di testo o di sottotitoli in lingua originale e tradotti
			<br>uno o più file possono mancare 
		</Am010>
		<Am011>Esiste un file video o audio da riprodurre?  </Am011>
		<Am012>Si, esiste un file video o audio  </Am012>
		<Am013>No, non c\'&egrave; n&eacute; un file video n&eacute; un file audio</Am013>
		<Am014>ma esiste un file di testo</Am014>
		<Am015>il tipo file del testo originale <b>§origtype§</b> 
			non &egrave; eguale a quello del testo tradotto <b>§trantype§</b>
		</Am015>
		<Am138> Download</Am138>
		<Am139> Nella cartella dei download saranno scaricati due file.
					<br> Premi il pulsante qui sotto per scaricare il primo file (contiene tutti i sottotitoli)
					</Am139>
		<Am140> Scarica il file di script</Am140>
		<Am141> Scarica il file html</Am141>
		<Am142> Dopo che il precedente download è stato completato, premi il pulsante qui sotto per scaricare il secondo file.
					<br><br>Dopo che i due file sono stati scaricati, esci da questa pagina. 				
					<br><br>I file appena creati (...html e ...jstxt) sono pronti da eseguire (click su file ...html)
					<br>I due file possono essere spostati in qualsiasi altra cartella, ma devono stare sempre insieme.<br><br>
					</Am142>
		<Am143> Scarica il file html</Am143>	

		<Am157> incolla qui sotto il percorso al file selezionato</Am157>
		<Am158> Conferma</Am158>
		<Am159> Conferma</Am159>		
		<Am161> Scrivi il titolo</Am161>	
		<Am700> Uno strumento per <br>migliorare la comprensione delle lingue straniere</Am700>
		<Am704> Sottotitoli Originali</Am704>
		<Am705> Sottotitoli Tradotti</Am705>
		<Am706> Ottiene sottotitoli e scrive nuovo file</Am706>
		<Am714> testo in lingua originale</Am714>
		<Am715> testo tradotto</Am715>
		<Am875> Cartella File Video/Audio</Am875>	
		<Amb64>non è un testo</Amb64>
		<Amb65>non è un file di testo</Amb65>						
		<Amb67> Specifica i file sottotitoli da utilizzare e quindi <br>clicca qui sotto<br>per scaricare i due file</Amb67>		
		<Amb68> Specifica i file sottotitoli da utilizzare e quindi <br>clicca qui sotto<br>per scaricare i due file</Amb68>		
		
		<Bmh00>../DOC/doc_Italiano/doc_it.html</Bmh00>	
		<Bfile>cbc_player.html</Bfile>
		<Bm001>ERRORE</Bm001>
		<Bm002>Questo file html non ha parametri da usare.</Bm002>
		<Bm003>Sembra che sia stato avviato facendo clic su di esso o scrivendo il suo nome sul comando di riga,
			<br>ma non può andare da solo (gli mancano i dati da usare).
		</Bm003>
		<Bm004>Deve essere chiamato da un file creato da <b>ClickByClip_builder.html</b>.</Bm004>
		<Bm010>quanto stai lavorando con questo file</Bm010>
		<Bm011>Sessione<br>&nbsp;</Bm011>
		<Bm012>num.<br>giorni</Bm012>
		<Bm013>num.<br>sessioni</Bm013>
		<Bm014>num.<br>clips</Bm014>
		<Bm015>tempo<br>utilizzo</Bm015>
		<Bm016>tempo<br>visual.</Bm016>
		<Bm017>questa sessione</Bm017>
		<Bm018>tutte le sessioni</Bm018>
		<Bm019>num.<br>righe sott.</Bm019>
		<Bm020>num.<br>parole</Bm020>
		<Bm021>il dialogo termina con</Bm021>
		<Bm022>secondi e completamento della frase</Bm022>
		<Bm023>secondi e fino alla fine di eventuali sovrapposioni di voci</Bm023>
		<Bm024>Play tutta la clip</Bm024>
		<Bm025>Stop / Continua</Bm025>
		<Bm026>Traduzione della riga in riproduzione</Bm026>
		<Bm027>ritorna all&apos;inizio</Bm027>
		<Bm028>vai a inizio dei Sottotitoli Originali</Bm028>
		<Bm029>vai a inizio dei Sottotitoli Tradotti</Bm029>
		<Bm030>ritorna all&apos;inizio</Bm030>
		<Bm031>vai a inizio dei Sottotitoli Originali</Bm031>
		<Bm032>vai a inizio dei Sottotitoli Tradotti</Bm032>
		<Bm033>Nascondi i sottotitoli della clip</Bm033>
		<Bm034>Play tutta la clip</Bm034>
		<Bm035>Mostra tutti i sottotitoli</Bm035>
		<Bm036>Nascondi tutti i sottotitoli</Bm036>
		<Bm037>mostra</Bm037>
		<Bm038>nascondi</Bm038>
		<Bm039>traduzione dell&apos;ultima riga</Bm039>
		<Bm040>Cambia la velocit&agrave;</Bm040>		
		<Bm506>Cambia la Velocità</Bm506>
		<Bm100>Specifica tipo e durata delle clip</Bm100>
		<Bm101>Modifica la durata delle clip</Bm101>
		<Bm103>secondi</Bm103>
		<Bm104>secondi e completamento dialogo</Bm104>
		<Bm105>secondi e completamento della riga</Bm105>
		<Bm106>righe di sottotitoli</Bm106>
		<Bm107>Play</Bm107>
		<Bm108>una nuova Clip</Bm108>
		<Bm109>Cambia<br>tipo e durata</Bm109>
		<Bm110>Sincronizzazione</Bm110>
		<Bm111>Sottotitoli</Bm111>
		<Bm112>Cambia<br>durata</Bm112>
		<Bm113>Reset</Bm113>
		<Bm114>Stop<br>Continua</Bm114>
		<Bm115>mostra tutti i sottotitoli</Bm115>
		<Bm116>nascondi tutti i sottotitoli</Bm116>
		<Bm117>lista di tutti i sottotitoli</Bm117>
		<Bm218>Significato dei pulsanti</Bm218>
		<Bm119>premi per stabilire l&apos;inizio delle selezione delle righe</Bm119>
		<Bm120>premi per stabilire la fine della selezione delle righe</Bm120>
		<Bm121>premi per riprodurre</Bm121>
		<Bm122>premi per riprodurre e poi ripetere all&apos;infinito</Bm122>
		<Bm123>Stop/Continua</Bm123>
		<Bm126>Durata di una Clip</Bm126>
		<Bm501>DOC/shared/cbc_4_HELP.html?language=it</Bm501>
		<Bm135>Tipo e Durata di una Clip</Bm135>
		<Bm145>reset</Bm145>
		<Bm146>ripristina i colori iniziali di testo e sfondo</Bm146>
		<Bm147>scegli il colore dello sfondo</Bm147>
		<Bm148>scegli il colore del testo</Bm148>
		<Bm149>ricerca automatica del colore di testo più adatto allo sfondo</Bm149>
		<Bm167>la riga è visibile, premi per nasconderla</Bm167>
		<Bm168>la riga è invisibile, premi per renderla visibile  </Bm168>
		<Bm169>la traduzione è nascosta, premi per renderla visibile</Bm169>
		<Bm170>la traduzione è visibile, premi per nasconderla  </Bm170>
		<Bm171>correzione del tempo di inizio o fine della riga</Bm171>
		<Bm201>Colori</Bm201>
		<Bm202>Cambia i Colori</Bm202>
		<Bm204>Sfondo</Bm204>
		<Bm205>Testo</Bm205>
		<Bm206>Testo</Bm206>
		<Bm207>autom.</Bm207>
		<Bm208><br>Il <b>Contrasto</b>tra i colori dello sfondo e del testo è</Bm208>
		<Bm209>buono</Bm209>
		<Bm210>insufficiente</Bm210>
		<Bm211>cambia il colore dello sfondo o del testo<br>oppure premi il tasto <b>autom.</b>
		<br>per cercare automaticamente il colore di testo più adatto
		</Bm211>
		<Bm212>sto cercando il colore migliore</Bm212>
		<Bm213>Statistiche</Bm213>		
		<Bm220>selez. inizio</Bm220>  
		<Bm221>selez. fine</Bm221>   
		<Bm222>mostra / nascondi<br>sottotitoli</Bm222> 
		<Bm223>mostra / nascondi<br>traduzione</Bm223> 
		<Bm224>Sottotitoli</Bm224>
		<Bm225>Play una sola volta</Bm225> 
		<Bm226>Play all&apos;infinito</Bm226>
		<Bm227>N.</Bm227>
		<Bm228>da</Bm228>
		<Bm229>a</Bm229>
		<Bm230>massimo numero di <br>secondi di spostamento<br></Bm230>
		<Bm231>far scorrere il cursore a sinistra o a destra<br>per anticipare <br>o posticipare<br>l&apos;inizio della riga</Bm231>
		<Bm232>far scorrere il cursore a sinistra o a destra<br>per anticipare <br>o posticipare <br>la fine della riga</Bm232>		
		<Bm244><b>Per sincronizzare i sottotitoli col parlato</b>
		</Bm244>
		<Bm245><ul><li>Seleziona un gruppo di righe di sottotitoli (tasti <b>&#8594; &nbsp; &#8592;</b>), 
		</li><li>assicurati che i sottotitoli siano visibili (libro aperto &#128214;)  
		</li><li>clicca sull&apos;icona della testa parlante &#128483; per far partire la riproduzione.  	
		</li><li>appena una qualsiasi riga di sottotitoli è stata completamente pronunciata premi il tasto <b>Stop</b>
		</li><li>Se è difficile riuscire a fermare la riproduzione al punto esatto, diminuisci la velocità (cursore verticale a destra) e riprova.
		</li><li>Dopo lo stop si aprirà un riquadro dove dovrai indicare questa riga. 
		</li><li>A questo punto la correzione sarà stata effettuata e 
			resterà attiva anche nelle sessioni successive (anche dopo aver fatto ripartire il computer).
		</li><li>Per chiudere questa finestra premi il tasto <b>Sync.OK</b>. </li></ul>
		</Bm245>
		<Bm300>Parole</Bm300>
		<Bm301>in ordine inverso<br>di utilizzo</Bm301>
		<Bm302>Bilingue Stampabile</Bm302>		
		<Bm303>Testo Stampabile</Bm303>	
		<Bm324>Testo</Bm324> 
		<Bmd01>Play tutti i Sottotitoli</Bmd01>
		<Bm711>Righe</Bm711>	
		
		<Bm715>mostra tutte le righe</Bm715>
		<Bm716>nascondi tutte le righe</Bm716>
		<Bm717>lista tutte le righe</Bm717>	
		<Bm731>vai a inizio delle righe in lingua originale</Bm731>  
		<Bm732>vai a inizio delle righe tradotte</Bm732>	
		<Bm782>Mostra i  <b>Sottotitoli</b>della riga in riproduzione</Bm782>
		<Bm783>Mostra la <b>Traduzione</b>della riga in riproduzione</Bm783>
		<Bm791>Testo in lingua originale</Bm791>
		<Bm792>Testo tradotto</Bm792>
		<Bm801>Clicca qui per scaricare<br>il sorgente completo di questa pagina HTML<br>(se non sei uno sviluppatore, ignora)	</Bm801>		
		<Bm846>Salta</Bm846>		
		<Bm891>Sottotitoli in lingua originale</Bm891>
		<Bm892>Sottotitoli tradotti</Bm892>
		<Bma06>Conferma</Bma06>
		<Bma10>Premi per scaricare</Bma10>
		<Bma12>titolo</Bma12>
		<Bma17><b>Questa è l&apos;area dei sottotitoli</b>,<br>è possibile spostarla trascinando l&apos;ancora 
		<br>(cliccare sull&apos;ancora e tenendo schiacciato spostare il mouse)
		<br>E&apos; possibile modificare le dimensione di questa striscia<br>trascinando il quadrato blu .
		</Bma17>
		<Bma18>Devi spostare il file scaricato dalla cartella dei download alla cartella <b>ClipByClip/PLAYER</b></Bma18>
		<Bma20>manca il titolo</Bma20>
		<Bma21>il file dei sottotitoli originali non è stato ancora letto oppure è vuoto</Bma21>
		<Bma24>errore1 nel passaggio precedente: riga in formato senza aspetti in extract_time(</Bma24>
		<Bma25>errore2 nel passaggio precedente: riga in formato senza aspetti in extract_time(</Bma25>
		<Bma26>errore3 in extract_time()</Bma26>
		<Bma30>secondi senza dialogo</Bma30>
		<Bma50>Seleziona uno o più file.</Bma50>
		<Bma52>non può essere riprodotto</Bma52>
		<Bma80>Mostra</Bma80>
		<Bma81>Nascondi</Bma81>
		<Bmb07>oppure</Bmb07>
		<Bmb10>I file video o audio da riprodurre devono trovarsi nella cartella <b>ClipByClip/VideoAudio</b></Bmb10>
		<Bmb12>VIDEO o File audio</Bmb12>
		<Bmb13>Seleziona un&apos;altro file Video o Audio nella cartella <b>ClipByClip/VideoAudio</b></Bmb13>
		<Bmb22>per migliorare la comprensione di ascolto e lettura di una lingua straniera</Bmb22>
		<Bmb23>per migliorare la comprensione di ascolto e lettura di una lingua straniera</Bmb23>
		<Bmb50>Errore<br>il file non è un video e neppure un audio</Bmb50>
		<Bmb62>il file da eseguire</Bmb62>
		<Bmb64>non è un testo</Bmb64>
		<Bmb65>non è un file di testo</Bmb65>
		<Bmb67>Specifica i file sottotitoli da utilizzare e quindi <br>clicca qui sotto<br>per scaricare i due file</Bmb67>
		<Bmb68>Specifica i file sottotitoli da utilizzare e quindi <br>clicca qui sotto<br>per scaricare i due file</Bmb68>
		<Bmb71>codificati nel file video</Bmb71>
		<Bmb74><b>Nome e percorso della cartella devono essere gli stessi di quelli che contengono il file </b></Bmb74>
		<Bmb77>è stato scaricato nella cartella download</Bmb77>
		<Bmb78>Per poterlo eseguire cambia la parte finale del nome in <b>.html</b></Bmb78>
		<Bmb79>Questo file può essere spostato ed eseguito in qualunque cartella del computer</Bmb79>
		<Bmb81>il file</Bmb81>
		<Bmb83>tempo di fine</Bmb83>
		<Bmb84>secondi</Bmb84>
		<Bmb85>dal <br>secondo</Bmb85>
		<Bmb86>al <br>secondo</Bmb86>
		<Bmb89>testo</Bmb89>
		<Bmb90>Premi il pulsante della riga che termina con l&apos;ultima parola pronunciata</Bmb90>
		<Bmb91>righe di sottotitolo</Bmb91>
		<Bmc85>riga sottotitolo</Bmc85>
		<Bmc86>aumentato di</Bmc86>
		<Bmc87>diminuito di</Bmc87>			
		<Bmc88>Testo Bilingue</Bmc88>   	
		
		<Cfile>cbc_Player_Words_ClipByClip.html</Cfile>
		<Cm001>ERRORE</Cm001>
		<Cm002>Questo file html non ha parametri da usare.</Cm002>
		<Cm003>Sembra che sia stato avviato facendo clic su di esso o scrivendo il suo nome sul comando di riga,
			<br>ma non può andare da solo (gli mancano i dati da usare).
		</Cm003>
		<Cm004>Deve essere chiamato da un file creato da <b>ClickByClip_builder.html</b>.</Cm004>
		<Cm500>Parole</Cm500>	  
		<Cm501>DOC/shared/cbc_4_HELP.html?language=it</Cm501>
		<Cm502>$numwords$ parole ($percSingle$%) formano il <b>$percX$% del testo</b></Cm502>	  
		<Cm503>Questa parola si trova in $numrighe$ righe (Clicca sul pulsante in giallo per eseguire la prima riga)</Cm503>		
		<Cm504>Tutte le parole dei sottotitoli sono elencate come pulsanti qui a destra in ordine inverso di frequenza, dal più al meno referenziato.</Cm504>
		<Cm505>Cliccando su un pulsante che riporta una parola è possibile riprodurre tutte le righe di sottotitoli che la contengono</Cm505>
		<Cm506>Cambia la Velocità</Cm506>		
		<Cm507>modifica tempo di inizio</Cm507>
		<Cm508>modifica tempo di fine</Cm508>
		<Cm509>La parola si trova nelle righe identificate dai numeri listati sotto di essa<br>
			(puoi riprodurre una riga dopo l&apos;altra facendo clic sul pulsante <b>play +</b>, <br>
			oppure puoi fare clic su uno qualsiasi dei numeri elencati e quindi sul pulsante <b>ripeti</b>)			
		</Cm509>
		<Cm510>Play + <br>riga </Cm510>
		<Cm511>Ripeti<br>riga</Cm511> 
		<Cm512>Mostra Sottotitoli Originali</Cm512>
		<Cm513>Mostra Sottotitoli Tradotti</Cm513>	
		<Cm514>Ripeti infinit.<br>riga</Cm514>	
		<Cm604>Tutte le parole del testo sono elencate come pulsanti qui a destra in ordine inverso di frequenza, dal più al meno referenziato.</Cm604>
		<Cm605>Cliccando su un pulsante che riporta una parola è possibile leggere tutte le righe che la contengono</Cm605>		
		<Cm609>La parola si trova nelle righe identificate dai numeri listati sotto di essa<br>
			per leggere una riga cliccare sul numero corrispondente oppure <br>
			per passare da una alla successiva cliccare sul pulsante <b>Vai alla riga</b>
		</Cm609>		
		<Cm610>Vai alla <br>riga</Cm610>
		<Cm611>Mostra<br>linea</Cm611>
		<Cm612>Mostra riga di testo originale</Cm612>
		<Cm613>Mostra riga di testo tradotta</Cm613>	
		
		<Hfile>doc/helpxx.html</Hfile>
		<Hm800><b>ClipByClip</b> è uno strumento per esercitarsi nella comprensione di una lingua.</Hm800>
		<Hm820>Può essere utilizzato in modalità attiva ascoltando, leggendo e ripetendo
			<br>o in modalità passiva ascoltando all&apos;infinito alcune righe di sottotitoli mentre si &egrave; impegnati a fare altro.
			<br>Può anche essere utile nella lingua madre per memorizzare ad esempio una poesia, un brano in prosa o un elenco di termini.
		</Hm820>
		<Hm812>Quello che segue potrebbe essere un possibile utilizzo dell&apos;applicazione</Hm812>
		<Hm801>Seleziona alcune righe di sottotitoli da riprodurre cliccando 
			sull&apos;icona §arrowRight§ della prima riga e §arrowLeft§ dell&apos;ultima riga.</Hm801>
		<Hm802>Nascondi queste righe (clicca per cambiare l&apos;icona §openedbook§ in §closedBook§) e
			riprodurli una (cliccare sull&apos;icona §talkingHead§) o più volte (icona §infinity§).
		</Hm802>
		<Hm803>Se ti è utile puoi ridurre la velocità di riproduzione (cursore verticale).</Hm803>
		<Hm804>Prova a ripetere quello che senti</Hm804>
		<Hm805>Mostra le righe (fai clic per cambiare l&apos;icona §openedbook§ in §closedBook§) e riproducile di nuovo.</Hm805>
		<Hm806>Per vedere la traduzione fai clic sull&apos;icona §hideTran§ per cambiarla in §showTran§.</Hm806>
		<Hm807>Puoi riprodurre e fare pratica con una riga di sottotitoli alla volta</Hm807>
		<Hm808>Naturalmente puoi goderti il video come al solito dall&apos;inizio alla fine con o senza sottotitoli.</Hm808>
		<Hm809>Per guardare il film senza interruzioni cliccare 
			sul pulsante con la freccetta che si trova appena sotto il video. </Hm809>
		<Hm810>Per leggere i sottotitoli in lingua originale cliccare sull&apos;icona §closedBook§, 
			<br>e  per nasconderli cliccare su §openedbook§.</Hm810>
		<Hm811>Per leggere i sottotitoli tradotti cliccare sull&apos;icona §hideTran§ e per nasconderli cliccare sull&apos;icona §showTran§. </Hm811>
		<Hm813>Per selezionare alcune righe di sottotitoli da riprodurre cliccare sull&apos;icona §arrowRight§ della prima riga
			e la §arrowLeft§ dell&apos;ultima riga.<br>Prima della prima riga e dopo l&apos;ultima appariranno due strisce evidenziate.
			<br>I pulsanti sulla nuova riga prima della prima hanno effetto su tutte le righe selezionate
			(es. cliccando sulla §talkingHead§ vengono riprodotte tutte le righe selezionate). 
		</Hm813>
		<Hm814>È possibile sapere quando un sottotitolo è in riproduzione anche quando è invisibile,
			perché in questo caso la riga che lo contiene è incorniciata da un bordo rosso.
		</Hm814>
		<Hm815>Puoi mostrare, nascondere e riprodurre una singola riga all&apos;interno di un gruppo selezionato</Hm815>
		<Hm816>Questa pagina è richiamata dal pulsante <b>Parole in ordine inverso di utilizzo</b>.
			<br>Tutte le parole dei sottotitoli sono listate sui pulsanti a destra in ordine inverso di utilizzo,  
			le più usate (quelle che compaiono in più righe) sono elencate per prime, in tal modo è possibile notare con quali conviene esercitarsi per prima.
			<br><br>Cliccando su un pulsante si richiamano tutte le righe che contengono la parola.		
			</Hm816> 
		<Hm817>Ogni riga che contiene la parola richiesta è rappresentata da un pulsante. 
			Cliccando su uno di questi si riproduce il brano corrispondente. 
			<br><br>Il pulsante a destra <b>Play + riga</b> serve a riprodurre una riga dopo l&apos;altra. 
			<br>Il pulsante <b>Ripeti riga</b> serve a ripetere la riga. 
			<br>Il pulsante <b>Ripeti infinito riga</b> serve a ripetere all&apos;infinito la riga (per bloccare cliccare di nuovo). 
			<br><br>E&apos; possibile diminuire la velocità di riproduzione agendo sul cursore <b>Cambia la velocità</b>. 
			<br><br>I due cursore <b>cambia il tempo di inizio</b> e <b>cambia il tempo di fine</b> possono essere utili 
				per anticipare o posticipare l&apos;inizio e la fine della riga se necessario. 
		</Hm817>	
	</lang_it>
</messages>	
`; // end of xml_text ( ` alt + 96 )

return xml_text;

} // end of get_messages()
//=======================================================================