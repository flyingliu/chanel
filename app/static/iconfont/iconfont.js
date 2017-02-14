;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-add" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M82.371891 472.03588l859.254171 0c11.030195 0 19.98206 8.951865 19.98206 19.983084l0 39.966167c0 11.030195-8.951865 19.98206-19.98206 19.98206L82.371891 551.96719c-11.030195 0-19.98206-8.951865-19.98206-19.98206l0-39.966167C62.389831 480.987744 71.341696 472.03588 82.371891 472.03588"  ></path>' +
    '' +
    '<path d="M472.03281 941.628109 472.03281 82.373938c0-11.030195 8.951865-19.98206 19.983084-19.98206l39.965144 0c11.030195 0 19.98206 8.951865 19.98206 19.98206l0 859.254171c0 11.031219-8.951865 19.98206-19.98206 19.98206l-39.965144 0C480.984674 961.610169 472.03281 952.659328 472.03281 941.628109"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M853.333333 725.333333c-8.533333 0-25.6 0-34.133333-8.533333L512 401.066667 204.8 716.8c-17.066667 17.066667-42.666667 17.066667-59.733333 0s-17.066667-42.666667 0-59.733333L512 281.6l375.466667 375.466667c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-25.6 8.533333-34.133334 8.533333z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-money-rmb" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M735.825718 447.784466H547.334763l210.92285-255.842922c12.388145-12.388145 12.388145-32.473599 0-44.862767l-0.364297-0.364297c-12.388145-12.388145-32.473599-12.388145-44.862767 0L480.065683 429.293323l-233.644341-292.02089c-12.388145-12.388145-32.473599-12.388145-44.862767 0l-0.364297 0.364297c-12.388145 12.388145-12.388145 32.473599 0 44.862767l212.253149 265.284969H223.62515c-17.520025 0-31.722492 14.202467-31.722492 31.722492v0.515747c0 17.520025 14.202467 31.722492 31.722492 31.722492h224.12043v127.921461H223.62515c-17.520025 0-31.722492 14.202467-31.722492 31.722492v0.515746c0 17.520025 14.202467 31.722492 31.722492 31.722493h224.12043v160.159699c0 17.520025 14.202467 31.722492 31.722493 31.722493h0.515746c17.520025 0 31.722492-14.202467 31.722492-31.722493V703.627389h224.12043c17.520025 0 31.722492-14.202467 31.722493-31.722493v-0.515746c0-17.520025-14.202467-31.722492-31.722493-31.722492H511.706311V511.745197h224.12043c17.520025 0 31.722492-14.202467 31.722493-31.722492v-0.515747c-0.001023-17.520025-14.20349-31.722492-31.723516-31.722492z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon11" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M757.146 548.777l-332.032 319.221c-9.947 9.495-22.607 14.317-35.419 14.317-13.415 0-26.828-5.276-36.777-15.674-19.595-20.347-18.991-52.603 1.355-72.195l293.751-282.447-293.751-282.447c-20.347-19.595-20.95-51.847-1.355-72.195s51.847-20.95 72.195-1.355l332.032 319.221c10.099 9.647 15.674 22.909 15.674 36.777s-5.727 27.13-15.674 36.777z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon11-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M266.854 475.223l332.032-319.221c9.948-9.495 22.607-14.317 35.419-14.317 13.415 0 26.828 5.276 36.777 15.674 19.595 20.347 18.991 52.603-1.356 72.195l-293.751 282.447 293.751 282.447c20.347 19.595 20.95 51.846 1.356 72.195s-51.846 20.95-72.195 1.356l-332.032-319.221c-10.1-9.647-15.674-22.909-15.674-36.777s5.727-27.13 15.674-36.777z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)