<!doctype>
<html>

<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/triangle.css">
  <link rel="stylesheet" href="./css/main.css">
  
  <title>FT2MOD | JamesPark.ninja</title>  
  <meta name="description" content= "Convert FamiTracker to .mod!" />
  <meta name="robots" content= "index, follow">
  

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="./js/main.js"></script>
</head>

<body>
  <div class="tri fullwidth">
    <form id="ft2mod" name="ft2mod">
      <div class="tri">
        <div class="ang le-full">
          <h1>FT<span>2</span>MOD</h1></div>
        <div class="ang le-full">
          <div class="ft2mod-c-options-panel">
            <div class="tri">
              <div class="ang le-full md-third">

                <p class="text_small">Convert <a style="color:red; font-weight:bold;" target="_blank" href="http://famitracker.com/">Famitracker</a> export.txt to .mod compatible tracker output you can copy and paste!</p>
                <p class="text_small">Automatically converts volume, or can use effects as a priority.</p>

              </div>
              <div class="ang le-full md-third">

                <img src="./images/gb.png" />

              </div>
              <div class="ang le-full md-third">
                <label for="ft2mod-a-effects-are-priority">Prioritise effects over volume:
                  <input type="checkbox" name="ft2mod-a-effects-are-priority" id="ft2mod-a-effects-are-priority" />
                </label>

                <span class="text_small">Tracker Compatibility:</span>
                <select name="ft2mod-a-tracker-select">
                  <option value="GBTPlayer" selected>GBT Player (GameBoy Compatible)</option>
                  <option value="OpenMPT">Open MPT</option>
                  <option value="MilkyTracker">MilkyTracker</option>
                </select>

                <a href="#" class="ft2mod-a-convert">CONVERT</a>
              </div>
            </div>
          </div>
        </div>
        <div class="ang le-full lg-half" style="padding:.5em;">
          <strong class="title">FamiTracker Export</strong>
          <br>
          <textarea name="FT_2" placeholder="PASTE FAMITRACKER TEXT HERE"></textarea>
        </div>
        <div class="ang le-full lg-half" style="padding:.5em;">
          <strong>MOD Output</strong>
          <br>
          <textarea name="MOD_2" disabled placeholder="MOD COMPATIBLE TEXT WILL APPEAR HERE"></textarea>
        </div>
      </div>
    </form>
  </div>
</body>

</html>
