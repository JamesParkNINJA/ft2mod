/* -------- FT2MOD -------- */
/*  ft2mod.jamespark.ninja  */
/* --- James Park: 2020 --- */

jQuery(document).ready( function($) {
  
  // Default settings 
  // (volume prioritised, GBTPlayer Compatibility)
  var prioritiseEffects = false,
      tracker = 'GBTPlayer';
  
  // Function to check if the instrument matches the channel, and default otherwise
  function instrumentMatch(channel, instrument) {
    
    var ins1 = Array('01', '02', '03', '04'),
        ins2 = Array('08', '09', '0A', '0B', '0C', '0D', '0E', '0F'),
        ins3 = Array('10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1A', '1B', '1C', '1D', '1E', '1F'),
        output = '';
    
    if (channel == 0 || channel == 1) {
      if (ins1.includes(instrument)) {
        output = instrument;
      } else {
        output = '01';
      }
    }
    
    if (channel == 2) {
      if (ins2.includes(instrument)) {
        output = instrument;
      } else {
        output = '08';
      }
    }
    
    if (channel == 3) {
      if (ins3.includes(instrument)) {
        output = instrument;
      } else {
        output = '10';
      }
    }
    
    return output;
    
  }
  
  // Function check a string and loop through which compatible effect it is
  // If the first character of the effect matches an incompatible effect, it returns false
  function checkEffect(effect) {
    var check = false,
        mod   = effect[0];
    
    console.log(mod+' '+tracker);
    
    switch (mod) {
      case '0': check = effect; break;
      case '1': check = (tracker == 'GBTPlayer' ? false : effect); break;
      case '2': check = (tracker == 'GBTPlayer' ? false : effect); break;
      case '3': check = (tracker == 'GBTPlayer' ? false : effect); break;
      case '4': check = effect; break;
      case '7': check = (tracker == 'GBTPlayer' ? false : effect); break;
      case 'A': check = effect; break;
      case 'B': check = effect; break;
      case 'C': check = false; break;
      case 'D': check = effect; break;
      case 'E': check = false; break;
      case 'F': check = effect; break;
      case 'G': check = (tracker == 'GBTPlayer' ? false : false); break; // Update Later
      case 'H': check = false; break;
      case 'I': check = false; break;
      case 'J': check = false; break;
      case 'P': check = (tracker == 'GBTPlayer' ? false : false); break; // Update Later
      case 'Q': check = (tracker == 'GBTPlayer' ? false : effect); break;
      case 'R': check = (tracker == 'GBTPlayer' ? false : effect); break;
      case 'S': check = 'EC'+effect[2]; break;
      case 'V': check = false; break;
      case 'W': check = false; break;
      case 'X': check = false; break;
      case 'Y': check = false; break;
      case 'Z': check = false; break;
      default: check = false;
    }
    
    console.log(check);
    
    return check;
  }
  
  // Converts a given value for Famitracker volume into a mod readable format
  function convertVolume(input) {
    var output = '...';
    switch (input) {
      case '0': output = 'C00'; break;
      case '1': output = 'C04'; break;
      case '2': output = 'C08'; break;
      case '3': output = 'C0C'; break;
      case '4': output = 'C10'; break;
      case '5': output = 'C14'; break;
      case '6': output = 'C18'; break;
      case '7': output = 'C1C'; break;
      case '8': output = 'C20'; break;
      case '9': output = 'C24'; break;
      case 'A': output = 'C28'; break;
      case 'B': output = 'C2C'; break;
      case 'C': output = 'C30'; break;
      case 'D': output = 'C34'; break;
      case 'E': output = 'C38'; break;
      case 'F': output = 'C3C'; break;
      default: output = input;
    }
    
    // Redundant
    /*
    if (output.length < 3) {
      var l = output.length;
      for (var i = 0; i<l; i++) {
        output = '.'+output;
      }
    }
    */
    
    return output;
  }
  
  // Toggles between the effects/volume priority
  $(document).on('change', '[name="ft2mod-a-effects-are-priority"]', function(e){
    if ($(this).is(':checked')) {
      prioritiseEffects = true;
    } else {
      prioritiseEffects = false;
    }
  });
  
  // Switches active tracker compatibility based on dropdown selection
  $(document).on('change', '.ft2mod-a-tracker-select', function(e){
    tracker = $('.ft2mod-a-tracker-select option:selected').val();
  });
  
  // The main action to activate conversion
  $(document).on('click', '.ft2mod-a-convert', function(e){
    e.preventDefault();
    
    var input  = $('textarea[name="FT_2"]').val(),
        exit = $('textarea[name="MOD_2"]'),
        input = input.replace(/PATTERN.+?\n/g, '*'), // Replaces all instances of PATTERN XX with a separator
        head   = input.split('*'),
        update = Array();
    
    // Removes all the text before the first pattern
    for(var h = 0; h<head.length; h++) {
      if (h>0) {
        update.push(head[h]);
      }
    }
    
    // Rejoins the patterns as a text string, and removes the # End of export text
    var body = update.join('ModPlug Tracker MOD\n').replace('# End of export', ''),
        output = Array();
    
    // Loops through each new line as a row
    var rows = body.split("\n"),
        amount = rows.length;
    for(var i=0; i<amount; i++) {
      
      var newTabs = Array();
      
      // If the row doen't include the ModPlug Tracker MOD text then
      // it applies further conversion, else just outputs the text
      if (rows[i].indexOf('ModPlug Tracker MOD') === -1) {
      
        rows[i] = rows[i].replace(/ : /g, ':');
        rows[i] = rows[i].replace(/ROW.+?:/g, ''); // Remove all instances of ROW XX
        rows[i] = rows[i].replace(/:/g, '|'); // Switches colons to pipes (haha)
        var tabs = rows[i].split('|');
    
        // Splits a row into the channels ("tabs")
        for(var x=0; x<tabs.length; x++) {
          
          // Makes sure it only exports 4 channels ("tabs")
          if (tabs[0] != '' && x < 4) {
            
            // Splits the channels into note data ("cells")
            var cells = tabs[x].split(' '),
                instr = cells[1];
            
            // Checks the instrument with the channel, replaces if not viable
            cells[1] = instrumentMatch(x, instr);
            
            // If a FamiTracker volume exists
            // convert it to .mod volume
            // Else make it a .mod compatible blank
            if (cells[2] != '.') { 
              cells[2] = convertVolume(cells[2]);
            } else {
              cells[2] = '...';
            }
            
            // If a effects are a priority
            if (!prioritiseEffects) {
              // If not, check for a volume and apply it
              // If no volume, then check for effect and convert it
              if (cells[2] != '...') {
                cells[3] = cells[2];
              } else {
                cells[3] = (checkEffect(cells[3]) ? checkEffect(cells[3]) : '...');
              }
            } else {
              // If effects ARE a priority, check for effects and apply them 
              // (or wipe them if not compatible)
              if (cells[3] != '...') {
                if (checkEffect(cells[3]) != false) {
                  cells[3] = checkEffect(cells[3]);
                } else {
                  cells[3] = '...';
                }
              } else {
                // Otherwise apply the volume instead
                if (cells[2] != '...') {
                  cells[3] = cells[2];
                }
              }
            }
            
            // sets the 2nd "cell" as blank default for OpenMTP and GBTPlayer
            cells[2] = '...';            
            cells[0] = '|'+cells[0];
            
            // ...unless it's for MilkyTracker, in which case it
            // will remove that blank unused section
            if (tracker == 'MilkyTracker') {
              var newCells = Array();
              for(var c = 0; c<cells.length; c++) {
                if (c != 2) {
                  newCells.push(cells[c]);
                }
              }
              
              cells = newCells;
            }
            
            // rejoins the "cells" into a string
            var join = cells.join('');
            newTabs.push(join);
          }
        }
        
      } else {
        newTabs.push('\nModPlug Tracker MOD\n');
      }
      
      output.push(newTabs);
    }   
    
    // rejoins all data into a full string with new lines applied
    var html = output.join('\n');
    html = html.replace(/(^[ \t]*\n)/gm, '');
    html = html.replace(/,/g, '');
    
    exit.val('ModPlug Tracker MOD\n'+html);
    
  });
});
