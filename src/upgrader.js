(function() {
  var RULESET = [
    {
      title: "Upgrade CSS/JS CDN Reference",
      description: "Inspect HTML for references to a recognized BootstrapCDN version of Bootstrap and swap it out for Bootstrap 4.",
      run: function(doc) {
        var count = 0;
        
        // Replace Bootstrap CDN CSS with 3.0.0-rc1 version
        $(doc).find("link[rel=stylesheet][href]").each(function() {
          $link = $(this);
          var href = $link.attr('href')
          if ( href && href.match(new RegExp("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.[0-6]/css/bootstrap.min.css")) ) {
            $link.attr("href","https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css");
            count++;
          }
        });
		
	          
        // Replace Bootstrap CDN JS with 3.0.0-rc1 version
        $(doc).find("script[src]").each(function() {
          $script = $(this);
          var src = $script.attr('src')
          if ( src && src.match(new RegExp(" //netdna.bootstrapcdn.com/bootstrap/3.3.[0-6]/js/bootstrap.min.js")) ) {
            $script.attr("href","https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/js/bootstrap.js");
            count++;
          }
        });
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Typography",
      description: "Dropped the <code>.page-header</code> class entirely.",
      run: function(doc) {
        var count = 0;
        
        for (var i = 1; i <= 12; i++) {
          var sI = i.toString();
          $(doc).find(".span" + sI).each(function() {
            $this = $(this);
            // Make sure we're dealing with a container, not a form element
            if ( $this.is("section, div, aside, article") ) {
              $this.removeClass("span" + sI).addClass("col-sm-" + sI + " col-lg-" + sI);
              count += $this.length;
            }
          });
        }
        
        // Remove all deprecated classes
        $pageHeader = $(doc).find(".page-header")
        if ($pageHeader.length > 0) {
          count += $pageHeader.length;
          $pageHeader.removeClass('page-header');
        }
        
        // Remove .container-fluid since it doesn't do anything
        $blockquote = $(doc).find("blockquote")
        if ($blockquote.length > 0) {
          count += $blockquote.length;
          $blockquote.addClass('blockquote');
        }
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Fix Button  Classes",
      description: "Renamed <code>.btn-default</code> to <code>.btn-secondary</code>, dropped classes <code>.btn-xs</code>, <code>.btn-group-xs</code>",
      run: function(doc) {
        var $buttonDef = $(doc).find(".btn-default");
        var $buttonXs = $(doc).find(".btn-xs");
        var $buttonGr = $(doc).find(".btn-group-xs");
        var count = $buttonDef.length + $buttonGr.length + $buttonGr.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $buttonDef.removeClass('btn-default').addClass('btn-secondary');
        $buttonXs.removeClass('btn-xs');
        $buttonXs.removeClass('btn-group-xs');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	  {
      title: "Navbar",
      description: "Dropped the <code>.navbar-form</code> class entirely. It’s no longer necessary.",
      run: function(doc) {
        var $navForm = $(doc).find(".navbar-form");
    
        var count = $navForm.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $navForm.removeClass('navbar-form');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	{
      title: "Fix Images Classes",
      description: "Renamed <code class=\"highlighter-rouge\">.img-responsive</code> to <code class=\"highlighter-rouge\">.img-fluid</code>.",
      run: function(doc) {
        var $images = $(doc).find(".img-responsive");
        var count = $images.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $images.removeClass('img-responsive').addClass('img-fluid');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Pager",
      description: "Renamed <code>.previous</code> and <code>.next</code> to <code>.pager-prev</code> and <code>.pager-next</code>.",
      run: function(doc) {
        $pagerPrev = $(doc).find(".previous");
        $pagerNext = $(doc).find(".next");
        var count = $pagerPrev.length + $pagerNext.length;
        $pagerPrev.removeClass('previous').addClass('pager-prev');
        $pagerPrev.removeClass('next').addClass('pager-next');
		
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	/*{
      title: "Pagination",
      description: "Renamed <code>.previous</code> and <code>.next</code> to <code>.pager-prev</code> and <code>.pager-next</code>.",
      run: function(doc) {
        $pagerPrev = $(doc).find(".previous");
        $pagerNext = $(doc).find(".next");
        var count = $pagerPrev.length + $pagerNext.length;
        $pagerPrev.removeClass('previous').addClass('pager-prev');
        $pagerPrev.removeClass('next').addClass('pager-next');
		
        return (count > 0) ? count + " Replaced" : false;
      }
    },*/
    
    {
      title: "Tables",
      description: "Renamed <code>.table-condensed</code> to <code>.table-sm</code> for consistency.",
	  run: function(doc) {
        var $tables = $(doc).find(".table-condensed");
        var count = $tables.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $tables.removeClass('table-condensed').addClass('table-sm');
        
        return (count > 0) ? count + " Replaced" : false;
      }
     
    },
    
    {
      title: "Panels, thumbnails, and wells",
      description: "Dropped entirely for the new card component.",
      run: function(doc) {
        var count = 0;
        
        $panel = $(doc).find(".panel");
        $panel.removeClass('panel-default');
        $panel.removeClass('panel').addClass('card');
        count += $panel.length;        
		
		$well = $(doc).find(".well");
        $well.removeClass('well').addClass('card');
        count += $well.length;		
		
		$thumb = $(doc).find(".thumbnail");
        $thumb.removeClass('thumbnail').addClass('card');
        count += $thumb.length;
        
        $panelHeading = $(doc).find(".panel-heading");
        $panelHeading.removeClass('panel-heading').addClass('card-header');
        count += $panelHeading.length;

		$panelTitle = $(doc).find(".panel-title");
        $panelTitle.removeClass('panel-title').addClass('card-title');
        count += $panelTitle.length;
		
		$panelBody = $(doc).find(".panel-body");
        $panelBody.removeClass('panel-body').addClass('card-block');
        count += $panelBody.length;	
		
		$panelFoot = $(doc).find(".panel-footer");
        $panelFoot.removeClass('panel-footer').addClass('card-footer');
        count += $panelFoot.length;		
		
		
		$panelPrim = $(doc).find(".panel-primary");
        $panelPrim.removeClass('panel-primary').addClass('card-primary');
        count += $panelPrim.length;
		
		$panelSucc = $(doc).find(".panel-success");
        $panelSucc.removeClass('panel-success').addClass('card-success');
        count += $panelSucc.length;		
		
		$panelInfo = $(doc).find(".panel-info");
        $panelInfo.removeClass('panel-info').addClass('card-info');
        count += $panelInfo.length;
		
		$panelWarn = $(doc).find(".panel-warning");
        $panelWarn.removeClass('panel-warning').addClass('card-warning');
        count += $panelWarn.length;
		
		$panelDang = $(doc).find(".panel-danger");
        $panelDang.removeClass('panel-danger').addClass('card-danger');
        count += $panelDang.length;
		      

        
        return (count > 0) ? count + " Replaced" : false;        
      }
    },
      
    {
      title: "Carousel",
      description: "Renamed <code>.item</code> to <code>.carousel-item</code> .",
      run: function(doc) {
        $carousel = $(doc).find(".carousel");
        $item = $($carousel).find(".item");
        $item.removeClass('item').addClass('carousel-item');
        var count = $item.length;
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
  
    {
      title: "Utilities",
      description: "Removed <code>.pull-left</code> and <code>.pull-right</code> since they’re redundant to <code>.pull-xs-left</code> and <code>.pull-xs-right</code>",
      run: function (doc) {
	  $pullL = $(doc).find(".pull-left");
       $pullL.removeClass('pull-left');	 
	   $pullR = $(doc).find(".pull-right");
       $pullR.removeClass('pull-right');
        var count = $pullL.length + $pullR.length;
        
        return (count > 0) ? count + " Replaced" : false;
      }
    }, 
	{
      title: "Responsive utilities",
      description: "The old classes (<code class=\"highlighter-rouge\">.hidden-xs</code> <code class=\"highlighter-rouge\">.hidden-sm</code> <code class=\"highlighter-rouge\">.hidden-md</code> <code class=\"highlighter-rouge\">.hidden-lg</code> <code class=\"highlighter-rouge\">.visible-xs-block</code> <code class=\"highlighter-rouge\">.visible-xs-inline</code> <code class=\"highlighter-rouge\">.visible-xs-inline-block</code> <code class=\"highlighter-rouge\">.visible-sm-block</code> <code class=\"highlighter-rouge\">.visible-sm-inline</code> <code class=\"highlighter-rouge\">.visible-sm-inline-block</code> <code class=\"highlighter-rouge\">.visible-md-block</code> <code class=\"highlighter-rouge\">.visible-md-inline</code> <code class=\"highlighter-rouge\">.visible-md-inline-block</code> <code class=\"highlighter-rouge\">.visible-lg-block</code> <code class=\"highlighter-rouge\">.visible-lg-inline</code> <code class=\"highlighter-rouge\">.visible-lg-inline-block</code>) are gone. The <code class=\"highlighter-rouge\">.hidden-*-up</code> classes hide the element when the viewport is at the given breakpoint or larger (e.g. <code class=\"highlighter-rouge\">.hidden-md-up</code> hides an element on medium, large, and extra-large devices). The <code class=\"highlighter-rouge\">.hidden-*-up</code> classes hide the element when the viewport is at the given breakpoint or larger (e.g. <code class=\"highlighter-rouge\">.hidden-md-up</code> hides an element on medium, large, and extra-large devices). The <code class=\"highlighter-rouge\">.hidden-*-down</code> classes hide the element when the viewport is at the given breakpoint or smaller (e.g. <code class=\"highlighter-rouge\">.hidden-md-down</code> hides an element on extra-small, small, and medium devices). <p>Rather than using explicit <code class=\"highlighter-rouge\">.visible-*</code> classes, you make an element visible by simply not hiding it at that screen size. You can combine one <code class=\"highlighter-rouge\">.hidden-*-up</code> class with one <code class=\"highlighter-rouge\">.hidden-*-down</code> class to show an element only on a given interval of screen sizes (e.g. <code class=\"highlighter-rouge\">.hidden-sm-down.hidden-xl-up</code> shows the element only on medium and large devices).</p> <p>Note that the changes to the grid breakpoints in v4 means that you’ll need to go one breakpoint larger to achieve the same results (e.g. <code class=\"highlighter-rouge\">.hidden-md</code> is more similar to <code class=\"highlighter-rouge\">.hidden-lg-down</code> than to <code class=\"highlighter-rouge\">.hidden-md-down</code>). The new responsive utility classes don’t attempt to accommodate less common cases where an element’s visibility can’t be expressed as a single contiguous range of viewport sizes; you will instead need to use custom CSS in such cases.</p>",
      run: function (doc) {
		$hideXs = $(doc).find(".hidden-xs");
        $hideXs.removeClass('hidden-xs').addClass('hidden-xs-up');
        count += $hideXs.length;    
		
		$hideSm = $(doc).find(".hidden-sm");
        $hideSm.removeClass('hidden-sm').addClass('hidden-sm-up');
        count += $hideSm.length;
		
		$hideMd = $(doc).find(".hidden-md");
        $hideMd.removeClass('hidden-md').addClass('hidden-md-up');
        count += $hideMd.length;
		
		$hideLg = $(doc).find(".hidden-lg");
        $hideLg.removeClass('hidden-lg').addClass('hidden-lg-up');
        count += $hideLg.length;
		
		 var count = $hideLg.length + $hideMd.length + $hideSm.length + $hideXs.length;
        
        return (count > 0) ? count + " Replaced" : false;
		
      }
    },
  
   /* {
      title: "Form Structural Changes",
      description: "",
      run: function (doc) {
      }
    },
  
    {
      title: "Modal Hide Class Removal",
      description: "",
      run: function (doc) {
      }
    } */
  ];
  
  var Upgrader = {
    rules: RULESET,
    perform: function(input, report) {
      var doc = (new DOMParser()).parseFromString(input, 'text/html');
      var results = [];
      for (var i = 0; i < Upgrader.rules.length; i++) {
        var rule = Upgrader.rules[i];
        results.push(rule.run(doc));
      }
      
      var output = "<!doctype html>\n" + doc.getElementsByTagName("html")[0].outerHTML;
      
      if (report) {
        return {
          output: output,
          results: results
        }
      } else {
        return output;
      }
    }
  }
  
  window.BootstrapUpgrader = Upgrader;
})()