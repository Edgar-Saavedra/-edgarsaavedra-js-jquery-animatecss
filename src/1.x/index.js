/**
 * To set a mobile interger width
 * @param data
 * @returns {number}
 */
const setMobileWidth = (data) =>
{
    let width = 0;
    if(data)
    {
        let val = parseInt(data);
        if(val && val > 0)
            width = val;
    }
    return width;
}

/**
 * To parse if the delay given is an int
 * @param data
 * @returns {number}
 */
const parseDelay = (data) => {
    let delay = 0;
    if(data)
    {
        let val = parseInt(data);
        if(val && val > 0)
            delay = val;
    }
    return delay;
}

/**
 * To let us know if we can show in mobile
 * @param showMobile
 * @param width
 * @returns {boolean}
 */
const showMobile = (showMobile,width) =>
{
    let show = true;
    if(width > 0)
    {
        if((showMobile == false) && (((window.innerWidth > 0) ? window.innerWidth : screen.width ) <=  width))
        {
            show = false;
        }
    }
    return show;
}

/**
 * To parse the classes given, regardless if they are in arrays of string
 * @param classes
 * @returns {string}
 */
const parseClasses = (classes) =>
{
    let cls = '';
    if(checkIfIsArray(classes))
    {
        for(let i in classes){
            if(checkIfIsString(classes[i]))
                cls += classes[i]+' ';
        }
    }
    else if(checkIfIsString(classes))
        cls = classes;

    return cls;
}

/**
 * Lets us know if param is array
 * @param arr
 * @returns {boolean}
 */
const checkIfIsArray = (arr) =>
{
    let isArray = false;
    if(Array.isArray(arr))
        isArray = true;
    return isArray;
}

/**
 * Lets us know if param is a string and throws error if not
 * @param str
 * @returns {boolean}
 */
const checkIfIsString = (str) =>
{
    let isStr = false;
    if(typeof str === 'string' || str instanceof String)
        isStr = true;
    else
        throw new Error('edgarsaavedra-js-jquery-animatecss','You must define an array of strings or string!');
    return isStr;
}

(function ( $ ) {
    /**
        * @example : $( ".waypoint-me" ).AnimateCssWaypoint({
                animate : {
                    className : 'bounce shake tada',
                }
            });
        * @example : <div class="add-wm-animate-css" data-wm-animate-class="flash" data-wm-animate-mobile-width="768" data-wm-animate-show-mobile="false" data-wm-animate-offset="80%"></div>
        *
        * @link https://github.com/daneden/animate.css/
        * @link http://imakewebthings.com/waypoints/
        * All elements acted on will need the following data fields filled out
        * animateClass : (required) the animate css class to use
        * animateMobileWidth : (optional) the width that describes the mobile screen
        * animateShowMobile : (optional) to show animation in mobile or not
        * animateDelay : (optional) an amount in miliseconds to delay animation
        * animateOffset : (optional) see: http://imakewebthings.com/waypoints/api/offset-option/
        *  A number offset represents the number of pixels from the top of the viewport where the handler should trigger.
        *
        *  Number Offset: The default, 0, means the handler triggers when the top of the element hits the top of the viewport.
        *  If we set this to 25, it will trigger when the top of the element is 25px from the top of the window.
        *
        *  Out of sight: Number offsets can be negative. An offset of -25 triggers the handler when the top of the element is 25px above the top of the viewport, out of sight.
        *
        *  Percentage Offset: A percentage offset refers to a percentage of the window's height. An offet of '50%'
        *  will trigger when the top of the element is 50% of the way from the top of the window, or simply put, hits the middle of the window.
        *
        *  Just like number offsets, percentages can be negative. Also like number offsets,
        *  negatives indicate the top of the element is a certain percentage of the window height beyond the top of the viewport.
        *
        *  by default it is set to 80 %
        *
        * @param options
        * @returns {*}
        * @constructor
    */
    $.fn.AnimateCssWaypoint = function( options ) {
        let settings = $.extend({
            animate: {
                mobileWidth : null,
                showMobile : true,
                className : null,
                delay : null,
                offset : null
            }
        }, options );

        return this.waypoint({
            handler: function(direction) {
                let _self = this;

                //override settings given from data attributes
                settings = {
                    animate: {
                        mobileWidth : ($(_self.element).data('animateMobileWidth'))?$(_self.element).data('animateClass'):settings.animate.mobileWidth,
                        showMobile : ($(_self.element).data('animateShowMobile'))?$(_self.element).data('animateClass'):settings.animate.showMobile,
                        className : ($(_self.element).data('animateClass'))?$(_self.element).data('animateClass'):settings.animate.className,
                        delay : ($(_self.element).data('animateDelay'))?$(this.element).data('animateClass'):settings.animate.delay
                    }
                };

                //adding delay
                let _delay = parseDelay(settings.animate.delay);
                let _mobile_width = setMobileWidth(settings.animate.mobileWidth);
                let _show_mobile = showMobile(settings.animate.showMobile,_mobile_width);
                if(settings.animate)
                {
                    let _class = parseClasses(settings.animate.className);

                    if(_show_mobile)
                    {
                        if(direction == 'up')
                        {
                            //remove animated class
                            if($(_self.element).hasClass('animated'))
                            {
                                $(_self.element)
                                    .removeClass('animated');
                            }

                            //check if we are dealing with array or string
                            //and remove classes
                            if(checkIfIsArray(settings.animate.className))
                            {
                                for(let i in settings.animate.className){
                                    if(checkIfIsString(settings.animate.className[i]))
                                    {
                                        if($(_self.element).hasClass(settings.animate.className[i]))
                                            $(_self.element)
                                                .removeClass(settings.animate.className[i]);
                                    }
                                }
                            }else
                            {
                                if($(_self.element).hasClass(_class))
                                    $(_self.element)
                                        .removeClass(_class);
                            }
                        }
                        if(direction == 'down')
                        {

                            if(!$(_self.element).hasClass('animated'))
                            {
                                $(_self.element)
                                    .addClass('animated');
                            }

                            if(checkIfIsArray(settings.animate.className))
                            {
                                for(let i in settings.animate.className){
                                    if(checkIfIsString(settings.animate.className[i]))
                                    {
                                        if(!$(_self.element).hasClass(settings.animate.className[i]))
                                        {
                                            if(_delay)
                                            {
                                                setTimeout(function(){
                                                    $(_self.element)
                                                        .addClass(settings.animate.className[i]);
                                                },_delay*i);
                                            }
                                            else
                                            {
                                                $(_self.element)
                                                    .addClass(settings.animate.className[i]);
                                            }
                                        }
                                    }
                                }
                            }else
                            {
                                if(!$(_self.element).hasClass(_class))
                                {
                                    if(_delay)
                                    {
                                        setTimeout(function(){
                                            $(_self.element)
                                                .addClass(_class);
                                        },_delay);
                                    }
                                    else
                                    {
                                        $(_self.element)
                                            .addClass(_class);
                                    }
                                }
                            }
                        }
                    }
                }
            },
            offset: (settings.animate.offset)?settings.animate.offset:'80%'
        });
    }

}( jQuery ));


/**
 * Use any of these animations for the
 * animateClass data attribute :
 *
 * bounce
 * flash
 * pulse
 * rubberBand
 * shake
 * headShake
 * swing
 * tada
 * wobble
 * jello
 * bounceIn
 * bounceInDown
 * bounceInLeft
 * bounceInRight
 * bounceInUp
 * bounceOut
 * bounceOutDown
 * bounceOutLeft
 * bounceOutRight
 * bounceOutUp
 * fadeIn
 * fadeInDown
 * fadeInDownBig
 * fadeInLeft
 * fadeInLeftBig
 * fadeInRight
 * fadeInRightBig
 * fadeInUp
 * fadeInUpBig
 * fadeOut
 * fadeOutDown
 * fadeOutDownBig
 * fadeOutLeft
 * fadeOutLeftBig
 * fadeOutRight
 * fadeOutRightBig
 * fadeOutUp
 * fadeOutUpBig
 * flipInX
 * flipInY
 * flipOutX
 * flipOutY
 * lightSpeedIn
 * lightSpeedOut
 * rotateIn
 * rotateInDownLeft
 * rotateInDownRight
 * rotateInUpLeft
 * rotateInUpRight
 * rotateOut
 * rotateOutDownLeft
 * rotateOutDownRight
 * rotateOutUpLeft
 * rotateOutUpRight
 * hinge
 * jackInTheBox
 * rollIn
 * rollOut
 * zoomIn
 * zoomInDown
 * zoomInLeft
 * zoomInRight
 * zoomInUp
 * zoomOut
 * zoomOutDown
 * zoomOutLeft
 * zoomOutRight
 * zoomOutUp
 * slideInDown
 * slideInLeft
 * slideInRight
 * slideInUp
 * slideOutDown
 * slideOutLeft
 * slideOutRight
 * slideOutUp
 */
