var ResumeeManager = ( function( __win, __doc )
{
	var _svg_container     = {},
		_svg               = null,
		_animation_request = null;
	
	function _linesFollowSpot( spot )
	{
		if( !spot.tagName )
			return false;
		
		var line_id = spot.id.replace( "spot", "line" ),
			line    = _svg.getElementById( line_id ),
			scale   = _svg_container.getBoundingClientRect().width / 2000,
			new_x2  = spot.getBoundingClientRect().left + spot.getBoundingClientRect().width / 2,
			new_y2  = spot.getBoundingClientRect().top + spot.getBoundingClientRect().height / 2;
		
		line.setAttribute( "x2", new_x2 / scale );
		line.setAttribute( "y2", new_y2 / scale );
	}
	
	function _setAnimationChecker( )
	{
		var spots = _svg.getElementById( "interaction-spots" ).children;//.forEach( _linesFollowSpot.bind( this ) );
		
		for( var s in spots )
			_linesFollowSpot.call( this, spots[s] )
		
		_animation_request = __win.requestAnimationFrame( _setAnimationChecker.bind( this ) );
	}
	
	function _getSVG( )
	{
		_svg = _svg_container.contentDocument;
		_setAnimationChecker.call( this );
	}
	
	this.init = function( )
	{
		_svg_container = __doc.getElementById( "graphics" );
		_svg_container.addEventListener( "load", _getSVG.bind( this ), false );
	};
	
	return this;
})( window, window.document );

ResumeeManager.init();